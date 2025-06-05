import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, Users } from "lucide-react"

export const metadata = {
  title: "Bulk Sender | SIKRY",
  description: "Send messages to multiple recipients at once",
}

export default function BulkSenderPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Sender</h1>
        <p className="text-muted-foreground">Send personalized messages to multiple recipients at once.</p>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        <TabsContent value="email" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Message Content</CardTitle>
                  <CardDescription>Compose your message or select a template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter your email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="template">Template</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No template</SelectItem>
                        <SelectItem value="intro">Introduction</SelectItem>
                        <SelectItem value="follow-up">Follow-up</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-[200px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="personalize" />
                    <Label htmlFor="personalize">Personalize messages with recipient data</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Settings</CardTitle>
                  <CardDescription>Configure how your messages will be sent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="send-time">Send Time</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="When to send" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Send immediately</SelectItem>
                          <SelectItem value="schedule">Schedule for later</SelectItem>
                          <SelectItem value="optimal">Optimal time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="throttle">Throttle Rate</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Messages per hour" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 per hour</SelectItem>
                          <SelectItem value="25">25 per hour</SelectItem>
                          <SelectItem value="50">50 per hour</SelectItem>
                          <SelectItem value="100">100 per hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="track-opens" defaultChecked />
                    <Label htmlFor="track-opens">Track opens</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="track-clicks" defaultChecked />
                    <Label htmlFor="track-clicks">Track clicks</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recipients</CardTitle>
                  <CardDescription>Select who will receive your message</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" className="justify-start">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload CSV
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Select from Contacts
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        Paste Emails
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium">Recipients Summary</div>
                    <div className="mt-2 text-sm text-muted-foreground">No recipients selected</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Check</CardTitle>
                  <CardDescription>Ensure your message meets compliance standards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Spam Score</span>
                      <span className="text-sm text-green-600">Low</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-1/4 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Compliance</span>
                      <span className="text-sm text-green-600">Passed</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                        Unsubscribe link included
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                        Physical address included
                      </li>
                      <li className="flex items-center">
                        <span className="h-1.\
