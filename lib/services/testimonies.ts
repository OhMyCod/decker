import { createClient } from '@/lib/supabase/client'
import type { Testimony, TestimonyCategory } from '@/types'

export async function getTestimonies() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('is_public', true)
    .order('testimony_date', { ascending: false })

  if (error) throw error
  return data as Testimony[]
}

export async function getTestimony(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as Testimony | null
}

export async function getTestimoniesByCategory(category: TestimonyCategory) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('category', category)
    .eq('is_public', true)
    .order('testimony_date', { ascending: false })

  if (error) throw error
  return data as Testimony[]
}

export async function getFeaturedTestimonies() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('is_featured', true)
    .eq('is_public', true)
    .order('testimony_date', { ascending: false })

  if (error) throw error
  return data as Testimony[]
}

export async function getColonelRemyTestimonies() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('testimonies')
    .select('*')
    .eq('category', 'colonel_remy')
    .eq('is_public', true)
    .order('testimony_date', { ascending: false })

  if (error) throw error
  return data as Testimony[]
}
