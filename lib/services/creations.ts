import { createClient } from '@/lib/supabase/client'
import type { ArtisticCreation, CreationType } from '@/types'

export async function getArtisticCreations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('artistic_creations')
    .select('*')
    .eq('is_public', true)
    .order('year', { ascending: false })

  if (error) throw error
  return data as ArtisticCreation[]
}

export async function getArtisticCreation(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('artistic_creations')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as ArtisticCreation | null
}

export async function getCreationsByType(type: CreationType) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('artistic_creations')
    .select('*')
    .eq('creation_type', type)
    .eq('is_public', true)
    .order('year', { ascending: false })

  if (error) throw error
  return data as ArtisticCreation[]
}

export async function getFeaturedCreations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('artistic_creations')
    .select('*')
    .eq('is_featured', true)
    .eq('is_public', true)
    .order('year', { ascending: false })

  if (error) throw error
  return data as ArtisticCreation[]
}

export async function getMusicCreations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('artistic_creations')
    .select(`
      *,
      music_metadata (*)
    `)
    .eq('creation_type', 'music')
    .eq('is_public', true)

  if (error) throw error
  return data
}

export async function getPhotographyCreations() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('artistic_creations')
    .select(`
      *,
      photography_metadata (*)
    `)
    .eq('creation_type', 'photography')
    .eq('is_public', true)

  if (error) throw error
  return data
}
