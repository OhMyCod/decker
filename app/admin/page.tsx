import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Users,
  FileText,
  Image,
  Video,
  Music,
  Settings,
  Database,
  AlertTriangle,
  Lock
} from "lucide-react";

export default function AdminPage() {
  const adminSections = [
    {
      title: "Gestion des membres",
      description: "Ajouter, modifier ou supprimer des fiches membres",
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      title: "Gestion du contenu",
      description: "Éditer les pages du site et les sections",
      icon: FileText,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800"
    },
    {
      title: "Gestion des médias",
      description: "Upload et organisation des photos, vidéos et audio",
      icon: Image,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      title: "Gestion des archives",
      description: "Numérisation et catalogage des documents",
      icon: Database,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950",
      borderColor: "border-amber-200 dark:border-amber-800"
    },
    {
      title: "Témoignages",
      description: "Modération et publication des témoignages",
      icon: Video,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      borderColor: "border-indigo-200 dark:border-indigo-800"
    },
    {
      title: "Créations artistiques",
      description: "Gestion des œuvres et catalogues",
      icon: Music,
      color: "text-pink-600 dark:text-pink-400",
      bgColor: "bg-pink-50 dark:bg-pink-950",
      borderColor: "border-pink-200 dark:border-pink-800"
    },
    {
      title: "Configuration du site",
      description: "Paramètres généraux et personnalisation",
      icon: Settings,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-gray-50 dark:bg-gray-950",
      borderColor: "border-gray-200 dark:border-gray-800"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-red-600 dark:text-red-400" />
            <h1 className="text-4xl md:text-5xl font-bold">Administration</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Espace réservé aux administrateurs du site familial
          </p>
        </div>

        <Separator className="my-8" />

        {/* Authentication notice */}
        <Card className="mb-8 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
          <CardHeader>
            <div className="flex items-start gap-4">
              <Lock className="h-8 w-8 text-red-600 dark:text-red-400 mt-1" />
              <div className="flex-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Accès protégé - Authentification requise
                </CardTitle>
                <CardDescription className="mt-2">
                  Cette zone est réservée aux administrateurs autorisés. Le système d'authentification sera implémenté dans une prochaine version.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button disabled variant="default">
              <Lock className="mr-2 h-4 w-4" />
              Se connecter
            </Button>
          </CardContent>
        </Card>

        {/* Dashboard sections */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold">Tableau de bord</h2>
            <Badge variant="secondary">En développement</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {adminSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className={`${section.borderColor} border-l-4`}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${section.bgColor}`}>
                        <Icon className={`h-6 w-6 ${section.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button disabled variant="outline" className="w-full">
                      Accéder
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Statistics placeholder */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Statistiques du site</CardTitle>
            <CardDescription>
              Vue d'ensemble des contenus et activités
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-sm text-muted-foreground">Membres</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-sm text-muted-foreground">Photos</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">--</p>
                <p className="text-sm text-muted-foreground">Vidéos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Development info */}
        <Card className="mt-8 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardHeader>
            <CardTitle>Fonctionnalités à venir</CardTitle>
            <CardDescription>
              L'espace d'administration sera développé en plusieurs phases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Système d'authentification avec NextAuth.js</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Interface de gestion des membres avec formulaires</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Upload et gestion des médias via Cloudinary</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Éditeur de contenu avec prévisualisation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Système de modération pour les témoignages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Gestion des droits d'accès et rôles utilisateurs</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
