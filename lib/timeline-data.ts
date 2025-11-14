import { TimelineEvent } from "@/types/timeline"
import { Clock, Calendar, History, Building2, Sparkles } from "lucide-react"

/**
 * Données de timeline pour les périodes historiques
 */
export const timelineEvents: TimelineEvent[] = [
  {
    id: "origines",
    date: "Date la plus ancienne connue",
    label: "Les Origines",
    description: "Les premières traces de la famille DECKER et ses racines historiques",
    sectionId: "origines",
    url: "/histoire/origines",
    icon: Clock,
  },
  {
    id: "xixe",
    date: "1800 - 1900",
    label: "XIXᵉ siècle",
    description: "L'histoire de la famille au XIXᵉ siècle, période de transformations et d'évolution",
    sectionId: "xixe",
    url: "/histoire/xixe",
    icon: Calendar,
  },
  {
    id: "xxe",
    date: "1900 - 1945",
    label: "XXᵉ siècle",
    description: "La famille pendant les deux guerres mondiales, la Résistance et le Colonel Rémy",
    sectionId: "xxe",
    url: "/histoire/xxe",
    icon: History,
  },
  {
    id: "apres-guerre",
    date: "1945 - 2000",
    label: "Après-guerre → 2000",
    description: "La reconstruction et l'évolution de la famille dans l'après-guerre jusqu'à l'an 2000",
    sectionId: "apres-guerre",
    url: "/histoire/apres-guerre",
    icon: Building2,
  },
  {
    id: "actuelle",
    date: "2000 - Aujourd'hui",
    label: "Génération actuelle",
    description: "L'histoire contemporaine de la famille et la génération actuelle",
    sectionId: "actuelle",
    url: "/histoire/actuelle",
    icon: Sparkles,
  },
]

