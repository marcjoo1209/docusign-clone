'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  FileText, Mail, ArrowLeft, CheckCircle, AlertCircle
} from 'lucide-react'
import { createSupabaseClient } from '../../../lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const supabase = createSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 테스트 환경에서는 localStorage에서 계정 확인
    const savedUser = localStorage.getItem('testUser')
    if (savedUser) {
      const { email: savedEmail } = JSON.parse(savedUser)
      if (email === savedEmail || email === 'test@example.com') {
        setSubmitted(true)
        setLoading(false)
        return
      }
    }

    // 테스트 계정 처리
    if (email === 'test@example.com') {
      setSubmitted(true)
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) {
        setError('비밀번호 재설정 이메일 전송에 실패했습니다.')
      } else {
        setSubmitted(true)
      }
    } catch (err) {
      setError('오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">이메일을 확인하세요</h2>
            <p className="text-gray-600 mb-6">
              비밀번호 재설정 링크를 <strong>{email}</strong>로 전송했습니다.
              이메일을 확인하고 링크를 클릭하여 새 비밀번호를 설정하세요.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              이메일이 도착하지 않았다면 스팸 폴더를 확인해주세요.
            </p>
            <Link href="/auth/signin" className="btn-primary w-full">
              로그인으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">비밀번호 찾기</h1>
          <p className="text-gray-600 mt-2">가입한 이메일로 재설정 링크를 보내드립니다</p>
        </div>

        {/* 비밀번호 찾기 폼 */}
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
                이메일 주소
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
              <p className="mt-2 text-sm text-gray-500">
                가입 시 사용한 이메일 주소를 입력하세요
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="spinner h-5 w-5"></div>
                  <span>전송 중...</span>
                </div>
              ) : (
                '재설정 링크 보내기'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/auth/signin" className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>로그인으로 돌아가기</span>
            </Link>
          </div>
        </div>

        {/* 도움말 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>문제가 계속되면 고객센터로 문의해주세요</p>
          <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 mt-1 block">
            support@example.com
          </a>
        </div>
      </div>
    </div>
  )
}