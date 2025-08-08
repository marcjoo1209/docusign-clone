'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'
import Link from 'next/link'
import { 
  FileText, Plus, Search, Filter, MoreVertical,
  Clock, CheckCircle, XCircle, Eye, Edit2, Trash2,
  Download, Share2, BarChart3, TrendingUp, Users
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [documents, setDocuments] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5) // 페이지당 아이템 수
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    expired: 0,
    completionRate: 0,
    avgTime: '0시간'
  })

  // 문서 데이터 로드
  const loadDocuments = () => {
    const savedDocuments = localStorage.getItem('userDocuments')
    if (savedDocuments) {
      const docs = JSON.parse(savedDocuments)
      setDocuments(docs)
      
      // 통계 계산
      const total = docs.length
      const completed = docs.filter((doc: any) => doc.status === 'completed').length
      const pending = docs.filter((doc: any) => doc.status === 'pending').length
      const expired = docs.filter((doc: any) => doc.status === 'expired').length
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
      
      setStats({
        total,
        completed,
        pending,
        expired,
        completionRate,
        avgTime: '2.3시간'
      })
    } else {
      // 샘플 문서 데이터 생성
      const sampleDocs = [
        {
          id: 1,
          title: '근로계약서_김철수',
          status: 'completed',
          createdAt: '2024-01-15',
          completedAt: '2024-01-15',
          responses: 1,
          shareUrl: '/forms/1'
        },
        {
          id: 2,
          title: '개인정보처리방침 동의서',
          status: 'pending',
          createdAt: '2024-01-14',
          responses: 0,
          shareUrl: '/forms/2'
        },
        {
          id: 3,
          title: '서비스 이용약관 동의',
          status: 'completed',
          createdAt: '2024-01-13',
          completedAt: '2024-01-14',
          responses: 3,
          shareUrl: '/forms/3'
        }
      ]
      localStorage.setItem('userDocuments', JSON.stringify(sampleDocs))
      setDocuments(sampleDocs)
      setStats({
        total: 3,
        completed: 2,
        pending: 1,
        expired: 0,
        completionRate: 67,
        avgTime: '2.3시간'
      })
    }
  }

  useEffect(() => {
    // 로딩이 완료되고 사용자가 없으면 로그인 페이지로
    if (!loading && !user) {
      console.log('No user found, redirecting to signin')
      router.push('/auth/signin')
    } else if (user) {
      console.log('User found in dashboard:', user)
      loadDocuments()
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

  // 문서 삭제 핸들러
  const handleDeleteDocument = (docId: number) => {
    if (window.confirm('정말로 이 문서를 삭제하시겠습니까?')) {
      const updatedDocs = documents.filter(doc => doc.id !== docId)
      setDocuments(updatedDocs)
      localStorage.setItem('userDocuments', JSON.stringify(updatedDocs))
      
      // 통계 업데이트
      const total = updatedDocs.length
      const completed = updatedDocs.filter((doc: any) => doc.status === 'completed').length
      const pending = updatedDocs.filter((doc: any) => doc.status === 'pending').length
      const expired = updatedDocs.filter((doc: any) => doc.status === 'expired').length
      const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
      
      setStats({
        total,
        completed,
        pending,
        expired,
        completionRate,
        avgTime: '2.3시간'
      })
    }
  }

  // URL 복사 핸들러
  const handleCopyShareUrl = (shareUrl: string) => {
    const fullUrl = `${window.location.origin}${shareUrl}`
    navigator.clipboard.writeText(fullUrl).then(() => {
      alert('공유 URL이 클립보드에 복사되었습니다!')
    }).catch(() => {
      alert('URL 복사에 실패했습니다.')
    })
  }

  // 문서 필터링
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // 페이지네이션
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDocuments = filteredDocuments.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // 검색/필터 변경 시 페이지 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus])

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="badge badge-green">완료</span>
      case 'pending':
        return <span className="badge badge-yellow">대기중</span>
      case 'expired':
        return <span className="badge badge-red">만료</span>
      default:
        return <span className="badge badge-gray">초안</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => router.push('/dashboard')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">동의서 플랫폼</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button 
                onClick={signOut}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h2>
          <p className="text-gray-600">문서 관리 및 서명 현황을 확인하세요</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">전체</span>
            </div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">총 문서</div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">완료</span>
            </div>
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">완료된 문서</div>
            <div className="stat-change positive">
              <TrendingUp className="h-4 w-4" />
              <span>12% 증가</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">대기</span>
            </div>
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">대기중인 문서</div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">완료율</span>
            </div>
            <div className="stat-value">{stats.completionRate}%</div>
            <div className="stat-label">평균 {stats.avgTime}</div>
          </div>
        </div>

        {/* 문서 리스트 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-lg font-semibold text-gray-900">내 문서</h3>
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="문서 검색..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <option value="completed">완료</option>
                  <option value="pending">대기중</option>
                  <option value="draft">초안</option>
                </select>
                <Link href="/documents/new" className="btn-primary">
                  <Plus className="h-5 w-5 mr-2" />
                  새 문서
                </Link>
              </div>
            </div>
          </div>

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
                    응답
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
                {currentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.responses}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.views || Math.floor(Math.random() * 10) + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => router.push(doc.shareUrl || `/forms/${doc.id}`)}
                          className="text-gray-600 hover:text-blue-600"
                          title="미리보기"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => router.push(`/documents/edit/${doc.id}`)}
                          className="text-gray-600 hover:text-blue-600"
                          title="편집"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleCopyShareUrl(doc.shareUrl || `/forms/${doc.id}`)}
                          className="text-gray-600 hover:text-green-600"
                          title="공유 URL 복사"
                        >
                          <Share2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            const link = document.createElement('a')
                            link.href = `data:text/plain;charset=utf-8,${encodeURIComponent(`문서: ${doc.title}\n상태: ${doc.status}\n생성일: ${doc.createdAt}`)}`
                            link.download = `${doc.title}.txt`
                            link.click()
                          }}
                          className="text-gray-600 hover:text-blue-600"
                          title="다운로드"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="text-gray-600 hover:text-red-600"
                          title="삭제"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {filteredDocuments.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  총 <span className="font-medium">{filteredDocuments.length}</span>개 문서 중 
                  <span className="font-medium">{startIndex + 1}-{Math.min(endIndex, filteredDocuments.length)}</span>개 표시
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                        currentPage === 1 
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      이전
                    </button>
                    
                    {/* 페이지 버튼들 */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // 현재 페이지 주변 페이지만 보이기
                      if (totalPages <= 5 || page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="px-2 text-gray-400">…</span>
                      }
                      return null
                    })}
                    
                    <button 
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                        currentPage === totalPages 
                          ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      다음
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* 문서가 없을 때 */}
          {filteredDocuments.length === 0 && (
            <div className="px-6 py-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">문서가 없습니다</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? '검색 조건에 맞는 문서가 없습니다.' 
                  : '첫 번째 문서를 만들어보세요.'
                }
              </p>
              <Link href="/documents/new" className="btn-primary inline-flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>새 문서 만들기</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}