'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  FileText, ArrowLeft, Mail, Phone, MapPin, 
  Send, CheckCircle, MessageSquare 
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 여기서 실제로는 API 호출
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
  }

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
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              문의하기
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              궁금한 점이 있으신가요? 언제든지 문의해주세요.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 문의 폼 */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      회사명
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      문의 유형 *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    >
                      <option value="">선택해주세요</option>
                      <option value="sales">구매 문의</option>
                      <option value="support">기술 지원</option>
                      <option value="partnership">파트너십</option>
                      <option value="other">기타</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      메시지 *
                    </label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Send className="h-5 w-5" />
                    <span>메시지 보내기</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    문의가 접수되었습니다!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    빠른 시일 내에 답변 드리겠습니다.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        subject: '',
                        message: ''
                      })
                    }}
                    className="btn-secondary"
                  >
                    새 문의하기
                  </button>
                </div>
              )}
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  연락처 정보
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">이메일</p>
                      <p className="text-gray-600">support@docsign.com</p>
                      <p className="text-gray-600">sales@docsign.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">전화</p>
                      <p className="text-gray-600">02-1234-5678</p>
                      <p className="text-sm text-gray-500">평일 09:00 - 18:00</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">주소</p>
                      <p className="text-gray-600">
                        서울특별시 강남구 테헤란로 123<br />
                        문서빌딩 10층
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MessageSquare className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900">실시간 채팅</p>
                      <p className="text-gray-600">평일 09:00 - 18:00</p>
                      <button className="text-blue-600 hover:text-blue-700 font-medium mt-2">
                        채팅 시작하기 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  빠른 답변을 원하시나요?
                </h3>
                <p className="text-gray-600 mb-4">
                  자주 묻는 질문에서 답변을 찾아보세요.
                </p>
                <Link href="/help" className="btn-secondary inline-block">
                  도움말 센터 방문
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}