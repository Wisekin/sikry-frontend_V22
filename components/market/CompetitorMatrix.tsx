import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Download } from "lucide-react"
import { Text } from "@/components/core/typography/Text"

export function CompetitorMatrix() {
  const competitors = [
    {
      name: "CompetitorA",
      marketShare: 25,
      growth: 12,
      funding: "$50M",
      employees: "200-500",
      score: 85,
      threat: "High",
    },
    {
      name: "CompetitorB",
      marketShare: 18,
      growth: 8,
      funding: "$25M",
      employees: "100-200",
      score: 72,
      threat: "Medium",
    },
    {
      name: "CompetitorC",
      marketShare: 15,
      growth: 15,
      funding: "$75M",
      employees: "500+",
      score: 78,
      threat: "High",
    },
  ]

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case "High":
        return "bg-red-50 text-red-700 border-red-200"
      case "Medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "Low":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      default:
        return "bg-muted text-secondary"
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Competitor Analysis
            </CardTitle>
            <CardDescription>Market positioning and competitive landscape</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-caption font-medium">Company</th>
                <th className="text-left py-2 text-caption font-medium">Market Share</th>
                <th className="text-left py-2 text-caption font-medium">Growth</th>
                <th className="text-left py-2 text-caption font-medium">Funding</th>
                <th className="text-left py-2 text-caption font-medium">Employees</th>
                <th className="text-left py-2 text-caption font-medium">Score</th>
                <th className="text-left py-2 text-caption font-medium">Threat Level</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">
                    <Text className="font-medium">{competitor.name}</Text>
                  </td>
                  <td className="py-3">
                    <Text size="sm">{competitor.marketShare}%</Text>
                  </td>
                  <td className="py-3">
                    <Text size="sm" className="text-emerald-600">
                      +{competitor.growth}%
                    </Text>
                  </td>
                  <td className="py-3">
                    <Text size="sm">{competitor.funding}</Text>
                  </td>
                  <td className="py-3">
                    <Text size="sm">{competitor.employees}</Text>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className="text-xs">
                      {competitor.score}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant="outline" className={`text-xs ${getThreatColor(competitor.threat)}`}>
                      {competitor.threat}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
