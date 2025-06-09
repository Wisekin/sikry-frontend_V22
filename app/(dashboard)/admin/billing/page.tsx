"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Calendar } from "lucide-react"

export default function BillingPage() {
  const usageData = [
    { name: "API Calls", used: 45000, limit: 100000, unit: "calls" },
    { name: "Data Storage", used: 2.3, limit: 10, unit: "GB" },
    { name: "Email Sends", used: 1200, limit: 5000, unit: "emails" },
    { name: "Scraper Runs", used: 89, limit: 500, unit: "runs" },
  ]

  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: "$2,450", status: "Paid" },
    { id: "INV-002", date: "2023-12-01", amount: "$2,450", status: "Paid" },
    { id: "INV-003", date: "2023-11-01", amount: "$2,200", status: "Paid" },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>Billing & Usage</Heading>
            <Text className="text-secondary">Monitor your usage and manage billing</Text>
          </div>
          <Button>
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment Method
          </Button>
        </div>

        {/* Current Plan */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your subscription details and billing cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-h2 font-semibold">Professional Plan</div>
                <Text className="text-secondary">$2,450/month • Billed monthly</Text>
                <Text size="sm" className="text-secondary mt-1">
                  Next billing date: February 1, 2024
                </Text>
              </div>
              <div className="text-right">
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Change Plan
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Current month usage across all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {usageData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Text className="font-medium">{item.name}</Text>
                    <Text size="sm" className="text-secondary">
                      {item.used.toLocaleString()} / {item.limit.toLocaleString()} {item.unit}
                    </Text>
                  </div>
                  <Progress value={(item.used / item.limit) * 100} className="h-2" />
                  <Text size="sm" className="text-secondary">
                    {Math.round((item.used / item.limit) * 100)}% used
                  </Text>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>Download invoices and view payment history</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{invoice.id}</div>
                      <Text size="sm" className="text-secondary">
                        {invoice.date}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{invoice.amount}</div>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
