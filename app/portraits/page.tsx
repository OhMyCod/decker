import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

export default function PortraitsPage() {
  // Exemples de membres (à remplacer par de vraies données)
  const memberCategories = [
    {
      title: "Personnalités marquantes",
      description: "Membres ayant eu un impact significatif sur l'histoire familiale",
      count: "À documenter"
    },
    {
      title: "Génération des grands-parents",
      description: "La génération qui a connu les guerres mondiales",
      count: "À documenter"
    },
    {
      title: "Génération des parents",
      description: "La génération de l'après-guerre",
      count: "À documenter"
    },
    {
      title: "Génération actuelle",
      description: "Les membres contemporains de la famille",
      count: "À documenter"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-12 w-12 text-green-600 dark:text-green-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Portraits des Membres</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les membres marquants de la famille DECKER à travers leurs biographies et contributions
          </p>
        </div>

        <Separator className="my-8" />

        {/* Special section for Colonel Rémy */}
        <Card className="mb-8 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-2xl bg-green-200 dark:bg-green-800">R</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Colonel Rémy</CardTitle>
                <CardDescription className="text-base">
                  Personnage historique majeur de la famille - Résistant et héros de la France libre
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Une fiche détaillée avec biographie complète, documents d'archives INA et témoignages sera disponible prochainement.
            </p>
          </CardContent>
        </Card>

        {/* Member categories */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Membres par génération</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {memberCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <Users className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-muted-foreground">{category.count}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <Card className="mt-12 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle>Contribuez aux portraits</CardTitle>
            <CardDescription>
              Vous souhaitez ajouter un portrait ou compléter les informations ? Contactez l'administrateur du site.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
