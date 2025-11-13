import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen } from "lucide-react";

export default function HistoirePage() {
  const periods = [
    {
      title: "Les Origines",
      period: "Date la plus ancienne connue",
      description: "Les premières traces de la famille DECKER",
      status: "À documenter"
    },
    {
      title: "XIXᵉ siècle",
      period: "1800 - 1900",
      description: "L'histoire de la famille au XIXᵉ siècle",
      status: "En recherche"
    },
    {
      title: "XXᵉ siècle - Guerres mondiales",
      period: "1900 - 1945",
      description: "La famille pendant les deux guerres mondiales, la Résistance et le Colonel Rémy",
      status: "Documentation riche"
    },
    {
      title: "Après-guerre",
      period: "1945 - 2000",
      description: "La reconstruction et l'évolution de la famille",
      status: "À compléter"
    },
    {
      title: "Génération actuelle",
      period: "2000 - Aujourd'hui",
      description: "L'histoire contemporaine de la famille",
      status: "En cours"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Histoire Familiale</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez l'histoire de la famille DECKER à travers les siècles, des origines jusqu'à aujourd'hui
          </p>
        </div>

        <Separator className="my-8" />

        {/* Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="h-6 w-6" />
            Timeline chronologique
          </h2>

          <div className="grid gap-6">
            {periods.map((period, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 dark:bg-blue-400" />
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-2xl">{period.title}</CardTitle>
                      <CardDescription className="text-lg mt-1">{period.period}</CardDescription>
                    </div>
                    <Badge variant="secondary">{period.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{period.description}</p>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      Le contenu détaillé de cette période sera ajouté prochainement avec photos, documents et récits.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <Card className="mt-12 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Contribuez à l'histoire familiale</CardTitle>
            <CardDescription>
              Vous avez des souvenirs, photos ou documents à partager ? Contactez l'administrateur pour enrichir cette section.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
