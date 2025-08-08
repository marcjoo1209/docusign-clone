'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../components/AuthProvider'
import Link from 'next/link'
import { 
  FileText, User, Mail, Lock, Eye, EyeOff, 
  ArrowRight, CheckCircle, AlertCircle, Check, X
} from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  const passwordRequirements = [
    { label: '최소 8자 이상', met: formData.password.length >= 8 },
    { label: '대문자 포함', met: /[A-Z]/.test(formData.password) },
    { label: '소문자 포함', met: /[a-z]/.test(formData.password) },
    { label: '숫자 포함', met: /\d/.test(formData.password) },
    { label: '특수문자 포함', met: /[!@#$%^&*]/.test(formData.password) }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (!agreedToTerms) {
      setError('이용약관에 동의해주세요.')
      return
    }

    setLoading(true)
    setError('')

    const result = await signUp(formData.email, formData.password, formData.fullName)
    console.log('SignUp result:', result)
    
    if (result?.error) {
      setError(result.error.message || '회원가입 중 오류가 발생했습니다.')
      setLoading(false)
    } else {
      // 회원가입 성공 - window.location으로 확실하게 리다이렉트
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg mb-4">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">문서서명 플랫폼</h1>
          <p className="text-gray-600 mt-2">무료로 시작하세요</p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="홍길동"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

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
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {formData.password && (
                <div className="mt-3 space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      {req.met ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                      )}
                      <span className={req.met ? 'text-green-600' : 'text-gray-500'}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">비밀번호가 일치하지 않습니다</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowTermsModal(true)
                  }}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  이용약관
                </button>{' '}
                및{' '}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPrivacyModal(true)
                  }}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  개인정보처리방침
                </button>
                에 동의합니다
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="spinner h-5 w-5"></div>
                  <span>계정 생성 중...</span>
                </>
              ) : (
                <>
                  <span>무료로 시작하기</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">이미 계정이 있으신가요?</span>
            {' '}
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-medium">
              로그인
            </Link>
          </div>
        </div>

        {/* 혜택 안내 */}
        <div className="mt-8">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">무료 체험 혜택</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-500" />
                <span>14일간 모든 기능 무제한 이용</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-500" />
                <span>신용카드 등록 불필요</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Check className="h-4 w-4 text-green-500" />
                <span>언제든지 취소 가능</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 이용약관 모달 */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl max-h-[80vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">이용약관</h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">제1조 (목적)</h3>
                <p className="mb-4 text-gray-600">
                  이 약관은 문서서명 플랫폼(이하 "회사")이 제공하는 전자문서 서명 서비스(이하 "서비스")의 이용과 관련하여 
                  회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">제2조 (정의)</h3>
                <p className="mb-4 text-gray-600">
                  1. "서비스"란 회사가 제공하는 전자문서 업로드, 서명 필드 추가, 문서 공유, 전자서명 수집 등 
                  문서 관련 모든 서비스를 의미합니다.<br/>
                  2. "이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.<br/>
                  3. "전자서명"이란 전자문서를 작성한 자의 신원과 전자문서의 변경 여부를 확인할 수 있도록 
                  비대칭 암호화 방식을 이용하여 전자서명 생성키로 생성한 정보를 말합니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">제3조 (약관의 효력 및 변경)</h3>
                <p className="mb-4 text-gray-600">
                  1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.<br/>
                  2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있습니다.<br/>
                  3. 변경된 약관은 공지된 시점부터 효력이 발생하며, 이용자는 변경된 약관에 동의하지 않을 경우 
                  서비스 이용을 중단하고 탈퇴할 수 있습니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">제4조 (서비스의 제공)</h3>
                <p className="mb-4 text-gray-600">
                  1. 회사는 다음과 같은 서비스를 제공합니다:<br/>
                  - 전자문서 업로드 및 관리<br/>
                  - 서명 필드 및 입력 필드 추가<br/>
                  - 문서 공유 및 전송<br/>
                  - 전자서명 수집 및 검증<br/>
                  - 문서 상태 추적 및 알림<br/>
                  - 데이터 분석 및 리포트<br/>
                  2. 서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">제5조 (이용자의 의무)</h3>
                <p className="mb-4 text-gray-600">
                  1. 이용자는 다음 행위를 하여서는 안 됩니다:<br/>
                  - 타인의 정보 도용<br/>
                  - 회사가 게시한 정보의 무단 변경<br/>
                  - 회사의 저작권 등 지적재산권 침해<br/>
                  - 회사나 제3자의 명예 손상 또는 업무 방해<br/>
                  - 법령 또는 이 약관이 금지하는 행위<br/>
                  2. 이용자는 자신의 계정 정보를 안전하게 관리할 책임이 있습니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">제6조 (개인정보보호)</h3>
                <p className="mb-4 text-gray-600">
                  회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 공개합니다. 
                  개인정보의 수집 및 이용에 대한 자세한 사항은 개인정보처리방침을 참조하시기 바랍니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">제7조 (면책조항)</h3>
                <p className="mb-4 text-gray-600">
                  1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 
                  서비스 제공에 관한 책임이 면제됩니다.<br/>
                  2. 회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
                </p>

                <p className="mt-8 text-sm text-gray-500">
                  시행일: 2024년 1월 1일
                </p>
              </div>
            </div>
            <div className="p-6 border-t">
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full btn-primary"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 개인정보처리방침 모달 */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl max-h-[80vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">개인정보처리방침</h2>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-4">1. 개인정보의 수집 및 이용 목적</h3>
                <p className="mb-4 text-gray-600">
                  문서서명 플랫폼(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 
                  처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 
                  이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>회원 가입 및 관리</li>
                  <li>서비스 제공 및 계약 이행</li>
                  <li>고객 문의 응대 및 민원 처리</li>
                  <li>서비스 개선 및 신규 서비스 개발</li>
                  <li>마케팅 및 광고 활용 (동의한 경우에 한함)</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">2. 수집하는 개인정보 항목</h3>
                <p className="mb-4 text-gray-600">
                  회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li><strong>필수항목:</strong> 이름, 이메일 주소, 비밀번호</li>
                  <li><strong>선택항목:</strong> 회사명, 전화번호, 직책</li>
                  <li><strong>자동수집항목:</strong> IP 주소, 쿠키, 서비스 이용 기록, 접속 로그</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">3. 개인정보의 보유 및 이용 기간</h3>
                <p className="mb-4 text-gray-600">
                  회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 개인정보를 수집 시에 
                  동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>회원 정보: 회원 탈퇴 시까지</li>
                  <li>전자상거래 기록: 5년 (전자상거래법)</li>
                  <li>로그인 기록: 3개월 (통신비밀보호법)</li>
                  <li>고객 문의 기록: 3년 (소비자보호법)</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">4. 개인정보의 제3자 제공</h3>
                <p className="mb-4 text-gray-600">
                  회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 
                  다만, 다음의 경우에는 예외로 합니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 
                      수사기관의 요구가 있는 경우</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">5. 개인정보의 파기</h3>
                <p className="mb-4 text-gray-600">
                  회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 
                  지체없이 해당 개인정보를 파기합니다. 파기 절차 및 방법은 다음과 같습니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li><strong>파기절차:</strong> 이용자의 개인정보는 목적 달성 후 별도의 DB에 옮겨져 
                      내부 방침 및 관련 법령에 따라 일정기간 저장된 후 파기됩니다.</li>
                  <li><strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할 수 없는 
                      기술적 방법을 사용하여 삭제합니다.</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">6. 개인정보 보호책임자</h3>
                <p className="mb-4 text-gray-600">
                  회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 
                  이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:
                </p>
                <ul className="list-none pl-6 mb-4 text-gray-600">
                  <li>성명: 홍길동</li>
                  <li>직책: 개인정보보호 책임자</li>
                  <li>이메일: privacy@example.com</li>
                  <li>전화번호: 02-1234-5678</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">7. 쿠키의 사용</h3>
                <p className="mb-4 text-gray-600">
                  회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키를 사용합니다. 
                  이용자는 웹브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 
                  이 경우 서비스 이용에 제한이 있을 수 있습니다.
                </p>

                <h3 className="text-lg font-semibold mb-4">8. 개인정보의 안전성 확보 조치</h3>
                <p className="mb-4 text-gray-600">
                  회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-600">
                  <li>개인정보의 암호화</li>
                  <li>해킹 등에 대비한 기술적 대책</li>
                  <li>개인정보 취급 직원의 최소화 및 교육</li>
                  <li>내부관리계획 수립 및 시행</li>
                </ul>

                <p className="mt-8 text-sm text-gray-500">
                  공고일: 2024년 1월 1일<br/>
                  시행일: 2024년 1월 1일
                </p>
              </div>
            </div>
            <div className="p-6 border-t">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full btn-primary"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}