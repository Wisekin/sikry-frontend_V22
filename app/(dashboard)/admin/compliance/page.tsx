"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function CompliancePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const complianceLogs = [
    {
      id: "1",
      type: "Data Access",
      status: "Compliant",
      severity: "low",
      user: "john.doe@company.com",
      action: "Viewed customer data",
      timestamp: "2024-02-20 14:30:00",
      description: "Authorized access to customer records"
    },
    {
      id: "2",
      type: "Policy Update",
      status: "Pending Review",
      severity: "medium",
      user: "admin@company.com",
      action: "Modified privacy policy",
      timestamp: "2024-02-20 14:25:00",
      description: "Updated GDPR compliance section"
    },
    // Add more compliance logs as needed
  ];

  const compliancePolicies = [
    {
      id: "1",
      name: "GDPR Compliance",
      status: "Active",
      lastUpdated: "2024-02-15",
      description: "European data protection regulations"
    },
    {
      id: "2",
      name: "CCPA Compliance",
      status: "Active",
      lastUpdated: "2024-02-10",
      description: "California consumer privacy regulations"
    },
    // Add more policies as needed
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

  const filteredLogs = complianceLogs.filter(log =>
    log.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B]">
      <SecondaryMenuBar />

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Compliance Settings</h1>
            <p className="text-gray-500 mt-1">
              Manage compliance policies, monitor activities, and ensure regulatory requirements.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">GDPR Status</CardTitle>
                  <ShieldCheckIcon className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <p className="text-xs text-emerald-600">Fully compliant</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">CCPA Status</CardTitle>
                  <DocumentTextIcon className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <p className="text-xs text-emerald-600">Fully compliant</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Audit Status</CardTitle>
                  <ClipboardDocumentCheckIcon className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">Passed</div>
                  <p className="text-xs text-emerald-600">Last audit: 30 days ago</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Compliance Logs</CardTitle>
                <CardDescription>Monitor and review compliance-related activities.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLogs.map((log) => (
                    <div key={log.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1B1F3B]">{log.type}</h3>
                          <p className="text-sm text-gray-500">{log.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(log.severity)}`}>
                              {log.severity}
                            </span>
                            <span className="text-xs text-gray-400">{log.timestamp}</span>
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

          <TabsContent value="policies">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Compliance Policies</CardTitle>
                <CardDescription>Configure and manage compliance policies.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {compliancePolicies.map((policy) => (
                    <div key={policy.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1B1F3B]">{policy.name}</h3>
                          <p className="text-sm text-gray-500">{policy.description}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700">
                              {policy.status}
                            </span>
                            <span className="text-xs text-gray-400">Last updated: {policy.lastUpdated}</span>
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

          <TabsContent value="reports">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>Generate and manage compliance reports.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Compliance reporting interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
