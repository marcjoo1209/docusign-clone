import { NextRequest, NextResponse } from 'next/server'

// Naver OAuth 설정
const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID || ''
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET || ''
const NAVER_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL 
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/naver/callback`
  : 'http://localhost:3000/api/auth/naver/callback'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get('action')
  
  if (action === 'login') {
    // Naver 로그인 페이지로 리다이렉트
    const state = Math.random().toString(36).substring(7)
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(NAVER_REDIRECT_URI)}&state=${state}`
    
    return NextResponse.redirect(naverAuthUrl)
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}