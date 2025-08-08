'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../components/AuthProvider'
import Link from 'next/link'
import { 
  FileText, Users, BarChart3, Shield, 
  CheckCircle, Upload, Share2, Download,
  ArrowRight, Zap, Lock, Globe
} from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">문서서명 플랫폼</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                주요 기능
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                사용 방법
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                요금제
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 font-medium">
                로그인
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                무료로 시작하기
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>빠르고 안전한 전자문서 서명</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            문서 작업을 더 스마트하게
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
              전자서명으로 완성하세요
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Word, Excel, PDF 등 모든 문서를 업로드하고, 입력 필드를 추가한 후
            고객과 안전하게 공유하세요. 실시간으로 진행 상황을 확인하고 데이터를 수집할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2">
              <span>무료로 시작하기</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/auth/signin?demo=true" className="btn-secondary text-lg px-8 py-4">
              데모 체험하기
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>신용카드 불필요</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>14일 무료 체험</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>언제든 취소 가능</span>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">10만+</div>
              <div className="text-gray-600 mt-1">활성 사용자</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">500만+</div>
              <div className="text-gray-600 mt-1">처리된 문서</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-gray-600 mt-1">가동 시간</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">256비트</div>
              <div className="text-gray-600 mt-1">SSL 암호화</div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              비즈니스를 위한 완벽한 솔루션
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              복잡한 문서 작업을 간단하게 만드는 강력한 기능들
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <Upload className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-semibold mb-2">다양한 파일 지원</h4>
              <p className="text-gray-600">
                Word, Excel, PowerPoint, HWP, PDF, 이미지 등 모든 문서 형식을 지원합니다. 
                드래그 앤 드롭으로 간편하게 업로드하세요.
              </p>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                <FileText className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-semibold mb-2">스마트 폼 빌더</h4>
              <p className="text-gray-600">
                텍스트, 서명, 체크박스, 날짜 등 다양한 입력 필드를 드래그 앤 드롭으로 
                문서에 추가하고 커스터마이징하세요.
              </p>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                <Share2 className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-semibold mb-2">간편한 공유</h4>
              <p className="text-gray-600">
                고유 URL을 생성하여 이메일, 메신저, SMS로 전송하세요. 
                비밀번호 보호와 만료일 설정도 가능합니다.
              </p>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                <BarChart3 className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-semibold mb-2">실시간 분석</h4>
              <p className="text-gray-600">
                문서 조회수, 작성 완료율, 평균 작성 시간 등을 실시간으로 모니터링하고 
                인사이트를 얻으세요.
              </p>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
                <Lock className="h-7 w-7 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-semibold mb-2">보안 & 규정 준수</h4>
              <p className="text-gray-600">
                256비트 SSL 암호화, GDPR 준수, 감사 추적 기능으로 
                민감한 정보를 안전하게 보호합니다.
              </p>
            </div>

            <div className="card group hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                <Download className="h-7 w-7 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-semibold mb-2">데이터 내보내기</h4>
              <p className="text-gray-600">
                수집된 데이터를 Excel, CSV, PDF 형식으로 내보내고 
                다른 비즈니스 도구와 연동하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사용 방법 */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              단 3단계로 시작하세요
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              복잡한 설정 없이 바로 시작할 수 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
                  1
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3">문서 업로드</h4>
              <p className="text-gray-600">
                서명이 필요한 문서를 드래그 앤 드롭으로 업로드하고,
                필요한 입력 필드를 추가하세요.
              </p>
            </div>

            <div className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
                  2
                </div>
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-300"></div>
              </div>
              <h4 className="text-xl font-semibold mb-3">링크 공유</h4>
              <p className="text-gray-600">
                생성된 고유 URL을 이메일이나 메신저로 
                서명이 필요한 사람들에게 전송하세요.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold group-hover:scale-110 transition-transform">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">데이터 수집</h4>
              <p className="text-gray-600">
                실시간으로 서명 진행 상황을 확인하고,
                완료된 문서와 데이터를 다운로드하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            14일 무료 체험으로 모든 기능을 경험해보세요.
            신용카드 등록 없이 바로 시작할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium text-lg px-8 py-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <span>무료 체험 시작</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium text-lg px-8 py-4 rounded-lg transition-colors duration-200">
              영업팀 문의
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">문서서명 플랫폼</span>
              </div>
              <p className="text-sm">
                비즈니스 문서 작업을 더 스마트하게 만드는 전자서명 솔루션
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">제품</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition-colors">기능</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">요금제</Link></li>
                <li><Link href="#security" className="hover:text-white transition-colors">보안</Link></li>
                <li><Link href="#integrations" className="hover:text-white transition-colors">연동</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">회사</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#about" className="hover:text-white transition-colors">회사 소개</Link></li>
                <li><Link href="#blog" className="hover:text-white transition-colors">블로그</Link></li>
                <li><Link href="#careers" className="hover:text-white transition-colors">채용</Link></li>
                <li><Link href="#contact" className="hover:text-white transition-colors">문의</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-semibold mb-4">지원</h5>
              <ul className="space-y-2 text-sm">
                <li><Link href="#help" className="hover:text-white transition-colors">도움말 센터</Link></li>
                <li><Link href="#api" className="hover:text-white transition-colors">API 문서</Link></li>
                <li><Link href="#status" className="hover:text-white transition-colors">서비스 상태</Link></li>
                <li><Link href="#privacy" className="hover:text-white transition-colors">개인정보처리방침</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © 2024 문서서명 플랫폼. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#terms" className="text-sm hover:text-white transition-colors">이용약관</Link>
              <Link href="#privacy" className="text-sm hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="#cookies" className="text-sm hover:text-white transition-colors">쿠키 정책</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}