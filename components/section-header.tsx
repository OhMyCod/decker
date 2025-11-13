import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SectionHeaderProps {
  title: string
  description?: string
  icon?: LucideIcon
}

export function SectionHeader({ title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="mt-2 text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

