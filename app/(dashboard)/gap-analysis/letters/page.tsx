"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function GapAnalysisLettersPage() {
  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B]">
      <SecondaryMenuBar />

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Gap Analysis Letters</h1>
            <p className="text-gray-500 mt-1">
              View and manage your gap analysis letters.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Letters Overview</CardTitle>
              <CardDescription>Summary of your gap analysis letters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Gap analysis letters will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
