export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      landing_pages: {
        Row: {
          bg_color: string | null
          created_at: string | null
          hero_badge: string | null
          hero_image_url: string | null
          hero_subtitle: string
          hero_title: string
          id: string
          is_active: boolean | null
          meta_description: string | null
          meta_title: string | null
          offer_cta_text: string | null
          offer_description: string | null
          offer_original_price: string | null
          offer_price: string | null
          offer_title: string | null
          offer_valid_until: string | null
          phone_cta_text: string | null
          slug: string
          testimonials: Json | null
          trust_items: Json | null
          updated_at: string | null
          whatsapp_message: string | null
        }
        Insert: {
          bg_color?: string | null
          created_at?: string | null
          hero_badge?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          offer_cta_text?: string | null
          offer_description?: string | null
          offer_original_price?: string | null
          offer_price?: string | null
          offer_title?: string | null
          offer_valid_until?: string | null
          phone_cta_text?: string | null
          slug: string
          testimonials?: Json | null
          trust_items?: Json | null
          updated_at?: string | null
          whatsapp_message?: string | null
        }
        Update: {
          bg_color?: string | null
          created_at?: string | null
          hero_badge?: string | null
          hero_image_url?: string | null
          hero_subtitle?: string
          hero_title?: string
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          offer_cta_text?: string | null
          offer_description?: string | null
          offer_original_price?: string | null
          offer_price?: string | null
          offer_title?: string | null
          offer_valid_until?: string | null
          phone_cta_text?: string | null
          slug?: string
          testimonials?: Json | null
          trust_items?: Json | null
          updated_at?: string | null
          whatsapp_message?: string | null
        }
        Relationships: []
      }
      lp_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          landing_page_id: string
          source: string | null
          utm_campaign: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          landing_page_id: string
          source?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          landing_page_id?: string
          source?: string | null
          utm_campaign?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lp_events_landing_page_id_fkey"
            columns: ["landing_page_id"]
            isOneToOne: false
            referencedRelation: "landing_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      page_views: {
        Row: {
          created_at: string
          duration_ms: number | null
          id: string
          is_bounce: boolean | null
          path: string
          referrer: string | null
          session_id: string
          user_agent: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          visitor_id: string
        }
        Insert: {
          created_at?: string
          duration_ms?: number | null
          id?: string
          is_bounce?: boolean | null
          path: string
          referrer?: string | null
          session_id: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id: string
        }
        Update: {
          created_at?: string
          duration_ms?: number | null
          id?: string
          is_bounce?: boolean | null
          path?: string
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          visitor_id?: string
        }
        Relationships: []
      }
      pagespeed_cache: {
        Row: {
          accessibility: number | null
          best_practices: number | null
          cls: number | null
          fetched_at: string
          id: string
          inp_ms: number | null
          lcp_ms: number | null
          performance: number | null
          raw: Json | null
          seo: number | null
          strategy: string
          url: string
        }
        Insert: {
          accessibility?: number | null
          best_practices?: number | null
          cls?: number | null
          fetched_at?: string
          id?: string
          inp_ms?: number | null
          lcp_ms?: number | null
          performance?: number | null
          raw?: Json | null
          seo?: number | null
          strategy: string
          url: string
        }
        Update: {
          accessibility?: number | null
          best_practices?: number | null
          cls?: number | null
          fetched_at?: string
          id?: string
          inp_ms?: number | null
          lcp_ms?: number | null
          performance?: number | null
          raw?: Json | null
          seo?: number | null
          strategy?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          data: Json
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          data?: Json
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          data?: Json
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_integrations: {
        Row: {
          bing_site_verification: string | null
          created_at: string
          custom_body_html: string | null
          custom_head_html: string | null
          enabled: boolean
          ga4_measurement_id: string | null
          google_ads_conv_label_phone: string | null
          google_ads_conv_label_whatsapp: string | null
          google_ads_id: string | null
          google_site_verification: string | null
          gtm_id: string | null
          id: string
          meta_pixel_id: string | null
          seo_canonical_base: string | null
          seo_default_description: string | null
          seo_default_keywords: string | null
          seo_default_title: string | null
          seo_og_image_url: string | null
          seo_robots: string | null
          updated_at: string
        }
        Insert: {
          bing_site_verification?: string | null
          created_at?: string
          custom_body_html?: string | null
          custom_head_html?: string | null
          enabled?: boolean
          ga4_measurement_id?: string | null
          google_ads_conv_label_phone?: string | null
          google_ads_conv_label_whatsapp?: string | null
          google_ads_id?: string | null
          google_site_verification?: string | null
          gtm_id?: string | null
          id?: string
          meta_pixel_id?: string | null
          seo_canonical_base?: string | null
          seo_default_description?: string | null
          seo_default_keywords?: string | null
          seo_default_title?: string | null
          seo_og_image_url?: string | null
          seo_robots?: string | null
          updated_at?: string
        }
        Update: {
          bing_site_verification?: string | null
          created_at?: string
          custom_body_html?: string | null
          custom_head_html?: string | null
          enabled?: boolean
          ga4_measurement_id?: string | null
          google_ads_conv_label_phone?: string | null
          google_ads_conv_label_whatsapp?: string | null
          google_ads_id?: string | null
          google_site_verification?: string | null
          gtm_id?: string | null
          id?: string
          meta_pixel_id?: string | null
          seo_canonical_base?: string | null
          seo_default_description?: string | null
          seo_default_keywords?: string | null
          seo_default_title?: string | null
          seo_og_image_url?: string | null
          seo_robots?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      analytics_summary: {
        Args: { from_ts: string; to_ts: string }
        Returns: {
          avg_duration_ms: number
          bounce_rate: number
          pageviews: number
          unique_sessions: number
          unique_visitors: number
        }[]
      }
      analytics_timeseries: {
        Args: { from_ts: string; to_ts: string }
        Returns: {
          day: string
          pageviews: number
          unique_visitors: number
        }[]
      }
      analytics_top_pages: {
        Args: { from_ts: string; lim?: number; to_ts: string }
        Returns: {
          avg_duration_ms: number
          pageviews: number
          path: string
          unique_visitors: number
        }[]
      }
      analytics_utm_breakdown: {
        Args: { from_ts: string; lim?: number; to_ts: string }
        Returns: {
          avg_duration_ms: number
          bounce_rate: number
          pageviews: number
          share_pct: number
          unique_sessions: number
          unique_visitors: number
          utm_campaign: string
          utm_medium: string
          utm_source: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
