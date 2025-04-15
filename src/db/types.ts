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
      campaign: {
        Row: {
          completed: boolean
          created_at: string | null
          description: string
          id: number
          name: string
          ngo_id: number
          started_by: string
          target: number
          type: string
        }
        Insert: {
          completed?: boolean
          created_at?: string | null
          description: string
          id?: number
          name: string
          ngo_id: number
          started_by: string
          target: number
          type: string
        }
        Update: {
          completed?: boolean
          created_at?: string | null
          description?: string
          id?: number
          name?: string
          ngo_id?: number
          started_by?: string
          target?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngo"
            referencedColumns: ["id"]
          },
        ]
      }
      donation: {
        Row: {
          amount: number | null
          campaign_id: number
          created_at: string | null
          donor_id: string
          id: number
          ngo_id: number
          quantity: number | null
          type: string
          unit: string | null
        }
        Insert: {
          amount?: number | null
          campaign_id: number
          created_at?: string | null
          donor_id: string
          id?: number
          ngo_id: number
          quantity?: number | null
          type: string
          unit?: string | null
        }
        Update: {
          amount?: number | null
          campaign_id?: number
          created_at?: string | null
          donor_id?: string
          id?: number
          ngo_id?: number
          quantity?: number | null
          type?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donation_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "donation_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngo"
            referencedColumns: ["id"]
          },
        ]
      }
      ngo: {
        Row: {
          created_at: string | null
          description: string
          email: string
          id: number
          location: string
          name: string
          phone: string
          website: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          email: string
          id?: number
          location: string
          name: string
          phone: string
          website?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          email?: string
          id?: number
          location?: string
          name?: string
          phone?: string
          website?: string | null
        }
        Relationships: []
      }
      ngo_tag: {
        Row: {
          ngo_id: number
          tag_id: number
        }
        Insert: {
          ngo_id: number
          tag_id: number
        }
        Update: {
          ngo_id?: number
          tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ngo_tag_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ngo_tag_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tag"
            referencedColumns: ["id"]
          },
        ]
      }
      tag: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          ngo_id: number | null
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          ngo_id?: number | null
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          ngo_id?: number | null
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_ngo_id_fkey"
            columns: ["ngo_id"]
            isOneToOne: false
            referencedRelation: "ngo"
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
      [_ in never]: never
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
