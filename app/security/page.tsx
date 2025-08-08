import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">문서서명 플랫폼</h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>홈으로</span>
              </Link>
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 font-medium">
                로그인
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                무료로 시작하기
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
            보안
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            엔터프라이즈급 보안으로 데이터를 안전하게 보호합니다
          </p>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600">
                이 페이지는 현재 준비 중입니다. 빠른 시일 내에 더 자세한 내용으로 업데이트하겠습니다.
              </p>
              <p className="text-gray-600">
                궁금한 점이 있으시면 <Link href="/contact" className="text-blue-600 hover:text-blue-700">문의하기</Link> 페이지를 이용해주세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}