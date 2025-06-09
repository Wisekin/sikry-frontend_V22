"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export default function AntiSpamPage() {
  const spamMetrics = [
    { label: "Spam Detection Rate", value: "99.8%", status: "excellent" },
    { label: "False Positives", value: "0.02%", status: "excellent" },
    { label: "Blocked Messages", value: "1,247", status: "normal" },
    { label: "Quarantined", value: "23", status: "normal" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-emerald-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-secondary"
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1}>Anti-Spam Settings</Heading>
          <Text className="text-secondary">Configure spam protection and compliance settings</Text>
        </div>

        {/* Spam Protection Status */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Spam Protection Status
            </CardTitle>
            <CardDescription>Real-time spam detection and filtering metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {spamMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`text-h2 font-semibold ${getStatusColor(metric.status)}`}>{metric.value}</div>
                  <Text size="sm" className="text-secondary">
                    {metric.label}
                  </Text>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spam Filter Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Spam Filter Configuration</CardTitle>
            <CardDescription>Adjust spam detection sensitivity and rules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="spam-detection">Enable Spam Detection</Label>
                <Text size="sm" className="text-secondary">
                  Automatically detect and filter spam messages
                </Text>
              </div>
              <Switch id="spam-detection" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-quarantine">Auto-Quarantine Suspicious Messages</Label>
                <Text size="sm" className="text-secondary">
                  Automatically quarantine messages with high spam scores
                </Text>
              </div>
              <Switch id="auto-quarantine" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sender-reputation">Sender Reputation Checking</Label>
                <Text size="sm" className="text-secondary">
                  Check sender reputation against known spam databases
                </Text>
              </div>
              <Switch id="sender-reputation" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="spam-threshold">Spam Score Threshold</Label>
              <Input id="spam-threshold" type="number" defaultValue="7.5" min="1" max="10" step="0.1" />
              <Text size="sm" className="text-secondary">
                Messages with scores above this threshold will be marked as spam (1-10 scale)
              </Text>
            </div>
          </CardContent>
        </Card>

        {/* Whitelist/Blacklist */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Whitelist
              </CardTitle>
              <CardDescription>Trusted senders and domains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter email addresses or domains (one per line)&#10;example@company.com&#10;@trusteddomain.com"
                rows={6}
              />
              <Button variant="outline" className="w-full">
                Update Whitelist
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Blacklist
              </CardTitle>
              <CardDescription>Blocked senders and domains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter email addresses or domains to block (one per line)&#10;spam@example.com&#10;@spammydomain.com"
                rows={6}
              />
              <Button variant="outline" className="w-full">
                Update Blacklist
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Compliance Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Compliance Settings</CardTitle>
            <CardDescription>Configure compliance and regulatory requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gdpr-compliance">GDPR Compliance Mode</Label>
                <Text size="sm" className="text-secondary">
                  Enable additional privacy protections for EU recipients
                </Text>
              </div>
              <Switch id="gdpr-compliance" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="can-spam">CAN-SPAM Act Compliance</Label>
                <Text size="sm" className="text-secondary">
                  Ensure all messages comply with CAN-SPAM requirements
                </Text>
              </div>
              <Switch id="can-spam" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="unsubscribe-links">Automatic Unsubscribe Links</Label>
                <Text size="sm" className="text-secondary">
                  Automatically add unsubscribe links to all marketing emails
                </Text>
              </div>
              <Switch id="unsubscribe-links" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
