import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Network, Download, Search } from "lucide-react";

export default function GenealogiePage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Network className="h-12 w-12 text-red-600 dark:text-red-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Arbre Généalogique</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explorez les liens familiaux de manière interactive et découvrez votre place dans l'histoire familiale
          </p>
        </div>

        <Separator className="my-8" />

        {/* Main card with placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Visualisation interactive</CardTitle>
            <CardDescription>
              L'arbre généalogique interactif permettra de naviguer à travers les générations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Network className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
                <p className="text-xl font-semibold text-muted-foreground mb-2">
                  Arbre généalogique en cours de développement
                </p>
                <p className="text-muted-foreground">
                  Visualisation interactive avec zoom, navigation et fiches détaillées
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <Button disabled variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Rechercher un membre
              </Button>
              <Button disabled variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Télécharger en PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation interactive</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Zoom, déplacement et exploration fluide de l'arbre familial
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fiches détaillées</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Cliquez sur un membre pour voir sa biographie, photos et documents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vues multiples</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ascendance, descendance ou vue complète selon vos besoins
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <Card className="mt-8 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle>En cours de développement</CardTitle>
            <CardDescription>
              L'arbre généalogique interactif est en cours de développement. Une version PDF sera disponible prochainement.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
