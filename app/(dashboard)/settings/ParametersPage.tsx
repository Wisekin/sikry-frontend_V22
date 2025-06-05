"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/core/typography/Text"
import { Save } from "lucide-react"

export function ParametersPage() {
  const [settings, setSettings] = useState({
    dataRetention: "30",
    autoRefresh: true,
    defaultView: "list",
    exportFormat: "csv",
    apiLimit: "1000",
    enableNotifications: true,
    darkMode: false,
    language: "en",
  })

  const handleChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure general platform behavior and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="defaultView">Default View</Label>
              <Select value={settings.defaultView} onValueChange={(value) => handleChange("defaultView", value)}>
                <SelectTrigger id="defaultView">
                  <SelectValue placeholder="Select default view" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="list">List View</SelectItem>
                  <SelectItem value="grid">Grid View</SelectItem>
                  <SelectItem value="map">Map View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={(value) => handleChange("language", value)}>
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exportFormat">Export Format</Label>
              <Select value={settings.exportFormat} onValueChange={(value) => handleChange("exportFormat", value)}>
                <SelectTrigger id="exportFormat">
                  <SelectValue placeholder="Select export format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => handleChange("dataRetention", e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoRefresh">Auto-refresh Data</Label>
              <Text size="sm" className="text-secondary">
                Automatically refresh data every 5 minutes
              </Text>
            </div>
            <Switch
              id="autoRefresh"
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => handleChange("autoRefresh", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enableNotifications">Enable Notifications</Label>
              <Text size="sm" className="text-secondary">
                Receive notifications for important events
              </Text>
            </div>
            <Switch
              id="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) => handleChange("enableNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkMode">Dark Mode</Label>
              <Text size="sm" className="text-secondary">
                Use dark theme for the interface
              </Text>
            </div>
            <Switch
              id="darkMode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleChange("darkMode", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
          <CardDescription>Configure API usage and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="apiLimit">API Request Limit (per day)</Label>
            <Input
              id="apiLimit"
              type="number"
              value={settings.apiLimit}
              onChange={(e) => handleChange("apiLimit", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
