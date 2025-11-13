import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Music, Camera, Paintbrush, Video, FileText } from "lucide-react";

export default function CreationsPage() {
  const categories = [
    { icon: Music, label: "Musique", value: "musique", color: "text-purple-600 dark:text-purple-400" },
    { icon: Camera, label: "Photographies", value: "photos", color: "text-blue-600 dark:text-blue-400" },
    { icon: Paintbrush, label: "Peintures", value: "peintures", color: "text-red-600 dark:text-red-400" },
    { icon: Video, label: "Vidéos", value: "videos", color: "text-green-600 dark:text-green-400" },
    { icon: FileText, label: "Textes", value: "textes", color: "text-orange-600 dark:text-orange-400" }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Palette className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Créations Artistiques</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Musique, photographies, peintures, vidéos et textes créés par les membres de la famille
          </p>
        </div>

        <Separator className="my-8" />

        {/* Tabs */}
        <Tabs defaultValue="musique" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger key={cat.value} value={cat.value}>
                  <Icon className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{cat.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <TabsContent key={cat.value} value={cat.value} className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon className={`h-8 w-8 ${cat.color}`} />
                      <div>
                        <CardTitle className="text-2xl">{cat.label}</CardTitle>
                        <CardDescription>
                          {cat.value === "musique" && "Albums, maquettes et archives musicales"}
                          {cat.value === "photos" && "Séries photographiques et projets artistiques"}
                          {cat.value === "peintures" && "Œuvres peintes et dessins"}
                          {cat.value === "videos" && "Courts métrages, captations et montages"}
                          {cat.value === "textes" && "Poèmes, autobiographie et textes philosophiques"}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    <div className="p-12 bg-muted rounded-lg text-center">
                      <Icon className={`h-16 w-16 mx-auto mb-4 ${cat.color} opacity-50`} />
                      <p className="text-muted-foreground text-lg mb-2">
                        Section en cours de développement
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Le contenu sera ajouté prochainement
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Info */}
        <Card className="mt-8 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle>Collection en cours de constitution</CardTitle>
            <CardDescription>
              Les créations artistiques sont en cours de catalogage et de numérisation. Cette section sera enrichie progressivement.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
