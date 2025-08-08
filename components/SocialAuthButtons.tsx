'use client'

import { useState } from 'react'
import { useAuth } from './AuthProvider'

interface SocialAuthButtonsProps {
  mode: 'signin' | 'signup'
  onSuccess?: () => void
}

export default function SocialAuthButtons({ mode, onSuccess }: SocialAuthButtonsProps) {
  const { signInWithProvider } = useAuth()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSocialAuth = async (provider: 'google' | 'naver' | 'kakao' | 'instagram') => {
    if (provider === 'instagram') {
      alert('Instagram 로그인은 개발중입니다.')
      return
    }

    setLoading(provider)
    try {
      const result = await signInWithProvider(provider)
      console.log('Social auth result:', result)
      
      if (result?.data?.user) {
        console.log('Social auth success, redirecting...')
        // 성공 시 자동으로 대시보드로 이동
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          } else {
            window.location.href = '/dashboard'
          }
        }, 100)
      } else if (result?.error) {
        console.error('Social auth error:', result.error)
        alert(`${provider} 로그인 실패: ${result.error.message || '알 수 없는 오류'}`)
      }
    } catch (error) {
      console.error(`${provider} auth error:`, error)
      alert(`${provider} 로그인 중 오류가 발생했습니다.`)
    } finally {
      setLoading(null)
    }
  }

  const buttonText = mode === 'signin' ? '로그인' : '회원가입'

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">또는</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Google */}
        <button
          onClick={() => handleSocialAuth('google')}
          disabled={loading !== null}
          className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'google' ? (
            <div className="spinner h-5 w-5"></div>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </>
          )}
        </button>

        {/* Naver */}
        <button
          onClick={() => handleSocialAuth('naver')}
          disabled={loading !== null}
          className="flex items-center justify-center px-4 py-2.5 bg-[#03C75A] text-white rounded-lg hover:bg-[#02b351] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'naver' ? (
            <div className="spinner h-5 w-5"></div>
          ) : (
            <>
              <span className="mr-2 font-bold text-lg">N</span>
              <span className="text-sm font-medium">네이버</span>
            </>
          )}
        </button>

        {/* Kakao */}
        <button
          onClick={() => handleSocialAuth('kakao')}
          disabled={loading !== null}
          className="flex items-center justify-center px-4 py-2.5 bg-[#FEE500] text-[#000000D9] rounded-lg hover:bg-[#fdd800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'kakao' ? (
            <div className="spinner h-5 w-5"></div>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#000000"
                  d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-9.986 7.748-.62 0-1.092-.046-1.759-.097-1 .776-1.774 1.403-3.485 1.962.26-1.383-.113-2.259-.514-3.259-2.383-1.505-4.256-3.411-4.256-6.354 0-4.271 4.486-7.747 10-7.747z"
                />
              </svg>
              <span className="text-sm font-medium">카카오</span>
            </>
          )}
        </button>

        {/* Instagram */}
        <button
          onClick={() => handleSocialAuth('instagram')}
          disabled={loading !== null}
          className="flex items-center justify-center px-4 py-2.5 bg-gradient-to-br from-[#405DE6] via-[#C13584] to-[#F56040] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading === 'instagram' ? (
            <div className="spinner h-5 w-5"></div>
          ) : (
            <>
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.405a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
              <span className="text-sm font-medium">Instagram</span>
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-center text-gray-500 mt-4">
        SNS 계정으로 {buttonText}하면 서비스 이용약관과 개인정보처리방침에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  )
}