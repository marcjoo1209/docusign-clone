'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../components/AuthProvider'
import Navbar from '../../components/Navbar'
import { 
  FileText, Search, Filter, Grid, List,
  Star, Clock, Users, Download, Copy,
  Briefcase, Home, GraduationCap, Heart,
  Shield, Receipt, Package, Plane
} from 'lucide-react'

export default function TemplatesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const categories = [
    { id: 'all', name: '전체', icon: Grid },
    { id: 'business', name: '비즈니스', icon: Briefcase },
    { id: 'legal', name: '법률', icon: Shield },
    { id: 'hr', name: '인사', icon: Users },
    { id: 'sales', name: '영업', icon: Receipt },
    { id: 'real-estate', name: '부동산', icon: Home },
    { id: 'education', name: '교육', icon: GraduationCap },
    { id: 'healthcare', name: '의료', icon: Heart }
  ]

  const templates = [
    {
      id: 1,
      title: '표준 근로계약서',
      description: '정규직 직원을 위한 표준 근로계약서 템플릿',
      category: 'hr',
      icon: Users,
      uses: 15234,
      rating: 4.8,
      fields: 12,
      estimatedTime: '5분',
      tags: ['인사', '계약', '채용']
    },
    {
      id: 2,
      title: '임대차 계약서',
      description: '상가 및 주택 임대차 계약서 템플릿',
      category: 'real-estate',
      icon: Home,
      uses: 8921,
      rating: 4.7,
      fields: 15,
      estimatedTime: '8분',
      tags: ['부동산', '임대', '계약']
    },
    {
      id: 3,
      title: 'NDA (비밀유지계약서)',
      description: '기업간 비밀유지를 위한 표준 NDA 템플릿',
      category: 'legal',
      icon: Shield,
      uses: 12456,
      rating: 4.9,
      fields: 8,
      estimatedTime: '3분',
      tags: ['법률', '보안', '계약']
    },
    {
      id: 4,
      title: '견적서',
      description: '제품 및 서비스 견적서 템플릿',
      category: 'sales',
      icon: Receipt,
      uses: 6789,
      rating: 4.6,
      fields: 10,
      estimatedTime: '4분',
      tags: ['영업', '견적', '판매']
    },
    {
      id: 5,
      title: '프리랜서 계약서',
      description: '프리랜서 업무 계약을 위한 템플릿',
      category: 'business',
      icon: Briefcase,
      uses: 9876,
      rating: 4.8,
      fields: 14,
      estimatedTime: '6분',
      tags: ['비즈니스', '프리랜서', '계약']
    },
    {
      id: 6,
      title: '개인정보 수집 동의서',
      description: '개인정보 수집 및 이용 동의서 템플릿',
      category: 'legal',
      icon: Shield,
      uses: 18234,
      rating: 4.9,
      fields: 6,
      estimatedTime: '2분',
      tags: ['법률', '개인정보', '동의서']
    },
    {
      id: 7,
      title: '재직증명서',
      description: '직원 재직증명서 발급 템플릿',
      category: 'hr',
      icon: Users,
      uses: 7654,
      rating: 4.7,
      fields: 7,
      estimatedTime: '2분',
      tags: ['인사', '증명서', '서류']
    },
    {
      id: 8,
      title: '입학원서',
      description: '교육기관 입학원서 템플릿',
      category: 'education',
      icon: GraduationCap,
      uses: 4321,
      rating: 4.5,
      fields: 20,
      estimatedTime: '10분',
      tags: ['교육', '입학', '신청서']
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (templateId: number) => {
    // 템플릿 복사하여 새 문서 생성
    router.push(`/documents/new?template=${templateId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">템플릿 갤러리</h1>
          <p className="text-gray-600 mt-2">전문가가 만든 템플릿으로 빠르게 시작하세요</p>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="템플릿 검색..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {viewMode === 'grid' ? <List className="h-5 w-5" /> : <Grid className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 템플릿 그리드 */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = template.icon
              return (
                <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{template.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{template.uses.toLocaleString()} 사용</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{template.estimatedTime}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleUseTemplate(template.id)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        사용하기
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="divide-y divide-gray-200">
              {filteredTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <div key={template.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span>{template.rating}</span>
                            </span>
                            <span>{template.uses.toLocaleString()} 사용</span>
                            <span>{template.fields} 필드</span>
                            <span>{template.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleUseTemplate(template.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          사용하기
                        </button>
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Copy className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 빈 상태 */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">템플릿을 찾을 수 없습니다</h3>
            <p className="text-gray-600">다른 검색어나 카테고리를 선택해보세요</p>
          </div>
        )}
      </div>
    </div>
  )
}