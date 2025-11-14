import { createClient } from '@/lib/supabase/client'
import type { MemberPortrait } from '@/types'

export async function getMemberPortraits() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('member_portraits')
    .select(`
      *,
      family_members (*)
    `)
    .eq('is_featured', true)
    .order('display_order', { ascending: true })

  if (error) throw error
  return data
}

export async function getMemberPortrait(memberId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('member_portraits')
    .select(`
      *,
      family_members (*),
      portrait_key_dates (*),
      portrait_relationships (*)
    `)
    .eq('member_id', memberId)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getColonelRemyPortrait() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('member_portraits')
    .select(`
      *,
      family_members (*),
      portrait_key_dates (*),
      portrait_relationships (*)
    `)
    .eq('is_colonel_remy', true)
    .maybeSingle()

  if (error) throw error
  return data
}
