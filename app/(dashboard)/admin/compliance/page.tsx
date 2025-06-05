"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Shield, Globe, Clock, Download } from "lucide-react"

export default function CompliancePage() {
  const complianceStatus = [
    { name: "GDPR", status: "Compliant", region: "EU", lastAudit: "2024-01-15" },
    { name: "CCPA", status: "Compliant", region: "California", lastAudit: "2024-01-10" },
    { name: "CAN-SPAM", status: "Compliant", region: "US", lastAudit: "2024-01-12" },
    { name: "PIPEDA", status: "Compliant", region: "Canada", lastAudit: "2024-01-08" },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Heading level={1}>Compliance Management</Heading>
          <Text className="text-secondary">GDPR, data retention, and privacy settings</Text>
        </div>

        {/* Compliance Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Compliance Status
            </CardTitle>
            <CardDescription>Current compliance status across all regions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {complianceStatus.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <Text size="sm" className="text-secondary">
                        {item.region}
                      </Text>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">{item.status}</Badge>
                    <Text size="sm" className="text-secondary mt-1">
                      Last audit: {item.lastAudit}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Data Retention Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Data Retention Settings
            </CardTitle>
            <CardDescription>Configure how long data is stored in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contact-retention">Contact Data Retention</Label>
                <Select defaultValue="2-years">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-years">2 Years</SelectItem>
                    <SelectItem value="3-years">3 Years</SelectItem>
                    <SelectItem value="5-years">5 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="communication-retention">Communication Logs</Label>
                <Select defaultValue="1-year">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-years">2 Years</SelectItem>
                    <SelectItem value="3-years">3 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="analytics-retention">Analytics Data</Label>
                <Select defaultValue="6-months">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="2-years">2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scraping-retention">Scraping Data</Label>
                <Select defaultValue="3-months">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-month">1 Month</SelectItem>
                    <SelectItem value="3-months">3 Months</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-deletion">Automatic Data Deletion</Label>
                <Text size="sm" className="text-secondary">
                  Automatically delete data when retention period expires
                </Text>
              </div>
              <Switch id="auto-deletion" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Privacy Settings</CardTitle>
            <CardDescription>Configure privacy and consent management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="consent-tracking">Consent Tracking</Label>
                <Text size="sm" className="text-secondary">
                  Track and manage user consent for data processing
                </Text>
              </div>
              <Switch id="consent-tracking" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-anonymization">Data Anonymization</Label>
                <Text size="sm" className="text-secondary">
                  Automatically anonymize personal data in analytics
                </Text>
              </div>
              <Switch id="data-anonymization" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="right-to-be-forgotten">Right to be Forgotten</Label>
                <Text size="sm" className="text-secondary">
                  Enable users to request complete data deletion
                </Text>
              </div>
              <Switch id="right-to-be-forgotten" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="privacy-policy-url">Privacy Policy URL</Label>
              <Input
                id="privacy-policy-url"
                placeholder="https://yourcompany.com/privacy"
                defaultValue="https://sikry.com/privacy"
              />
            </div>
          </CardContent>
        </Card>

        {/* Compliance Reports */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Compliance Reports
                </CardTitle>
                <CardDescription>Generate and download compliance reports</CardDescription>
              </div>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">GDPR Report</div>
                  <Text size="sm" className="text-secondary">
                    Data processing activities
                  </Text>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">Audit Log</div>
                  <Text size="sm" className="text-secondary">
                    System access and changes
                  </Text>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">Data Export</div>
                  <Text size="sm" className="text-secondary">
                    Complete data export
                  </Text>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
