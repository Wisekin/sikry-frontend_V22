"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VSLPage() {
  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B]">
      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Value Selling Letter</h1>
            <p className="text-gray-500 mt-1">
              Create and manage your value selling letters.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>VSL Overview</CardTitle>
              <CardDescription>Summary of your value selling letters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Value selling letters will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
