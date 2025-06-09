"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Download, Upload, Filter, Search, Calendar, Play, Settings, UserPlus, ShieldCheck } from "lucide-react"
import { ViewColumnsIcon, ListBulletIcon } from "@heroicons/react/24/outline"
import { usePathname, useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SecondaryMenuBar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()

  const getContextualContent = () => {
    if (pathname.includes("/admin/team")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs defaultValue="overview" className="w-auto">
            <TabsList className="grid w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="members" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Members</TabsTrigger>
              <TabsTrigger value="roles" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Roles</TabsTrigger>
              <TabsTrigger value="permissions" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Permissions</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ViewColumnsIcon className="w-4 h-4" />
              <span>Grid</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ListBulletIcon className="w-4 h-4" />
              <span>List</span>
            </Button>
          </div>
        </div>
      )
    }

    if (pathname.includes("/admin/security")) {
      return (
        <div className="flex items-center gap-4">
          <Tabs defaultValue="overview" className="w-auto">
            <TabsList className="grid w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
              <TabsTrigger value="logs" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Security Logs</TabsTrigger>
              <TabsTrigger value="policies" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Policies</TabsTrigger>
              <TabsTrigger value="access" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Access Control</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ViewColumnsIcon className="w-4 h-4" />
              <span>Grid</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ListBulletIcon className="w-4 h-4" />
              <span>List</span>
            </Button>
          </div>
        </div>
      )
    }

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

  const getActions = () => {
    if (pathname.includes("/admin/team")) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Search members..." className="w-64 h-8" />
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/admin/team/new")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      )
    }

    if (pathname.includes("/admin/security")) {
      return (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Input placeholder="Search security logs..." className="w-64 h-8" />
            <Button size="sm" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Button
            size="sm"
            onClick={() => router.push("/admin/security/new-policy")}
            className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white"
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            New Policy
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {pathname.split("/").pop()?.replace("-", " ") || t("dashboard.title")}
        </Badge>
      </div>
    )
  }

  return (
    <div className="sticky top-16 z-40 w-full border-b border-gray-100/80 bg-white/98 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-6">
        <div className="flex items-center gap-4">{getContextualContent()}</div>
        <div className="flex items-center gap-2">
          {getActions()}
        </div>
      </div>
    </div>
  )
}
