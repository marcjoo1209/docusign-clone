'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseClient } from '../../../lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      // Naver/Kakao OAuth 콜백 처리
      const provider = searchParams?.get('provider')
      const userParam = searchParams?.get('user')
      
      if (provider && userParam) {
        try {
          const userData = JSON.parse(decodeURIComponent(userParam))
          
          // 로컬 스토리지에 사용자 정보 저장
          localStorage.setItem('currentUser', JSON.stringify(userData))
          localStorage.setItem('isTestUser', 'true')
          
          // registeredUsers에도 추가
          let users = []
          const existingUsers = localStorage.getItem('registeredUsers')
          if (existingUsers) {
            users = JSON.parse(existingUsers)
            // 중복 체크
            if (!users.find((u: any) => u.id === userData.id)) {
              users.push(userData)
              localStorage.setItem('registeredUsers', JSON.stringify(users))
            }
          } else {
            localStorage.setItem('registeredUsers', JSON.stringify([userData]))
          }
          
          // 대시보드로 이동
          window.location.href = '/dashboard'
          return
        } catch (e) {
          console.error('Error processing OAuth callback:', e)
        }
      }
      
      // Supabase OAuth 콜백 처리 (Google, Facebook/Instagram)
      const supabase = createSupabaseClient()
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Auth callback error:', error)
        router.push('/auth/signin?error=auth_failed')
        return
      }

      if (session) {
        // 로그인 성공 - 대시보드로 이동
        router.push('/dashboard')
      } else {
        // 세션이 없으면 로그인 페이지로
        router.push('/auth/signin')
      }
    }

    handleCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center">
        <div className="spinner h-12 w-12 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900">로그인 처리 중...</h2>
        <p className="text-gray-600 mt-2">잠시만 기다려주세요</p>
      </div>
    </div>
  )
}