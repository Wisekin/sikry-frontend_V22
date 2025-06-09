"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, AlertTriangle, Lock } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function CompliancePage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
  const viewMode = searchParams.get('view') || 'grid'

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">GDPR Compliance</CardTitle>
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <p className="text-xs text-gray-500">Fully compliant</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">CCPA Compliance</CardTitle>
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <p className="text-xs text-gray-500">Fully compliant</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Audit Status</CardTitle>
                  <Lock className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">Passed</div>
                  <p className="text-xs text-gray-500">Last audit: 2 days ago</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
                <CardDescription>Current compliance status and recent activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add compliance content here */}
                </div>
              </CardContent>
            </Card>
          </>
        )
      case 'logs':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Compliance Logs</CardTitle>
              <CardDescription>View and manage compliance logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {/* Add logs list/grid content here */}
              </div>
            </CardContent>
          </Card>
        )
      case 'policies':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Compliance Policies</CardTitle>
              <CardDescription>View and manage compliance policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {/* Add policies list/grid content here */}
              </div>
            </CardContent>
          </Card>
        )
      case 'reports':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>View and generate compliance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {/* Add reports list/grid content here */}
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Compliance</h1>
            <p className="text-gray-500 mt-1">
              Monitor and manage your organization's compliance status.
            </p>
          </div>
          <Button size="lg" className="bg-[#1B1F3B] text-white hover:bg-[#2A3050] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span>Run Audit</span>
          </Button>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
