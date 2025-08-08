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

    // 현재 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

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
      return { data: { user: testUser, session: {} as any }, error: null }
    }

    // 로컬 스토리지에서 저장된 계정 확인
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
        return { data: { user: testUser, session: {} as any }, error: null }
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    // 테스트 회원가입 처리 (실제 DB 없이 작동)
    if (email && password && fullName) {
      const testUser = { 
        id: `user-${Date.now()}`,
        email: email,
        user_metadata: { full_name: fullName }
      } as any
      setUser(testUser)
      // 로컬 스토리지에 저장 (임시)
      localStorage.setItem('testUser', JSON.stringify({
        email,
        password,
        fullName
      }))
      return { data: { user: testUser, session: {} as any }, error: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })
    return { data, error }
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