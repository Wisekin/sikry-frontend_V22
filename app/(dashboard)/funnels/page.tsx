"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, MoreHorizontal, Users, TrendingUp, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Funnel } from "@/types/funnels"
import { FunnelBuilder } from "@/components/funnels/FunnelBuilder"

export default function FunnelsPage() {
  const router = useRouter()
  const [funnels, setFunnels] = useState<Funnel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingFunnel, setEditingFunnel] = useState<Funnel | null>(null)

  useEffect(() => {
    loadFunnels()
  }, [])

  const loadFunnels = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/funnels")
      const data = await response.json()
      setFunnels(data.funnels || [])
    } catch (error) {
      console.error("Error loading funnels:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateFunnel = () => {
    setEditingFunnel(null)
    setShowBuilder(true)
  }

  const handleEditFunnel = (funnel: Funnel) => {
    setEditingFunnel(funnel)
    setShowBuilder(true)
  }

  const handleSaveFunnel = async (funnelData: any) => {
    try {
      const url = editingFunnel ? `/api/funnels/${editingFunnel.id}` : "/api/funnels"
      const method = editingFunnel ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(funnelData),
      })

      if (response.ok) {
        setShowBuilder(false)
        setEditingFunnel(null)
        loadFunnels()
      }
    } catch (error) {
      console.error("Error saving funnel:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "draft":
        return "bg-gray-500"
      case "paused":
        return "bg-yellow-500"
      case "archived":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredFunnels = funnels.filter(
    (funnel) =>
      funnel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      funnel.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (showBuilder) {
    return (
      <FunnelBuilder
        funnel={editingFunnel || undefined}
        onSave={handleSaveFunnel}
        onCancel={() => {
          setShowBuilder(false)
          setEditingFunnel(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Funnels</h1>
          <p className="text-muted-foreground">Create and manage automated lead nurturing sequences</p>
        </div>
        <Button onClick={handleCreateFunnel}>
          <Plus className="h-4 w-4 mr-2" />
          Create Funnel
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search funnels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Funnels Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredFunnels.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredFunnels.map((funnel) => (
            <Card key={funnel.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(funnel.status)}`}></div>
                    <CardTitle className="text-lg">{funnel.name}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>{funnel.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <Badge variant="outline" className="capitalize">
                      {funnel.funnel_type.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">{funnel.total_enrolled}</div>
                      <div className="text-xs text-muted-foreground">Enrolled</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{funnel.total_completed}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">
                        {funnel.total_enrolled > 0
                          ? Math.round((funnel.total_completed / funnel.total_enrolled) * 100)
                          : 0}
                        %
                      </div>
                      <div className="text-xs text-muted-foreground">Success</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => router.push(`/funnels/${funnel.id}`)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      View Progress
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditFunnel(funnel)}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No funnels yet</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              Create your first automated lead nurturing funnel to get started
            </p>
            <Button onClick={handleCreateFunnel}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Funnel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
