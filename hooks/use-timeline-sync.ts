"use client"

import { useEffect, useState, useRef, useMemo } from "react"

export interface TimelineSyncData {
  activeSectionId: string | null
  scrollProgress: number // 0-100
}

/**
 * Hook pour synchroniser la timeline avec le scroll vertical de la page
 * Utilise Intersection Observer pour détecter les sections visibles
 */
export function useTimelineSync(sectionIds: string[]): TimelineSyncData {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const sectionsRef = useRef<Map<string, Element>>(new Map())

  // Créer l'Intersection Observer avec des seuils multiples
  useEffect(() => {
    if (typeof window === "undefined") return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Trouver la section la plus visible
        let mostVisible: { entry: IntersectionObserverEntry; ratio: number } | null = null

        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("data-timeline-section")
          if (!sectionId) return

          sectionsRef.current.set(sectionId, entry.target)

          // Calculer le ratio de visibilité (0-1)
          const ratio = entry.intersectionRatio

          if (!mostVisible || ratio > mostVisible.ratio) {
            mostVisible = { entry, ratio }
          }
        })

        if (mostVisible) {
          const sectionId = mostVisible.entry.target.getAttribute("data-timeline-section")
          if (sectionId) {
            setActiveSectionId(sectionId)
          }
        }
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-20% 0px -20% 0px", // Zone centrale de la fenêtre
      }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Observer toutes les sections avec data-timeline-section
  useEffect(() => {
    if (!observerRef.current) return

    const sections = document.querySelectorAll("[data-timeline-section]")
    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observerRef.current?.unobserve(section)
      })
    }
  }, [])

  // Calculer la progression du scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionIds.length === 0) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Calculer la progression basée sur le scroll total
      const maxScroll = documentHeight - windowHeight
      const progress = maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Calcul initial

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds])

  return useMemo(
    () => ({
      activeSectionId,
      scrollProgress,
    }),
    [activeSectionId, scrollProgress]
  )
}

