"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

// --- INTERFACES ---
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

// --- MOCK DATA (for demonstration) ---
const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechFlow Solutions",
    domain: "techflow.ch",
    location: "Geneva, Switzerland",
    industry: "Software Development",
    employees: "25-50",
    description:
      "Leading digital transformation consultancy specializing in React and TypeScript solutions.",
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
    description:
      "Full-service marketing agency helping B2B companies scale their digital presence.",
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
    description:
      "Pioneering blockchain and AI solutions for the financial services industry.",
    confidenceScore: 92,
    extractedData: {
      emails: ["contact@swissfintech.io", "partnerships@swissfintech.io"],
      phones: ["+41 61 555 0123"],
      technologies: ["Blockchain", "AI/ML", "Python", "Kubernetes"],
    },
    lastScraped: "2024-01-15T11:45:00Z",
  },
]

// --- MAIN SEARCH COMPONENT ---
function SearchContent() {
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  // --- STATE MANAGEMENT ---
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [isFilterExpanded, setIsFilterExpanded] = useState(false)
  const [selectedSources, setSelectedSources] = useState<string[]>([
    "google",
    "linkedin",
  ])
  const [filters, setFilters] = useState({
    industry: "All Industries",
    location: "",
    employeeCount: "All Sizes",
    confidenceScore: 0,
    hasEmail: false,
    hasPhone: false,
    recentlyUpdated: false,
  })

  // --- DATA FETCHING & FILTERING ---
  useEffect(() => {
    setLoading(true)
    const sources = searchParams.get("sources")?.split(",") || []
    // Simulating an API call
    setTimeout(() => {
      setCompanies(mockCompanies)
      setLoading(false)
    }, 1500)
  }, [query, searchParams])

  const filteredCompanies = companies.filter(company => {
    if (
      filters.industry !== "All Industries" &&
      company.industry !== filters.industry
    )
      return false
    if (
      filters.location &&
      !company.location.toLowerCase().includes(filters.location.toLowerCase())
    )
      return false
    if (
      filters.employeeCount !== "All Sizes" &&
      company.employees !== filters.employeeCount
    )
      return false
    if (
      filters.confidenceScore &&
      company.confidenceScore < filters.confidenceScore
    )
      return false
    if (filters.hasEmail && company.extractedData.emails.length === 0)
      return false
    if (filters.hasPhone && company.extractedData.phones.length === 0)
      return false
    return true
  })

  // --- EVENT HANDLERS ---
  const handleExport = () => {
    const csvContent = [
      ["Name", "Domain", "Location", "Industry", "Employees", "Confidence Score"],
      ...filteredCompanies.map(c => [
        c.name,
        c.domain,
        c.location,
        c.industry,
        c.employees,
        c.confidenceScore.toString(),
      ]),
    ]
      .map(row => row.join(","))
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
    setSelectedSources(prev => prev.filter(s => s !== source))
  }

  const handleRemoveFilter = (filterKey: keyof typeof filters) => {
    const defaultValues = {
      industry: "All Industries",
      location: "",
      employeeCount: "All Sizes",
      confidenceScore: 0,
      hasEmail: false,
      hasPhone: false,
      recentlyUpdated: false,
    }
    setFilters(prev => ({ ...prev, [filterKey]: defaultValues[filterKey] }))
  }

  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }

  const hasActiveFilters =
    selectedSources.length > 0 ||
    filters.industry !== "All Industries" ||
    filters.location ||
    filters.employeeCount !== "All Sizes"

  // --- RENDER ---
  return (
    <div className="space-y-6 max-w-full">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div >
          <Heading level={1}>{t("search.title")}</Heading>
          <Text className="text-muted-foreground">
            {loading
              ? t("search.searching")
              : t("search.results", {
                  count: filteredCompanies.length,
                  query: query || t("search.all"),
                })}
          </Text>
        </div>
        <Button
          variant="outline"
          onClick={handleExport}
          className="self-start sm:self-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          {t("search.export")}
        </Button>
      </div>

      {/* Search Bar and Filters Sidebar - Now in same row */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Bar - Takes 2/3 width on large screens */}
        <div className="lg:w-2/3">
          <SmartSearchBar
            placeholder={t("search.refine")}
            showSuggestions={true}
          />
        </div>
        
        {/* Filter Card - Takes 1/3 width on large screens */}
        <div className="lg:w-1/3">
          <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
            <CardHeader className="pb-3 border-b border-gray-200 bg-gray-50 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                {t("search.filters.label")}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className="lg:hidden h-7 w-7 p-0 ml-auto hover:text-blue-600"
                aria-label="Toggle filters"
                aria-expanded={isFilterExpanded}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterExpanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CardHeader>

            <CardContent
              className={`p-4 ${isFilterExpanded ? "block" : "hidden lg:block"}`}
            >
              <div className="space-y-4">
                {/* Data Sources */}
                <div>
                  <h3 className="text-sm font-medium mb-3 text-gray-700">
                    Data Sources
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["google", "linkedin", "crunchbase"].map(source => (
                      <Button
                        key={source}
                        variant={selectedSources.includes(source) ? "default" : "outline"}
                        size="sm"
                        className={`capitalize ${selectedSources.includes(source) 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                        onClick={() => toggleSource(source)}
                      >
                        {source === "google" && <Globe className="w-4 h-4 mr-1" />}
                        {source === "linkedin" && <Linkedin className="w-4 h-4 mr-1" />}
                        {source === "crunchbase" && <Database className="w-4 h-4 mr-1" />}
                        {source}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Quick Filters */}
                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-3 text-gray-700">
                    Quick Filters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.hasEmail ? "default" : "outline"}
                      size="sm"
                      className={`${filters.hasEmail 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                      onClick={() => setFilters(prev => ({ ...prev, hasEmail: !prev.hasEmail }))}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Has Email
                    </Button>
                    <Button
                      variant={filters.hasPhone ? "default" : "outline"}
                      size="sm"
                      className={`${filters.hasPhone 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                      onClick={() => setFilters(prev => ({ ...prev, hasPhone: !prev.hasPhone }))}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Has Phone
                    </Button>
                    <Button
                      variant={filters.recentlyUpdated ? "default" : "outline"}
                      size="sm"
                      className={`${filters.recentlyUpdated 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                      onClick={() => setFilters(prev => ({ ...prev, recentlyUpdated: !prev.recentlyUpdated }))}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Recently Updated
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Filters Badges */}
      { hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <ScopeBadges
            selectedSources={selectedSources}
            filters={filters}
            onRemoveSource={handleRemoveSource}
            onRemoveFilter={handleRemoveFilter}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Full Filters Sidebar - Now in left column */}
        <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
          <Card className="bg-white border border-gray-200 shadow-sm rounded-lg">
            <CardHeader className="pb-3 border-b border-gray-200 bg-gray-50">
              <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
                <Filter className="w-5 h-5 mr-2 text-blue-600" />
                {t("search.filters.advancedFilters")}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-6">
              {/* Industry Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center text-gray-700">
                  <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                  {t("search.filters.industry")}
                </h3>
                <Select
                  value={filters.industry}
                  onValueChange={value =>
                    setFilters(prev => ({ ...prev, industry: value }))
                  }
                >
                  <SelectTrigger className="w-full border-gray-300 hover:border-gray-400">
                    <SelectValue placeholder={t("search.filters.allIndustries")} />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 shadow-md">
                    <SelectItem value="All Industries">
                      {t("search.filters.allIndustries")}
                    </SelectItem>
                    <SelectItem value="Software Development">
                      {t("search.filters.softwareDev")}
                    </SelectItem>
                    <SelectItem value="Marketing & Advertising">
                      {t("search.filters.marketing")}
                    </SelectItem>
                    <SelectItem value="Financial Technology">
                      {t("search.filters.fintech")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center text-gray-700">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  {t("search.filters.location")}
                </h3>
                <Input
                  placeholder={t("search.filters.enterLocation")}
                  value={filters.location}
                  onChange={e =>
                    setFilters(prev => ({ ...prev, location: e.target.value }))
                  }
                  className="w-full border-gray-300 hover:border-gray-400 focus:border-blue-500"
                />
              </div>

              {/* Company Size Filter */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center text-gray-700">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  {t("search.filters.companySize")}
                </h3>
                <Select
                  value={filters.employeeCount}
                  onValueChange={value =>
                    setFilters(prev => ({ ...prev, employeeCount: value }))
                  }
                >
                  <SelectTrigger className="w-full border-gray-300 hover:border-gray-400">
                    <SelectValue placeholder={t("search.filters.allSizes")} />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 shadow-md">
                    <SelectItem value="All Sizes">
                      {t("search.filters.allSizes")}
                    </SelectItem>
                    <SelectItem value="1-10">
                      1-10 {t("search.filters.employees")}
                    </SelectItem>
                    <SelectItem value="10-25">
                      10-25 {t("search.filters.employees")}
                    </SelectItem>
                    <SelectItem value="25-50">
                      25-50 {t("search.filters.employees")}
                    </SelectItem>
                    <SelectItem value="50-100">
                      50-100 {t("search.filters.employees")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Confidence Score */}
              <div className="relative z-10 mt-6 mb-6 border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium mb-4 text-gray-700 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
                  {t("search.filters.minConfidence")}
                </h3>
                <div className="px-3 py-4 relative z-20 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
                  <div className="mb-8 mt-2">
                    <Slider
                      value={[filters.confidenceScore]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={value =>
                        setFilters(prev => ({
                          ...prev,
                          confidenceScore: value[0],
                        }))
                      }
                    />
                  </div>
                  <div className="flex justify-between text-xs text-blue-600 mt-2">
                    <span>0%</span>
                    <span className="px-3 py-1.5 rounded-md font-medium shadow-sm border border-blue-500 text-blue-600 bg-white transform -translate-y-6 scale-110">
                      {filters.confidenceScore}%
                    </span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full mt-4 border-gray-300 hover:border-gray-400"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("search.filters.clear")}
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Results */}
        <main className="lg:col-span-9">
          {/* View Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <Tabs
              value={viewMode}
              onValueChange={value =>
                setViewMode(value as "grid" | "list" | "map")
              }
            >
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
            <div className="w-full md:w-auto">
                <Select>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort by relevance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Sort by relevance</SelectItem>
                        <SelectItem value="newest">Sort by newest</SelectItem>
                        <SelectItem value="employees_desc">Employees (High to Low)</SelectItem>
                        <SelectItem value="employees_asc">Employees (Low to High)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
              <Heading level={3} className="text-lg font-semibold">
                {t("search.searchingMultiple")}
              </Heading>
              <Text className="text-muted-foreground">
                Please wait while we gather the results...
              </Text>
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
            <div className="text-center py-24">
              <Heading level={3} className="mb-2">
                {t("search.noResults")}
              </Heading>
              <Text className="text-muted-foreground mb-4">
                {t("search.tryAdjusting")}
              </Text>
              <Button variant="outline" onClick={handleClearFilters}>
                {t("search.filters.clear")}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// --- PAGE EXPORT WITH SUSPENSE ---
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}