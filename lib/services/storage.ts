import { createClient } from '@/lib/supabase/client'

export type StorageBucket =
  | 'photos_archives'
  | 'videos_ina'
  | 'audio_creations'
  | 'documents'

export async function uploadFile(
  bucket: StorageBucket,
  path: string,
  file: File
) {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error
  return data
}

export function getPublicUrl(bucket: StorageBucket, path: string) {
  const supabase = createClient()

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return data.publicUrl
}

export function getImageUrl(
  bucket: StorageBucket,
  path: string,
  options?: {
    width?: number
    height?: number
    quality?: number
  }
) {
  const supabase = createClient()

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path, {
      transform: options ? {
        width: options.width,
        height: options.height,
        quality: options.quality,
        resize: 'cover'
      } : undefined
    })

  return data.publicUrl
}

export async function listFiles(bucket: StorageBucket, folder?: string) {
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(bucket)
    .list(folder)

  if (error) throw error
  return data
}

export async function deleteFile(bucket: StorageBucket, path: string) {
  const supabase = createClient()

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) throw error
}
