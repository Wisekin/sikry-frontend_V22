"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Users,
  Clock,
  Zap,
  Download,
  Calendar,
} from "lucide-react"

// Define types for our data
interface KPI {
  name: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  target: string | number;
}

interface ChannelData {
  channel: string;
  leads: number;
  conversion: number;
  cost: string;
  roi: string;
}

interface TeamMemberPerformance {
  member: string;
  leads: number;
  conversion: number;
  responseTime: string;
  satisfaction: number;
}

interface PerformanceAnalyticsPageProps {
  // Add any props here if needed
}

export default function PerformanceAnalyticsPage({}: PerformanceAnalyticsPageProps) {
  const [timeRange, setTimeRange] = useState("30d")
  const [metric, setMetric] = useState("all")

  const performanceData = {
    overview: {
      totalLeads: 15420,
      conversionRate: 12.8,
      responseTime: "1.8 min",
      engagement: 78.5,
      growth: "+15.2%",
    },
    kpis: [
      { name: "Lead Generation", value: 15420, change: "+12.5%", trend: "up", target: 18000 },
      { name: "Conversion Rate", value: "12.8%", change: "+2.1%", trend: "up", target: "15%" },
      { name: "Response Time", value: "1.8 min", change: "-0.3 min", trend: "up", target: "1.5 min" },
      { name: "Engagement Score", value: "78.5%", change: "+5.2%", trend: "up", target: "85%" },
      { name: "Customer Satisfaction", value: "4.7/5", change: "+0.2", trend: "up", target: "4.8/5" },
      { name: "Revenue Growth", value: "$2.4M", change: "+18.7%", trend: "up", target: "$3M" },
    ],
    channels: [
      { channel: "Website Forms", leads: 5420, conversion: 15.2, cost: "$12.50", roi: "340%" },
      { channel: "LinkedIn Outreach", leads: 3890, conversion: 11.8, cost: "$18.20", roi: "280%" },
      { channel: "Google Ads", leads: 2840, conversion: 9.5, cost: "$25.80", roi: "220%" },
      { channel: "Email Campaigns", leads: 2150, conversion: 14.7, cost: "$8.90", roi: "420%" },
      { channel: "Referrals", leads: 1120, conversion: 22.3, cost: "$5.20", roi: "680%" },
    ],
    teamPerformance: [
      { member: "Sarah Johnson", leads: 1247, conversion: 18.5, responseTime: "1.2 min", satisfaction: 4.8 },
      { member: "Michael Chen", leads: 1089, conversion: 15.2, responseTime: "1.5 min", satisfaction: 4.6 },
      { member: "Emily Rodriguez", leads: 987, conversion: 16.8, responseTime: "1.3 min", satisfaction: 4.7 },
      { member: "David Kim", leads: 856, conversion: 14.1, responseTime: "1.8 min", satisfaction: 4.5 },
      { member: "Lisa Wang", leads: 743, conversion: 13.9, responseTime: "1.6 min", satisfaction: 4.4 },
    ],
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    )
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1B1F3B]">Performance Analytics</h1>
            <p className="text-[#3C4568] mt-2">Comprehensive performance metrics and insights</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 border-[#3C4568]/30 focus:border-[#1B1F3B]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#2A3050] text-[#2A3050] hover:bg-[#2A3050] hover:text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Advanced View
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="border-l-4 border-l-[#1B1F3B] hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1B1F3B]/5 hover:to-transparent cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Users className="w-5 h-5 text-[#1B1F3B]" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {performanceData.overview.growth}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B1F3B]">
                {performanceData.overview.totalLeads.toLocaleString()}
              </div>
              <p className="text-sm text-[#3C4568]">Total Leads</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#2A3050] hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#2A3050]/5 hover:to-transparent cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Target className="w-5 h-5 text-[#2A3050]" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2A3050]">{performanceData.overview.conversionRate}%</div>
              <p className="text-sm text-[#3C4568]">Conversion Rate</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#3C4568] hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#3C4568]/5 hover:to-transparent cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-[#3C4568]" />
                <Badge variant="outline" className="border-[#3C4568] text-[#3C4568]">
                  Avg
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#3C4568]">{performanceData.overview.responseTime}</div>
              <p className="text-sm text-[#3C4568]">Response Time</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Activity className="w-5 h-5 text-blue-500" />
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{performanceData.overview.engagement}%</div>
              <p className="text-sm text-[#3C4568]">Engagement</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Zap className="w-5 h-5 text-green-500" />
                <Badge variant="outline" className="border-green-500 text-green-500">
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94.2%</div>
              <p className="text-sm text-[#3C4568]">System Uptime</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs defaultValue="kpis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#3C4568]/20">
            <TabsTrigger value="kpis" className="data-[state=active]:bg-[#1B1F3B] data-[state=active]:text-white">
              KPIs
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-[#1B1F3B] data-[state=active]:text-white">
              Channels
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:bg-[#1B1F3B] data-[state=active]:text-white">
              Team
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#1B1F3B] data-[state=active]:text-white">
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kpis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceData.kpis.map((kpi, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#1B1F3B]/2 hover:to-transparent"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-[#1B1F3B]">{kpi.name}</CardTitle>
                      {getTrendIcon(kpi.trend)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-[#1B1F3B]">{kpi.value}</div>
                        <Badge variant="outline" className={`${getTrendColor(kpi.trend)} border-current`}>
                          {kpi.change}
                        </Badge>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#3C4568]">Target: {kpi.target}</span>
                          <span className="text-[#3C4568]">
                            {(() => {
                              const valueStr = String(kpi.value);
                              const targetStr = String(kpi.target);
                              
                              if (valueStr.includes("%")) {
                                return Math.round((Number.parseFloat(valueStr) / Number.parseFloat(targetStr)) * 100);
                              }
                              
                              const numericValue = Number.parseInt(valueStr.replace(/[^0-9.]/g, ""), 10) || 0;
                              const numericTarget = Number.parseInt(targetStr.replace(/[^0-9.]/g, ""), 10) || 1;
                              
                              return Math.round((numericValue / numericTarget) * 100);
                            })()}%
                          </span>
                        </div>
                        <Progress
                          value={
                            (() => {
                              const valueStr = String(kpi.value);
                              const targetStr = String(kpi.target);
                              
                              if (valueStr.includes("%")) {
                                return (Number.parseFloat(valueStr) / Number.parseFloat(targetStr)) * 100;
                              }
                              
                              const numericValue = Number.parseInt(valueStr.replace(/[^0-9.]/g, ""), 10) || 0;
                              const numericTarget = Number.parseInt(targetStr.replace(/[^0-9.]/g, ""), 10) || 1; // Avoid division by zero
                              
                              return (numericValue / numericTarget) * 100;
                            })()
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="channels" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-[#1B1F3B]">Channel Performance</CardTitle>
                <CardDescription>Performance metrics by acquisition channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.channels.map((channel, index) => (
                    <div
                      key={index}
                      className="p-4 border border-[#3C4568]/20 rounded-lg hover:bg-[#1B1F3B]/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-[#1B1F3B]">{channel.channel}</h4>
                        <Badge variant="outline" className="border-[#2A3050] text-[#2A3050]">
                          ROI: {channel.roi}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-[#3C4568]">Leads</p>
                          <p className="font-semibold text-[#1B1F3B]">{channel.leads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[#3C4568]">Conversion</p>
                          <p className="font-semibold text-green-600">{channel.conversion}%</p>
                        </div>
                        <div>
                          <p className="text-[#3C4568]">Cost per Lead</p>
                          <p className="font-semibold text-[#2A3050]">{channel.cost}</p>
                        </div>
                        <div>
                          <p className="text-[#3C4568]">ROI</p>
                          <p className="font-semibold text-green-600">{channel.roi}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={channel.conversion} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-[#1B1F3B]">Team Performance</CardTitle>
                <CardDescription>Individual team member performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.teamPerformance.map((member, index) => (
                    <div
                      key={index}
                      className="p-4 border border-[#3C4568]/20 rounded-lg hover:bg-[#1B1F3B]/5 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-[#1B1F3B]">{member.member}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                            ⭐ {member.satisfaction}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-[#3C4568]">Leads Handled</p>
                          <p className="font-semibold text-[#1B1F3B]">{member.leads.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-[#3C4568]">Conversion Rate</p>
                          <p className="font-semibold text-green-600">{member.conversion}%</p>
                        </div>
                        <div>
                          <p className="text-[#3C4568]">Avg Response Time</p>
                          <p className="font-semibold text-[#2A3050]">{member.responseTime}</p>
                        </div>
                        <div>
                          <p className="text-[#3C4568]">Satisfaction</p>
                          <p className="font-semibold text-yellow-600">{member.satisfaction}/5</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={member.conversion} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#1B1F3B]">Performance Trends</CardTitle>
                  <CardDescription>Key metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[#1B1F3B]/5 to-[#2A3050]/5 rounded-lg">
                    <p className="text-[#3C4568]">Performance trend chart will be rendered here</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-[#1B1F3B]">Predictive Analytics</CardTitle>
                  <CardDescription>Forecasted performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[#1B1F3B]/5 to-[#2A3050]/5 rounded-lg">
                    <p className="text-[#3C4568]">Predictive analytics chart will be rendered here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
