"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const periodMap: Record<string, { title: string; path: string }> = {
  "/histoire/origines": { title: "Les Origines", path: "/histoire/origines" },
  "/histoire/xixe": { title: "XIXᵉ siècle", path: "/histoire/xixe" },
  "/histoire/xxe": { title: "XXᵉ siècle", path: "/histoire/xxe" },
  "/histoire/apres-guerre": { title: "Après-guerre → 2000", path: "/histoire/apres-guerre" },
  "/histoire/actuelle": { title: "Génération actuelle", path: "/histoire/actuelle" },
}

export function HistoireBreadcrumb() {
  const pathname = usePathname()
  const isIndexPage = pathname === "/histoire"
  const currentPeriod = periodMap[pathname]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Accueil</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {isIndexPage ? (
          <BreadcrumbItem>
            <BreadcrumbPage>Histoire familiale</BreadcrumbPage>
          </BreadcrumbItem>
        ) : (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/histoire">Histoire familiale</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPeriod?.title || "Période"}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

