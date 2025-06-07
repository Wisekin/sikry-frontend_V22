import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Text } from "@/components/core/typography/Text"
import { Heading } from "@/components/core/typography/Heading"

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

interface InsightsTabProps {
  company: CompanyData
}

export function InsightsTab({ company }: InsightsTabProps) {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>AI-Generated Insights</CardTitle>
        <CardDescription>Intelligent analysis of company data and market position</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <TrendingUp className="w-16 h-16 mx-auto text-secondary mb-4" />
          <Heading level={3} className="mb-2">
            AI Insights Coming Soon
          </Heading>
          <Text className="text-secondary">
            Advanced market intelligence and competitive analysis will be available in the next update.
          </Text>
        </div>
      </CardContent>
    </Card>
  )
}
