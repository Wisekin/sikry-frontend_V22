"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, AlertTriangle, Lock, Download, Search, Edit, Trash2 } from "lucide-react"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function SecurityPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const securityLogs = [
    {
      id: 1,
      type: "Login Attempt",
      status: "Failed",
      severity: "high",
      user: "john.doe@example.com",
      ip: "192.168.1.1",
      timestamp: "2024-02-20 14:30:00",
      details: "Multiple failed login attempts detected"
    },
    {
      id: 2,
      type: "Policy Change",
      status: "Success",
      severity: "medium",
      user: "admin@example.com",
      ip: "192.168.1.2",
      timestamp: "2024-02-20 13:15:00",
      details: "Updated password policy requirements"
    },
    {
      id: 3,
      type: "Access Request",
      status: "Pending",
      severity: "low",
      user: "jane.smith@example.com",
      ip: "192.168.1.3",
      timestamp: "2024-02-20 12:45:00",
      details: "Requested access to restricted resource"
    }
  ]

  const securityPolicies = [
    {
      id: 1,
      name: "Password Policy",
      status: "Active",
      lastUpdated: "2024-02-19",
      description: "Enforces strong password requirements and regular rotation"
    },
    {
      id: 2,
      name: "2FA Policy",
      status: "Active",
      lastUpdated: "2024-02-18",
      description: "Requires two-factor authentication for all users"
    },
    {
      id: 3,
      name: "Access Control Policy",
      status: "Active",
      lastUpdated: "2024-02-17",
      description: "Defines role-based access control rules"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SecondaryMenuBar />
      
      <div className="p-6 space-y-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Threats</CardTitle>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-gray-500">Requires immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">2FA Status</CardTitle>
              <Lock className="w-5 h-5 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">98%</div>
              <p className="text-xs text-gray-500">Users with 2FA enabled</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Security Score</CardTitle>
              <ShieldCheck className="w-5 h-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">92/100</div>
              <p className="text-xs text-gray-500">Overall security rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Security Logs Section */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle>Security Logs</CardTitle>
            <CardDescription>Recent security events and activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <div className="font-medium">{log.type}</div>
                      <div className="text-sm text-gray-500">{log.details}</div>
                    </div>
                    <Badge className={getSeverityColor(log.severity)}>
                      {log.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Policies Section */}
        <Card className="bg-white border-none shadow-sm">
          <CardHeader>
            <CardTitle>Security Policies</CardTitle>
            <CardDescription>Active security policies and configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityPolicies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col">
                    <div className="font-medium">{policy.name}</div>
                    <div className="text-sm text-gray-500">{policy.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
