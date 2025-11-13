import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, History, Building2, Sparkles } from "lucide-react"

const periods = [
  {
    title: "Les Origines",
    url: "/histoire/origines",
    icon: Clock,
    description: "Les premières traces de la famille DECKER et ses racines historiques.",
    period: "Date la plus ancienne connue",
  },
  {
    title: "XIXᵉ siècle",
    url: "/histoire/xixe",
    icon: Calendar,
    description: "L'histoire de la famille au XIXᵉ siècle, période de transformations et d'évolution.",
    period: "1800 - 1900",
  },
  {
    title: "XXᵉ siècle",
    url: "/histoire/xxe",
    icon: History,
    description: "La famille pendant les deux guerres mondiales, la Résistance et le Colonel Rémy.",
    period: "1900 - 1945",
  },
  {
    title: "Après-guerre → 2000",
    url: "/histoire/apres-guerre",
    icon: Building2,
    description: "La reconstruction et l'évolution de la famille dans l'après-guerre jusqu'à l'an 2000.",
    period: "1945 - 2000",
  },
  {
    title: "Génération actuelle",
    url: "/histoire/actuelle",
    icon: Sparkles,
    description: "L'histoire contemporaine de la famille et la génération actuelle.",
    period: "2000 - Aujourd'hui",
  },
]

export default function HistoirePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {periods.map((period) => {
        const Icon = period.icon
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
  )
}
