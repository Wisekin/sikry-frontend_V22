"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/OverviewTab"
import { EngagementTab } from "./tabs/EngagementTab"
import { InsightsTab } from "./tabs/InsightsTab"
import { ConfigTab } from "./tabs/ConfigTab"
import { CompanyHeader } from "@/components/company/CompanyHeader"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

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

export default function CompanyDetailPage() {
  const params = useParams()
  const companyId = params.id as string
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const mockCompany: CompanyData = {
    id: companyId,
    name: "TechFlow Solutions",
    domain: "techflow.ch",
    location_text: "Geneva, Switzerland",
    industry: "Software Development",
    employees: "25-50",
    description: "Leading digital transformation consultancy specializing in React and TypeScript solutions.",
    founded: "2018",
    website: "https://techflow.ch",
    extractedData: {
      emails: [
        { value: "contact@techflow.ch", confidence: 95, source: "Website Contact Page" },
        { value: "hello@techflow.ch", confidence: 88, source: "LinkedIn About Section" },
        { value: "careers@techflow.ch", confidence: 82, source: "Jobs Page" },
      ],
      phones: [
        { value: "+41 22 123 4567", confidence: 92, source: "Website Footer" },
        { value: "+41 22 123 4568", confidence: 78, source: "Google Business Listing" },
      ],
      technologies: [
        { value: "React", confidence: 98, category: "Frontend Framework" },
        { value: "TypeScript", confidence: 96, category: "Programming Language" },
        { value: "Node.js", confidence: 94, category: "Backend Runtime" },
        { value: "AWS", confidence: 89, category: "Cloud Platform" },
        { value: "Docker", confidence: 85, category: "DevOps" },
        { value: "PostgreSQL", confidence: 83, category: "Database" },
      ],
      addresses: [
        { value: "Rue du Rhône 123, 1204 Geneva, Switzerland", confidence: 94, type: "Headquarters" },
        { value: "Bahnhofstrasse 45, 8001 Zurich, Switzerland", confidence: 76, type: "Branch Office" },
      ],
      socialMedia: [
        { platform: "LinkedIn", url: "https://linkedin.com/company/techflow-solutions", confidence: 98 },
        { platform: "Twitter", url: "https://twitter.com/techflowch", confidence: 85 },
        { platform: "GitHub", url: "https://github.com/techflow-solutions", confidence: 92 },
      ],
    },
    confidenceScore: 95,
    lastScraped: "2024-01-15T10:30:00Z",
    scrapingHistory: [
      { date: "2024-01-15", fieldsFound: 18, confidence: 95 },
      { date: "2024-01-10", fieldsFound: 16, confidence: 92 },
      { date: "2024-01-05", fieldsFound: 14, confidence: 88 },
      { date: "2024-01-01", fieldsFound: 12, confidence: 85 },
    ],
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setCompany(mockCompany)
      setLoading(false)
    }, 1000)
  }, [companyId])

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
            <Text className="text-secondary">Loading company details...</Text>
          </div>
        </div>
      </AppShell>
    )
  }

  if (!company) {
    return (
      <AppShell>
        <div className="text-center py-12">
          <Heading level={2} className="mb-2">
            Company Not Found
          </Heading>
          <Text className="text-secondary mb-4">The company you're looking for doesn't exist.</Text>
          <Button asChild>
            <Link href="/companies">Back to Companies</Link>
          </Button>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/companies">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Companies
          </Link>
        </Button>

        {/* Company Header */}
        <CompanyHeader company={company} />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab company={company} />
          </TabsContent>

          <TabsContent value="engagement">
            <EngagementTab companyId={company.id} />
          </TabsContent>

          <TabsContent value="insights">
            <InsightsTab company={company} />
          </TabsContent>

          <TabsContent value="configuration">
            <ConfigTab company={company} />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
