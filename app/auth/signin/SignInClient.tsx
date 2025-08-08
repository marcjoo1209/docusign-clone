'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../../../components/AuthProvider'
import Link from 'next/link'
import { 
  FileText, Mail, Lock, Eye, EyeOff, 
  ArrowRight, CheckCircle, AlertCircle
} from 'lucide-react'
import SocialAuthButtons from '../../../components/SocialAuthButtons'

export default function SignInClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 데모 모드 확인 및 자동 로그인
  useEffect(() => {
    if (searchParams?.get('demo') === 'true') {
      setEmail('test@example.com')
      setPassword('test1234!')
      // 자동으로 로그인 시도
      setTimeout(() => {
        handleDemoLogin()
      }, 500)
    }
  }, [searchParams])

  const handleDemoLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      const result = await signIn('test@example.com', 'test1234!')
      console.log('Demo login result:', result)
      
      if (result?.error) {
        setError('데모 로그인 중 오류가 발생했습니다.')
        setLoading(false)
      } else {
        // 로그인 성공 - 잠시 기다린 후 리다이렉트
        console.log('Demo login successful, waiting for auth state update...')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 100)
      }
    } catch (err) {
      console.error('Demo login error:', err)
      setError('데모 로그인 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    console.log('Login attempt with:', email, password)
    
    try {
      const result = await signIn(email, password)
      console.log('SignIn result:', result)
      
      if (result?.error) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
        setLoading(false)
      } else {
        // 로그인 성공 - 잠시 기다린 후 리다이렉트
        console.log('Login successful, waiting for auth state update...')
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 100)
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('로그인 중 오류가 발생했습니다.')
      setLoading(false)
    }
  }

  // 테스트 계정 자동 입력
  const fillTestAccount = () => {
    setEmail('test@example.com')
    setPassword('test1234!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 테스트 계정 안내 또는 데모 모드 안내 */}
        {searchParams?.get('demo') === 'true' ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">데모 모드 자동 로그인 중</p>
                <p className="text-sm text-green-700 mt-1">
                  테스트 계정으로 자동 로그인하고 있습니다...
                </p>
                {loading && (
                  <div className="mt-2">
                    <div className="spinner h-4 w-4"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">테스트 계정</p>
                <p className="text-sm text-blue-700 mt-1">
                  이메일: test@example.com<br />
                  비밀번호: test1234!
                </p>
                <button
                  type="button"
                  onClick={fillTestAccount}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline"
                >
                  테스트 계정으로 자동 입력
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">동의서 플랫폼</h1>
          <p className="text-gray-600 mt-2">계정에 로그인하세요</p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link href="/auth/reset-password" className="text-sm text-blue-600 hover:text-blue-700">
                비밀번호 찾기
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="spinner h-5 w-5"></div>
                  <span>로그인 중...</span>
                </>
              ) : (
                <>
                  <span>로그인</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* SNS 로그인 버튼 */}
          <div className="mt-6">
            <SocialAuthButtons 
              mode="signin" 
              onSuccess={() => window.location.href = '/dashboard'}
            />
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">계정이 없으신가요?</span>
            {' '}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              무료로 시작하기
            </Link>
          </div>
        </div>

        {/* 보안 안내 */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>SSL 암호화</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>2단계 인증</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>GDPR 준수</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}