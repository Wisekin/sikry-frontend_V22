"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Upload, Filter, Search, Calendar, Play, Settings } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/useTranslation"

export function SecondaryMenuBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  const getContextualContent = () => {
    if (pathname.includes("/companies")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/companies/new")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("nav.secondary.addCompany")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/companies/import")}>
            <Upload className="h-4 w-4 mr-2" />
            {t("nav.secondary.importCompanies")}
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t("nav.secondary.exportData")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/comms")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/comms/new")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("nav.secondary.newMessage")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/comms/campaigns/new")}>
            <Calendar className="h-4 w-4 mr-2" />
            {t("nav.secondary.newCampaign")}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/comms/templates")}>
            <Settings className="h-4 w-4 mr-2" />
            {t("nav.secondary.templates")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/scrapers")) {
      return (
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            onClick={() => router.push("/scrapers/new")}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("nav.secondary.newScraper")}
          </Button>
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            {t("nav.secondary.runScraper")}
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {t("nav.secondary.scheduleJob")}
          </Button>
        </div>
      )
    }

    if (pathname.includes("/search")) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder={t("search.refine")} className="w-64 h-8" />
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("search.filters.allIndustries")}</SelectItem>
              <SelectItem value="tech">{t("search.filters.softwareDev")}</SelectItem>
              <SelectItem value="marketing">{t("search.filters.marketing")}</SelectItem>
              <SelectItem value="fintech">{t("search.filters.fintech")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            {t("search.filters")}
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="text-xs">
          {t("dashboard.overview")}
        </Badge>
      </div>
    )
  }

  return (
    <div className="sticky top-16 z-40 w-full border-b border-gray-100/80 bg-white/98 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-6">
        <div className="flex items-center gap-4">{getContextualContent()}</div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {pathname.split("/").pop()?.replace("-", " ") || t("dashboard.title")}
          </Badge>
        </div>
      </div>
    </div>
  )
}
