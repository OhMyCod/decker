import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Image, Video, Music } from "lucide-react";

export default function TelechargementPage() {
  const downloadCategories = [
    {
      icon: FileText,
      label: "Documents PDF",
      value: "pdf",
      color: "text-red-600 dark:text-red-400",
      description: "Arbres généalogiques, biographies, chronologies"
    },
    {
      icon: Image,
      label: "Photos HD",
      value: "photos",
      color: "text-blue-600 dark:text-blue-400",
      description: "Photographies anciennes restaurées en haute définition"
    },
    {
      icon: Video,
      label: "Vidéos",
      value: "videos",
      color: "text-green-600 dark:text-green-400",
      description: "Captations d'archives et documentaires"
    },
    {
      icon: Music,
      label: "Audio",
      value: "audio",
      color: "text-purple-600 dark:text-purple-400",
      description: "Enregistrements musicaux et témoignages oraux"
    }
  ];

  const sampleDownloads = [
    {
      title: "Arbre généalogique complet",
      description: "Version PDF complète avec 5 générations",
      size: "2.3 MB",
      format: "PDF",
      category: "pdf"
    },
    {
      title: "Biographie du Colonel Rémy",
      description: "Document détaillé avec photos et documents",
      size: "5.1 MB",
      format: "PDF",
      category: "pdf"
    },
    {
      title: "Photos restaurées (1920-1950)",
      description: "Collection de 45 photos HD restaurées",
      size: "156 MB",
      format: "ZIP",
      category: "photos"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Download className="h-12 w-12 text-teal-600 dark:text-teal-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Téléchargements</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Documents, photos, vidéos et enregistrements audio à télécharger
          </p>
        </div>

        <Separator className="my-8" />

        {/* Tabs */}
        <Tabs defaultValue="pdf" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {downloadCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger key={cat.value} value={cat.value}>
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {downloadCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <TabsContent key={cat.value} value={cat.value} className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-8 w-8 ${cat.color}`} />
                      <div>
                        <CardTitle className="text-2xl">{cat.label}</CardTitle>
                        <CardDescription>{cat.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Example downloads for PDF category */}
                      {cat.value === "pdf" && sampleDownloads.filter(d => d.category === "pdf").map((download, index) => (
                        <Card key={index} className="border-l-4 border-l-red-600 dark:border-l-red-400">
                          <CardHeader>
                            <div className="flex items-start justify-between flex-wrap gap-2">
                              <div>
                                <CardTitle className="text-lg">{download.title}</CardTitle>
                                <CardDescription>{download.description}</CardDescription>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="secondary">{download.format}</Badge>
                                <Badge variant="outline">{download.size}</Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Button disabled variant="default" className="w-full sm:w-auto">
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Placeholder for other categories */}
                      {cat.value !== "pdf" && (
                        <div className="p-12 bg-muted rounded-lg text-center">
                          <Icon className={`h-16 w-16 mx-auto mb-4 ${cat.color} opacity-50`} />
                          <p className="text-muted-foreground text-lg mb-2">
                            Section en cours de préparation
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Les fichiers seront disponibles au téléchargement prochainement
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Info boxes */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage des téléchargements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Les documents sont destinés à un usage familial uniquement. Merci de respecter les droits d'auteur et la vie privée.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Qualité et formats</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tous les documents sont disponibles en haute qualité. Photos en 300 DPI minimum, vidéos en 1080p.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to action */}
        <Card className="mt-8 bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800">
          <CardHeader>
            <CardTitle>Contribuez aux téléchargements</CardTitle>
            <CardDescription>
              Vous avez des documents, photos ou enregistrements à partager ? Contactez l'administrateur pour les ajouter à la bibliothèque.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
