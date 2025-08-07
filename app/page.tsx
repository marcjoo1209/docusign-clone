'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../components/AuthProvider'
import Link from 'next/link'
import { FileText, Users, BarChart, Shield } from 'lucide-react'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (user) {
    return null // 대시보드로 리다이렉트 중
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">DocuSign Clone</h1>
          </div>
          <div className="space-x-4">
            <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900">
              로그인
            </Link>
            <Link href="/auth/signup" className="btn-primary">
              시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            문서 서명을
            <span className="text-blue-600"> 디지털로</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            문서를 업로드하고 고객이 온라인으로 입력할 수 있는 
            간편하고 안전한 전자서명 플랫폼입니다.
          </p>
          <div className="space-x-4">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-3">
              무료로 시작하기
            </Link>
            <Link href="/demo" className="btn-secondary text-lg px-8 py-3">
              데모 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 기능 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            왜 우리 플랫폼을 선택해야 할까요?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-10 w-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">다양한 문서 지원</h4>
              <p className="text-gray-600">
                Word, Excel, PowerPoint, HWP, PDF, 이미지 파일을 모두 지원합니다.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">쉬운 공유</h4>
              <p className="text-gray-600">
                고유 URL을 생성하여 고객들이 쉽게 접근할 수 있습니다.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <BarChart className="h-10 w-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">실시간 분석</h4>
              <p className="text-gray-600">
                응답 현황을 실시간으로 확인하고 데이터를 분석할 수 있습니다.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-red-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-10 w-10 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">안전한 보안</h4>
              <p className="text-gray-600">
                SSL 암호화와 안전한 인증 시스템으로 데이터를 보호합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용법 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            3단계로 간단하게
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">문서 업로드</h4>
              <p className="text-gray-600">
                원하는 문서를 업로드하고 입력 필드를 추가하세요.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">링크 공유</h4>
              <p className="text-gray-600">
                생성된 링크를 고객들에게 공유하세요.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">결과 수집</h4>
              <p className="text-gray-600">
                입력된 데이터를 실시간으로 확인하고 다운로드하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="text-lg font-semibold">DocuSign Clone</span>
            </div>
            <p className="text-gray-400">
              © 2024 DocuSign Clone. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}