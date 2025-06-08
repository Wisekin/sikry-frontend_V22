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
import { Mail, Linkedin, Phone, PlusCircle } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function NewTemplatePage() {
  const [templateTypes, setTemplateTypes] = useState([
    { value: "email", label: "Email", icon: Mail },
    { value: "linkedin", label: "LinkedIn", icon: Linkedin },
    { value: "phone", label: "Phone", icon: Phone },
  ])

  const [newType, setNewType] = useState({
    value: "",
    label: "",
    icon: "Mail", // Default icon
  })

  const handleAddType = () => {
    if (newType.value && newType.label) {
      setTemplateTypes([...templateTypes, newType])
      setNewType({ value: "", label: "", icon: "Mail" })
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Template</h1>
        <p className="text-muted-foreground">Create a new communication template</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Template Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input id="name" placeholder="Enter template name" />
              </div>

              <div>
                <Label htmlFor="type">Template Type</Label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select template type" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            {type.icon === "Mail" ? (
                              <Mail className="h-4 w-4" />
                            ) : type.icon === "Linkedin" ? (
                              <Linkedin className="h-4 w-4" />
                            ) : (
                              <Phone className="h-4 w-4" />
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
                        <DialogTitle>Add New Template Type</DialogTitle>
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
                            placeholder="e.g., SMS"
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
                  placeholder="Enter template description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Template Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter template content"
                  rows={10}
                  className="font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Create Template</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 