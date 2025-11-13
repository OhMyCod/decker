import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Quote } from "lucide-react";

export default function TemoignagesPage() {
  const testimonialCategories = [
    {
      category: "Souvenirs familiaux",
      description: "Récits et anecdotes transmis de génération en génération",
      color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800"
    },
    {
      category: "Témoignages historiques",
      description: "Récits sur les périodes marquantes de l'histoire",
      color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800"
    },
    {
      category: "Colonel Rémy",
      description: "Témoignages et souvenirs sur le héros de la Résistance",
      color: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Témoignages</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Récits, souvenirs et anecdotes transmis par les membres de la famille
          </p>
        </div>

        <Separator className="my-8" />

        {/* Filters */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par auteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les auteurs</SelectItem>
                <SelectItem value="placeholder">À venir</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filtrer par thème" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les thèmes</SelectItem>
                <SelectItem value="family">Souvenirs familiaux</SelectItem>
                <SelectItem value="history">Témoignages historiques</SelectItem>
                <SelectItem value="remy">Colonel Rémy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Testimonial categories */}
        <div className="space-y-6">
          {testimonialCategories.map((cat, index) => (
            <Card key={index} className={cat.color}>
              <CardHeader>
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Quote className="h-6 w-6" />
                      {cat.category}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {cat.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">En cours de collecte</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-8 bg-background/50 rounded-lg text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Les témoignages seront ajoutés prochainement
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Chaque témoignage inclura l'auteur, la date, et des photos si disponibles
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <Card className="mt-12 bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle>Partagez vos témoignages</CardTitle>
            <CardDescription>
              Vous avez des souvenirs, anecdotes ou témoignages à partager ? Contactez l'administrateur pour contribuer à cette section.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
