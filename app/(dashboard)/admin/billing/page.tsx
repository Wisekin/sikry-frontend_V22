"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
  ViewColumnsIcon,
  ListBulletIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline"

export default function BillingPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('overview');

  const billingHistory = [
    {
      id: "INV-001",
      date: "Mar 1, 2024",
      amount: "$2,450.00",
      status: "Paid",
      description: "Monthly Enterprise Plan"
    },
    {
      id: "INV-002",
      date: "Feb 1, 2024",
      amount: "$2,450.00",
      status: "Paid",
      description: "Monthly Enterprise Plan"
    },
    // Add more billing history items as needed
  ];

  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B] p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Billing & Usage</h1>
          <p className="text-gray-500 mt-1">
            Manage your subscription, billing history, and usage metrics.
          </p>
        </div>
        <Button size="lg" className="bg-[#1B1F3B] text-white hover:bg-[#2A3050] flex items-center gap-2">
          <CreditCardIcon className="w-5 h-5" />
          <span>Update Payment Method</span>
        </Button>
      </div>

      {/* Secondary Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Tabs defaultValue="overview" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Overview</TabsTrigger>
            <TabsTrigger value="invoices" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Invoices</TabsTrigger>
            <TabsTrigger value="usage" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Usage</TabsTrigger>
            <TabsTrigger value="plans" className="text-gray-600 data-[state=active]:bg-[#3C4568] data-[state=active]:text-white rounded-md">Plans</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${viewMode === 'grid' ? 'bg-[#3C4568] text-white' : 'bg-white'}`}
            onClick={() => setViewMode('grid')}
          >
            <ViewColumnsIcon className="w-4 h-4" />
            <span>Grid</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex items-center gap-2 ${viewMode === 'list' ? 'bg-[#3C4568] text-white' : 'bg-white'}`}
            onClick={() => setViewMode('list')}
          >
            <ListBulletIcon className="w-4 h-4" />
            <span>List</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-6">
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Current Plan</CardTitle>
                <CreditCardIcon className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1B1F3B]">Enterprise</div>
                <p className="text-xs text-gray-500">$2,450/month</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Next Billing Date</CardTitle>
                <CalendarIcon className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1B1F3B]">Apr 1, 2024</div>
                <p className="text-xs text-gray-500">15 days remaining</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Usage This Month</CardTitle>
                <ChartBarIcon className="w-5 h-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1B1F3B]">75%</div>
                <p className="text-xs text-amber-600">Approaching limit</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {billingHistory.map((invoice, index) => (
              <Card key={index} className="bg-white border-none shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#2A3050]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-[#1B1F3B]">{invoice.id}</h3>
                      <p className="text-sm text-gray-500">{invoice.description}</p>
                      <p className="text-sm text-gray-400 mt-1">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#1B1F3B]">{invoice.amount}</div>
                      <span className={`px-2 py-1 rounded-full text-xs ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your service usage.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Usage analytics interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>Compare and switch between different subscription plans.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Plan comparison interface will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  )
}
