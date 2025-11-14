import { createClient } from '@/lib/supabase/client'
import type { FamilyMember } from '@/types'

export async function getFamilyMembers() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .order('last_name', { ascending: true })

  if (error) throw error
  return data as FamilyMember[]
}

export async function getFamilyMember(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as FamilyMember | null
}

export async function getProminentMembers() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('is_prominent', true)
    .order('generation', { ascending: true })

  if (error) throw error
  return data as FamilyMember[]
}

export async function searchFamilyMembers(query: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,maiden_name.ilike.%${query}%`)

  if (error) throw error
  return data as FamilyMember[]
}
