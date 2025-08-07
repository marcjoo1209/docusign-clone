import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 클라이언트 측 Supabase 클라이언트
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 클라이언트 컴포넌트용
export const createSupabaseClient = () => createClientComponentClient()

// 데이터베이스 타입 정의
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          original_filename: string | null
          file_url: string | null
          document_image_url: string | null
          thumbnail_url: string | null
          share_url: string
          status: 'draft' | 'published' | 'archived'
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          original_filename?: string | null
          file_url?: string | null
          document_image_url?: string | null
          thumbnail_url?: string | null
          share_url?: string
          status?: 'draft' | 'published' | 'archived'
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          original_filename?: string | null
          file_url?: string | null
          document_image_url?: string | null
          thumbnail_url?: string | null
          share_url?: string
          status?: 'draft' | 'published' | 'archived'
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      form_fields: {
        Row: {
          id: string
          document_id: string
          field_type: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'signature' | 'checkbox'
          field_name: string
          field_label: string | null
          placeholder_text: string | null
          position_x: number
          position_y: number
          width: number
          height: number
          is_required: boolean
          validation_rules: any | null
          field_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          field_type: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'signature' | 'checkbox'
          field_name: string
          field_label?: string | null
          placeholder_text?: string | null
          position_x: number
          position_y: number
          width: number
          height: number
          is_required?: boolean
          validation_rules?: any | null
          field_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          field_type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'signature' | 'checkbox'
          field_name?: string
          field_label?: string | null
          placeholder_text?: string | null
          position_x?: number
          position_y?: number
          width?: number
          height?: number
          is_required?: boolean
          validation_rules?: any | null
          field_order?: number | null
          created_at?: string
        }
      }
      form_responses: {
        Row: {
          id: string
          document_id: string
          response_data: any
          respondent_ip: string | null
          respondent_user_agent: string | null
          respondent_email: string | null
          is_completed: boolean
          completion_time: number | null
          submitted_at: string
        }
        Insert: {
          id?: string
          document_id: string
          response_data: any
          respondent_ip?: string | null
          respondent_user_agent?: string | null
          respondent_email?: string | null
          is_completed?: boolean
          completion_time?: number | null
          submitted_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          response_data?: any
          respondent_ip?: string | null
          respondent_user_agent?: string | null
          respondent_email?: string | null
          is_completed?: boolean
          completion_time?: number | null
          submitted_at?: string
        }
      }
    }
  }
}