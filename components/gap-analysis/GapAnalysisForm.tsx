"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, CheckCircle, Lightbulb, Download, Send, RefreshCw } from "lucide-react"
import type { AssessmentQuestion, GapAnalysis } from "@/types/gap-analysis"

interface GapAnalysisFormProps {
  contactId?: string
  companyId?: string
  onComplete?: (analysis: GapAnalysis) => void
}

export function GapAnalysisForm({ contactId, companyId, onComplete }: GapAnalysisFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [analysis, setAnalysis] = useState<GapAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)

  const assessmentQuestions: AssessmentQuestion[] = [
    {
      id: "current_revenue",
      category: "Business Performance",
      question: "What is your current annual revenue?",
      type: "multiple_choice",
      options: ["Under $100K", "$100K-$500K", "$500K-$1M", "$1M-$5M", "Over $5M"],
      weight: 1.0,
      required: true,
    },
    {
      id: "growth_rate",
      category: "Business Performance",
      question: "What has been your average growth rate over the past 2 years?",
      type: "scale",
      weight: 1.0,
      required: true,
      help_text: "Rate from 1 (declining) to 5 (rapid growth)",
    },
    {
      id: "technology_stack",
      category: "Technology",
      question: "How would you rate your current technology infrastructure?",
      type: "scale",
      weight: 1.2,
      required: true,
      help_text: "1 = Outdated, 5 = Cutting-edge",
    },
    {
      id: "automation_level",
      category: "Technology",
      question: "What percentage of your processes are automated?",
      type: "multiple_choice",
      options: ["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"],
      weight: 1.1,
      required: true,
    },
    {
      id: "team_size",
      category: "Operations",
      question: "How many full-time employees do you have?",
      type: "number",
      weight: 0.8,
      required: true,
    },
    {
      id: "biggest_challenge",
      category: "Operations",
      question: "What is your biggest operational challenge?",
      type: "multiple_choice",
      options: [
        "Lead generation",
        "Sales conversion",
        "Customer retention",
        "Process efficiency",
        "Technology limitations",
        "Team productivity",
      ],
      weight: 1.3,
      required: true,
    },
    {
      id: "marketing_channels",
      category: "Marketing",
      question: "Which marketing channels do you currently use?",
      type: "multiple_choice",
      options: [
        "Social media",
        "Email marketing",
        "Content marketing",
        "Paid advertising",
        "SEO",
        "Referrals",
        "Events/Networking",
      ],
      weight: 1.0,
      required: false,
    },
    {
      id: "customer_satisfaction",
      category: "Customer Experience",
      question: "How would you rate your customer satisfaction?",
      type: "scale",
      weight: 1.1,
      required: true,
      help_text: "1 = Poor, 5 = Excellent",
    },
  ]

  const categories = Array.from(new Set(assessmentQuestions.map((q) => q.category)))
  const questionsPerStep = Math.ceil(assessmentQuestions.length / 4)
  const totalSteps = Math.ceil(assessmentQuestions.length / questionsPerStep) + 1 // +1 for results

  const getCurrentStepQuestions = () => {
    const start = currentStep * questionsPerStep
    const end = start + questionsPerStep
    return assessmentQuestions.slice(start, end)
  }

  const handleResponse = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/gap-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_id: contactId,
          company_id: companyId,
          analysis_type: "business_assessment",
          responses,
          snapshot_data: {
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
          },
        }),
      })

      const data = await response.json()
      setAnalysis(data.analysis)
      onComplete?.(data.analysis)
    } catch (error) {
      console.error("Error submitting analysis:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateLetter = async () => {
    if (!analysis) return

    setGenerating(true)
    try {
      const response = await fetch(`/api/gap-analysis/${analysis.id}/generate-letter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "openai", // Could be configurable
        }),
      })

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Error generating letter:", error)
    } finally {
      setGenerating(false)
    }
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  if (analysis && currentStep === totalSteps - 1) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle>Gap Analysis Complete</CardTitle>
                <CardDescription>Your business assessment has been analyzed</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Score Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center">{analysis.overall_score.toFixed(1)}/5.0</div>
              <Progress value={(analysis.overall_score / 5) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Priority Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {analysis.priority_areas.slice(0, 3).map((area) => (
                  <Badge key={area} variant="outline" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Improvement Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-1" />
                <p className="text-sm text-muted-foreground">High potential</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analysis.gap_scores).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium capitalize">{category}</span>
                    <span className="text-sm text-muted-foreground">{(score as number).toFixed(1)}/5.0</span>
                  </div>
                  <Progress value={((score as number) / 5) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI-Generated Sales Letter */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Personalized Sales Letter</CardTitle>
                  <CardDescription>AI-generated based on your assessment</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={generateLetter} disabled={generating}>
                  {generating ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  {analysis.generated_letter ? "Regenerate" : "Generate"} Letter
                </Button>
                {analysis.generated_letter && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Send Letter
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {analysis.generated_letter ? (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">{analysis.generated_letter}</pre>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{analysis.ai_provider}</Badge>
                  <span>•</span>
                  <span>
                    Generated{" "}
                    {analysis.last_regenerated_at
                      ? new Date(analysis.last_regenerated_at).toLocaleString()
                      : "just now"}
                  </span>
                  {analysis.regeneration_count > 0 && (
                    <>
                      <span>•</span>
                      <span>{analysis.regeneration_count} regenerations</span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Ready to Generate</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click "Generate Letter" to create a personalized sales letter based on your assessment
                </p>
                <Button onClick={generateLetter} disabled={generating}>
                  {generating ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Generate Letter
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>Key areas for improvement based on your assessment</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.priority_areas.map((area, index) => (
                <div key={area} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium capitalize">{area.replace("_", " ")}</h4>
                    <p className="text-sm text-muted-foreground">
                      Focus on improving your {area.replace("_", " ")} to drive better results
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => setCurrentStep(0)}>
            Start New Assessment
          </Button>
          <Button onClick={() => window.print()}>
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Business Gap Analysis</CardTitle>
              <CardDescription>
                Step {currentStep + 1} of {totalSteps} - Answer a few questions to get personalized insights
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Questions */}
      {currentStep < totalSteps - 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{getCurrentStepQuestions()[0]?.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {getCurrentStepQuestions().map((question) => (
              <div key={question.id} className="space-y-3">
                <div>
                  <Label className="text-base font-medium">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {question.help_text && <p className="text-sm text-muted-foreground mt-1">{question.help_text}</p>}
                </div>

                {question.type === "scale" && (
                  <RadioGroup
                    value={responses[question.id]?.toString() || ""}
                    onValueChange={(value) => handleResponse(question.id, Number.parseInt(value))}
                  >
                    <div className="flex justify-between">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex flex-col items-center gap-2">
                          <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                          <Label htmlFor={`${question.id}-${value}`} className="text-xs">
                            {value}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Poor</span>
                      <span>Excellent</span>
                    </div>
                  </RadioGroup>
                )}

                {question.type === "multiple_choice" && (
                  <RadioGroup
                    value={responses[question.id] || ""}
                    onValueChange={(value) => handleResponse(question.id, value)}
                  >
                    {question.options?.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                        <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === "number" && (
                  <Input
                    type="number"
                    value={responses[question.id] || ""}
                    onChange={(e) => handleResponse(question.id, Number.parseInt(e.target.value))}
                    placeholder="Enter number"
                  />
                )}

                {question.type === "text" && (
                  <Textarea
                    value={responses[question.id] || ""}
                    onChange={(e) => handleResponse(question.id, e.target.value)}
                    placeholder="Enter your response"
                  />
                )}

                {question.type === "boolean" && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={question.id}
                      checked={responses[question.id] || false}
                      onCheckedChange={(checked) => handleResponse(question.id, checked)}
                    />
                    <Label htmlFor={question.id}>Yes</Label>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>

        {currentStep < totalSteps - 2 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : currentStep === totalSteps - 2 ? (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
            Complete Analysis
          </Button>
        ) : null}
      </div>
    </div>
  )
}
