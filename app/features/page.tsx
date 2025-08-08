import Link from 'next/link'
import { 
  FileText, Upload, Share2, Download, Lock, Users, 
  BarChart3, Globe, Zap, Shield, CheckCircle, ArrowLeft 
} from 'lucide-react'

export default function FeaturesPage() {
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

      {/* 히어로 섹션 */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            강력한 기능으로 업무 효율을 높이세요
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            전자서명부터 문서 관리, 데이터 분석까지 비즈니스에 필요한 모든 기능을 제공합니다
          </p>
        </div>
      </section>

      {/* 주요 기능 상세 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {/* 기능 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  모든 문서 형식 지원
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Word, Excel, PowerPoint, PDF, HWP 등 거의 모든 문서 형식을 지원합니다. 
                  드래그 앤 드롭으로 간편하게 업로드하고, 자동으로 최적화된 뷰어로 문서를 확인할 수 있습니다.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">최대 100MB 파일 업로드 지원</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">일괄 업로드 기능</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">자동 파일 변환 및 최적화</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <Upload className="h-32 w-32 text-blue-400" />
              </div>
            </div>

            {/* 기능 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <FileText className="h-32 w-32 text-green-400" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  스마트 폼 빌더
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  드래그 앤 드롭으로 다양한 입력 필드를 문서에 추가하세요. 
                  텍스트, 서명, 체크박스, 라디오 버튼, 드롭다운 등 다양한 필드 타입을 지원합니다.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">15+ 필드 타입 지원</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">필드 유효성 검사 규칙</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">조건부 로직 설정</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 기능 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <Share2 className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  간편한 공유 및 협업
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  고유 URL을 생성하여 누구와도 쉽게 문서를 공유할 수 있습니다. 
                  이메일, SMS, 메신저 등 다양한 채널로 전송하고 실시간으로 상태를 추적하세요.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">비밀번호 보호 기능</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">만료일 자동 설정</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">접근 권한 관리</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <Share2 className="h-32 w-32 text-purple-400" />
              </div>
            </div>

            {/* 기능 4 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                <BarChart3 className="h-32 w-32 text-orange-400" />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  실시간 분석 대시보드
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  문서 조회수, 작성 완료율, 평균 작성 시간 등 중요한 지표를 실시간으로 모니터링하세요. 
                  데이터 기반의 인사이트로 더 나은 의사결정을 내릴 수 있습니다.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">실시간 대시보드</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">커스텀 리포트 생성</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span className="text-gray-700">데이터 내보내기</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 추가 기능 그리드 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            더 많은 강력한 기능들
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <Lock className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">보안 & 규정 준수</h3>
              <p className="text-gray-600">
                256비트 SSL 암호화, GDPR 준수, SOC 2 인증으로 데이터를 안전하게 보호합니다.
              </p>
            </div>
            <div className="card">
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">팀 협업</h3>
              <p className="text-gray-600">
                팀원들과 문서를 공유하고, 코멘트를 남기며, 실시간으로 협업할 수 있습니다.
              </p>
            </div>
            <div className="card">
              <Globe className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">다국어 지원</h3>
              <p className="text-gray-600">
                한국어, 영어, 일본어, 중국어 등 10개 이상의 언어를 지원합니다.
              </p>
            </div>
            <div className="card">
              <Zap className="h-8 w-8 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">자동화 워크플로우</h3>
              <p className="text-gray-600">
                반복적인 작업을 자동화하고, 커스텀 워크플로우를 생성할 수 있습니다.
              </p>
            </div>
            <div className="card">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">감사 추적</h3>
              <p className="text-gray-600">
                모든 문서 활동을 추적하고, 상세한 감사 로그를 확인할 수 있습니다.
              </p>
            </div>
            <div className="card">
              <Download className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">대량 다운로드</h3>
              <p className="text-gray-600">
                여러 문서와 데이터를 한 번에 다운로드하고 백업할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            모든 기능을 무료로 체험해보세요
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            14일 동안 모든 기능을 제한 없이 사용할 수 있습니다
          </p>
          <Link href="/auth/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium text-lg px-8 py-4 rounded-lg inline-block transition-colors">
            무료 체험 시작하기
          </Link>
        </div>
      </section>
    </div>
  )
}