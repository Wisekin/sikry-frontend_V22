"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartSearchBar } from "@/components/smart-search-bar"
import { CompanyCard } from "@/components/company-card"
import { MapPin, Filter, Download, Grid, Map, List, Loader2 } from "lucide-react"
import Link from "next/link"

interface Company {
  id: string
  name: string
  domain: string
  location_text: string
  industry: string
  employees: string
  description: string
  logo?: string
  confidenceScore: number
  extractedData: {
    emails: string[]
    phones: string[]
    technologies: string[]
  }
  lastScraped: string
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const sources = searchParams.get("sources")?.split(",") || []

  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filters, setFilters] = useState({
    industry: "All Industries",
    location_text: "",
    employeeCount: "All Sizes",
    confidenceScore: 0,
  })

  // Mock data for demonstration
  const mockCompanies: Company[] = [
    {
      id: "1",
      name: "TechFlow Solutions",
      domain: "techflow.ch",
      location_text: "Geneva, Switzerland",
      industry: "Software Development",
      employees: "25-50",
      description: "Leading digital transformation consultancy specializing in React and TypeScript solutions.",
      confidenceScore: 95,
      extractedData: {
        emails: ["contact@techflow.ch", "hello@techflow.ch"],
        phones: ["+41 22 123 4567"],
        technologies: ["React", "TypeScript", "AWS", "Node.js"],
      },
      lastScraped: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Alpine Marketing Group",
      domain: "alpinemarketing.com",
      location_text: "Zurich, Switzerland",
      industry: "Marketing & Advertising",
      employees: "10-25",
      description: "Full-service marketing agency helping B2B companies scale their digital presence.",
      confidenceScore: 88,
      extractedData: {
        emails: ["info@alpinemarketing.com"],
        phones: ["+41 44 987 6543"],
        technologies: ["HubSpot", "Google Analytics", "WordPress"],
      },
      lastScraped: "2024-01-15T09:15:00Z",
    },
    {
      id: "3",
      name: "SwissFintech Innovations",
      domain: "swissfintech.io",
      location_text: "Basel, Switzerland",
      industry: "Financial Technology",
      employees: "50-100",
      description: "Pioneering blockchain and AI solutions for the financial services industry.",
      confidenceScore: 92,
      extractedData: {
        emails: ["contact@swissfintech.io", "partnerships@swissfintech.io"],
        phones: ["+41 61 555 0123"],
        technologies: ["Blockchain", "AI/ML", "Python", "Kubernetes"],
      },
      lastScraped: "2024-01-15T11:45:00Z",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setLoading(true)
    setTimeout(() => {
      setCompanies(mockCompanies)
      setLoading(false)
    }, 1500)
  }, [query, sources])

  const filteredCompanies = companies.filter((company) => {
    if (filters.industry !== "All Industries" && company.industry !== filters.industry) return false
    if (filters.location_text && !company.location_text.toLowerCase().includes(filters.location_text.toLowerCase())) return false
    if (filters.employeeCount !== "All Sizes" && company.employees !== filters.employeeCount) return false
    if (filters.confidenceScore && company.confidenceScore < filters.confidenceScore) return false
    return true
  })

  const handleExport = () => {
    const csvContent = [
      ["Name", "Domain", "Location Text", "Industry", "Employees", "Confidence Score"],
      ...filteredCompanies.map((company) => [
        company.name,
        company.domain,
        company.location_text,
        company.industry,
        company.employees,
        company.confidenceScore.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `search-results-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-700 to-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
                S-I-K-R-Y
              </span>
            </Link>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
          <SmartSearchBar placeholder="Refine your search..." showSuggestions={true} className="max-w-2xl" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <Select
                    value={filters.industry}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue>{filters.industry}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Industries">All Industries</SelectItem>
                      <SelectItem value="Software Development">Software Development</SelectItem>
                      <SelectItem value="Marketing & Advertising">Marketing & Advertising</SelectItem>
                      <SelectItem value="Financial Technology">Financial Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="Enter location..."
                    value={filters.location_text}
                    onChange={(e) => setFilters((prev) => ({ ...prev, location_text: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Company Size</label>
                  <Select
                    value={filters.employeeCount}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, employeeCount: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue>{filters.employeeCount}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Sizes">All Sizes</SelectItem>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="10-25">10-25 employees</SelectItem>
                      <SelectItem value="25-50">25-50 employees</SelectItem>
                      <SelectItem value="50-100">50-100 employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Min. Confidence Score</label>
                  <Select
                    value={filters.confidenceScore.toString()}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, confidenceScore: Number.parseInt(value) }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>{filters.confidenceScore === 0 ? "Any Score" : `${filters.confidenceScore}%+`}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Score</SelectItem>
                      <SelectItem value="70">70%+</SelectItem>
                      <SelectItem value="80">80%+</SelectItem>
                      <SelectItem value="90">90%+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Search Results</h1>
                <p className="text-muted-foreground">
                  {loading ? "Searching..." : `Found ${filteredCompanies.length} companies for "${query}"`}
                </p>
              </div>

              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list" | "map")}>
                <TabsList>
                  <TabsTrigger value="grid">
                    <Grid className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="map">
                    <Map className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-700" />
                <span className="ml-2 text-lg">Searching across multiple sources...</span>
              </div>
            ) : (
              <Tabs value={viewMode} className="w-full">
                <TabsContent value="grid">
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCompanies.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list">
                  <div className="space-y-4">
                    {filteredCompanies.map((company) => (
                      <CompanyCard key={company.id} company={company} layout="list" />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="map">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center">
                    <Map className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Map View Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Interactive map visualization will be available in the next update.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {!loading && filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No companies found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search query or filters.</p>
                <Button variant="outline">Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-700" />
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  )
}
