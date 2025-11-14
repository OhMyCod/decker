import { LucideIcon } from "lucide-react"

/**
 * Événement de timeline pour l'affichage chronologique
 */
export interface TimelineEvent {
  id: string
  date: string
  label: string
  description?: string
  sectionId: string
  url: string
  icon?: LucideIcon
}

/**
 * Données de synchronisation de la timeline
 */
export interface TimelineSyncData {
  activeSectionId: string | null
  scrollProgress: number // 0-100
}

