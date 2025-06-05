import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Copy, Edit } from "lucide-react"
import { VSL_TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/constants/vslTemplates"

export default function VSLTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">VSL Page Templates</h1>
          <p className="text-muted-foreground">Choose from professionally designed templates</p>
        </div>
      </div>

      {Object.entries(TEMPLATE_CATEGORIES).map(([category, templateKeys]) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templateKeys.map((templateKey) => {
              const template = VSL_TEMPLATES[templateKey]
              return (
                <Card key={templateKey} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">
                          {template.template_type}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-secondary">Title:</p>
                      <p className="text-sm text-foreground">{template.title}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary">Headline:</p>
                      <p className="text-sm text-foreground line-clamp-2">{template.headline}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-secondary">Key Features:</p>
                      <ul className="text-sm text-foreground">
                        {template.bullet_points?.slice(0, 3).map((point, index) => (
                          <li key={index} className="line-clamp-1">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Use Template
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
