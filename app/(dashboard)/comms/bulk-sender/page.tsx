"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, Users, Mail, Send, Calendar, Gauge, Eye, MousePointer, ShieldCheck, ChevronDown, Plus, Save, Clock } from "lucide-react"
import { useState } from "react"

export default function BulkSenderPage() {
  const [selectedTab, setSelectedTab] = useState('email');
  const [recipientsCount, setRecipientsCount] = useState(0);
  
  // Simulate file upload
  const handleFileUpload = () => {
    setRecipientsCount(247);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header with Stats */}
      <div className="border-b border-[#2A3050]/20 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1B1F3B]">Bulk Message Center</h1>
            <p className="text-[#3C4568] mt-2">Send personalized communications at scale with enterprise-grade delivery</p>
          </div>
          <div className="flex space-x-4">
            <div className="text-right">
              <div className="text-sm text-[#3C4568]">Monthly Limit</div>
              <div className="text-xl font-bold text-[#1B1F3B]">10,000 / 50,000</div>
            </div>
            <div className="w-24 h-2 bg-[#2A3050]/10 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-[#1B1F3B]" style={{width: '20%'}}></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-[#1B1F3B] to-[#2D325E] text-white p-4 rounded-lg">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>Email Campaigns</span>
            </div>
            <div className="text-2xl font-bold mt-2">24</div>
          </div>
          <div className="bg-white border border-[#2A3050]/10 p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-[#3C4568]">
              <Send className="h-5 w-5 mr-2" />
              <span>Messages Sent</span>
            </div>
            <div className="text-2xl font-bold text-[#1B1F3B] mt-2">8,472</div>
          </div>
          <div className="bg-white border border-[#2A3050]/10 p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-[#3C4568]">
              <Eye className="h-5 w-5 mr-2" />
              <span>Avg. Open Rate</span>
            </div>
            <div className="text-2xl font-bold text-[#1B1F3B] mt-2">42%</div>
          </div>
          <div className="bg-white border border-[#2A3050]/10 p-4 rounded-lg shadow-sm">
            <div className="flex items-center text-[#3C4568]">
              <MousePointer className="h-5 w-5 mr-2" />
              <span>Avg. Click Rate</span>
            </div>
            <div className="text-2xl font-bold text-[#1B1F3B] mt-2">7.3%</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-transparent border-b border-[#2A3050]/20 rounded-none p-0 gap-6">
          <TabsTrigger 
            value="email" 
            className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none flex items-center"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Campaign
          </TabsTrigger>
          <TabsTrigger 
            value="linkedin" 
            className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none flex items-center"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn Outreach
          </TabsTrigger>
          <TabsTrigger 
            value="phone" 
            className="px-0 py-4 data-[state=active]:border-b-2 data-[state=active]:border-[#1B1F3B] data-[state=active]:text-[#1B1F3B] rounded-none flex items-center"
          >
            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/>
              <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.085-1.391l-4.064-3.696z"/>
            </svg>
            SMS Campaign
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Message Content Card */}
              <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B]">Message Content</CardTitle>
                  <CardDescription className="text-[#3C4568]">Compose your message or select from templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-[#1B1F3B] font-medium">Subject Line</Label>
                    <Input 
                      id="subject" 
                      placeholder="Enter your email subject" 
                      className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="template" className="text-[#1B1F3B] font-medium">Template</Label>
                      <Button variant="ghost" className="text-[#1B1F3B] flex items-center">
                        <Plus className="h-4 w-4 mr-1" /> New Template
                      </Button>
                    </div>
                    <Select>
                      <SelectTrigger className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]">
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No template</SelectItem>
                        <SelectItem value="intro">Introduction Sequence</SelectItem>
                        <SelectItem value="follow-up">Follow-up Series</SelectItem>
                        <SelectItem value="newsletter">Monthly Newsletter</SelectItem>
                        <SelectItem value="event">Event Invitation</SelectItem>
                        <SelectItem value="promo">Product Promotion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-[#1B1F3B] font-medium">Message Content</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Compose your message here..." 
                      className="min-h-[250px] border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]"
                      defaultValue={`Hello {first_name},\n\nWe noticed your interest in enterprise solutions and thought you might appreciate...`}
                    />
                    <div className="text-sm text-[#3C4568] flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Personalization tags detected: first_name, company
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 pt-2">
                    <Checkbox id="personalize" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                    <Label htmlFor="personalize" className="text-[#3C4568]">Enable recipient personalization</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Settings Card */}
              <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B]">Delivery Strategy</CardTitle>
                  <CardDescription className="text-[#3C4568]">Optimize your sending strategy for maximum deliverability</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="send-time" className="text-[#1B1F3B] font-medium">Delivery Timing</Label>
                      <Select>
                        <SelectTrigger className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]">
                          <SelectValue placeholder="Select send strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now" className="flex items-center">
                            <Send className="h-4 w-4 mr-2" /> Send immediately
                          </SelectItem>
                          <SelectItem value="schedule">
                            <Calendar className="h-4 w-4 mr-2" /> Schedule for later
                          </SelectItem>
                          <SelectItem value="optimal">
                            <Clock className="h-4 w-4 mr-2" /> Optimal time per recipient
                          </SelectItem>
                          <SelectItem value="drip">
                            <ChevronDown className="h-4 w-4 mr-2" /> Drip campaign
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="throttle" className="text-[#1B1F3B] font-medium">Send Rate</Label>
                      <Select>
                        <SelectTrigger className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]">
                          <SelectValue placeholder="Messages per hour" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 messages/hour</SelectItem>
                          <SelectItem value="25">25 messages/hour</SelectItem>
                          <SelectItem value="50">50 messages/hour (recommended)</SelectItem>
                          <SelectItem value="100">100 messages/hour</SelectItem>
                          <SelectItem value="250">250 messages/hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-3">
                      <Checkbox id="track-opens" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="track-opens" className="text-[#3C4568]">Track message opens</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="track-clicks" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="track-clicks" className="text-[#3C4568]">Track link clicks</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="unsubscribe" defaultChecked className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="unsubscribe" className="text-[#3C4568]">Include unsubscribe link</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Checkbox id="retry" className="text-[#1B1F3B] border-[#2A3050]/30" />
                      <Label htmlFor="retry" className="text-[#3C4568]">Automatically retry failed sends</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              {/* Recipients Card */}
              <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B]">Audience Selection</CardTitle>
                  <CardDescription className="text-[#3C4568]">Define who will receive this campaign</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-[#1B1F3B] font-medium">Import Recipients</Label>
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        variant="outline" 
                        className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5 justify-start"
                        onClick={handleFileUpload}
                      >
                        <Upload className="mr-3 h-4 w-4" />
                        Upload CSV/Excel
                      </Button>
                      <Button variant="outline" className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5 justify-start">
                        <Users className="mr-3 h-4 w-4" />
                        Select from CRM
                      </Button>
                      <Button variant="outline" className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5 justify-start">
                        <FileText className="mr-3 h-4 w-4" />
                        Paste Email List
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-[#2A3050]/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1B1F3B] font-medium">Recipients Summary</span>
                      <span className="text-[#1B1F3B] font-bold">{recipientsCount}</span>
                    </div>
                    
                    {recipientsCount > 0 ? (
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Valid emails</span>
                          <span className="text-[#1B1F3B]">238 (96.4%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Invalid emails</span>
                          <span className="text-[#1B1F3B]">9 (3.6%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Unsubscribed</span>
                          <span className="text-[#1B1F3B]">14 (5.7%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#3C4568]">Duplicate entries</span>
                          <span className="text-[#1B1F3B]">3 (1.2%)</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 p-6 bg-[#2A3050]/5 rounded-lg text-center">
                        <FileText className="h-8 w-8 mx-auto text-[#3C4568]" />
                        <p className="text-[#3C4568] mt-2">No recipients selected yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Compliance Card */}
              <Card className="border border-[#2A3050]/10 shadow-sm transition-all duration-300 hover:bg-[#2A3050]/5 hover:border-[#2A3050]/30">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1B1F3B] flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-[#1B1F3B]" />
                    Deliverability Assurance
                  </CardTitle>
                  <CardDescription className="text-[#3C4568]">Ensure compliance with regulations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#1B1F3B] font-medium">Spam Risk Score</span>
                        <span className="text-green-600 font-medium">Low (2.1/10)</span>
                      </div>
                      <div className="h-2 bg-[#2A3050]/10 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '21%'}}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#1B1F3B] font-medium">Regulatory Compliance</span>
                        <span className="text-green-600 font-medium">Passed</span>
                      </div>
                      <ul className="text-sm text-[#3C4568] space-y-2">
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Unsubscribe mechanism detected
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Physical address included
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          CAN-SPAM requirements satisfied
                        </li>
                        <li className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          GDPR compliant language detected
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="sender-address" className="text-[#1B1F3B] font-medium">Sender Information</Label>
                    <Input 
                      id="sender-address" 
                      defaultValue="SIKRY Intelligence • 123 Business Ave, Zurich, Switzerland" 
                      className="border-[#2A3050]/20 focus:border-[#1B1F3B] focus:ring-[#1B1F3B]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="linkedin">
          <Card className="border border-[#2A3050]/10 p-8 text-center">
            <div className="mx-auto bg-[#2A3050]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
              <svg className="h-10 w-10 text-[#1B1F3B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1B1F3B] mt-6">LinkedIn Outreach</h2>
            <p className="text-[#3C4568] mt-2 max-w-md mx-auto">
              Scale your LinkedIn outreach with automated connection requests and personalized messages. 
              Coming in Q3 2024.
            </p>
            <Button className="mt-6 bg-[#1B1F3B] hover:bg-[#2A3050]">
              Notify ME WHEN AVAILABLE
            </Button>
          </Card>
        </TabsContent>
        
        <TabsContent value="phone">
          <Card className="border border-[#2A3050]/10 p-8 text-center">
            <div className="mx-auto bg-[#2A3050]/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
              <svg className="h-10 w-10 text-[#1B1F3B]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"/>
                <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 00-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 00.043-1.391L6.859 3.513a1 1 0 00-1.391-.087l-2.17 1.861a1 1 0 00-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 00.648-.291l1.86-2.171a.997.997 0 00-.085-1.391l-4.064-3.696z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1B1F3B] mt-6">SMS Campaigns</h2>
            <p className="text-[#3C4568] mt-2 max-w-md mx-auto">
              Launch high-impact SMS campaigns with delivery optimization and compliance safeguards. 
              Coming in Q4 2024.
            </p>
            <Button className="mt-6 bg-[#1B1F3B] hover:bg-[#2A3050]">
              Notify ME WHEN AVAILABLE
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Action Footer */}
      <div className="fixed bottom-0 left-[16rem] right-0 bg-white border-t border-[#2A3050]/10 py-4 px-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <span className="text-[#3C4568]">Ready to send to</span>
            <span className="font-bold text-[#1B1F3B] ml-2">{recipientsCount} recipients</span>
          </div>
          <div className="space-x-3">
            <Button variant="outline" className="border-[#2A3050]/20 text-[#1B1F3B] hover:bg-[#2A3050]/5">
              <Save className="h-4 w-4 mr-2" /> Save Draft
            </Button>
            <Button className="bg-gradient-to-r from-[#1B1F3B] to-[#2A3050] hover:from-[#2A3050] hover:to-[#3C4568]">
              <Send className="h-4 w-4 mr-2" /> Send Campaign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}