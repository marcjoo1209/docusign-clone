import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '../../../../lib/supabase'

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID || ''
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET || ''

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  
  if (!code) {
    return NextResponse.redirect(new URL('/auth/signin?error=no_code', request.url))
  }
  
  try {
    // 액세스 토큰 받기
    const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: NAVER_CLIENT_ID,
        client_secret: NAVER_CLIENT_SECRET,
        code: code,
        state: state || '',
      }),
    })
    
    const tokenData = await tokenResponse.json()
    
    if (tokenData.access_token) {
      // 사용자 정보 가져오기
      const userResponse = await fetch('https://openapi.naver.com/v1/nid/me', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      })
      
      const userData = await userResponse.json()
      
      if (userData.response) {
        const { email, name, profile_image } = userData.response
        
        // Supabase에 사용자 정보 저장 또는 업데이트
        const supabase = createSupabaseClient()
        
        // 사용자를 Supabase Auth에 등록/로그인
        // 주의: Naver OAuth는 Supabase가 직접 지원하지 않으므로
        // 커스텀 처리가 필요합니다. 여기서는 세션을 직접 생성합니다.
        
        // 임시로 로컬 스토리지에 저장하고 리다이렉트
        const userData = {
          id: `naver-${userData.response.id}`,
          email: email,
          user_metadata: {
            full_name: name,
            avatar_url: profile_image,
            provider: 'naver'
          }
        }
        
        // 클라이언트 사이드에서 처리하도록 리다이렉트
        return NextResponse.redirect(
          new URL(`/auth/callback?provider=naver&user=${encodeURIComponent(JSON.stringify(userData))}`, request.url)
        )
      }
    }
    
    return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', request.url))
  } catch (error) {
    console.error('Naver OAuth error:', error)
    return NextResponse.redirect(new URL('/auth/signin?error=auth_failed', request.url))
  }
}