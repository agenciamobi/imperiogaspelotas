import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

    const userClient = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: authHeader } } })
    const token = authHeader.replace('Bearer ', '')
    const { data: claims } = await userClient.auth.getClaims(token)
    const callerId = claims?.claims?.sub
    if (!callerId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const admin = createClient(SUPABASE_URL, SERVICE_KEY)
    const { data: roleRow } = await admin.from('user_roles').select('id').eq('user_id', callerId).eq('role', 'admin').maybeSingle()
    if (!roleRow) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const body = await req.json().catch(() => null)
    const userId = String(body?.user_id || '')
    if (!userId) return new Response(JSON.stringify({ error: 'user_id obrigatório' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    if (userId === callerId) return new Response(JSON.stringify({ error: 'Você não pode excluir a si mesmo.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const { count } = await admin.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'admin')
    if ((count ?? 0) <= 1) return new Response(JSON.stringify({ error: 'Não é possível remover o último admin.' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    const { error } = await admin.auth.admin.deleteUser(userId)
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }
})