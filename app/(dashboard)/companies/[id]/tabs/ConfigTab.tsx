import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Settings } from "lucide-react"

interface CompanyData {
  id: string
  name: string
  domain: string
  location_text: string
  industry: string
  employees: string
  description: string
  logo?: string
  founded?: string
  website: string
  extractedData: {
    emails: Array<{ value: string; confidence: number; source: string }>
    phones: Array<{ value: string; confidence: number; source: string }>
    technologies: Array<{ value: string; confidence: number; category: string }>
    addresses: Array<{ value: string; confidence: number; type: string }>
    socialMedia: Array<{ platform: string; url: string; confidence: number }>
  }
  confidenceScore: number
  lastScraped: string
  scrapingHistory: Array<{ date: string; fieldsFound: number; confidence: number }>
}

interface ConfigTabProps {
  company: CompanyData
}

export function ConfigTab({ company }: ConfigTabProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Scraping Configuration
        </CardTitle>
        <CardDescription>Customize data extraction settings and field detection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Auto-Detection Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-caption">Email Detection</span>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption">Phone Detection</span>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption">Technology Stack Detection</span>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  Enabled
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-caption">Social Media Detection</span>
                <Badge variant="outline">Disabled</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Confidence Thresholds</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-caption mb-2">
                  <span>Minimum Confidence Score</span>
                  <span>70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button>Save Configuration</Button>
            <Button variant="outline">Reset to Defaults</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
