import { createClient } from '@/lib/supabase/client'
import type { Archive, ArchiveType } from '@/types'

export async function getArchives() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('archives')
    .select('*')
    .eq('is_public', true)
    .order('original_date', { ascending: false })

  if (error) throw error
  return data as Archive[]
}

export async function getArchive(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('archives')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as Archive | null
}

export async function getArchivesByType(type: ArchiveType) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('archives')
    .select('*')
    .eq('archive_type', type)
    .eq('is_public', true)
    .order('original_date', { ascending: false })

  if (error) throw error
  return data as Archive[]
}

export async function getINAVideos() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('archives')
    .select('*')
    .eq('archive_type', 'video_ina')
    .eq('is_public', true)
    .order('ina_date', { ascending: false })

  if (error) throw error
  return data as Archive[]
}

export async function getMemberArchives(memberId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('archive_members')
    .select(`
      archives (*)
    `)
    .eq('member_id', memberId)

  if (error) throw error
  return data
}
