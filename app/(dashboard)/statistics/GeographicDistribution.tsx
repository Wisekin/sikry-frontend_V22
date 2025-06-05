"use client"

import { Text } from "@/components/core/typography/Text"

export function GeographicDistribution() {
  // Sample data for geographic distribution
  const regions = [
    { name: "North America", value: 42, color: "#003C71" },
    { name: "Europe", value: 28, color: "#6E3AFF" },
    { name: "Asia Pacific", value: 18, color: "#5A697B" },
    { name: "Latin America", value: 8, color: "#4BCA81" },
    { name: "Africa", value: 4, color: "#FFC400" },
  ]

  // Sort regions by value in descending order
  const sortedRegions = [...regions].sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Map placeholder */}
        <div className="border rounded-lg p-4 flex items-center justify-center bg-gray-50 h-60">
          <Text className="text-secondary">Interactive map will be displayed here</Text>
        </div>

        {/* Chart */}
        <div className="space-y-4">
          {sortedRegions.map((region, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <Text>{region.name}</Text>
                <Text className="font-medium">{region.value}%</Text>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${region.value}%`, backgroundColor: region.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {regions.map((region, index) => (
          <div key={index} className="text-center">
            <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: region.color }}></div>
            <Text size="xs" className="text-secondary">
              {region.name}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}
