import { HistoireBreadcrumb } from "@/components/histoire-breadcrumb"
import { HistoireHeader } from "@/components/histoire-header"
import { HistoireTimelineWrapper } from "@/components/histoire-timeline-wrapper"

export default function HistoireLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="space-y-6">
      <HistoireBreadcrumb />
      <HistoireHeader />
      <HistoireTimelineWrapper />
      {children}
    </div>
  )
}
