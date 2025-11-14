import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export default function AujourdhuiPage() {
  return (
    <div id="timeline-section-actuelle" data-timeline-section="actuelle" className="space-y-6">
      <SectionHeader
        title="Aujourd'hui"
        description="L'histoire contemporaine de la famille et la génération actuelle"
        icon={Sparkles}
      />

      <Card>
        <CardHeader>
          <CardTitle>Période historique</CardTitle>
          <CardDescription>2000 - Aujourd&apos;hui</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </CardContent>
      </Card>

      <Separator />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Génération actuelle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projets et réalisations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Histoire en cours</CardTitle>
            <Badge variant="default">En cours</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos 
            qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

