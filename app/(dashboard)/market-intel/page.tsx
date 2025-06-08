"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompetitorMatrix } from "@/components/market/CompetitorMatrix"
import { RelationshipGraph } from "@/components/market/RelationshipGraph"
import { LeadScoreCard } from "@/components/market/LeadScoreCard"
import { ArrowTrendingUpIcon, UserGroupIcon, LightBulbIcon, ChartBarIcon } from "@heroicons/react/24/solid"

export default function MarketIntelPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="border-b pb-6">
        <Heading level={1} className="text-gray-900">Market Intelligence Dashboard</Heading>
        <Text className="text-gray-500 mt-2">
          Strategic insights on competitors, market trends, and growth opportunities
        </Text>
      </div>

      {/* Stats Overview - Modern Cards with Enhanced Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <ChartBarIcon className="w-4 h-4 text-[#1B1F3B]" />
              Market Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B1F3B]">$2.4B</div>
            <Text size="sm" className="flex items-center mt-1 text-emerald-600">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +15% YoY growth
            </Text>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <UserGroupIcon className="w-4 h-4 text-[#1B1F3B]" />
              Competitors Tracked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B1F3B]">47</div>
            <Text size="sm" className="text-gray-500 mt-1">
              Active monitoring
            </Text>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <LightBulbIcon className="w-4 h-4 text-[#1B1F3B]" />
              Lead Score Avg
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B1F3B]">78</div>
            <Text size="sm" className="flex items-center mt-1 text-emerald-600">
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
              +12 points
            </Text>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <LightBulbIcon className="w-4 h-4 text-[#1B1F3B]" />
              Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#1B1F3B]">156</div>
            <Text size="sm" className="text-[#1B1F3B] font-medium mt-1">
              High potential
            </Text>
          </CardContent>
        </Card>
      </div>

      {/* Insights Banner */}
      <div className="bg-gradient-to-r from-[#1B1F3B] to-[#2D325E] rounded-xl p-5 text-white transition-all duration-300 hover:shadow-lg hover:from-[#2A3050] hover:to-[#3C4568]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Market Opportunity Alert</h3>
            <p className="text-sm opacity-80 mt-1">
              Fintech sector showing 23% growth potential - 42 high-value targets identified
            </p>
          </div>
          <button className="text-sm font-medium px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition">
            Explore Opportunities
          </button>
        </div>
      </div>

      {/* Main Content - Modern Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="text-lg">Competitor Landscape</CardTitle>
              <Text className="text-gray-500 text-sm">
                Market position analysis across key dimensions
              </Text>
            </CardHeader>
            <CardContent>
              <CompetitorMatrix />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="text-lg">Relationship Mapping</CardTitle>
              <Text className="text-gray-500 text-sm">
                Connections between industry players and key stakeholders
              </Text>
            </CardHeader>
            <CardContent className="min-h-[400px]">
              <RelationshipGraph />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="text-lg">Lead Scoring</CardTitle>
              <Text className="text-gray-500 text-sm">
                Prioritized prospects by engagement potential
              </Text>
            </CardHeader>
            <CardContent>
              <LeadScoreCard />
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:border hover:border-[#2A3050] hover:-translate-y-0.5">
            <CardHeader>
              <CardTitle className="text-lg">Market Trends</CardTitle>
              <Text className="text-gray-500 text-sm">
                Emerging opportunities by sector
              </Text>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Fintech</span>
                    <span className="text-sm font-medium text-[#1B1F3B]">23% growth</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1B1F3B] h-2 rounded-full transition-all duration-500 ease-out" style={{width: '75%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Healthtech</span>
                    <span className="text-sm font-medium text-[#1B1F3B]">18% growth</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1B1F3B] h-2 rounded-full transition-all duration-500 ease-out" style={{width: '60%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">SaaS</span>
                    <span className="text-sm font-medium text-[#1B1F3B]">15% growth</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1B1F3B] h-2 rounded-full transition-all duration-500 ease-out" style={{width: '50%'}}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">E-commerce</span>
                    <span className="text-sm font-medium text-[#1B1F3B]">12% growth</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#1B1F3B] h-2 rounded-full transition-all duration-500 ease-out" style={{width: '40%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}