"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { SmartSearchBar } from "@/components/search/SmartSearchBar"
import { ResultsGrid } from "@/components/search/ResultsGrid"
import { MapView } from "@/components/search/MapView"
import { ScopeBadges } from "./components/ScopeBadges" 
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import {
  Filter,
  Download,
  Grid,
  Map,
  List,
  Loader2,
  X,
  ChevronDown,
  Check,
  Globe,
  Linkedin,
  Database,
  Building2,
  Users,
  MapPin,
  BarChart3,
  Mail,
  Phone,
  Clock,
  RefreshCw,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface Company {
  id: string
  name: string
  domain: string
  location: string
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

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const sources = searchParams.get("sources")?.split(",") || []
  const { t } = useTranslation()

  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filters, setFilters] = useState({
    industry: "All Industries",
    location: "",
    employeeCount: "All Sizes",
    confidenceScore: 0,
    hasEmail: false,
    hasPhone: false,
    recentlyUpdated: false,
  })
  const [selectedSources, setSelectedSources] = useState<string[]>(["google", "linkedin"])
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)

  // Mock data
  const mockCompanies: Company[] = [
    {
      id: "1",
      name: "TechFlow Solutions",
      domain: "techflow.ch",
      location: "Geneva, Switzerland",
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
      location: "Zurich, Switzerland",
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
      location: "Basel, Switzerland",
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
    setLoading(true)
    setTimeout(() => {
      setCompanies(mockCompanies)
      setLoading(false)
    }, 1500)
  }, [query, sources])

  const filteredCompanies = companies.filter((company) => {
    if (filters.industry !== "All Industries" && company.industry !== filters.industry) return false
    if (filters.location && !company.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    if (filters.employeeCount !== "All Sizes" && company.employees !== filters.employeeCount) return false
    if (filters.confidenceScore && company.confidenceScore < filters.confidenceScore) return false
    if (filters.hasEmail && company.extractedData.emails.length === 0) return false
    if (filters.hasPhone && company.extractedData.phones.length === 0) return false
    return true
  })

  const handleExport = () => {
    const csvContent = [
      ["Name", "Domain", "Location", "Industry", "Employees", "Confidence Score"],
      ...filteredCompanies.map((company) => [
        company.name,
        company.domain,
        company.location,
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

  const handleClearFilters = () => {
    setFilters({
      industry: "All Industries",
      location: "",
      employeeCount: "All Sizes",
      confidenceScore: 0,
      hasEmail: false,
      hasPhone: false,
      recentlyUpdated: false,
    })
  }

  const handleRemoveSource = (source: string) => {
    setSelectedSources(selectedSources.filter((s) => s !== source))
  }

  const handleRemoveFilter = (filter: string) => {
    if (filter === "industry") {
      setFilters((prev) => ({ ...prev, industry: "All Industries" }))
    } else if (filter === "location") {
      setFilters((prev) => ({ ...prev, location: "" }))
    } else if (filter === "employeeCount") {
      setFilters((prev) => ({ ...prev, employeeCount: "All Sizes" }))
    }
  }

  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      setSelectedSources(selectedSources.filter((s) => s !== source))
    } else {
      setSelectedSources([...selectedSources, source])
    }
  }

  return (
  
      <div className="space-y-6 max-w-full">
        {/* Search Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Heading level={1}>{t("search.title")}</Heading>
            <Text className="text-muted-foreground">
              {loading
                ? t("search.searching")
                : t("search.results", { count: filteredCompanies.length, query: query || t("search.all") })}
            </Text>
          </div>
          <Button variant="outline" onClick={handleExport} className="self-start sm:self-auto">
            <Download className="w-4 h-4 mr-2" />
            {t("search.export")}
          </Button>
        </div>

        {/* Search Bar */}
        <SmartSearchBar placeholder={t("search.refine")} showSuggestions={true} />

        {/* Selected filters */}
        <div className="flex flex-wrap items-center gap-2">
          <ScopeBadges
            selectedSources={selectedSources}
            filters={filters}
            onRemoveSource={handleRemoveSource}
            onRemoveFilter={handleRemoveFilter}
          />
          {(selectedSources.length > 0 ||
            filters.industry !== "All Industries" ||
            filters.location ||
            filters.employeeCount !== "All Sizes") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-3 h-fit sticky top-24 bg-card border border-border shadow-md">
  <CardHeader className="pb-3 border-b border-border bg-transparent">
    <CardTitle className="text-base font-semibold text-card-foreground flex items-center gap-2">
      <Filter className="w-5 h-5 mr-2" style={{ color: 'var(--brand-action)' }} />
      {t("search.filters.label")}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsFilterExpanded(!isFilterExpanded)}
        className="lg:hidden h-7 w-7 p-0 ml-auto hover:text-[var(--brand-action)]"
        aria-label="Toggle filters"
        style={{ color: 'var(--brand-action)' }}
      >
        <ChevronDown className={`w-4 h-4 transition-transform ${isFilterExpanded ? "rotate-180" : ""}`} />
      </Button>
    </CardTitle>
  </CardHeader>

  <CardContent className={`p-4 space-y-6 ${isFilterExpanded ? "block" : "hidden lg:block"}`}>
              {/* Data Sources */}
              <div>
                <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--brand-action)' }}>Data Sources</h3>
                <div className="space-y-2">
                  <div
                    className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-all duration-300 border ${selectedSources.includes("google") 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 shadow-md shadow-primary/10" 
                      : "hover:bg-muted/50 hover:scale-[1.02] border-transparent hover:border-primary/20"}`}
                    onClick={() => toggleSource("google")}
                  >
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" style={{ color: 'var(--brand-action)' }} />
                      <span className={`text-sm font-medium ${selectedSources.includes("google") ? "text-primary" : ""}`}>Google</span>
                    </div>
                    {selectedSources.includes("google") && <Check className="w-4 h-4" style={{ color: 'var(--brand-action)' }} />}
                  </div>

                  <div
                    className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-all duration-300 border ${selectedSources.includes("linkedin") 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 shadow-md shadow-primary/10" 
                      : "hover:bg-muted/50 hover:scale-[1.02] border-transparent hover:border-primary/20"}`}
                    onClick={() => toggleSource("linkedin")}
                  >
                    <div className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" style={{ color: 'var(--brand-action)' }} />
                      <span className={`text-sm font-medium ${selectedSources.includes("linkedin") ? "text-primary" : ""}`}>LinkedIn</span>
                    </div>
                    {selectedSources.includes("linkedin") && <Check className="w-4 h-4 text-primary animate-pulse" />}
                  </div>

                  <div
                    className={`flex items-center justify-between p-2.5 rounded-md cursor-pointer transition-all duration-300 border ${selectedSources.includes("crunchbase") 
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30 shadow-md shadow-primary/10" 
                      : "hover:bg-muted/50 hover:scale-[1.02] border-transparent hover:border-primary/20"}`}
                    onClick={() => toggleSource("crunchbase")}
                  >
                    <div className="flex items-center">
                      <Database className="w-4 h-4 mr-2" style={{ color: 'var(--brand-action)' }} />
                      <span className={`text-sm font-medium ${selectedSources.includes("crunchbase") ? "text-primary" : ""}`}>Crunchbase</span>
                    </div>
                    {selectedSources.includes("crunchbase") && <Check className="w-4 h-4 text-primary animate-pulse" />}
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/20 pt-4">
                <h3 className="text-sm font-medium mb-3 flex items-center text-card-foreground">
                  <Building2 className="w-4 h-4 mr-2 text-primary" />
                  {t("search.filters.industry")}
                </h3>
                <Select
                  value={filters.industry}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger className="w-full border-primary/30 hover:border-primary/60 hover:shadow-sm transition-all duration-300 bg-muted/30 hover:bg-muted/50">
                    <SelectValue placeholder={t("search.filters.allIndustries")} />
                  </SelectTrigger>
                  <SelectContent className="border-primary/30 shadow-md shadow-primary/5">
                    <SelectItem value="All Industries">{t("search.filters.allIndustries")}</SelectItem>
                    <SelectItem value="Software Development">{t("search.filters.softwareDev")}</SelectItem>
                    <SelectItem value="Marketing & Advertising">{t("search.filters.marketing")}</SelectItem>
                    <SelectItem value="Financial Technology">{t("search.filters.fintech")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center text-card-foreground">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  {t("search.filters.location")}
                </h3>
                <Input
                  placeholder={t("search.filters.enterLocation")}
                  value={filters.location}
                  onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                  className="w-full border-primary/30 hover:border-primary/60 focus:border-primary transition-all duration-300 bg-muted/30 hover:bg-muted/50 hover:shadow-sm focus:shadow-md focus:shadow-primary/10"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center text-card-foreground">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  {t("search.filters.companySize")}
                </h3>
                <Select
                  value={filters.employeeCount}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, employeeCount: value }))}
                >
                  <SelectTrigger className="w-full border-primary/30 hover:border-primary/60 hover:shadow-sm transition-all duration-300 bg-muted/30 hover:bg-muted/50">
                    <SelectValue placeholder={t("search.filters.allSizes")} />
                  </SelectTrigger>
                  <SelectContent className="border-primary/30 shadow-md shadow-primary/5">
                    <SelectItem value="All Sizes">{t("search.filters.allSizes")}</SelectItem>
                    <SelectItem value="1-10">1-10 {t("search.filters.employees")}</SelectItem>
                    <SelectItem value="10-25">10-25 {t("search.filters.employees")}</SelectItem>
                    <SelectItem value="25-50">25-50 {t("search.filters.employees")}</SelectItem>
                    <SelectItem value="50-100">50-100 {t("search.filters.employees")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="relative z-10 mt-6 mb-6 border-t border-primary/20 pt-4">
                <h3 className="text-sm font-medium mb-4 text-card-foreground flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-primary" />
                  {t("search.filters.minConfidence")}
                </h3>
                <div className="px-3 py-4 relative z-20 bg-muted/30 rounded-lg border border-primary/20 shadow-sm">
                  <div className="mb-8 mt-2">
                    <Slider
                      value={[filters.confidenceScore]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, confidenceScore: value[0] }))}
                      className=""
                      style={{
                        '--slider-track': 'var(--brand-action)',
                        '--slider-thumb': 'var(--brand-action)',
                      } as React.CSSProperties}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[var(--brand-action)] mt-2">
                    <span className="text-[var(--brand-action)]/80">0%</span>
                    <span className="px-3 py-1.5 rounded-md font-medium shadow-sm border border-[var(--brand-action)] text-[var(--brand-action)] bg-white transform -translate-y-6 scale-110">
                      {filters.confidenceScore}%
                    </span>
                    <span className="text-[var(--brand-action)]/80">100%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-border/40 pt-4">
                <h3 className="text-sm font-medium text-primary-foreground/90 dark:text-primary-foreground/80">Additional Filters</h3>

                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
  <label className="text-sm flex items-center cursor-pointer">
    <Mail className="w-4 h-4 mr-2" style={{ color: 'var(--brand-action)' }} />
    {t("search.filters.hasEmail")}
  </label>
  <Switch
    checked={filters.hasEmail}
    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, hasEmail: checked }))}
    style={{
      backgroundColor: filters.hasEmail ? 'var(--brand-action)' : '#62c7db',
      borderColor: filters.hasEmail ? 'var(--brand-action)' : '#62c7db',
    }}
    className="switch-thumb-white"
  />
