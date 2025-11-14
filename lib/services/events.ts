import { createClient } from '@/lib/supabase/client'
import type { HistoricalEvent, HistoricalPeriod } from '@/types'

export async function getHistoricalEvents() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('historical_events')
    .select('*')
    .eq('is_public', true)
    .order('event_date', { ascending: false })

  if (error) throw error
  return data as HistoricalEvent[]
}

export async function getHistoricalEvent(id: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('historical_events')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as HistoricalEvent | null
}

export async function getEventsByPeriod(period: HistoricalPeriod) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('historical_events')
    .select('*')
    .eq('historical_period', period)
    .eq('is_public', true)
    .order('event_date', { ascending: false })

  if (error) throw error
  return data as HistoricalEvent[]
}

export async function getMemberEvents(memberId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('event_members')
    .select(`
      role,
      historical_events (*)
    `)
    .eq('member_id', memberId)

  if (error) throw error
  return data
}
