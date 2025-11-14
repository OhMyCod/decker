"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HistoireTimeline } from "@/components/histoire-timeline"
import { periods } from "@/lib/histoire-data"
import { Clock, Calendar, History, Building2, Sparkles, LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Clock,
  Calendar,
  History,
  Building2,
  Sparkles,
}

export default function HistoirePage() {
  return (
    <div className="space-y-6">
      <HistoireTimeline periods={periods} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {periods.map((period) => {
        const Icon = iconMap[period.iconName]
        return (
          <Link key={period.url} href={period.url}>
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl">{period.title}</CardTitle>
                <CardDescription className="text-base">{period.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{period.description}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
      </div>
    </div>
  )
}
