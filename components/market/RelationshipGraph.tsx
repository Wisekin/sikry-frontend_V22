import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Network, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { Text } from "@/components/core/typography/Text"

export function RelationshipGraph() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Network className="w-5 h-5" />
              Company Relationship Graph
            </CardTitle>
            <CardDescription>Visualize connections and partnerships</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
          <div>
            <Network className="w-16 h-16 mx-auto text-secondary mb-4" />
            <Text className="text-secondary">Interactive relationship graph will be available in the next update.</Text>
            <Text size="sm" className="text-secondary mt-2">
              Force-directed visualization of company connections and partnerships.
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
