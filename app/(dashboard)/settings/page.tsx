"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmartInsights } from "@/components/insights/SmartInsights"
import { UserIcon, BellIcon, ShieldCheckIcon, CreditCardIcon, GlobeAltIcon, KeyIcon } from "@heroicons/react/24/solid"

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Configure your platform settings and preferences</p>
        </div>

        {/* Quick Settings Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                Profile Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-green-600">Complete</div>
              <p className="text-sm text-gray-600">All fields filled</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <ShieldCheckIcon className="w-4 h-4" />
                Security Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-blue-600">95%</div>
              <p className="text-sm text-gray-600">Excellent security</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BellIcon className="w-4 h-4" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-primary">12 Active</div>
              <p className="text-sm text-gray-600">Alerts enabled</p>
            </CardContent>
          </Card>
        </div>

        {/* Smart Insights */}
        <SmartInsights />

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellIcon className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCardIcon className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <GlobeAltIcon className="w-4 h-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@sikry.com" />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="SIKRY Intelligence" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="europe/zurich">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="europe/zurich">Europe/Zurich</SelectItem>
                        <SelectItem value="europe/london">Europe/London</SelectItem>
                        <SelectItem value="america/new_york">America/New_York</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <Switch id="darkMode" />
                  </div>
                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-sm border border-gray-200">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifs">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <Switch id="emailNotifs" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="scraperAlerts">Scraper Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified when scrapers fail</p>
                    </div>
                    <Switch id="scraperAlerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-gray-600">Receive weekly performance summaries</p>
                    </div>
                    <Switch id="weeklyReports" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-gray-600">Receive product updates and tips</p>
                    </div>
                    <Switch id="marketingEmails" />
                  </div>
                </div>
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <KeyIcon className="w-5 h-5" />
                    Password & Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <Switch id="twoFactor" />
                  </div>
                  <Button className="w-full">Update Security Settings</Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Production API Key</Label>
                    <div className="flex gap-2">
                      <Input value="sk-prod-**********************" readOnly />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  <div>
                    <Label>Development API Key</Label>
                    <div className="flex gap-2">
                      <Input value="sk-dev-**********************" readOnly />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Generate New Key
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600">Professional</h3>
                    <p className="text-3xl font-bold mt-2">
                      $99<span className="text-lg text-gray-600">/month</span>
                    </p>
                    <p className="text-gray-600 mt-2">Up to 10,000 companies</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Next billing date:</span>
                      <span className="font-medium">Feb 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Usage this month:</span>
                      <span className="font-medium">7,234 / 10,000</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                      VISA
                    </div>
                    <div>
                      <p className="font-medium">**** **** **** 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Invoices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Connected Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">LI</span>
                      </div>
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-gray-600">Connected</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">SF</span>
                      </div>
                      <div>
                        <p className="font-medium">Salesforce</p>
                        <p className="text-sm text-gray-600">Not connected</p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">HS</span>
                      </div>
                      <div>
                        <p className="font-medium">HubSpot</p>
                        <p className="text-sm text-gray-600">Connected</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200">
                <CardHeader>
                  <CardTitle>Webhook Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input id="webhookUrl" placeholder="https://your-app.com/webhook" />
                  </div>
                  <div className="space-y-2">
                    <Label>Events to send:</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="companyFound" defaultChecked />
                        <Label htmlFor="companyFound">Company found</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="scraperComplete" defaultChecked />
                        <Label htmlFor="scraperComplete">Scraper completed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="campaignSent" />
                        <Label htmlFor="campaignSent">Campaign sent</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Save Webhook Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
