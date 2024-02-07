
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      project: {
        Row: {
          created_at: string
          description: string
          id: number
          mentor_id: number
          name: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          mentor_id: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          mentor_id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      team: {
        Row: {
          created_at: string
          id: number
          mentor_id: number
          project_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          mentor_id: number
          project_id: number
        }
        Update: {
          created_at?: string
          id?: number
          mentor_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "team_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          }
        ]
      }
      team_member: {
        Row: {
          team_id: number
          user_id: number | null
        }
        Insert: {
          team_id?: number
          user_id?: number | null
        }
        Update: {
          team_id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "team_member_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "team"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          id: number
          is_student: boolean
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          is_student?: boolean
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          is_student?: boolean
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
