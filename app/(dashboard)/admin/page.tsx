"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  UserGroupIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ChevronRightIcon,
  ServerIcon,
  BellAlertIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid"
import Link from "next/link"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const adminSections = [
    {
      title: "Team Management",
      description: "Manage users, roles, and permissions",
      icon: UserGroupIcon,
      href: "/admin/team",
      status: "Active",
      count: "12 users",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Billing & Usage",
      description: "Monitor usage and manage billing",
      icon: CreditCardIcon,
      href: "/admin/billing",
      status: "Current",
      count: "$2,450/mo",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
    {
      title: "Anti-Spam Settings",
      description: "Configure spam protection and compliance",
      icon: ShieldCheckIcon,
      href: "/admin/anti-spam",
      status: "Protected",
      count: "0.02% rate",
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
    {
      title: "Compliance",
      description: "GDPR, data retention, and privacy settings",
      icon: DocumentTextIcon,
      href: "/admin/compliance",
      status: "Compliant",
      count: "All regions",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
      case "Current":
      case "Protected":
      case "Compliant":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "Warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Error":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-muted text-secondary"
    }
  }

  const recentActivities = [
    {
      user: "Sarah Johnson",
      action: "Updated user permissions",
      time: "10 minutes ago",
      icon: UserGroupIcon,
    },
    {
      user: "System",
      action: "Automatic backup completed",
      time: "1 hour ago",
      icon: ServerIcon,
    },
    {
      user: "Mark Wilson",
      action: "Changed billing plan",
      time: "3 hours ago",
      icon: CreditCardIcon,
    },
    {
      user: "System",
      action: "Security alert detected",
      time: "Yesterday",
      icon: BellAlertIcon,
    },
  ]

  const systemMetrics = [
    {
      name: "API Response Time",
      value: "156ms",
      change: "-12%",
      trend: "down",
      color: "emerald",
    },
    {
      name: "Error Rate",
      value: "0.02%",
      change: "-5%",
      trend: "down",
      color: "emerald",
    },
    {
      name: "CPU Usage",
      value: "42%",
      change: "+3%",
      trend: "up",
      color: "amber",
    },
    {
      name: "Memory Usage",
      value: "68%",
      change: "+2%",
      trend: "up",
      color: "amber",
    },
  ]

  return (
    <AppShell>
      <div className="space-y-8 p-6 md:p-8 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
        {/* Header with Tabs */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Heading level={1}>Administration</Heading>
              <Text className="text-muted-foreground">Manage system settings, users, and compliance</Text>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Cog6ToothIcon className="w-4 h-4 mr-2" />
              System Settings
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enterprise Tab Styling */}
            <TabsList className="grid grid-cols-4 w-full max-w-2xl bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-[#3C4568] data-[state=active]:text-white hover:bg-[#2A3050] hover:text-white data-[state=inactive]:hover:bg-[#2A3050] data-[state=inactive]:hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Overview</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-[#3C4568] data-[state=active]:text-white hover:bg-[#2A3050] hover:text-white data-[state=inactive]:hover:bg-[#2A3050] data-[state=inactive]:hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Users</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#3C4568] data-[state=active]:text-white hover:bg-[#2A3050] hover:text-white data-[state=inactive]:hover:bg-[#2A3050] data-[state=inactive]:hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Security</TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-[#3C4568] data-[state=active]:text-white hover:bg-[#2A3050] hover:text-white data-[state=inactive]:hover:bg-[#2A3050] data-[state=inactive]:hover:text-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Billing</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-sm border border-border/40 overflow-hidden bg-white dark:bg-slate-800 hover:bg-[#2A3050] dark:hover:bg-[#2A3050] group transition-colors duration-200">
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-200">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-white dark:group-hover:text-white transition-colors duration-200">12</div>
              <div className="flex items-center mt-1">
                <ArrowTrendingUpIcon className="w-3 h-3 text-emerald-500 mr-1" />
                <Text size="sm" className="text-emerald-600 group-hover:text-emerald-300 dark:group-hover:text-emerald-300 transition-colors duration-200">
                  +2 this month
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-slate-800 hover:bg-[#2A3050] dark:hover:bg-[#2A3050] group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-200">Monthly Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold group-hover:text-white dark:group-hover:text-white transition-colors duration-200">$2,450</div>
              <div className="flex items-center mt-1">
                <Text size="sm" className="text-muted-foreground group-hover:text-slate-300 dark:group-hover:text-slate-300 transition-colors duration-200">
                  Within budget
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-slate-800 hover:bg-[#2A3050] dark:hover:bg-[#2A3050] group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-200">Compliance Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">100%</div>
              <div className="flex items-center mt-1">
                <ShieldCheckIcon className="w-3 h-3 text-emerald-500 mr-1" />
                <Text size="sm" className="text-emerald-600 group-hover:text-emerald-300 dark:group-hover:text-emerald-300 transition-colors duration-200">
                  Fully compliant
                </Text>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-slate-800 hover:bg-[#2A3050] dark:hover:bg-[#2A3050] group">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-slate-200 dark:group-hover:text-slate-200 transition-colors duration-200">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">99.9%</div>
              <div className="flex items-center mt-1">
                <ServerIcon className="w-3 h-3 text-emerald-500 mr-1" />
                <Text size="sm" className="text-emerald-600 group-hover:text-emerald-300 dark:group-hover:text-emerald-300 transition-colors duration-200">
                  Uptime
                </Text>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Admin Sections */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-4">
            {adminSections.map((section, index) => (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-slate-800 hover:bg-[#2A3050] dark:hover:bg-[#2A3050] group"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${section.color} rounded-lg flex items-center justify-center`}>
                        <section.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold group-hover:text-white dark:group-hover:text-white transition-colors duration-200">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-slate-300 dark:group-hover:text-slate-300 transition-colors duration-200" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(section.status)}>
                        {section.status}
                      </Badge>
                      <Text size="sm" className="text-muted-foreground group-hover:text-slate-300 dark:group-hover:text-slate-300 transition-colors duration-200">
                        {section.count}
                      </Text>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={section.href}>
                        <Cog6ToothIcon className="w-3 h-3 mr-1" />
                        Manage
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity */}
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col bg-white dark:bg-slate-800 hover:bg-[#2A3050] dark:hover:bg-[#2A3050] group">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-1.5">
                      <activity.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{activity.action}</div>
                      <CardDescription className="text-sm text-muted-foreground mt-1 flex-grow group-hover:text-slate-300 dark:group-hover:text-slate-300 transition-colors duration-200">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </CardDescription>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-xs">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="shadow-sm border border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ServerIcon className="w-4 h-4 mr-2" />
              System Status
            </CardTitle>
            <CardDescription>Real-time system health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{metric.name}</div>
                    <div className="flex items-center">
                      <span className="text-lg font-semibold mr-2">{metric.value}</span>
                      <span className={`text-xs ${metric.trend === "down" ? "text-emerald-600" : "text-amber-600"}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={Number.parseInt(metric.value)}
                    className={`h-1.5 ${metric.color === "emerald" ? "bg-emerald-100" : "bg-amber-100"}`}
                    indicatorClassName={`${metric.color === "emerald" ? "bg-emerald-500" : "bg-amber-500"}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
