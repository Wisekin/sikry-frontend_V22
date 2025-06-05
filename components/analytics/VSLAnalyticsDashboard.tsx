"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, Clock, Mail, Phone, MessageSquare, Target, DollarSign } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AnalyticsData {
  vsl_performance: {
    total_pages: number
    total_views: number
    total_leads: number
    conversion_rate: number
    avg_watch_time: number
    top_performing_pages: Array<{
      page_name: string
      views: number
      leads: number
      conversion_rate: number
    }>
  }
  lead_response: {
    total_leads: number
    responded_within_sla: number
    avg_response_time: number
    success_rate: number
    channel_performance: {
      email: { sent: number; opened: number; clicked: number }
      sms: { sent: number; replied: number }
      calls: { attempted: number; answered: number }
    }
  }
  funnel_performance: {
    active_funnels: number
    total_contacts: number
    completion_rate: number
    avg_conversion_time: number
  }
  revenue_attribution: {
    total_revenue: number
    vsl_attributed: number
    lead_response_attributed: number
    funnel_attributed: number
  }
}

export function VSLAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics/dashboard?range=${timeRange}`)
      const result = await response.json()
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return <div>Loading analytics...</div>
  }

  const chartData = [
    { name: "Mon", views: 120, leads: 12, conversions: 8 },
    { name: "Tue", views: 150, leads: 18, conversions: 12 },
    { name: "Wed", views: 180, leads: 22, conversions: 15 },
    { name: "Thu", views: 200, leads: 25, conversions: 18 },
    { name: "Fri", views: 170, leads: 20, conversions: 14 },
    { name: "Sat", views: 90, leads: 8, conversions: 5 },
    { name: "Sun", views: 110, leads: 10, conversions: 7 },
  ]

  const channelData = [
    { name: "Email", value: data.lead_response.channel_performance.email.sent, color: "#3B82F6" },
    { name: "SMS", value: data.lead_response.channel_performance.sms.sent, color: "#10B981" },
    { name: "Calls", value: data.lead_response.channel_performance.calls.attempted, color: "#F59E0B" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track performance across all your marketing channels</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">24 Hours</SelectItem>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.vsl_performance.total_views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.vsl_performance.conversion_rate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(data.lead_response.avg_response_time / 60)}m</div>
            <p className="text-xs text-muted-foreground">-30s from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Attribution</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.revenue_attribution.total_revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+18% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vsl" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vsl">VSL Performance</TabsTrigger>
          <TabsTrigger value="lead-response">Lead Response</TabsTrigger>
          <TabsTrigger value="funnels">Funnels</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="vsl" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Views & Conversions Trend</CardTitle>
                <CardDescription>Daily performance over the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>Best converting VSL pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.vsl_performance.top_performing_pages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.page_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {page.views} views • {page.leads} leads
                        </p>
                      </div>
                      <Badge variant="secondary">{page.conversion_rate.toFixed(1)}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lead-response" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Response Performance</CardTitle>
                <CardDescription>Lead response metrics and SLA compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>SLA Compliance</span>
                    <span>
                      {Math.round((data.lead_response.responded_within_sla / data.lead_response.total_leads) * 100)}%
                    </span>
                  </div>
                  <Progress value={(data.lead_response.responded_within_sla / data.lead_response.total_leads) * 100} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Success Rate</span>
                    <span>{data.lead_response.success_rate.toFixed(1)}%</span>
                  </div>
                  <Progress value={data.lead_response.success_rate} />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <Mail className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">
                      {data.lead_response.channel_performance.email.sent} sent
                    </p>
                  </div>
                  <div className="text-center">
                    <MessageSquare className="h-6 w-6 mx-auto mb-2 text-green-500" />
                    <p className="text-sm font-medium">SMS</p>
                    <p className="text-xs text-muted-foreground">
                      {data.lead_response.channel_performance.sms.sent} sent
                    </p>
                  </div>
                  <div className="text-center">
                    <Phone className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                    <p className="text-sm font-medium">Calls</p>
                    <p className="text-xs text-muted-foreground">
                      {data.lead_response.channel_performance.calls.attempted} attempted
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Distribution</CardTitle>
                <CardDescription>Response channel usage breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channelData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {channelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="funnels" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Funnels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.funnel_performance.active_funnels}</div>
                <p className="text-sm text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.funnel_performance.total_contacts.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">In active funnels</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.funnel_performance.completion_rate.toFixed(1)}%</div>
                <p className="text-sm text-muted-foreground">Average across all funnels</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Attribution</CardTitle>
                <CardDescription>Revenue breakdown by channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>VSL Pages</span>
                    <span className="font-bold">${data.revenue_attribution.vsl_attributed.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Lead Response</span>
                    <span className="font-bold">
                      ${data.revenue_attribution.lead_response_attributed.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Funnels</span>
                    <span className="font-bold">${data.revenue_attribution.funnel_attributed.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${data.revenue_attribution.total_revenue.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Daily revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="conversions" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
