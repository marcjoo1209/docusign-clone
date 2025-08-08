import Link from 'next/link'
import { FileText, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react'

export default function PricingPage() {
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

      {/* 가격 섹션 */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              합리적인 가격으로 시작하세요
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              비즈니스 규모에 맞는 플랜을 선택하세요. 언제든지 업그레이드하거나 취소할 수 있습니다.
            </p>
          </div>

          {/* 요금제 카드 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600">개인 및 소규모 팀</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">₩9,900</span>
                  <span className="text-gray-600 ml-2">/월</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">연간 결제 시 20% 할인</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">월 100건 문서 전송</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">최대 3명 사용자</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">기본 템플릿 제공</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">이메일 지원</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">기본 분석 기능</span>
                </li>
              </ul>
              <Link href="/auth/signup" className="w-full btn-secondary text-center block">
                시작하기
              </Link>
            </div>

            {/* Professional - 인기 */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  가장 인기
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-blue-100">성장하는 비즈니스</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">₩29,900</span>
                  <span className="text-blue-100 ml-2">/월</span>
                </div>
                <p className="text-sm text-blue-100 mt-2">연간 결제 시 20% 할인</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>월 500건 문서 전송</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>최대 10명 사용자</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>커스텀 템플릿 무제한</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>우선 이메일 & 채팅 지원</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>고급 분석 및 리포트</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>API 접근 권한</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-0.5" />
                  <span>브랜드 커스터마이징</span>
                </li>
              </ul>
              <Link href="/auth/signup" className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-4 rounded-lg text-center block transition-colors">
                시작하기
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">대규모 조직</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">맞춤형</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">요구사항에 따른 견적</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">무제한 문서 전송</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">무제한 사용자</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">전용 계정 관리자</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">24/7 전화 지원</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">SLA 보장</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">온프레미스 설치 가능</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">맞춤형 통합 개발</span>
                </li>
              </ul>
              <Link href="/contact" className="w-full btn-secondary text-center block">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            자주 묻는 질문
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                무료 체험 기간이 있나요?
              </h3>
              <p className="text-gray-600">
                네, 모든 플랜은 14일 무료 체험 기간을 제공합니다. 신용카드 등록 없이 시작할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                언제든지 플랜을 변경할 수 있나요?
              </h3>
              <p className="text-gray-600">
                네, 언제든지 업그레이드하거나 다운그레이드할 수 있습니다. 변경사항은 다음 결제 주기부터 적용됩니다.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                취소 시 환불이 가능한가요?
              </h3>
              <p className="text-gray-600">
                연간 결제의 경우 30일 이내 전액 환불이 가능합니다. 월간 결제는 언제든지 취소할 수 있으며, 
                이미 결제한 기간까지는 서비스를 이용할 수 있습니다.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                문서 전송 한도를 초과하면 어떻게 되나요?
              </h3>
              <p className="text-gray-600">
                한도에 도달하면 알림을 받게 되며, 추가 문서 팩을 구매하거나 상위 플랜으로 업그레이드할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            지금 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            14일 무료 체험으로 모든 기능을 경험해보세요
          </p>
          <Link href="/auth/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium text-lg px-8 py-4 rounded-lg inline-flex items-center space-x-2 transition-colors">
            <span>무료로 시작하기</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}