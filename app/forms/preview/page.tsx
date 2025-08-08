'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, X, CheckCircle, AlertCircle } from 'lucide-react'

export default function PreviewPage() {
  const router = useRouter()
  const [document, setDocument] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const previewDoc = localStorage.getItem('previewDocument')
    if (previewDoc) {
      setDocument(JSON.parse(previewDoc))
    } else {
      alert('미리보기할 문서가 없습니다.')
      window.close()
    }
  }, [])

  const handleInputChange = (fieldId: number, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }))
    // 에러 제거
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    document.fields.forEach((field: any) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label}은(는) 필수 입력 항목입니다.`
      }
      
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = '올바른 이메일 형식을 입력해주세요.'
        }
      }
      
      if (field.type === 'phone' && formData[field.id]) {
        const phoneRegex = /^[0-9-+\s()]+$/
        if (!phoneRegex.test(formData[field.id])) {
          newErrors[field.id] = '올바른 전화번호 형식을 입력해주세요.'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert('미리보기 모드입니다. 실제 제출은 되지 않습니다.')
    }
  }

  const renderField = (field: any) => {
    const hasError = errors[field.id]
    const baseClasses = `w-full p-3 border rounded-lg transition-all ${
      hasError 
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
    }`

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            className={baseClasses}
            placeholder={field.placeholder || `${field.label}을(를) 입력하세요`}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            maxLength={field.maxLength}
          />
        )
      
      case 'email':
        return (
          <input
            type="email"
            className={baseClasses}
            placeholder={field.placeholder || '이메일을 입력하세요'}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )
      
      case 'phone':
        return (
          <input
            type="tel"
            className={baseClasses}
            placeholder={field.placeholder || '전화번호를 입력하세요'}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            className={baseClasses}
            placeholder={field.placeholder || '숫자를 입력하세요'}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )
      
      case 'date':
        return (
          <input
            type="date"
            className={baseClasses}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )
      
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData[field.id] || false}
              onChange={(e) => handleInputChange(field.id, e.target.checked)}
            />
            <span className="text-sm">{field.placeholder || '동의합니다'}</span>
          </label>
        )
      
      case 'radio':
        const options = field.options || ['옵션 1', '옵션 2', '옵션 3']
        return (
          <div className="space-y-2">
            {options.map((option: string, index: number) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`field-${field.id}`}
                  className="border-gray-300 text-blue-600 focus:ring-blue-500"
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={() => handleInputChange(field.id, option)}
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        )
      
      case 'signature':
        return (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
            <div className="text-gray-500">
              <div className="text-2xl mb-2">✍️</div>
              <p className="text-sm">서명 영역</p>
              <p className="text-xs text-gray-400 mt-1">실제 환경에서는 서명 패드가 표시됩니다</p>
            </div>
          </div>
        )
      
      default:
        return (
          <input
            type="text"
            className={baseClasses}
            placeholder={field.placeholder || `${field.label}을(를) 입력하세요`}
            value={formData[field.id] || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        )
    }
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>문서를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{document.title}</h1>
                <p className="text-sm text-blue-600">📋 미리보기 모드</p>
              </div>
            </div>
            <button
              onClick={() => window.close()}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 안내 메시지 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">미리보기 모드</p>
                <p className="text-sm text-blue-700 mt-1">
                  실제 양식이 어떻게 표시되는지 확인할 수 있습니다. 제출은 되지 않습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 문서 이미지와 필드 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="relative">
              <img 
                src={document.documentImage} 
                alt="Document" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* 입력 필드 섹션 */}
          {document.fields && document.fields.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">입력 정보</h2>
              
              <div className="space-y-6">
                {document.fields.map((field: any) => (
                  <div key={field.id} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                    {errors[field.id] && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span>{errors[field.id]}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* 제출 버튼 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => window.close()}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    닫기
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>제출 (미리보기)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}