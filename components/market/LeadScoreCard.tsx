import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, ArrowUpIcon as ArrowTrendingUpIcon } from "lucide-react"
import { Text } from "@/components/core/typography/Text"

export function LeadScoreCard() {
  const leadScores = [
    {
      company: "TechFlow Solutions",
      score: 95,
      trend: "up",
      factors: ["High engagement", "Perfect fit", "Budget confirmed"],
    },
    {
      company: "Alpine Marketing",
      score: 78,
      trend: "stable",
      factors: ["Good fit", "Active interest", "Timeline unclear"],
    },
    {
      company: "SwissFintech",
      score: 85,
      trend: "up",
      factors: ["Strong potential", "Decision maker engaged", "Competitor evaluation"],
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowTrendingUpIcon className="w-3 h-3 text-emerald-600" />
      case "down":
        return <ArrowTrendingUpIcon className="w-3 h-3 text-red-600 rotate-180" />
      default:
        return <div className="w-3 h-3 bg-yellow-600 rounded-full" />
    }
  }

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Lead Scoring
        </CardTitle>
        <CardDescription>AI-powered lead qualification and prioritization</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {leadScores.map((lead, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <Text className="font-medium">{lead.company}</Text>
              <div className="flex items-center gap-2">
                {getTrendIcon(lead.trend)}
                <span className={`font-semibold ${getScoreColor(lead.score)}`}>{lead.score}</span>
              </div>
            </div>

            <Progress value={lead.score} className="h-2" />

            <div className="space-y-1">
              {lead.factors.map((factor, factorIndex) => (
                <Badge key={factorIndex} variant="outline" className="text-xs mr-1 mb-1">
                  {factor}
                </Badge>
              ))}
            </div>

            {index < leadScores.length - 1 && <div className="border-b border-input" />}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
