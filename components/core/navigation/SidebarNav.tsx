"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { TranslationProvider, useTranslation } from "@/lib/i18n/useTranslation"
import {
  LayoutDashboard,
  Search,
  Building2,
  MessageSquare,
  TrendingUp,
  Bot,
  BarChart3,
  Settings,
  Shield,
  DollarSign,
  Target,
  FilterIcon as Funnel,
  PieChart,
  Video,
  Headphones,
  Star,
  UserCheck,
  ChevronDown,
} from "lucide-react"
import { Logo } from "@/components/core/branding/Logo"

// NOTE: Sidebar color variables (--sidebar, --sidebar-hover, --sidebar-selected, --sidebar-foreground) must be defined in your theme CSS files (e.g., styles/themes/dark.css, styles/themes/light.css) for correct hover/selected/foreground colors.

export function SidebarNav() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Main navigation items
  const mainNavItems = [
    { titleKey: "nav.dashboard", href: "/dashboard", icon: LayoutDashboard },
    { titleKey: "nav.search", href: "/search", icon: Search },
    { titleKey: "nav.companies", href: "/companies", icon: Building2 },
    { titleKey: "nav.marketIntel", href: "/market-intel", icon: TrendingUp },
    { titleKey: "nav.scrapers", href: "/scrapers", icon: Bot },
    { titleKey: "nav.statistics", href: "/statistics", icon: BarChart3 },
  ]

  // Section navigation with dropdowns
  const sectionNavItems = [
    {
      section: "communications",
      titleKey: "nav.communications",
      icon: MessageSquare,
      basePath: "/comms",
      items: [
        { titleKey: "nav.overview", href: "/comms" },
        { titleKey: "comms.campaigns", href: "/comms/campaigns" },
        { titleKey: "comms.templates", href: "/comms/templates" },
        { titleKey: "comms.bulkSender", href: "/comms/bulk-sender" },
      ],
    },
    {
      section: "financial",
      titleKey: "nav.financial",
      icon: DollarSign,
      basePath: "/financial",
      items: [
        { titleKey: "nav.overview", href: "/financial" },
        { titleKey: "financial.records", href: "/financial/records" },
        { titleKey: "financial.summary", href: "/financial/summary" },
        { titleKey: "financial.campaignRoi", href: "/financial/campaign-roi" },
      ],
    },
    {
      section: "reengagement",
      titleKey: "nav.reengagement",
      icon: Target,
      basePath: "/reengagement",
      items: [
        { titleKey: "nav.overview", href: "/reengagement" },
        { titleKey: "reengagement.tasks", href: "/reengagement/tasks" },
        { titleKey: "reengagement.classification", href: "/reengagement/classification" },
        { titleKey: "reengagement.automation", href: "/reengagement/automation" },
      ],
    },
    {
      section: "referrals",
      titleKey: "nav.referrals",
      icon: UserCheck,
      basePath: "/referrals",
      items: [
        { titleKey: "nav.overview", href: "/referrals" },
        { titleKey: "referrals.dashboard", href: "/referrals/dashboard" },
        { titleKey: "referrals.tracking", href: "/referrals/tracking" },
        { titleKey: "referrals.rewards", href: "/referrals/rewards" },
      ],
    },
    {
      section: "reviews",
      titleKey: "nav.reviews",
      icon: Star,
      basePath: "/reviews",
      items: [
        { titleKey: "nav.overview", href: "/reviews" },
        { titleKey: "reviews.requests", href: "/reviews/requests" },
        { titleKey: "reviews.booster", href: "/reviews/booster" },
        { titleKey: "reviews.monitoring", href: "/reviews/monitoring" },
      ],
    },
    {
      section: "funnels",
      titleKey: "nav.funnels",
      icon: Funnel,
      basePath: "/funnels",
      items: [
        { titleKey: "nav.overview", href: "/funnels" },
        { titleKey: "funnels.builder", href: "/funnels/builder" },
        { titleKey: "funnels.progress", href: "/funnels/progress" },
        { titleKey: "funnels.automation", href: "/funnels/automation" },
      ],
    },
    {
      section: "gap-analysis",
      titleKey: "nav.gapAnalysis",
      icon: PieChart,
      basePath: "/gap-analysis",
      items: [
        { titleKey: "nav.overview", href: "/gap-analysis" },
        { titleKey: "gapAnalysis.form", href: "/gap-analysis/form" },
        { titleKey: "gapAnalysis.letters", href: "/gap-analysis/letters" },
        { titleKey: "gapAnalysis.results", href: "/gap-analysis/results" },
      ],
    },
    {
      section: "vsl",
      titleKey: "nav.vsl",
      icon: Video,
      basePath: "/vsl",
      items: [
        { titleKey: "nav.overview", href: "/vsl" },
        { titleKey: "vsl.templates", href: "/vsl/templates" },
        { titleKey: "vsl.pages", href: "/vsl/pages" },
        { titleKey: "vsl.tracking", href: "/vsl/tracking" },
      ],
    },
    {
      section: "lead-response",
      titleKey: "nav.leadResponse",
      icon: Headphones,
      basePath: "/lead-response",
      items: [
        { titleKey: "nav.overview", href: "/lead-response" },
        { titleKey: "leadResponse.rules", href: "/lead-response/rules" },
        { titleKey: "leadResponse.queue", href: "/lead-response/queue" },
        { titleKey: "leadResponse.analytics", href: "/lead-response/analytics" },
      ],
    },
    {
      section: "analytics",
      titleKey: "nav.analytics",
      icon: BarChart3,
      basePath: "/analytics",
      items: [
        { titleKey: "nav.overview", href: "/analytics" },
        { titleKey: "analytics.performance", href: "/analytics/performance" },
        { titleKey: "analytics.conversion", href: "/analytics/conversion" },
        { titleKey: "analytics.revenue", href: "/analytics/revenue" },
      ],
    },
    {
      section: "admin",
      titleKey: "nav.admin",
      icon: Shield,
      basePath: "/admin",
      items: [
        { titleKey: "nav.overview", href: "/admin" },
        { titleKey: "admin.teamManagement", href: "/admin/team" },
        { titleKey: "admin.billing", href: "/admin/billing" },
        { titleKey: "admin.antiSpam", href: "/admin/anti-spam" },
        { titleKey: "admin.compliance", href: "/admin/compliance" },
        { titleKey: "admin.users", href: "/admin/users" },
        { titleKey: "admin.security", href: "/admin/security" },
        { titleKey: "admin.monitoring", href: "/admin/monitoring" },
      ],
    },
  ]

  // Bottom navigation (Settings)
  const bottomNavItems = [{ titleKey: "nav.settings", href: "/settings", icon: Settings }]

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const isActiveSectionHeader = (basePath: string) => {
    return pathname === basePath || pathname.startsWith(basePath + "/")
  }

  return (
   <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground">
  {/* Sticky Header */}
  <div className="h-16 flex-shrink-0 bg-sidebar flex items-center p-4 border-b text-white sticky top-0 z-10">
    <Logo />
  </div>  {/* Scrollable Nav Content */}
  <div className="flex-1 overflow-y-auto py-4 scrollbar-custom">
    <nav className="px-2 space-y-1">
      {/* Main Navigation */}
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors",
            isActiveLink(item.href)
              ? "bg-sidebar-selected text-sidebar-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground"
          )}
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          {t(item.titleKey)}
        </Link>
      ))}

      {mainNavItems.length > 0 && sectionNavItems.length > 0 && (
        <div className="border-t border-border my-4"></div>
      )}

      {/* Section Navigation */}
      {sectionNavItems.map((section) => (
        <div key={section.section}>
          <button
            onClick={() => toggleSection(section.section)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActiveSectionHeader(section.basePath)
                ? "bg-sidebar-selected text-sidebar-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground"
            )}
          >
            <div className="flex items-center">
              <section.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
              {t(section.titleKey)}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                expandedSection === section.section ? "rotate-180" : ""
              )}
            />
          </button>

          {expandedSection === section.section && (
            <div className="pl-10 pr-2 py-1 space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-sm rounded-md transition-colors",
                    isActiveLink(item.href)
                      ? "bg-sidebar-selected text-sidebar-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-hover hover:text-sidebar-foreground"
                  )}
                >
                  {t(item.titleKey)}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  </div>

  {/* Bottom Navigation */}
  {bottomNavItems.length > 0 && (
    <div className="p-4 border-t border-border mt-auto">
      <nav className="space-y-1">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
              isActiveLink(item.href)
                ? "bg-sidebar-selected text-sidebar-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            {t(item.titleKey)}
          </Link>
        ))}
      </nav>
    </div>
  )}
</div>

  )
}
