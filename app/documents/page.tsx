'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { 
  FileText, Plus, Search, Filter, MoreVertical,
  Clock, CheckCircle, XCircle, Eye, Edit2, Trash2,
  Download, Share2, Calendar, Users, TrendingUp,
  FolderOpen, FileSignature, Send, Archive
} from 'lucide-react'

export default function DocumentsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [documents, setDocuments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('created')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // 임시 데이터
  const createdDocuments = [
    {
      id: 1,
      title: '근로계약서_2024',
      type: 'created',
      status: 'active',
      createdAt: '2024-01-15',
      lastModified: '2024-01-16',
      responses: 12,
      pendingSignatures: 3,
      completedSignatures: 9,
      views: 45,
      shareUrl: 'https://docusign-clone.vercel.app/forms/1'
    },
    {
      id: 2,
      title: '임대차계약서_강남오피스',
      type: 'created',
      status: 'active',
      createdAt: '2024-01-14',
      lastModified: '2024-01-14',
      responses: 2,
      pendingSignatures: 1,
      completedSignatures: 1,
      views: 8,
      shareUrl: 'https://docusign-clone.vercel.app/forms/2'
    },
    {
      id: 3,
      title: 'NDA_프로젝트X',
      type: 'created',
      status: 'completed',
      createdAt: '2024-01-10',
      lastModified: '2024-01-12',
      responses: 5,
      pendingSignatures: 0,
      completedSignatures: 5,
      views: 23,
      shareUrl: 'https://docusign-clone.vercel.app/forms/3'
    }
  ]

  const receivedDocuments = [
    {
      id: 4,
      title: '구매계약서_A사',
      type: 'received',
      status: 'pending',
      sender: 'kim@company.com',
      receivedAt: '2024-01-16',
      dueDate: '2024-01-20',
      signed: false
    },
    {
      id: 5,
      title: '업무협약서_B사',
      type: 'received',
      status: 'completed',
      sender: 'lee@business.com',
      receivedAt: '2024-01-13',
      signedAt: '2024-01-14',
      signed: true
    },
    {
      id: 6,
      title: '용역계약서_프리랜서',
      type: 'received',
      status: 'pending',
      sender: 'park@freelance.com',
      receivedAt: '2024-01-15',
      dueDate: '2024-01-18',
      signed: false
    }
  ]

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="badge badge-green">활성</span>
      case 'completed':
        return <span className="badge badge-blue">완료</span>
      case 'pending':
        return <span className="badge badge-yellow">대기중</span>
      case 'expired':
        return <span className="badge badge-red">만료</span>
      default:
        return <span className="badge badge-gray">초안</span>
    }
  }

  const getDocuments = () => {
    if (activeTab === 'created') {
      return createdDocuments.filter(doc => 
        filterStatus === 'all' || doc.status === filterStatus
      ).filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else {
      return receivedDocuments.filter(doc =>
        filterStatus === 'all' || doc.status === filterStatus
      ).filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">내 문서</h2>
          <p className="text-gray-600">생성한 문서와 서명 요청받은 문서를 관리하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {createdDocuments.length + receivedDocuments.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">전체 문서</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileSignature className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {createdDocuments.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">생성한 문서</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {receivedDocuments.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">받은 문서</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {receivedDocuments.filter(d => !d.signed).length}
            </div>
            <div className="text-sm text-gray-600 mt-1">서명 대기중</div>
          </div>
        </div>

        {/* 문서 리스트 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* 탭 네비게이션 */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('created')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'created'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileSignature className="h-4 w-4" />
                  <span>생성한 문서</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                    {createdDocuments.length}
                  </span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'received'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>받은 문서</span>
                  <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
                    {receivedDocuments.length}
                  </span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* 검색 및 필터 */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="문서 검색..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">모든 상태</option>
                  <option value="active">활성</option>
                  <option value="completed">완료</option>
                  <option value="pending">대기중</option>
                </select>
              </div>
              <Link href="/documents/new" className="btn-primary flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>새 문서</span>
              </Link>
            </div>

            {/* 문서 목록 */}
            {activeTab === 'created' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        문서명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        생성일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        서명 현황
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        조회수
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getDocuments().map((doc: any) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                              <div className="text-xs text-gray-500">수정: {doc.lastModified}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(doc.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.createdAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-900">{doc.completedSignatures}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-gray-900">{doc.pendingSignatures}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span>{doc.views}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link href={`/documents/${doc.id}/view`} className="text-gray-600 hover:text-blue-600">
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link href={`/documents/${doc.id}/edit`} className="text-gray-600 hover:text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </Link>
                            <button className="text-gray-600 hover:text-green-600">
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-blue-600">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-red-600">
                              <Archive className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        문서명
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        발신자
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        상태
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        수신일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        마감일
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getDocuments().map((doc: any) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                              {doc.signed && (
                                <div className="text-xs text-green-600 flex items-center mt-1">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  서명 완료: {doc.signedAt}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {doc.sender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(doc.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.receivedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.dueDate || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {!doc.signed ? (
                              <Link href={`/forms/${doc.id}`} className="btn-primary text-xs px-3 py-1">
                                서명하기
                              </Link>
                            ) : (
                              <>
                                <button className="text-gray-600 hover:text-blue-600">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-gray-600 hover:text-blue-600">
                                  <Download className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 빈 상태 */}
            {getDocuments().length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">문서가 없습니다</h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'created' 
                    ? '새 문서를 만들어 서명을 요청해보세요'
                    : '받은 서명 요청이 없습니다'}
                </p>
                {activeTab === 'created' && (
                  <Link href="/documents/new" className="btn-primary inline-flex items-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>새 문서 만들기</span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}