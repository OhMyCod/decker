export interface Period {
  title: string
  url: string
  iconName: "Clock" | "Calendar" | "History" | "Building2" | "Sparkles"
  description: string
  period: string
}

export const periods: Period[] = [
  {
    title: "Les Origines",
    url: "/histoire/origines",
    iconName: "Clock",
    description: "Les premières traces de la famille DECKER et ses racines historiques.",
    period: "Date la plus ancienne connue",
  },
  {
    title: "XIXᵉ siècle",
    url: "/histoire/xixe",
    iconName: "Calendar",
    description: "L'histoire de la famille au XIXᵉ siècle, période de transformations et d'évolution.",
    period: "1800 - 1900",
  },
  {
    title: "XXᵉ siècle",
    url: "/histoire/xxe",
    iconName: "History",
    description: "La famille pendant les deux guerres mondiales, la Résistance et le Colonel Rémy.",
    period: "1900 - 1945",
  },
  {
    title: "Après-guerre → 2000",
    url: "/histoire/apres-guerre",
    iconName: "Building2",
    description: "La reconstruction et l'évolution de la famille dans l'après-guerre jusqu'à l'an 2000.",
    period: "1945 - 2000",
  },
  {
    title: "Génération actuelle",
    url: "/histoire/actuelle",
    iconName: "Sparkles",
    description: "L'histoire contemporaine de la famille et la génération actuelle.",
    period: "2000 - Aujourd'hui",
  },
]

