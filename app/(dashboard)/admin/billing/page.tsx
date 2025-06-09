"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Receipt, Activity, Package } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function BillingPage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Current Plan</CardTitle>
                  <Package className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">Pro</div>
                  <p className="text-xs text-gray-500">$49/month</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Next Invoice</CardTitle>
                  <Receipt className="w-5 h-5 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">$49.00</div>
                  <p className="text-xs text-gray-500">Due in 15 days</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Usage</CardTitle>
                  <Activity className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">75%</div>
                  <p className="text-xs text-gray-500">Of monthly quota</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Billing Overview</CardTitle>
                <CardDescription>Your current billing status and recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add billing content here */}
                </div>
              </CardContent>
            </Card>
          </>
        )
      case 'invoices':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and manage your billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add invoices content here */}
              </div>
            </CardContent>
          </Card>
        )
      case 'usage':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your service usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add usage content here */}
              </div>
            </CardContent>
          </Card>
        )
      case 'plans':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Compare and switch between different subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add plans content here */}
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
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Billing</h1>
            <p className="text-gray-500 mt-1">
              Manage your billing information and subscription.
            </p>
          </div>
          <Button size="lg" className="bg-[#1B1F3B] text-white hover:bg-[#2A3050] flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            <span>Update Payment Method</span>
          </Button>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
