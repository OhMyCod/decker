import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Archive, Image, Video, FileText } from "lucide-react";

export default function ArchivesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Archive className="h-12 w-12 text-amber-600 dark:text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Archives & Documents</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Photos anciennes, vidéos INA, documents historiques et archives familiales
          </p>
        </div>

        <Separator className="my-8" />

        {/* Tabs for different types */}
        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photos">
              <Image className="h-4 w-4 mr-2" />
              Photos anciennes
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="h-4 w-4 mr-2" />
              Vidéos INA
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Photographies anciennes</CardTitle>
                <CardDescription>
                  Collection de photos familiales numérisées et restaurées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 bg-muted rounded-lg text-center">
                  <Image className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    La galerie de photos sera disponible prochainement
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Photos organisées par période, personnes et lieux
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Vidéos INA et interviews</CardTitle>
                <CardDescription>
                  Archives vidéo de l'INA, notamment sur le Colonel Rémy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-8 bg-muted rounded-lg text-center">
                    <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Les vidéos seront intégrées prochainement
                    </p>
                  </div>
                  <Badge variant="outline" className="w-full justify-center py-2">
                    Section en cours de développement - Documents INA en cours d'acquisition
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents familiaux</CardTitle>
                <CardDescription>
                  Correspondances, actes officiels, carnets et notes manuscrites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-8 bg-muted rounded-lg text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    La bibliothèque de documents sera disponible prochainement
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Documents numérisés avec transcriptions HD
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info card */}
        <Card className="mt-8 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle>En cours de numérisation</CardTitle>
            <CardDescription>
              Les archives sont en cours de numérisation et de restauration. Cette section sera régulièrement enrichie.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
