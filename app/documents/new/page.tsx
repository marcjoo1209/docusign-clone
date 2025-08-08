'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../components/AuthProvider'
import Link from 'next/link'
import { 
  FileText, Upload, Type, PenTool, CheckSquare, Calendar,
  Radio, Hash, Mail, Phone, Link2, Image, Save, Share2,
  ArrowLeft, Settings, Trash2, Move, Copy, Eye
} from 'lucide-react'

export default function NewDocumentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [documentTitle, setDocumentTitle] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [documentImage, setDocumentImage] = useState<string | null>(null)
  const [fields, setFields] = useState<any[]>([])
  const [selectedField, setSelectedField] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [activeFieldType, setActiveFieldType] = useState<string | null>(null)

  // 필드 타입 정의
  const fieldTypes = [
    { id: 'text', label: '텍스트', icon: Type, color: 'blue' },
    { id: 'signature', label: '서명', icon: PenTool, color: 'purple' },
    { id: 'checkbox', label: '체크박스', icon: CheckSquare, color: 'green' },
    { id: 'date', label: '날짜', icon: Calendar, color: 'orange' },
    { id: 'radio', label: '라디오', icon: Radio, color: 'pink' },
    { id: 'number', label: '숫자', icon: Hash, color: 'indigo' },
    { id: 'email', label: '이메일', icon: Mail, color: 'red' },
    { id: 'phone', label: '전화번호', icon: Phone, color: 'yellow' }
  ]

  const handleFileUpload = (file: File) => {
    if (file) {
      setUploadedFile(file)
      // 파일을 이미지로 변환 (실제로는 서버에서 처리)
      const reader = new FileReader()
      reader.onload = (e) => {
        setDocumentImage(e.target?.result as string)
      }
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file)
      } else {
        // PDF나 다른 문서의 경우 임시 이미지 사용
        setDocumentImage('/api/placeholder/800/1000')
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const addField = (type: string, x: number, y: number) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${fieldTypes.find(f => f.id === type)?.label} ${fields.length + 1}`,
      x,
      y,
      width: 200,
      height: 40,
      required: false,
      placeholder: ''
    }
    setFields([...fields, newField])
    setSelectedField(newField.id)
  }

  const handleDocumentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeFieldType && documentImage) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      addField(activeFieldType, x, y)
      setActiveFieldType(null)
    }
  }

  const deleteField = (fieldId: number) => {
    setFields(fields.filter(f => f.id !== fieldId))
    setSelectedField(null)
  }

  const updateField = (fieldId: number, updates: any) => {
    setFields(fields.map(f => f.id === fieldId ? { ...f, ...updates } : f))
  }

  // 문서 저장
  const handleSave = () => {
    if (!documentTitle.trim()) {
      alert('문서 제목을 입력해주세요.')
      return
    }
    
    if (!documentImage) {
      alert('문서를 업로드해주세요.')
      return
    }

    const newDocument = {
      id: Date.now(),
      title: documentTitle,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      responses: 0,
      shareUrl: `/forms/${Date.now()}`,
      fields: fields,
      documentImage: documentImage,
      uploadedFile: uploadedFile?.name || ''
    }

    // 기존 문서 목록에 추가
    const existingDocs = JSON.parse(localStorage.getItem('userDocuments') || '[]')
    const updatedDocs = [...existingDocs, newDocument]
    localStorage.setItem('userDocuments', JSON.stringify(updatedDocs))
    
    alert('문서가 저장되었습니다!')
    router.push('/dashboard')
  }

  // 미리보기
  const handlePreview = () => {
    if (!documentImage) {
      alert('문서를 업로드해주세요.')
      return
    }
    
    // 임시 저장 후 미리보기
    const previewDoc = {
      id: 'preview',
      title: documentTitle || '제목 없음',
      fields: fields,
      documentImage: documentImage
    }
    localStorage.setItem('previewDocument', JSON.stringify(previewDoc))
    window.open('/forms/preview', '_blank')
  }

  // 공유
  const handleShare = () => {
    if (!documentTitle.trim()) {
      alert('문서 제목을 입력해주세요.')
      return
    }
    
    if (!documentImage) {
      alert('문서를 업로드해주세요.')
      return
    }

    if (fields.length === 0) {
      alert('최소 하나의 입력 필드를 추가해주세요.')
      return
    }

    // 문서 저장 후 공유 URL 생성
    const newDocument = {
      id: Date.now(),
      title: documentTitle,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      responses: 0,
      shareUrl: `/forms/${Date.now()}`,
      fields: fields,
      documentImage: documentImage,
      uploadedFile: uploadedFile?.name || ''
    }

    const existingDocs = JSON.parse(localStorage.getItem('userDocuments') || '[]')
    const updatedDocs = [...existingDocs, newDocument]
    localStorage.setItem('userDocuments', JSON.stringify(updatedDocs))
    
    const shareUrl = `${window.location.origin}${newDocument.shareUrl}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('공유 URL이 클립보드에 복사되었습니다!\n\n' + shareUrl)
    }).catch(() => {
      alert('공유 URL: ' + shareUrl)
    })
    
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <input
                type="text"
                placeholder="문서 제목 입력..."
                className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePreview}
                className="btn-secondary flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>미리보기</span>
              </button>
              <button 
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>저장</span>
              </button>
              <button 
                onClick={handleShare}
                className="btn-success flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* 왼쪽 사이드바 - 필드 도구 */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              입력 필드
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {fieldTypes.map((field) => {
                const Icon = field.icon
                return (
                  <button
                    key={field.id}
                    onClick={() => setActiveFieldType(field.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      activeFieldType === field.id
                        ? `border-${field.color}-500 bg-${field.color}-50`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`h-6 w-6 mx-auto mb-1 text-${field.color}-600`} />
                    <span className="text-xs text-gray-700">{field.label}</span>
                  </button>
                )
              })}
            </div>

            {activeFieldType && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  문서를 클릭하여 필드를 추가하세요
                </p>
              </div>
            )}

            {/* 필드 목록 */}
            {fields.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
                  추가된 필드 ({fields.length})
                </h3>
                <div className="space-y-2">
                  {fields.map((field) => {
                    const fieldType = fieldTypes.find(f => f.id === field.type)
                    const Icon = fieldType?.icon || Type
                    return (
                      <div
                        key={field.id}
                        onClick={() => setSelectedField(field.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedField === field.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">{field.label}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteField(field.id)
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 중앙 - 문서 영역 */}
        <div className="flex-1 overflow-auto p-8">
          {!documentImage ? (
            <div
              className={`max-w-4xl mx-auto h-full ${
                isDragging ? 'dropzone active' : 'dropzone'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="dropzone-content">
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  문서를 드래그하여 업로드하세요
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  또는 클릭하여 파일 선택
                </p>
                <p className="text-xs text-gray-400">
                  지원 형식: PDF, Word, Excel, PowerPoint, HWP, 이미지
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div 
                className="relative bg-white rounded-lg shadow-lg overflow-hidden"
                style={{ cursor: activeFieldType ? 'crosshair' : 'default' }}
                onClick={handleDocumentClick}
              >
                <img 
                  src={documentImage} 
                  alt="Document" 
                  className="w-full h-auto"
                />
                
                {/* 필드 오버레이 */}
                {fields.map((field) => {
                  const fieldType = fieldTypes.find(f => f.id === field.type)
                  const Icon = fieldType?.icon || Type
                  return (
                    <div
                      key={field.id}
                      className={`absolute border-2 rounded cursor-move ${
                        selectedField === field.id
                          ? 'border-blue-500 bg-blue-100 bg-opacity-30'
                          : 'border-gray-400 bg-gray-100 bg-opacity-20 hover:bg-opacity-30'
                      }`}
                      style={{
                        left: `${field.x}%`,
                        top: `${field.y}%`,
                        transform: 'translate(-50%, -50%)',
                        minWidth: '150px',
                        padding: '8px 12px'
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedField(field.id)
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">{field.label}</span>
                        {field.required && <span className="text-red-500">*</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* 오른쪽 사이드바 - 속성 패널 */}
        {selectedField && (
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
                필드 속성
              </h3>
              {(() => {
                const field = fields.find(f => f.id === selectedField)
                if (!field) return null
                
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="label">필드 이름</label>
                      <input
                        type="text"
                        className="input-field"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <label className="label">플레이스홀더</label>
                      <input
                        type="text"
                        className="input-field"
                        value={field.placeholder}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        placeholder="입력 안내 메시지"
                      />
                    </div>
                    
                    <div>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={field.required}
                          onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        />
                        <span className="text-sm font-medium text-gray-700">필수 입력</span>
                      </label>
                    </div>

                    {field.type === 'text' && (
                      <div>
                        <label className="label">최대 글자수</label>
                        <input
                          type="number"
                          className="input-field"
                          placeholder="제한 없음"
                          onChange={(e) => updateField(field.id, { maxLength: e.target.value })}
                        />
                      </div>
                    )}

                    {field.type === 'radio' && (
                      <div>
                        <label className="label">옵션 (줄바꿈으로 구분)</label>
                        <textarea
                          className="input-field"
                          rows={3}
                          placeholder="옵션 1&#10;옵션 2&#10;옵션 3"
                          onChange={(e) => updateField(field.id, { options: e.target.value.split('\n') })}
                        />
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => deleteField(field.id)}
                        className="w-full py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        필드 삭제
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}