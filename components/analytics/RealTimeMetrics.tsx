"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockIcon, SignalIcon } from "@heroicons/react/24/solid"

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    activeScrapers: 8,
    dataPointsToday: 1247,
    successRate: 94.2,
    avgResponseTime: 1.8,
    trendsUp: 3,
    trendsDown: 1,
  })

  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setMetrics((prev) => ({
          ...prev,
          dataPointsToday: prev.dataPointsToday + Math.floor(Math.random() * 5),
          successRate: Math.max(85, Math.min(99, prev.successRate + (Math.random() - 0.5) * 2)),
          avgResponseTime: Math.max(0.5, Math.min(5, prev.avgResponseTime + (Math.random() - 0.5) * 0.5)),
        }))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isLive])

  const realTimeEvents = [
    { time: "2s ago", event: "Company data extracted", type: "success" },
    { time: "15s ago", event: "New scraper started", type: "info" },
    { time: "32s ago", event: "Email campaign sent", type: "success" },
    { time: "1m ago", event: "Rate limit reached", type: "warning" },
    { time: "2m ago", event: "Data enrichment completed", type: "success" },
  ]

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <SignalIcon className="w-5 h-5 text-green-500" />
              <span>Real-Time Metrics</span>
              {isLive && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">LIVE</span>
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.activeScrapers}</div>
              <div className="text-sm text-gray-600">Active Scrapers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.dataPointsToday.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Data Points Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.successRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics.avgResponseTime.toFixed(1)}s</div>
              <div className="text-sm text-gray-600">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-blue-500" />
            Live Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {realTimeEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    event.type === "success"
                      ? "bg-green-500"
                      : event.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <span className="text-sm">{event.event}</span>
                </div>
                <span className="text-xs text-gray-500">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
