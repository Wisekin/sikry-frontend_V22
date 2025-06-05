import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Helper function to generate mock daily performance data
const generateDailyPerformance = (days: number) => {
  const data = []
  const today = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" }) // Mon, Tue, etc.
    data.push({
      name: dayName,
      // Simulate some fluctuations
      views: Math.floor(Math.random() * 500) + 100 + (days - i) * 10, // Trend upwards
      leads: Math.floor(Math.random() * 50) + 10 + (days - i),
      conversions: Math.floor(Math.random() * 30) + 5 + (days - i) * 0.5,
      revenue: (Math.floor(Math.random() * 20) + 5 + (days - i) * 0.5) * (Math.random() * 50 + 50), // revenue based on conversions
    })
  }
  return data
}

// Helper function to generate a random change percentage (-0.2 to 0.2 for example)
const getRandomChange = () => {
  return (Math.random() * 0.4 - 0.2) // Random float between -0.20 and +0.20
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range") || "7d" // Default to 7 days

    let days = 7
    if (range === "30d") {
      days = 30
    } else if (range === "90d") {
      days = 90
    } else if (range === "24h") {
      days = 1 // For 24h, we might show hourly, but for simplicity, 1 day point
    }

    const dailyPerformanceData = generateDailyPerformance(days)

    // Mock main analytics data structure
    const analyticsData = {
      vsl_performance: {
        total_pages: 25,
        total_views: dailyPerformanceData.reduce((sum, item) => sum + item.views, 0),
        total_views_change: getRandomChange(),
        total_leads: dailyPerformanceData.reduce((sum, item) => sum + item.leads, 0),
        conversion_rate: 5.5, // Example static value
        conversion_rate_change: getRandomChange(),
        avg_watch_time: 120, // seconds
        top_performing_pages: [
          { page_name: "VSL Page Alpha", views: 1250, leads: 70, conversion_rate: 5.6 },
          { page_name: "VSL Page Beta", views: 980, leads: 45, conversion_rate: 4.6 },
          { page_name: "VSL Page Gamma", views: 750, leads: 30, conversion_rate: 4.0 },
        ],
      },
      lead_response: {
        total_leads: 150,
        responded_within_sla: 120,
        avg_response_time: 1800, // seconds
        avg_response_time_change: getRandomChange() * 300, // change in seconds
        success_rate: 65.0,
        channel_performance: {
          email: { sent: 300, opened: 150, clicked: 30 },
          sms: { sent: 150, replied: 25 },
          calls: { attempted: 100, answered: 40 },
        },
      },
      funnel_performance: {
        active_funnels: 5,
        total_contacts: 1200,
        completion_rate: 25.0,
        avg_conversion_time: 7 * 24 * 60 * 60, // 7 days in seconds
      },
      revenue_attribution: {
        total_revenue: dailyPerformanceData.reduce((sum, item) => sum + (item.revenue || 0), 0),
        total_revenue_change: getRandomChange(),
        vsl_attributed: dailyPerformanceData.reduce((sum, item) => sum + (item.revenue || 0), 0) * 0.6, // 60% from VSL
        lead_response_attributed: dailyPerformanceData.reduce((sum, item) => sum + (item.revenue || 0), 0) * 0.3, // 30% from lead response
        funnel_attributed: dailyPerformanceData.reduce((sum, item) => sum + (item.revenue || 0), 0) * 0.1, // 10% from funnels
      },
      dailyPerformance: dailyPerformanceData,
    }

    return NextResponse.json({ success: true, data: analyticsData }, { status: 200 })
  } catch (error) {
    console.error("Analytics Dashboard API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch analytics dashboard data",
        errors: [{ code: "fetch_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
