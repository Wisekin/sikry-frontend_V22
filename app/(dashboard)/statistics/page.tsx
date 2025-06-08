"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartInsights } from "@/components/insights/SmartInsights"
import {
  ChartBarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid"

export default function StatisticsPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Statistics & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your data collection and business intelligence</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BuildingOfficeIcon className="w-4 h-4" />
                Total Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,458</div>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <ArrowTrendingUpIcon className="w-3 h-3" />
                +124 this month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <ChartBarIcon className="w-4 h-4" />
                Active Scrapers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87</div>
              <p className="text-sm text-gray-600">Last run: 2 hours ago</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <GlobeAltIcon className="w-4 h-4" />
                Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-sm text-green-600">92% delivery rate</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                Data Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <p className="text-sm text-green-600">+2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Smart Insights */}
        <SmartInsights />

        {/* Expandable Analytics Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Collection Trends Card */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-blue-600" />
                  Collection Trends
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCard("collection")}
                  className="flex items-center gap-1"
                >
                  {expandedCard === "collection" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                  {expandedCard === "collection" ? "Collapse" : "Expand"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-blue-600 font-medium">Interactive Chart</p>
                  <p className="text-sm text-gray-600">Data collection over time</p>
                </div>
              </div>
              {expandedCard === "collection" && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-blue-600">2,847</div>
                      <div className="text-xs text-gray-600">This Week</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">11,234</div>
                      <div className="text-xs text-gray-600">This Month</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-600">124,567</div>
                      <div className="text-xs text-gray-600">All Time</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <h4 className="font-medium mb-2">Top Performing Sources:</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>LinkedIn Scraper</span>
                        <span className="font-medium">34%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Company Websites</span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Public Directories</span>
                        <span className="font-medium">22%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Geographic Distribution Card */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-green-600" />
                  Geographic Distribution
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCard("geographic")}
                  className="flex items-center gap-1"
                >
                  {expandedCard === "geographic" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                  {expandedCard === "geographic" ? "Collapse" : "Expand"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <GlobeAltIcon className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <p className="text-green-600 font-medium">Interactive Map</p>
                  <p className="text-sm text-gray-600">Global data distribution</p>
                </div>
              </div>
              {expandedCard === "geographic" && (
                <div className="mt-4 space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Switzerland</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-16 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Germany</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-12 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">28%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">France</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-8 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Others</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div className="w-4 h-2 bg-gray-600 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sector Analysis Card */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-purple-600" />
                  Sector Analysis
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCard("sector")}
                  className="flex items-center gap-1"
                >
                  {expandedCard === "sector" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                  {expandedCard === "sector" ? "Collapse" : "Expand"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 border-8 border-purple-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-purple-600 font-medium">Pie Chart</p>
                  <p className="text-sm text-gray-600">Industry distribution</p>
                </div>
              </div>
              {expandedCard === "sector" && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                        <span className="text-sm">Technology (35%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Finance (25%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-sm">Healthcare (15%)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                        <span className="text-sm">Manufacturing (12%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                        <span className="text-sm">Retail (8%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                        <span className="text-sm">Others (5%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics Card */}
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-orange-600" />
                  Performance Metrics
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCard("performance")}
                  className="flex items-center gap-1"
                >
                  {expandedCard === "performance" ? (
                    <ChevronUpIcon className="w-4 h-4" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4" />
                  )}
                  {expandedCard === "performance" ? "Collapse" : "Expand"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ArrowTrendingUpIcon className="w-12 h-12 text-orange-600 mx-auto mb-2" />
                  <p className="text-orange-600 font-medium">Line Chart</p>
                  <p className="text-sm text-gray-600">Performance trends</p>
                </div>
              </div>
              {expandedCard === "performance" && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">98.5%</div>
                      <div className="text-xs text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">156ms</div>
                      <div className="text-xs text-gray-600">Avg Response</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <h4 className="font-medium mb-2">Recent Performance:</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Data Collection Rate</span>
                        <span className="font-medium text-green-600">↑ 12%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Error Rate</span>
                        <span className="font-medium text-green-600">↓ 0.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Speed</span>
                        <span className="font-medium text-green-600">↑ 8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Data Collection Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Records</span>
                      <span className="font-medium">124,567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">This Month</span>
                      <span className="font-medium">11,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Success Rate</span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Top Industries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Technology</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Finance</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Healthcare</span>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">DACH Region</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">EU</span>
                      <span className="font-medium">22%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Global</span>
                      <span className="font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <ChartBarIcon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-lg font-medium text-blue-600">Advanced Analytics Dashboard</p>
                    <p className="text-gray-600">Interactive charts and trend analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources">
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle>Data Source Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                    <div>Source</div>
                    <div>Records</div>
                    <div>Quality</div>
                    <div>Status</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>LinkedIn Scraper</div>
                    <div>42,567</div>
                    <div className="text-green-600 font-medium">98%</div>
                    <div className="text-green-600">Active</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>Company Websites</div>
                    <div>34,891</div>
                    <div className="text-green-600 font-medium">95%</div>
                    <div className="text-green-600">Active</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>Public Directories</div>
                    <div>28,234</div>
                    <div className="text-yellow-600 font-medium">87%</div>
                    <div className="text-yellow-600">Monitoring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality">
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle>Data Quality Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Completeness</span>
                        <span className="text-sm font-medium">96%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "96%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Accuracy</span>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Freshness</span>
                        <span className="text-sm font-medium">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">A+</div>
                      <div className="text-sm text-gray-600">Overall Grade</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Your data quality score is excellent. Continue monitoring for optimal performance.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
