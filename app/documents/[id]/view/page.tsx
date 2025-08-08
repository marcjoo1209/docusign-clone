'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '../../../../components/AuthProvider'
import Link from 'next/link'
import { 
  FileText, Download, Share2, Edit2, Trash2, 
  ArrowLeft, Eye, Users, Clock, CheckCircle,
  Copy, Mail, MessageCircle, Link2, QrCode
} from 'lucide-react'

export default function DocumentViewPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const documentId = params.id
  
  const [document, setDocument] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeTab, setActiveTab] = useState('responses')
  const [showShareModal, setShowShareModal] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin')
      return
    }

    // 문서 데이터 로드
    const loadDocument = () => {
      try {
        const userDocuments = JSON.parse(localStorage.getItem('userDocuments') || '[]')
        const foundDoc = userDocuments.find((doc: any) => doc.id.toString() === documentId)
        
        if (foundDoc) {
          const mockResponses = Array.from({ length: foundDoc.responses || 0 }, (_, i) => ({
            id: i + 1,
            respondent: `사용자 ${i + 1}`,
            email: `user${i + 1}@example.com`,
            submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            status: 'completed',
            data: foundDoc.fields?.reduce((acc: any, field: any) => {
              acc[field.label] = `샘플 데이터 ${i + 1}`
              return acc
            }, {}) || {}
          }))
          
          setDocument({
            ...foundDoc,
            shareUrl: `${window.location.origin}${foundDoc.shareUrl}`,
            totalViews: foundDoc.views || Math.floor(Math.random() * 100) + 10,
            uniqueViews: Math.floor((foundDoc.views || 10) * 0.7),
            completionRate: foundDoc.responses > 0 ? Math.round((foundDoc.responses / (foundDoc.views || 10)) * 100) : 0,
            avgCompletionTime: '5분 30초',
            responseData: mockResponses
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
  }, [documentId, user, router])

  const copyToClipboard = () => {
    if (!document) return
    navigator.clipboard.writeText(document.shareUrl)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
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
              요청하신 문서가 존재하지 않거나 접근 권한이 없습니다.
            </p>
            <Link href="/dashboard" className="btn-primary">
              대시보드로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`)
    // 실제 내보내기 로직
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{document.title}</h1>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>생성: {document.createdAt}</span>
                  <span>•</span>
                  <span>수정: {document.updatedAt}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/documents/edit/${documentId}`} className="btn-secondary flex items-center space-x-2">
                <Edit2 className="h-4 w-4" />
                <span>편집</span>
              </Link>
              <button 
                onClick={() => setShowShareModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>공유</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Eye className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{document.totalViews}</span>
            </div>
            <div className="text-sm text-gray-600">총 조회수</div>
            <div className="text-xs text-gray-500 mt-1">{document.uniqueViews}명 방문</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{document.responses}</span>
            </div>
            <div className="text-sm text-gray-600">응답 수</div>
            <div className="text-xs text-gray-500 mt-1">완료율 {document.completionRate}%</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{document.avgCompletionTime}</span>
            </div>
            <div className="text-sm text-gray-600">평균 작성 시간</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-purple-500" />
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                document.status === 'pending' || document.status === 'completed'
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {document.status === 'pending' ? '활성' : document.status === 'completed' ? '완료' : '초안'}
              </span>
            </div>
            <div className="text-sm text-gray-600">상태</div>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('responses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'responses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                응답 데이터
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                분석
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                설정
              </button>
            </nav>
          </div>

          {/* 탭 컨텐츠 */}
          <div className="p-6">
            {activeTab === 'responses' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    응답 목록 ({document.responseData.length})
                  </h3>
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleExport('excel')}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>Excel 내보내기</span>
                    </button>
                    <button 
                      onClick={() => handleExport('pdf')}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Download className="h-4 w-4" />
                      <span>PDF 내보내기</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">응답자</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">제출 시간</th>
                        {document.fields && document.fields.map((field: any) => (
                          <th key={field.label || field.name} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            {field.label || field.name}
                          </th>
                        ))}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">작업</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {document.responseData.map((response: any) => (
                        <tr key={response.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {response.respondent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {response.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {response.submittedAt}
                          </td>
                          {document.fields && document.fields.map((field: any) => (
                            <td key={field.label || field.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {response.data[field.label || field.name]}
                            </td>
                          ))}
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-700">
                              상세보기
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">필드별 완료율</h4>
                    {document.fields && document.fields.map((field: any) => (
                      <div key={field.label || field.name} className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{field.label || field.name}</span>
                          <span className="text-gray-900 font-medium">100%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">시간대별 응답</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">오전 (00:00 - 11:59)</span>
                        <span className="text-gray-900 font-medium">3명</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">오후 (12:00 - 17:59)</span>
                        <span className="text-gray-900 font-medium">4명</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">저녁 (18:00 - 23:59)</span>
                        <span className="text-gray-900 font-medium">1명</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">문서 설정</h4>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">응답 받기</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">이메일 알림</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">중복 응답 허용</span>
                      <input type="checkbox" className="rounded text-blue-600" />
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-4">만료 설정</h4>
                  <input 
                    type="datetime-local" 
                    className="input-field"
                    placeholder="만료일 설정"
                  />
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    문서 삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 공유 모달 */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">문서 공유</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">공유 링크</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  readOnly 
                  value={document.shareUrl}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                />
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {copiedLink ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              {copiedLink && (
                <p className="mt-2 text-sm text-green-600">링크가 복사되었습니다!</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">공유 방법</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">이메일</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MessageCircle className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">카카오톡</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Link2 className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">링크 복사</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <QrCode className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">QR 코드</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}