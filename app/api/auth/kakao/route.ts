import { NextRequest, NextResponse } from 'next/server'

// Kakao OAuth 설정
const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID || ''
const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/kakao/callback`
  : 'http://localhost:3000/api/auth/kakao/callback'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')
  
  if (action === 'login') {
    // Kakao 로그인 페이지로 리다이렉트
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}&response_type=code&scope=profile_nickname,profile_image,account_email`
    
    return NextResponse.redirect(kakaoAuthUrl)
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}