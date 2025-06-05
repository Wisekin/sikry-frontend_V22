"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CompetitorMatrix } from "@/components/market/CompetitorMatrix"
import { RelationshipGraph } from "@/components/market/RelationshipGraph"
import { LeadScoreCard } from "@/components/market/LeadScoreCard"

export default function MarketIntelPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1}>Market Intelligence</Heading>
          <Text className="text-secondary">Analyze market trends, competitors, and opportunities</Text>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Market Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">$2.4B</div>
              <Text size="sm" className="text-emerald-600">
                +15% YoY growth
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Competitors Tracked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">47</div>
              <Text size="sm" className="text-secondary">
                Active monitoring
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Lead Score Avg</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">78</div>
              <Text size="sm" className="text-emerald-600">
                +12 points
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">156</div>
              <Text size="sm" className="text-accent">
                High potential
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CompetitorMatrix />
            <RelationshipGraph />
          </div>
          <div>
            <LeadScoreCard />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
