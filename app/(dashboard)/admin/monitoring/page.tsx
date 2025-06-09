"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import {
  ServerIcon,
  ChartBarIcon,
  BellAlertIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function MonitoringPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const alerts = [
    {
      id: "1",
      type: "CPU Spike",
      status: "Active",
      severity: "high",
      server: "api-server-1",
      timestamp: "2024-02-20 14:30:00",
      description: "CPU usage exceeded 90% for 5 minutes"
    },
    {
      id: "2",
      type: "Memory Leak",
      status: "Resolved",
      severity: "medium",
      server: "web-server-2",
      timestamp: "2024-02-20 13:15:00",
      description: "Memory usage returned to normal"
    },
    // Add more alerts as needed
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-amber-100 text-amber-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.server.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B]">
      <SecondaryMenuBar />

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">System Monitoring</h1>
            <p className="text-gray-500 mt-1">
              Monitor system health, view alerts, and analyze performance metrics.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Alerts</CardTitle>
                  <BellAlertIcon className="w-5 h-5 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <p className="text-xs text-red-600">Requires attention</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Servers Monitored</CardTitle>
                  <ServerIcon className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">12</div>
                  <p className="text-xs text-emerald-600">All systems operational</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Performance Score</CardTitle>
                  <ChartBarIcon className="w-5 h-5 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">97/100</div>
                  <p className="text-xs text-amber-600">Excellent performance</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Monitor and review system alerts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div key={alert.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1B1F3B]">{alert.type}</h3>
                          <p className="text-sm text-gray-500">{alert.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <span className="text-xs text-gray-400">{alert.timestamp}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-[#2A3050]"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-600"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Analyze system performance metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Performance metrics interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
