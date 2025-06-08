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
import { UserIcon, BellIcon, ShieldCheckIcon, CreditCardIcon, GlobeAltIcon, KeyIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Modern Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-2">Manage your company profile and preferences</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[#1B1F3B]" />
              Profile Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#1B1F3B]">Complete</div>
            <p className="text-sm text-gray-500 mt-1">All fields filled</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4 text-[#1B1F3B]" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#1B1F3B]">95%</div>
            <p className="text-sm text-gray-500 mt-1">Excellent security</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <BellIcon className="w-4 h-4 text-[#1B1F3B]" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-[#1B1F3B]">12 Active</div>
            <p className="text-sm text-gray-500 mt-1">Alerts enabled</p>
          </CardContent>
        </Card>
      </div>

      {/* Smart Insights Banner */}
      <div className="bg-gradient-to-r from-[#1B1F3B] to-[#2D325E] rounded-xl p-5 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Security Recommendation</h3>
            <p className="text-sm opacity-80 mt-1">Enable two-factor authentication for enhanced security</p>
          </div>
          <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            Activate Now <ChevronRightIcon className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Modern Tabs */}
      <Tabs defaultValue="profile" className="w-full mt-6">
        <TabsList className="bg-transparent border-b border-gray-200 rounded-none p-0 gap-6">
          <TabsTrigger value="profile" className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none">
            <UserIcon className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none">
            <BellIcon className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none">
            <CreditCardIcon className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations" className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none">
            <GlobeAltIcon className="w-4 h-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="company" className="text-gray-700">Company Name</Label>
                  <Input id="company" defaultValue="SIKRY Intelligence" className="mt-1" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Business Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@sikry.com" className="mt-1" />
                </div>
                <div className="pt-4">
                  <Button className="bg-[#1B1F3B] hover:bg-[#2D325E]">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="timezone" className="text-gray-700">Timezone</Label>
                  <Select defaultValue="europe/zurich">
                    <SelectTrigger className="mt-1">
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
                  <Label htmlFor="language" className="text-gray-700">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <Label htmlFor="darkMode" className="text-gray-700">Dark Mode</Label>
                    <p className="text-sm text-gray-500">Switch interface theme</p>
                  </div>
                  <Switch id="darkMode" />
                </div>
                <div className="pt-4">
                  <Button className="bg-[#1B1F3B] hover:bg-[#2D325E]">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="pt-8">
          <Card className="border-0 shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="emailNotifs" className="text-gray-700">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch id="emailNotifs" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="scraperAlerts" className="text-gray-700">Scraper Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified when scrapers fail</p>
                  </div>
                  <Switch id="scraperAlerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="weeklyReports" className="text-gray-700">Weekly Reports</Label>
                    <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                  </div>
                  <Switch id="weeklyReports" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <Label htmlFor="marketingEmails" className="text-gray-700">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive product updates and tips</p>
                  </div>
                  <Switch id="marketingEmails" />
                </div>
              </div>
              <div className="pt-4">
                <Button className="bg-[#1B1F3B] hover:bg-[#2D325E]">Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <KeyIcon className="w-5 h-5" />
                  Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="currentPassword" className="text-gray-700">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="newPassword" className="text-gray-700">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-1" />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <Label htmlFor="twoFactor" className="text-gray-700">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Add extra security to your account</p>
                  </div>
                  <Switch id="twoFactor" />
                </div>
                <div className="pt-4">
                  <Button className="bg-[#1B1F3B] hover:bg-[#2D325E]">Update Security</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">API Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-gray-700">Production Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value="sk-prod-**********************" readOnly className="bg-gray-50" />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Use this key in your production environment</p>
                </div>
                <div>
                  <Label className="text-gray-700">Development Key</Label>
                  <div className="flex gap-2 mt-1">
                    <Input value="sk-dev-**********************" readOnly className="bg-gray-50" />
                    <Button variant="outline">Copy</Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Use for testing and development</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" className="border-[#1B1F3B] text-[#1B1F3B] hover:bg-[#1B1F3B]/10">
                    Generate New Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Subscription Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="p-5 bg-gradient-to-r from-[#1B1F3B]/5 to-[#2D325E]/5 rounded-lg border border-[#1B1F3B]/10">
                  <h3 className="text-xl font-bold text-[#1B1F3B]">Professional</h3>
                  <p className="text-3xl font-bold mt-1">
                    $99<span className="text-lg text-gray-500">/month</span>
                  </p>
                  <p className="text-gray-600 mt-3">Up to 10,000 company profiles</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between pt-2">
                    <span className="text-gray-600">Next billing date:</span>
                    <span className="font-medium">Feb 15, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usage this month:</span>
                    <span className="font-medium">7,234 / 10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-[#1B1F3B] h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-[#1B1F3B] hover:bg-[#2D325E] w-full">Upgrade Plan</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-10 h-7 bg-gradient-to-r from-[#1B1F3B] to-[#2D325E] rounded text-white text-xs flex items-center justify-center font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">**** **** **** 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <div>
                  <Button variant="outline" className="w-full border-[#1B1F3B] text-[#1B1F3B] hover:bg-[#1B1F3B]/10">
                    Update Payment Method
                  </Button>
                </div>
                <div>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    Download Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Connected Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">LI</span>
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-500">Connected</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">SF</span>
                    </div>
                    <div>
                      <p className="font-medium">Salesforce</p>
                      <p className="text-sm text-gray-500">Not connected</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">HS</span>
                    </div>
                    <div>
                      <p className="font-medium">HubSpot</p>
                      <p className="text-sm text-gray-500">Connected</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Webhook Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label htmlFor="webhookUrl" className="text-gray-700">Endpoint URL</Label>
                  <Input 
                    id="webhookUrl" 
                    placeholder="https://your-app.com/webhook" 
                    className="mt-1 font-mono text-sm"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">Events to send</Label>
                  <div className="space-y-3 mt-3">
                    <div className="flex items-center space-x-3">
                      <Switch id="companyFound" defaultChecked />
                      <Label htmlFor="companyFound">Company found</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="scraperComplete" defaultChecked />
                      <Label htmlFor="scraperComplete">Scraper completed</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="campaignSent" />
                      <Label htmlFor="campaignSent">Campaign sent</Label>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-[#1B1F3B] hover:bg-[#2D325E] w-full">Save Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}