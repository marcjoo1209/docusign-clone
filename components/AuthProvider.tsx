'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createSupabaseClient } from '../lib/supabase'

type AuthContextType = {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, fullName: string) => Promise<any>
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
  const supabase = createSupabaseClient()

  useEffect(() => {
    // 테스트 사용자 확인
    try {
      const isTestUser = localStorage.getItem('isTestUser')
      if (isTestUser === 'true') {
        const testUser = { 
          id: 'test-user-id',
          email: 'test@example.com',
          user_metadata: { full_name: '테스트 사용자' }
        } as any
        setUser(testUser)
        setLoading(false)
        return
      }
    } catch (e) {
      console.error('localStorage error:', e)
    }

    // 타임아웃 설정 - 3초 후에는 무조건 로딩 false
    const timeout = setTimeout(() => {
      console.log('Auth check timeout - setting loading to false')
      setLoading(false)
    }, 3000)

    // 현재 세션 확인
    supabase.auth.getSession()
      .then((response: any) => {
        setUser(response.data.session?.user ?? null)
        setLoading(false)
        clearTimeout(timeout)
      })
      .catch((error: any) => {
        console.error('getSession error:', error)
        setUser(null)
        setLoading(false)
        clearTimeout(timeout)
      })

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    console.log('signIn called with:', email, password)
    
    // 테스트 계정 처리 - Supabase 호출 완전히 건너뛰기
    if (email === 'test@example.com' && password === 'test1234!') {
      const testUser = { 
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: { full_name: '테스트 사용자' }
      } as any
      setUser(testUser)
      console.log('Test user logged in:', testUser)
      localStorage.setItem('isTestUser', 'true')
      // Supabase 호출 없이 바로 성공 반환
      return { data: { user: testUser, session: {} as any }, error: null }
    }

    // 로컬 스토리지에서 저장된 계정 확인
    const savedUser = localStorage.getItem('testUser')
    if (savedUser) {
      try {
        const { email: savedEmail, password: savedPassword, fullName } = JSON.parse(savedUser)
        if (email === savedEmail && password === savedPassword) {
          const testUser = { 
            id: `user-${Date.now()}`,
            email: savedEmail,
            user_metadata: { full_name: fullName }
          } as any
          setUser(testUser)
          localStorage.setItem('isTestUser', 'true')
          // Supabase 호출 없이 바로 성공 반환
          return { data: { user: testUser, session: {} as any }, error: null }
        }
      } catch (e) {
        console.error('Error parsing saved user:', e)
      }
    }

    // 테스트 모드에서는 다른 계정 로그인 불가
    console.log('Not a test account, login denied in test mode')
    return { 
      data: null, 
      error: { message: '테스트 모드에서는 test@example.com 계정만 사용 가능합니다.' } 
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    // 테스트 환경에서는 로컬 스토리지만 사용
    if (email && password && fullName) {
      const testUser = { 
        id: `user-${Date.now()}`,
        email: email,
        user_metadata: { full_name: fullName }
      } as any
      setUser(testUser)
      // 로컬 스토리지에 저장
      localStorage.setItem('testUser', JSON.stringify({
        email,
        password,
        fullName
      }))
      localStorage.setItem('isTestUser', 'true')
      console.log('User signed up locally:', email)
      // Supabase 호출 없이 성공 반환
      return { data: { user: testUser, session: {} as any }, error: null }
    }

    // 실제 운영 환경에서만 Supabase 사용 (현재는 테스트 환경이므로 실행되지 않음)
    return { data: null, error: { message: '테스트 환경입니다. 위 양식을 모두 입력해주세요.' } }
  }

  const signOut = async () => {
    localStorage.removeItem('isTestUser')
    localStorage.removeItem('testUser')
    setUser(null)
    await supabase.auth.signOut()
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}