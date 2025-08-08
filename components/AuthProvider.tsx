'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createSupabaseClient } from '../lib/supabase'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
  signInWithProvider: (provider: 'google' | 'naver' | 'kakao' | 'instagram') => Promise<any>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const supabase = createSupabaseClient()

  useEffect(() => {
    setMounted(true)
    
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') {
      setLoading(false)
      return
    }

    // 즉시 로딩 false로 설정 (테스트 환경)
    const initAuth = async () => {
      try {
        // 현재 로그인한 사용자 확인
        const currentUser = localStorage.getItem('currentUser')
        if (currentUser) {
          const user = JSON.parse(currentUser)
          setUser(user)
          console.log('Restored user session:', user)
        }
      } catch (e) {
        console.log('Auth initialization error:', e)
      } finally {
        // 항상 로딩을 false로 설정
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('signIn called with:', email, password)
    
    // 테스트 계정 처리
    if (email === 'test@example.com' && password === 'test1234!') {
      const testUser = { 
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: { full_name: '테스트 사용자' }
      } as any
      setUser(testUser)
      console.log('Test user logged in:', testUser)
      localStorage.setItem('isTestUser', 'true')
      localStorage.setItem('currentUser', JSON.stringify(testUser))
      return { data: { user: testUser, session: {} as any }, error: null }
    }

    // 로컬 스토리지에서 모든 저장된 사용자 확인
    try {
      const usersData = localStorage.getItem('registeredUsers')
      if (usersData) {
        const users = JSON.parse(usersData)
        const user = users.find((u: any) => u.email === email && u.password === password)
        
        if (user) {
          const loggedInUser = {
            id: user.id,
            email: user.email,
            user_metadata: { full_name: user.fullName }
          } as any
          setUser(loggedInUser)
          localStorage.setItem('isTestUser', 'true')
          localStorage.setItem('currentUser', JSON.stringify(loggedInUser))
          console.log('User logged in:', loggedInUser)
          return { data: { user: loggedInUser, session: {} as any }, error: null }
        }
      }
      
      // 구버전 호환성을 위한 단일 testUser 체크
      const savedUser = localStorage.getItem('testUser')
      if (savedUser) {
        const { email: savedEmail, password: savedPassword, fullName } = JSON.parse(savedUser)
        if (email === savedEmail && password === savedPassword) {
          const testUser = { 
            id: `user-${Date.now()}`,
            email: savedEmail,
            user_metadata: { full_name: fullName }
          } as any
          setUser(testUser)
          localStorage.setItem('isTestUser', 'true')
          localStorage.setItem('currentUser', JSON.stringify(testUser))
          return { data: { user: testUser, session: {} as any }, error: null }
        }
      }
    } catch (e) {
      console.error('Error during login:', e)
    }

    // 로그인 실패
    console.log('Login failed - invalid credentials')
    return { 
      data: null, 
      error: { message: '이메일 또는 비밀번호가 올바르지 않습니다.' } 
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    // 테스트 환경에서는 로컬 스토리지만 사용
    if (email && password && fullName) {
      const newUser = { 
        id: `user-${Date.now()}`,
        email: email,
        password: password, // 실제로는 암호화해야 하지만 테스트 환경이므로 평문 저장
        fullName: fullName,
        user_metadata: { full_name: fullName }
      } as any
      
      // 기존 사용자 목록 가져오기
      let users = []
      try {
        const existingUsers = localStorage.getItem('registeredUsers')
        if (existingUsers) {
          users = JSON.parse(existingUsers)
          // 이미 등록된 이메일인지 확인
          if (users.find((u: any) => u.email === email)) {
            return { 
              data: null, 
              error: { message: '이미 등록된 이메일입니다.' } 
            }
          }
        }
      } catch (e) {
        console.error('Error loading users:', e)
      }
      
      // 새 사용자 추가
      users.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(users))
      
      // 현재 사용자로 설정
      setUser(newUser)
      localStorage.setItem('isTestUser', 'true')
      localStorage.setItem('currentUser', JSON.stringify(newUser))
      
      console.log('User signed up locally:', email)
      // Supabase 호출 없이 성공 반환
      return { data: { user: newUser, session: {} as any }, error: null }
    }

    // 필수 정보 누락
    return { data: null, error: { message: '모든 필드를 입력해주세요.' } }
  }

  const signInWithProvider = async (provider: 'google' | 'naver' | 'kakao' | 'instagram') => {
    console.log(`${provider} login initiated`)
    
    // 테스트 환경에서는 실제 OAuth 없이 모의 로그인 처리
    const providerNames = {
      google: 'Google',
      naver: '네이버',
      kakao: '카카오',
      instagram: 'Instagram'
    }
    
    // 프로바이더별 테스트 사용자 생성
    const mockUser = {
      id: `${provider}-user-${Date.now()}`,
      email: `test_${provider}@example.com`,
      user_metadata: { 
        full_name: `${providerNames[provider]} 사용자`,
        provider: provider,
        avatar_url: `https://ui-avatars.com/api/?name=${providerNames[provider]}&background=random`
      }
    } as any
    
    // SNS 로그인 사용자도 registeredUsers에 저장
    let users = []
    try {
      const existingUsers = localStorage.getItem('registeredUsers')
      if (existingUsers) {
        users = JSON.parse(existingUsers)
        // 이미 로그인한 적 있는 SNS 계정인지 확인
        const existingUser = users.find((u: any) => 
          u.email === mockUser.email && u.provider === provider
        )
        
        if (existingUser) {
          // 기존 사용자로 로그인
          setUser(existingUser)
          localStorage.setItem('isTestUser', 'true')
          localStorage.setItem('currentUser', JSON.stringify(existingUser))
          console.log(`${provider} user logged in:`, existingUser)
          return { data: { user: existingUser, session: {} as any }, error: null }
        }
      }
    } catch (e) {
      console.error('Error loading users:', e)
    }
    
    // 새 SNS 사용자 등록
    mockUser.provider = provider
    users.push(mockUser)
    localStorage.setItem('registeredUsers', JSON.stringify(users))
    
    setUser(mockUser)
    localStorage.setItem('isTestUser', 'true')
    localStorage.setItem('currentUser', JSON.stringify(mockUser))
    
    console.log(`${provider} user signed up:`, mockUser)
    return { data: { user: mockUser, session: {} as any }, error: null }
  }

  const signOut = async () => {
    localStorage.removeItem('isTestUser')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('testUser') // 구버전 호환성
    setUser(null)
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.log('Signout error:', e)
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithProvider,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}