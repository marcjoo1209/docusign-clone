import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '../../../../../lib/supabase'

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID || ''
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET || ''
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/kakao/callback`
  : 'http://localhost:3000/api/auth/kakao/callback'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect(new URL('/auth/signin?error=no_code', request.url))
  }
  
  try {
    // 액세스 토큰 받기
    const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        client_secret: KAKAO_CLIENT_SECRET,
        redirect_uri: KAKAO_REDIRECT_URI,
        code: code,
      }),
    })
    
    const tokenData = await tokenResponse.json()
    
    if (tokenData.access_token) {
      // 사용자 정보 가져오기
      const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      })
      
      const userData = await userResponse.json()
      
      if (userData.id) {
        const email = userData.kakao_account?.email
        const name = userData.properties?.nickname
        const profile_image = userData.properties?.profile_image
        
        // 사용자 데이터 구성
        const userInfo = {
          id: `kakao-${userData.id}`,
          email: email || `kakao_${userData.id}@kakao.com`,
          user_metadata: {
            full_name: name || 'Kakao User',
            avatar_url: profile_image,
            provider: 'kakao'
          }
        }
        
        // 클라이언트 사이드에서 처리하도록 리다이렉트
        return NextResponse.redirect(
          new URL(`/auth/callback?provider=kakao&user=${encodeURIComponent(JSON.stringify(userInfo))}`, request.url)
        )
      }
    }
    
    return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', request.url))
  } catch (error) {
    console.error('Kakao OAuth error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', request.url))
  }
}