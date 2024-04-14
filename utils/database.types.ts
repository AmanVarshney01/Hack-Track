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
      project_details: {
        Row: {
          description: string
          end_date: string
          id: number
          project_id: number | null
          start_date: string
          status: Database["public"]["Enums"]["status"]
        }
        Insert: {
          description: string
          end_date: string
          id?: number
          project_id?: number | null
          start_date: string
          status?: Database["public"]["Enums"]["status"]
        }
        Update: {
          description?: string
          end_date?: string
          id?: number
          project_id?: number | null
          start_date?: string
          status?: Database["public"]["Enums"]["status"]
        }
        Relationships: [
          {
            foreignKeyName: "public_project_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          created_at: string
          id: number
          member_email: string
          project_id: number | null
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          created_at?: string
          id?: number
          member_email: string
          project_id?: number | null
          role: Database["public"]["Enums"]["role"]
        }
        Update: {
          created_at?: string
          id?: number
          member_email?: string
          project_id?: number | null
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: [
          {
            foreignKeyName: "public_project_members_member_email_fkey"
            columns: ["member_email"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["email"]
          },
          {
            foreignKeyName: "public_project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_resources: {
        Row: {
          created_at: string
          id: number
          name: string
          project_id: number | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          project_id?: number | null
          url: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          project_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_resources_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string | null
          id: number
          priority: Database["public"]["Enums"]["task_priority"]
          project_id: number | null
          status: Database["public"]["Enums"]["task_status"]
          title: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: number | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string | null
          id?: number
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: number | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_project_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_project_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string
          id: string
          name: string
        }
        Insert: {
          email: string
          id: string
          name: string
        }
        Update: {
          email?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "mentor" | "member"
      status: "active" | "completed" | "paused"
      task_priority: "high" | "medium" | "low"
      task_status: "open" | "in progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
