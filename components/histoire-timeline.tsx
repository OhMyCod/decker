"use client"

import { useMemo } from "react"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TimelineEvent } from "@/types/timeline"
import { useTimelineSync } from "@/hooks/use-timeline-sync"

interface HistoireTimelineProps {
  events: TimelineEvent[]
  currentSectionId?: string
}

export function HistoireTimeline({ events, currentSectionId }: HistoireTimelineProps) {
  const sectionIds = useMemo(() => events.map((e) => e.sectionId), [events])
  const { activeSectionId, scrollProgress } = useTimelineSync(sectionIds)

  // Utiliser activeSectionId si disponible, sinon currentSectionId
  const activeId = activeSectionId || currentSectionId || events[0]?.sectionId

  // Calculer la position de l'indicateur basée sur la progression
  const indicatorPosition = useMemo(() => {
    if (events.length === 0) return 0
    const activeIndex = events.findIndex((e) => e.sectionId === activeId)
    if (activeIndex === -1) return 0

    // Position basée sur l'index de la section active
    // Utiliser une distribution égale sur la largeur totale
    const basePosition = events.length > 1 ? (activeIndex / (events.length - 1)) * 100 : 50

    return Math.min(100, Math.max(0, basePosition))
  }, [activeId, events])

  if (events.length === 0) return null

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* Timeline Container */}
        <div className="relative py-6 md:py-8">
          {/* Progress Line */}
          <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-border" />
          <div
            className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-primary transition-all duration-500 ease-out"
            style={{ width: `${indicatorPosition}%` }}
          />

          {/* Timeline Points */}
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="relative flex min-w-full items-center justify-between gap-2 px-2 md:gap-4 md:px-4 lg:px-8">
              {events.map((event, index) => {
                const isActive = event.sectionId === activeId
                const Icon = event.icon

                return (
                  <div
                    key={event.id}
                    className="relative flex min-w-[80px] flex-col items-center gap-1.5 md:min-w-0 md:gap-2 lg:gap-3"
                    style={{ flex: `0 0 ${100 / events.length}%` }}
                  >
                    {/* Timeline Point */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={event.url}
                          className={cn(
                            "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 md:h-12 md:w-12",
                            "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                            isActive
                              ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                              : "border-muted-foreground/30 bg-background text-muted-foreground hover:border-primary/50"
                          )}
                          aria-label={`Aller à ${event.label}`}
                        >
                          {Icon ? (
                            <Icon className="h-4 w-4 md:h-5 md:w-5" />
                          ) : (
                            <div
                              className={cn(
                                "h-2.5 w-2.5 rounded-full transition-all md:h-3 md:w-3",
                                isActive ? "bg-primary-foreground" : "bg-muted-foreground"
                              )}
                            />
                          )}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-1">
                          <p className="font-semibold">{event.label}</p>
                          <p className="text-xs text-muted-foreground">{event.date}</p>
                          {event.description && (
                            <p className="text-xs">{event.description}</p>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>

                    {/* Date Badge */}
                    <Badge
                      variant={isActive ? "default" : "secondary"}
                      className={cn(
                        "text-[10px] transition-all duration-300 md:text-xs",
                        isActive && "scale-105 shadow-md"
                      )}
                    >
                      {event.date}
                    </Badge>

                    {/* Label */}
                    <p
                      className={cn(
                        "hidden text-center text-[10px] font-medium transition-colors duration-300 sm:block md:text-xs lg:text-sm",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {event.label}
                    </p>

                    {/* Active Indicator Pulse */}
                    {isActive && (
                      <div className="absolute left-1/2 top-1/2 z-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-timeline-pulse rounded-full bg-primary/20 md:h-16 md:w-16" />
                    )}
                  </div>
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Active Position Indicator */}
          <div
            className="absolute top-1/2 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary bg-background shadow-lg transition-all duration-500 ease-out"
            style={{ left: `${indicatorPosition}%` }}
          >
            <div className="absolute inset-0 animate-timeline-pulse rounded-full bg-primary/30" />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

