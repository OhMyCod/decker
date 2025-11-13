import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, Archive, Palette, Users, Network, MessageSquare, Download, FileText } from "lucide-react";

export default function HomePage() {
  const sections = [
    {
      title: "Histoire Familiale",
      description: "Découvrez l'histoire de la famille DECKER à travers les siècles",
      icon: BookOpen,
      href: "/histoire",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Archives & Documents",
      description: "Photos anciennes, vidéos INA et documents historiques",
      icon: Archive,
      href: "/archives",
      color: "text-amber-600 dark:text-amber-400"
    },
    {
      title: "Créations Artistiques",
      description: "Musique, photographies, peintures, vidéos et textes",
      icon: Palette,
      href: "/creations",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Portraits",
      description: "Découvrez les membres marquants de la famille",
      icon: Users,
      href: "/portraits",
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Arbre Généalogique",
      description: "Explorez les liens familiaux de manière interactive",
      icon: Network,
      href: "/genealogie",
      color: "text-red-600 dark:text-red-400"
    },
    {
      title: "Témoignages",
      description: "Souvenirs et anecdotes racontés par les membres",
      icon: MessageSquare,
      href: "/temoignages",
      color: "text-pink-600 dark:text-pink-400"
    },
    {
      title: "Téléchargements",
      description: "Archive numérique et ressources téléchargeables",
      icon: Download,
      href: "/telechargements",
      color: "text-cyan-600 dark:text-cyan-400"
    },
    {
      title: "Méthode & Sources",
      description: "Méthodologie de recherche et sources documentaires",
      icon: FileText,
      href: "/sources",
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Famille DECKER
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Un voyage à travers l&apos;histoire, les souvenirs et les créations d&apos;une famille
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/histoire">
                <BookOpen className="mr-2 h-5 w-5" />
                Découvrir l'histoire
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/genealogie">
                <Network className="mr-2 h-5 w-5" />
                Arbre généalogique
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Explorez le site
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href}>
                  <Card className="h-full transition-all hover:shadow-lg hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Icon className={`h-8 w-8 ${section.color}`} />
                        <CardTitle>{section.title}</CardTitle>
                      </div>
                      <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">À propos de ce site</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Ce site familial a été créé pour préserver et partager l&apos;histoire de la famille DECKER.
            Vous y trouverez des documents historiques, des archives familiales, des créations artistiques
            et bien plus encore.
          </p>
          <p className="text-lg text-muted-foreground">
            Un projet de mémoire familiale pour les générations présentes et futures.
          </p>
        </div>
      </section>
    </div>
  );
}
