"use client"

import { usePathname } from "next/navigation"
import { SectionHeader } from "@/components/section-header"
import { BookOpen } from "lucide-react"

export function HistoireHeader() {
  const pathname = usePathname()
  const isIndexPage = pathname === "/histoire"

  if (!isIndexPage) {
    return null
  }

  return (
    <SectionHeader
      title="Histoire Familiale"
      description="Découvrez l'histoire de la famille DECKER à travers les siècles, des origines jusqu'à aujourd'hui"
      icon={BookOpen}
    />
  )
}

