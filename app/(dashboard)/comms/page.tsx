"use client"

import { useState, useEffect } from "react"
import { getCommunications } from "@/lib/actions/communications"
import { CommunicationsTable } from "@/components/communications/CommunicationsTable"
import { CommunicationFilters } from "@/components/communications/CommunicationFilters"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import type { Communication } from "@/types/database"

export default function CommunicationsPage() {
  const [communications, setCommunications] = useState<Communication[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    loadCommunications()
  }, [activeTab])

  const loadCommunications = async () => {
    try {
      setLoading(true)
      const filters = activeTab !== "all" ? { status: activeTab } : undefined
      const data = await getCommunications(filters)
      setCommunications(data)
    } catch (error) {
      console.error("Failed to load communications:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    total: communications.length,
    sent: communications.filter((c) => c.status === "sent").length,
    delivered: communications.filter((c) => c.status === "delivered").length,
    opened: communications.filter((c) => c.status === "read").length,
    replied: communications.filter((c) => c.status === "answered").length,
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
          <p className="text-muted-foreground">Manage your outreach communications and track engagement.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Communication
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.sent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.delivered}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Opened</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.opened}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Replied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.replied}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Communications</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="read">Opened</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <CommunicationFilters />
          {loading ? (
            <div className="text-center py-8">Loading communications...</div>
          ) : (
            <CommunicationsTable communications={communications} onRefresh={loadCommunications} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
