'use client'

import { useState } from 'react'
import { useAuth } from '../../components/AuthProvider'
import Navbar from '../../components/Navbar'
import { 
  BarChart3, TrendingUp, Users, FileText, 
  Clock, Calendar, Download, Filter,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react'

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [dateRange, setDateRange] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('all')

  // 임시 분석 데이터
  const analytics = {
    overview: {
      totalDocuments: 156,
      totalResponses: 1243,
      avgCompletionRate: 87.3,
      avgResponseTime: '4.2분',
      trends: {
        documents: { value: 12, direction: 'up' },
        responses: { value: 23, direction: 'up' },
        completionRate: { value: 3.2, direction: 'up' },
        responseTime: { value: 0.5, direction: 'down' }
      }
    },
    chartData: {
      daily: [
        { date: '월', responses: 45, views: 120 },
        { date: '화', responses: 52, views: 145 },
        { date: '수', responses: 48, views: 130 },
        { date: '목', responses: 70, views: 180 },
        { date: '금', responses: 65, views: 165 },
        { date: '토', responses: 30, views: 80 },
        { date: '일', responses: 25, views: 70 }
      ]
    },
    topDocuments: [
      { title: '근로계약서', responses: 234, completionRate: 92 },
      { title: '임대차계약서', responses: 189, completionRate: 88 },
      { title: 'NDA 계약서', responses: 156, completionRate: 85 },
      { title: '서비스 이용약관', responses: 145, completionRate: 90 },
      { title: '개인정보 수집 동의서', responses: 132, completionRate: 94 }
    ],
    fieldAnalytics: [
      { name: '이름', completionRate: 98, avgTime: '15초' },
      { name: '이메일', completionRate: 97, avgTime: '20초' },
      { name: '전화번호', completionRate: 95, avgTime: '18초' },
      { name: '주소', completionRate: 89, avgTime: '45초' },
      { name: '서명', completionRate: 100, avgTime: '10초' }
    ]
  }

  const getTrendIcon = (direction: string) => {
    if (direction === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />
    if (direction === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-500" />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">분석 대시보드</h1>
              <p className="text-gray-600 mt-2">문서 성과와 사용자 행동을 분석하세요</p>
            </div>
            <div className="flex space-x-3">
              <select 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">오늘</option>
                <option value="week">이번 주</option>
                <option value="month">이번 달</option>
                <option value="quarter">분기</option>
                <option value="year">올해</option>
              </select>
              <button className="btn-secondary flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>보고서 다운로드</span>
              </button>
            </div>
          </div>
        </div>

        {/* 주요 지표 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.overview.trends.documents.direction)}
                <span className="text-sm font-medium text-gray-600">
                  {analytics.overview.trends.documents.value}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analytics.overview.totalDocuments}</div>
            <div className="text-sm text-gray-600 mt-1">총 문서</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.overview.trends.responses.direction)}
                <span className="text-sm font-medium text-gray-600">
                  {analytics.overview.trends.responses.value}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analytics.overview.totalResponses}</div>
            <div className="text-sm text-gray-600 mt-1">총 응답</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.overview.trends.completionRate.direction)}
                <span className="text-sm font-medium text-gray-600">
                  {analytics.overview.trends.completionRate.value}%
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analytics.overview.avgCompletionRate}%</div>
            <div className="text-sm text-gray-600 mt-1">평균 완료율</div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(analytics.overview.trends.responseTime.direction)}
                <span className="text-sm font-medium text-gray-600">
                  {analytics.overview.trends.responseTime.value}분
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analytics.overview.avgResponseTime}</div>
            <div className="text-sm text-gray-600 mt-1">평균 응답 시간</div>
          </div>
        </div>

        {/* 차트 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">응답 추이</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">응답</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">조회</button>
              </div>
            </div>
            
            {/* 간단한 막대 차트 */}
            <div className="space-y-4">
              {analytics.chartData.daily.map((day) => (
                <div key={day.date} className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 w-8">{day.date}</span>
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative">
                      <div 
                        className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
                        style={{ width: `${(day.responses / 70) * 100}%` }}
                      >
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-white font-medium">
                          {day.responses}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">인기 문서</h3>
            <div className="space-y-4">
              {analytics.topDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                      <p className="text-xs text-gray-500">{doc.responses} 응답</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">{doc.completionRate}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 필드 분석 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">필드별 분석</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">필드명</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">완료율</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">평균 작성 시간</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">상태</th>
                </tr>
              </thead>
              <tbody>
                {analytics.fieldAnalytics.map((field, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{field.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${field.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-700">{field.completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{field.avgTime}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        field.completionRate >= 95 
                          ? 'bg-green-100 text-green-800' 
                          : field.completionRate >= 90 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {field.completionRate >= 95 ? '우수' : field.completionRate >= 90 ? '양호' : '개선 필요'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}