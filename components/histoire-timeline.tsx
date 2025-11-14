"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clock, Calendar, History, Building2, Sparkles, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Period {
  title: string
  url: string
  iconName: "Clock" | "Calendar" | "History" | "Building2" | "Sparkles"
  description: string
  period: string
}

const iconMap: Record<Period["iconName"], LucideIcon> = {
  Clock,
  Calendar,
  History,
  Building2,
  Sparkles,
}

interface HistoireTimelineProps {
  periods: Period[]
}

export function HistoireTimeline({ periods }: HistoireTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(index))
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -50px 0px",
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <ScrollArea className="w-full">
          <div className="relative flex min-w-max items-start gap-8 px-4 pb-6 md:gap-12 md:px-6 lg:gap-16">
            {/* Timeline line - positioned absolutely within the scroll container */}
            <div className="absolute left-4 top-16 right-4 h-0.5 bg-gradient-to-r from-border via-primary/30 to-border md:left-6 md:right-6" />

            {/* Timeline items */}
            {periods.map((period, index) => {
              const Icon = iconMap[period.iconName]
              const isVisible = visibleItems.has(index)
              const isEven = index % 2 === 0

              return (
                <div
                  key={period.url}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  className={cn(
                    "relative flex min-w-[280px] flex-col items-center transition-all duration-300 ease-smooth md:min-w-[320px]",
                    isVisible ? "opacity-100" : "opacity-0"
                  )}
                >
                  {/* Timeline point */}
                  <div className="relative z-10 mb-4">
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg transition-all duration-300 hover:scale-110",
                        isVisible && isEven && "animate-slide-in-left",
                        isVisible && !isEven && "animate-slide-in-right"
                      )}
                      style={{
                        animationDelay: isVisible ? `${index * 100}ms` : "0ms",
                      }}
                    >
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Card */}
                  <Link href={period.url} className="w-full" aria-label={`Naviguer vers ${period.title}`}>
                    <Card
                      className={cn(
                        "h-full w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                        isVisible && "animate-fade-in"
                      )}
                      style={{
                        animationDelay: isVisible ? `${index * 100 + 50}ms` : "0ms",
                      }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <CardTitle className="text-lg">{period.title}</CardTitle>
                          <Badge variant="secondary" className="w-fit shrink-0">
                            {period.period}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2 text-sm">
                          {period.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

