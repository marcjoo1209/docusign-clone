'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  FileText, CheckCircle, Clock, Send, 
  User, Mail, Phone, Calendar, Hash
} from 'lucide-react'

export default function FormResponsePage() {
  const params = useParams()
  const formId = params.id
  
  const [document, setDocument] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // 문서 데이터 로드
    const loadDocument = () => {
      try {
        const userDocuments = JSON.parse(localStorage.getItem('userDocuments') || '[]')
        const foundDoc = userDocuments.find((doc: any) => 
          doc.shareUrl === `/forms/${formId}` || doc.id.toString() === formId
        )
        
        if (foundDoc) {
          setDocument({
            ...foundDoc,
            description: foundDoc.description || `${foundDoc.title} 문서를 작성해주세요.`,
            company: '동의서 플랫폼'
          })
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error('Error loading document:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadDocument()
  }, [formId])

  const handleInputChange = (fieldId: number, value: any) => {
    setFormData({
      ...formData,
      [fieldId]: value
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const isFormValid = () => {
    if (!document || !document.fields) return false
    return document.fields.every((field: any) => {
      if (field.required) {
        return formData[field.id] && formData[field.id] !== ''
      }
      return true
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>문서를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (notFound || !document) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FileText className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">문서를 찾을 수 없습니다</h1>
            <p className="text-gray-600 mb-6">
              요청하신 문서가 존재하지 않거나 만료되었습니다.
            </p>
            <p className="text-sm text-gray-400">문서 ID: {formId}</p>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">제출 완료!</h1>
            <p className="text-gray-600 mb-6">
              문서가 성공적으로 제출되었습니다.
              검토 후 연락드리겠습니다.
            </p>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">제출 번호</p>
              <p className="text-lg font-semibold text-gray-900">#{formId}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{document.company}</h1>
                <p className="text-sm text-gray-500">{document.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>약 5분 소요</span>
            </div>
          </div>
        </div>
      </header>

      {/* 진행 바 */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">진행률</span>
            <span className="text-sm font-medium text-blue-600">
              {document.fields ? Math.round((Object.keys(formData).length / document.fields.length) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${document.fields ? (Object.keys(formData).length / document.fields.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* 문서 설명 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{document.title}</h2>
            <p className="text-gray-600">{document.description}</p>
          </div>

          {/* 입력 필드들 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <form className="space-y-6">
              {document.fields && document.fields.map((field: any) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      className="input-field"
                      placeholder={field.placeholder}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                    />
                  )}
                  
                  {field.type === 'email' && (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        className="input-field pl-10"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    </div>
                  )}
                  
                  {field.type === 'phone' && (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        className="input-field pl-10"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    </div>
                  )}
                  
                  {field.type === 'date' && (
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="date"
                        className="input-field pl-10"
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    </div>
                  )}
                  
                  {field.type === 'signature' && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="text-gray-400 mb-4">
                        <User className="h-12 w-12 mx-auto" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleInputChange(field.id, '서명완료')}
                        className="btn-secondary"
                      >
                        {formData[field.id] ? '서명 완료' : '서명하기'}
                      </button>
                      {formData[field.id] && (
                        <p className="mt-3 text-sm text-green-600">✓ 서명이 저장되었습니다</p>
                      )}
                    </div>
                  )}
                  
                  {field.type === 'checkbox' && (
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={formData[field.id] || false}
                        onChange={(e) => handleInputChange(field.id, e.target.checked)}
                      />
                      <span className="text-gray-700">{field.placeholder || field.label}</span>
                    </label>
                  )}
                  
                  {field.type === 'radio' && (
                    <div className="space-y-3">
                      {(field.options || ['옵션 1', '옵션 2']).map((option: string, index: number) => (
                        <label key={index} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`field-${field.id}`}
                            className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            value={option}
                            checked={formData[field.id] === option}
                            onChange={() => handleInputChange(field.id, option)}
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'number' && (
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        className="input-field pl-10"
                        placeholder={field.placeholder || '숫자를 입력하세요'}
                        value={formData[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </form>

            {/* 제출 버튼 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isFormValid() 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner h-5 w-5"></div>
                    <span>제출 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>제출하기</span>
                  </>
                )}
              </button>
              {!isFormValid() && (
                <p className="mt-3 text-center text-sm text-gray-500">
                  모든 필수 항목을 입력해주세요
                </p>
              )}
            </div>
          </div>

          {/* 보안 안내 */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🔒 모든 데이터는 SSL 암호화로 안전하게 보호됩니다
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}