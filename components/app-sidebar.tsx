"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState } from "react"
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
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  Building2
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigationGroups = [
  {
    label: "Navigation",
    items: [
      {
        title: "Accueil",
        url: "/",
        icon: Home,
      },
      {
        title: "Histoire familiale",
        url: "/histoire",
        icon: BookOpen,
        subItems: [
          { title: "Les Origines", url: "/histoire/origines" },
          { title: "XIXᵉ siècle", url: "/histoire/xixe" },
          { title: "XXᵉ siècle", url: "/histoire/xxe" },
          { title: "Après-guerre", url: "/histoire/apres-guerre" },
          { title: "Génération actuelle", url: "/histoire/actuelle" },
        ],
      },
      {
        title: "Archives & Documents",
        url: "/archives",
        icon: Archive,
      },
      {
        title: "Créations artistiques",
        url: "/creations",
        icon: Palette,
        subItems: [
          { title: "Musique", url: "/creations/musique" },
          { title: "Photographies", url: "/creations/photos" },
          { title: "Peintures", url: "/creations/peintures" },
          { title: "Vidéos", url: "/creations/videos" },
          { title: "Textes", url: "/creations/textes" },
        ],
      },
    ],
  },
  {
    label: "Exploration",
    items: [
      {
        title: "Portraits",
        url: "/portraits",
        icon: Users,
      },
      {
        title: "Arbre généalogique",
        url: "/genealogie",
        icon: Network,
      },
      {
        title: "Témoignages",
        url: "/temoignages",
        icon: MessageSquare,
      },
    ],
  },
  {
    label: "Ressources",
    items: [
      {
        title: "Téléchargements",
        url: "/telechargements",
        icon: Download,
      },
      {
        title: "Méthode & Sources",
        url: "/sources",
        icon: FileText,
      },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    )
  }

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Building2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">DECKER</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">Famille</span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Famille DECKER
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navigationGroups.map((group, groupIndex) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const hasSubItems = item.subItems && item.subItems.length > 0
                  const isOpen = openItems.includes(item.title)
                  const isActive = pathname === item.url || (hasSubItems && item.subItems?.some(sub => pathname === sub.url))

                  if (hasSubItems) {
                    return (
                      <Collapsible
                        key={item.title}
                        asChild
                        open={isOpen}
                        onOpenChange={() => toggleItem(item.title)}
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={item.title}
                              isActive={isActive}
                            >
                              <item.icon />
                              <span>{item.title}</span>
                              <ChevronRight
                                className={`ml-auto size-4 transition-transform ${
                                  isOpen ? "rotate-90" : ""
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subItems.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === subItem.url}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        tooltip={item.title}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            {groupIndex < navigationGroups.length - 1 && <SidebarSeparator />}
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      FD
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Famille DECKER</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      famille@decker.fr
                    </span>
                  </div>
                  <ChevronDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="start"
                side="top"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        FD
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Famille DECKER</span>
                      <span className="truncate text-xs text-sidebar-foreground/70">
                        famille@decker.fr
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                  {resolvedTheme === "light" ? (
                    <>
                      <Moon className="mr-2 size-4" />
                      <span>Mode sombre</span>
                    </>
                  ) : (
                    <>
                      <Sun className="mr-2 size-4" />
                      <span>Mode clair</span>
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 size-4" />
                  <span>Système</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 size-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}