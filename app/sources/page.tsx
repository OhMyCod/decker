import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, BookOpen, Building2, Users, Archive } from "lucide-react";

export default function SourcesPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Sources & Méthodologie</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Documentation des sources utilisées et méthodologie de recherche généalogique
          </p>
        </div>

        <Separator className="my-8" />

        {/* Methodology section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
              <div>
                <CardTitle className="text-2xl">Méthodologie de recherche</CardTitle>
                <CardDescription>
                  Approche systématique pour constituer l'histoire familiale
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">
                  Collecte des informations
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      La collecte d'informations s'effectue via plusieurs canaux complémentaires :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Témoignages oraux des membres de la famille</li>
                      <li>Documents familiaux (actes d'état civil, correspondances)</li>
                      <li>Archives publiques (archives départementales, nationales)</li>
                      <li>Archives spécialisées (INA, archives militaires)</li>
                      <li>Publications et ouvrages historiques</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">
                  Vérification et validation
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Chaque information fait l'objet d'une vérification rigoureuse :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Croisement de plusieurs sources indépendantes</li>
                      <li>Vérification des dates et lieux via l'état civil</li>
                      <li>Analyse critique des témoignages oraux</li>
                      <li>Consultation d'experts pour les périodes historiques</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">
                  Numérisation et conservation
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      Les documents et photos suivent un processus de numérisation professionnel :
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Scanner haute résolution (300 DPI minimum)</li>
                      <li>Restauration numérique des photos anciennes</li>
                      <li>Transcription des documents manuscrits</li>
                      <li>Stockage sécurisé avec sauvegarde multiple</li>
                      <li>Métadonnées détaillées (date, lieu, personnes)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Official sources */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <CardTitle className="text-2xl">Sources officielles</CardTitle>
                <CardDescription>
                  Archives et institutions consultées
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-blue-600 dark:border-l-blue-400">
                <CardHeader>
                  <CardTitle className="text-lg">Archives nationales</CardTitle>
                  <CardDescription>Paris, Pierrefitte-sur-Seine</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">État civil</Badge>
                  <Badge variant="secondary" className="ml-2">Documents militaires</Badge>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600 dark:border-l-blue-400">
                <CardHeader>
                  <CardTitle className="text-lg">Archives départementales</CardTitle>
                  <CardDescription>Divers départements</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Registres paroissiaux</Badge>
                  <Badge variant="secondary" className="ml-2">Actes notariés</Badge>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600 dark:border-l-blue-400">
                <CardHeader>
                  <CardTitle className="text-lg">INA - Institut National de l'Audiovisuel</CardTitle>
                  <CardDescription>Archives audiovisuelles</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Interviews Colonel Rémy</Badge>
                  <Badge variant="secondary" className="ml-2">Documentaires</Badge>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600 dark:border-l-blue-400">
                <CardHeader>
                  <CardTitle className="text-lg">Service Historique de la Défense</CardTitle>
                  <CardDescription>Archives militaires</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">Dossiers militaires</Badge>
                  <Badge variant="secondary" className="ml-2">Résistance</Badge>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Bibliography */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Archive className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div>
                <CardTitle className="text-2xl">Bibliographie</CardTitle>
                <CardDescription>
                  Ouvrages et publications de référence
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">Ouvrages sur le Colonel Rémy</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mémoires publiés par le Colonel Rémy (à documenter)</li>
                  <li>• Biographies et études historiques (à compléter)</li>
                  <li>• Articles de presse d'époque (à référencer)</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">Ouvrages historiques généraux</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Histoire de la Résistance française (références à ajouter)</li>
                  <li>• Histoire sociale de la France (XIXᵉ-XXᵉ siècles)</li>
                  <li>• Guides méthodologiques de généalogie</li>
                </ul>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="font-semibold mb-2">Publications familiales</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Documents et correspondances privées</li>
                  <li>• Carnets personnels et journaux intimes</li>
                  <li>• Albums photos annotés</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contributors */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div>
                <CardTitle className="text-2xl">Contributeurs</CardTitle>
                <CardDescription>
                  Personnes ayant contribué à la recherche
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-8 bg-muted rounded-lg text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                La liste des contributeurs sera ajoutée prochainement
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Remerciements aux membres de la famille et chercheurs ayant participé
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to action */}
        <Card className="bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800">
          <CardHeader>
            <CardTitle>Contribuez à la documentation</CardTitle>
            <CardDescription>
              Vous avez des informations sur les sources utilisées ou souhaitez signaler une erreur ? Contactez l'administrateur.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
