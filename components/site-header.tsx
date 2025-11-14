"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menu,
  Home,
  BookOpen,
  Archive,
  Palette,
  Users,
  Network,
  MessageSquare,
  Download,
  FileText,
  Building2
} from "lucide-react";

const navigationItems = [
  {
    title: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    title: "Histoire familiale",
    href: "/histoire",
    icon: BookOpen,
    subItems: [
      { title: "Les Origines", href: "/histoire/origines" },
      { title: "XIXᵉ siècle", href: "/histoire/xixe" },
      { title: "XXᵉ siècle", href: "/histoire/xxe" },
      { title: "Après-guerre → 2000", href: "/histoire/apres-guerre" },
      { title: "Génération actuelle", href: "/histoire/actuelle" },
    ],
  },
  {
    title: "Archives & Documents",
    href: "/archives",
    icon: Archive,
  },
  {
    title: "Créations artistiques",
    href: "/creations",
    icon: Palette,
    subItems: [
      { title: "Musique", href: "/creations#musique" },
      { title: "Photographies", href: "/creations#photos" },
      { title: "Peintures", href: "/creations#peintures" },
      { title: "Vidéos", href: "/creations#videos" },
      { title: "Textes", href: "/creations#textes" },
    ],
  },
  {
    title: "Portraits",
    href: "/portraits",
    icon: Users,
  },
  {
    title: "Arbre généalogique",
    href: "/genealogie",
    icon: Network,
  },
  {
    title: "Témoignages",
    href: "/temoignages",
    icon: MessageSquare,
  },
  {
    title: "Téléchargements",
    href: "/telechargements",
    icon: Download,
  },
  {
    title: "Méthode & Sources",
    href: "/sources",
    icon: FileText,
  },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between gap-2 px-4">
        {/* Left side - Sidebar trigger and logo */}
        <div className="flex items-center gap-2">
          {/* Desktop sidebar trigger */}
          <SidebarTrigger className="-ml-1 hidden md:inline-flex" />
          <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="text-lg font-semibold hidden sm:inline-block">Famille DECKER</span>
            <span className="text-lg font-semibold sm:hidden">DECKER</span>
          </Link>
        </div>

        {/* Right side - Mobile menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Famille DECKER
              </SheetTitle>
              <SheetDescription>
                Navigation du site familial
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
              <nav className="flex flex-col gap-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
                          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.title}
                      </Link>

                      {/* Sub-items */}
                      {item.subItems && (
                        <div className="ml-8 mt-1 flex flex-col gap-1">
                          {item.subItems.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setOpen(false)}
                                className={`rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                                  isSubActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