</div>

                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
  <label className="text-sm flex items-center cursor-pointer">
    <Phone className="w-4 h-4 mr-2" style={{ color: 'var(--brand-action)' }} />
    {t("search.filters.hasPhone")}
  </label>
  <Switch
    checked={filters.hasPhone}
    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, hasPhone: checked }))}
    style={{
      backgroundColor: filters.hasPhone ? 'var(--brand-action)' : '#62c7db',
      borderColor: filters.hasPhone ? 'var(--brand-action)' : '#62c7db',
    }}
    className="switch-thumb-white"
  />
</div>

                <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <label className="text-sm flex items-center cursor-pointer">
                    <Clock className="w-4 h-4 mr-2 text-primary/70" />
                    Recently Updated
                  </label>
                  <Switch
                    checked={filters.recentlyUpdated}
                    onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, recentlyUpdated: checked }))}
                    className=""
                    style={{
                      backgroundColor: filters.recentlyUpdated ? 'var(--brand-action)' : '#62c7db',
                      borderColor: filters.recentlyUpdated ? 'var(--brand-action)' : '#62c7db',
                    }}
                
                  />
                </div>
              </div>

              <Button variant="outline" onClick={handleClearFilters} className="w-full mt-4 border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-colors">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("search.filters.clear")}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list" | "map")}>
                <TabsList>
                  <TabsTrigger value="grid" aria-label={t("search.viewModes.grid")}>
                    <Grid className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="list" aria-label={t("search.viewModes.list")}>
                    <List className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="map" aria-label={t("search.viewModes.map")}>
                    <Map className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-lg">{t("search.searchingMultiple")}</span>
              </div>
            ) : (
              <Tabs value={viewMode} className="w-full">
                <TabsContent value="grid">
                  <ResultsGrid companies={filteredCompanies} />
                </TabsContent>

                <TabsContent value="list">
                  <ResultsGrid companies={filteredCompanies} layout="list" />
                </TabsContent>

                <TabsContent value="map">
                  <MapView companies={filteredCompanies} />
                </TabsContent>
              </Tabs>
            )}

            {!loading && filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <Heading level={3} className="mb-2">
                  {t("search.noResults")}
                </Heading>
                <Text className="text-muted-foreground mb-4">{t("search.tryAdjusting")}</Text>
                <Button variant="outline" onClick={handleClearFilters}>
                  {t("search.filters.clear")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
 
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
