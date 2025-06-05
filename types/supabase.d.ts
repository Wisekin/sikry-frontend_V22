export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          domain: string
          location: string
          industry: string
          employees: string
          description: string
          logo_url: string | null
          confidence_score: number
          created_at: string
          updated_at: string
          last_scraped: string | null
        }
        Insert: {
          id?: string
          name: string
          domain: string
          location?: string
          industry?: string
          employees?: string
          description?: string
          logo_url?: string | null
          confidence_score?: number
          created_at?: string
          updated_at?: string
          last_scraped?: string | null
        }
        Update: {
          id?: string
          name?: string
          domain?: string
          location?: string
          industry?: string
          employees?: string
          description?: string
          logo_url?: string | null
          confidence_score?: number
          created_at?: string
          updated_at?: string
          last_scraped?: string | null
        }
      }
      extracted_data: {
        Row: {
          id: string
          company_id: string
          emails: string[] | null
          phones: string[] | null
          technologies: string[] | null
          social_links: Json | null
        }
        Insert: {
          id?: string
          company_id: string
          emails?: string[] | null
          phones?: string[] | null
          technologies?: string[] | null
          social_links?: Json | null
        }
        Update: {
          id?: string
          company_id?: string
          emails?: string[] | null
          phones?: string[] | null
          technologies?: string[] | null
          social_links?: Json | null
        }
      }
    }
  }
}
