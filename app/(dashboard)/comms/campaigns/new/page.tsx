"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Linkedin, Phone, PlusCircle, Users } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DatePicker } from "@/components/ui/date-picker"

export const metadata = {
  title: "New Campaign | SIKRY",
  description: "Create a new communication campaign",
}

export default function NewCampaignPage() {
  const [campaignTypes, setCampaignTypes] = useState([
    { value: "email", label: "Email Campaign", icon: Mail },
    { value: "linkedin", label: "LinkedIn Campaign", icon: Linkedin },
    { value: "phone", label: "Phone Campaign", icon: Phone },
    { value: "multi-channel", label: "Multi-Channel Campaign", icon: Users },
  ])

  const [newType, setNewType] = useState({
    value: "",
    label: "",
    icon: "Mail",
  })

  const handleAddType = () => {
    if (newType.value && newType.label) {
      setCampaignTypes([...campaignTypes, newType])
      setNewType({ value: "", label: "", icon: "Mail" })
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Campaign</h1>
        <p className="text-muted-foreground">Create a new communication campaign</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>

              <div>
                <Label htmlFor="type">Campaign Type</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon === "Mail" ? (
                              <Mail className="h-4 w-4" />
                            ) : type.icon === "Linkedin" ? (
                              <Linkedin className="h-4 w-4" />
                            ) : type.icon === "Phone" ? (
                              <Phone className="h-4 w-4" />
                            ) : (
                              <Users className="h-4 w-4" />
                            )}
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Campaign Type</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label htmlFor="typeValue">Type Value</Label>
                          <Input
                            id="typeValue"
                            placeholder="e.g., sms"
                            value={newType.value}
                            onChange={(e) =>
                              setNewType({ ...newType, value: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="typeLabel">Type Label</Label>
                          <Input
                            id="typeLabel"
                            placeholder="e.g., SMS Campaign"
                            value={newType.label}
                            onChange={(e) =>
                              setNewType({ ...newType, label: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="typeIcon">Icon</Label>
                          <Select
                            value={newType.icon}
                            onValueChange={(value) =>
                              setNewType({ ...newType, icon: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an icon" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mail">Mail</SelectItem>
                              <SelectItem value="Linkedin">LinkedIn</SelectItem>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Users">Users</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddType} className="w-full">
                          Add Type
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter campaign description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <DatePicker />
                </div>
                <div>
                  <Label>End Date</Label>
                  <DatePicker />
                </div>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="leads">Leads</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="custom">Custom List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="template">Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welcome">Welcome Email</SelectItem>
                    <SelectItem value="follow-up">Follow-up Message</SelectItem>
                    <SelectItem value="promotion">Promotional Offer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button">
                Save as Draft
              </Button>
              <Button type="submit">Create Campaign</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 