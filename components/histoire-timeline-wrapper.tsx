"use client"

import { usePathname } from "next/navigation"
import { HistoireTimeline } from "@/components/histoire-timeline"
import { timelineEvents } from "@/lib/timeline-data"

export function HistoireTimelineWrapper() {
  const pathname = usePathname()

  // Extraire la section actuelle depuis le pathname
  const currentSectionId = pathname.startsWith("/histoire/")
    ? pathname.split("/histoire/")[1] || null
    : null

  return <HistoireTimeline events={timelineEvents} currentSectionId={currentSectionId || undefined} />
}

