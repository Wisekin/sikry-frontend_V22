import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Database, Server, Users, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

async function getSystemHealth() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/monitoring/health`, {
      cache: "no-store",
    })
    return await response.json()
  } catch (error) {
    return { status: "unhealthy", error: "Failed to fetch health data" }
  }
}

async function getMetrics(range = "24h") {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/monitoring/metrics?range=${range}`, {
      cache: "no-store",
    })
    return await response.json()
  } catch (error) {
    return { data: [], error: "Failed to fetch metrics" }
  }
}

function SystemHealthCard({ health }: { health: any }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "unhealthy":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "unhealthy":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          System Health
        </CardTitle>
        <CardDescription>Real-time system status and health checks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Overall Status</span>
          <Badge className={getStatusColor(health.status)}>
            {getStatusIcon(health.status)}
            {health.status}
          </Badge>
        </div>

        {health.checks && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                <span className="text-sm">Database</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(health.checks.database.status)}>
                  {getStatusIcon(health.checks.database.status)}
                  {health.checks.database.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{health.checks.database.responseTime}ms</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm">API</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(health.checks.api.status)}>
                  {getStatusIcon(health.checks.api.status)}
                  {health.checks.api.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {Math.floor(health.checks.api.uptime / 3600)}h uptime
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MetricsCard({ metrics }: { metrics: any }) {
  const calculateTotalRequests = () => {
    return (
      metrics.data?.reduce((total: number, point: any) => {
        return total + (point.api_requests_total || 0)
      }, 0) || 0
    )
  }

  const calculateAverageResponseTime = () => {
    const points = metrics.data?.filter((point: any) => point.api_request_duration) || []
    if (points.length === 0) return 0

    const total = points.reduce((sum: number, point: any) => sum + point.api_request_duration, 0)
    return Math.round(total / points.length)
  }

  const calculateErrorRate = () => {
    const totalRequests = calculateTotalRequests()
    if (totalRequests === 0) return 0

    const errorRequests =
      metrics.data?.reduce((total: number, point: any) => {
        return total + (point.api_errors_total || 0)
      }, 0) || 0

    return Math.round((errorRequests / totalRequests) * 100 * 10) / 10
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateTotalRequests().toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Last 24 hours</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateAverageResponseTime()}ms</div>
          <p className="text-xs text-muted-foreground">Average latency</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateErrorRate()}%</div>
          <p className="text-xs text-muted-foreground">Error percentage</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">Currently online</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function MonitoringPage() {
  const [health, metrics] = await Promise.all([getSystemHealth(), getMetrics("24h")])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Monitoring</h1>
        <p className="text-muted-foreground">Monitor system health, performance metrics, and usage analytics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <SystemHealthCard health={health} />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Data Quality
                </CardTitle>
                <CardDescription>Overall data quality metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Companies</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Contacts</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Scraped Data</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Usage Statistics
                </CardTitle>
                <CardDescription>Platform usage over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Daily Active Users</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Searches Today</span>
                  <span className="font-medium">5,678</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Scrapers Running</span>
                  <span className="font-medium">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Messages Sent</span>
                  <span className="font-medium">891</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <MetricsCard metrics={metrics} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analytics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Performance charts would be rendered here with real-time data
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and error logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Log viewer would be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>System alerts and notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Alert management interface would be here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
