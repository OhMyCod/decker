import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  BookOpen,
  Archive,
  Palette,
  Users,
  Network,
  MessageSquare,
  Download,
  FileText,
  Mail,
  Info,
  Link as LinkIcon
} from "lucide-react"

const navigationLinks = [
  { title: "Accueil", href: "/", icon: Home },
  { title: "Histoire familiale", href: "/histoire", icon: BookOpen },
  { title: "Archives & Documents", href: "/archives", icon: Archive },
  { title: "Créations artistiques", href: "/creations", icon: Palette },
  { title: "Portraits", href: "/portraits", icon: Users },
  { title: "Arbre généalogique", href: "/genealogie", icon: Network },
  { title: "Témoignages", href: "/temoignages", icon: MessageSquare },
  { title: "Téléchargements", href: "/telechargements", icon: Download },
  { title: "Méthode & Sources", href: "/sources", icon: FileText },
]

export function SiteFooter() {
  return (
    <footer className="border-t py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 : À propos du site */}
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">À propos du site</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription className="text-sm leading-relaxed">
                Ce site familial a été créé pour préserver et partager l&apos;histoire de la famille DECKER.
                Un projet de mémoire familiale pour les générations présentes et futures.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Colonne 2 : Liens internes */}
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Navigation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {navigationLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.title}</span>
                    </Link>
                  )
                })}
              </nav>
            </CardContent>
          </Card>

          {/* Colonne 3 : Sources & Contact */}
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Sources & Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Contact</p>
                <a
                  href="mailto:famille@decker.fr"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>famille@decker.fr</span>
                </a>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-sm font-medium">Sources</p>
                <Link
                  href="/sources"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Méthode & Sources</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Séparateur et copyright */}
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Famille DECKER. Tous droits réservés.</p>
          <p className="mt-1">Un projet de mémoire familiale</p>
        </div>
      </div>
    </footer>
  )
}
