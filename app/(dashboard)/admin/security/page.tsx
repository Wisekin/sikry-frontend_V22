"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ShieldCheckIcon,
  KeyIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function SecurityPage() {
  const { t } = useTranslation()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("24")
  const [passwordPolicy, setPasswordPolicy] = useState("strong")

  const securityEvents = [
    {
      id: "1",
      type: "login",
      user: "sikry@sikso.com",
      device: "Chrome on Windows",
      location: "Paris, France",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: "2",
      type: "failed_login",
      user: "unknown@example.com",
      device: "Firefox on Linux",
      location: "Unknown",
      timestamp: "1 hour ago",
      status: "blocked",
    },
    {
      id: "3",
      type: "password_change",
      user: "sarah@sikso.com",
      device: "Safari on macOS",
      location: "London, UK",
      timestamp: "2 hours ago",
      status: "success",
    },
  ]

  const activeSessions = [
    {
      id: "1",
      device: "Chrome on Windows",
      location: "Paris, France",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "Mobile App on iOS",
      location: "Paris, France",
      lastActive: "2 hours ago",
      current: false,
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "login":
        return <ComputerDesktopIcon className="w-4 h-4 text-emerald-600" />
      case "failed_login":
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-600" />
      case "password_change":
        return <KeyIcon className="w-4 h-4 text-blue-600" />
      default:
        return <ShieldCheckIcon className="w-4 h-4 text-gray-600" />
    }
  }

  const getEventBadgeColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "blocked":
        return "bg-red-50 text-red-700 border-red-200"
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>{t("admin.security.title")}</Heading>
            <Text className="text-muted-foreground">{t("admin.security.description")}</Text>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <ShieldCheckIcon className="w-4 h-4 mr-2" />
            {t("admin.security.runSecurityScan")}
          </Button>
        </div>

        {/* Security Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("admin.security.securityScore")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">95%</div>
              <Text size="sm" className="text-emerald-600">
                Excellent
              </Text>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("admin.security.activeSessions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <Text size="sm" className="text-muted-foreground">
                Current sessions
              </Text>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("admin.security.failedAttempts")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">1</div>
              <Text size="sm" className="text-red-600">
                Last 24 hours
              </Text>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("admin.security.lastBackup")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <Text size="sm" className="text-muted-foreground">
                ago
              </Text>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Security Settings */}
          <Card className="shadow-sm border border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                {t("admin.security.securitySettings")}
              </CardTitle>
              <CardDescription>{t("admin.security.configureSecurityPolicies")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{t("admin.security.twoFactorAuth")}</div>
                  <Text size="sm" className="text-muted-foreground">
                    {t("admin.security.twoFactorDescription")}
                  </Text>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>

              <div className="space-y-2">
                <div className="font-medium">{t("admin.security.sessionTimeout")}</div>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="8">8 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="168">1 week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="font-medium">{t("admin.security.passwordPolicy")}</div>
                <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (16+ chars, symbols required)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">{t("admin.security.saveSettings")}</Button>
            </CardContent>
          </Card>

          {/* Active Sessions */}
          <Card className="shadow-sm border border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ComputerDesktopIcon className="w-4 h-4 mr-2" />
                {t("admin.security.activeSessions")}
              </CardTitle>
              <CardDescription>{t("admin.security.manageActiveSessions")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                        {session.device.includes("Mobile") ? (
                          <DevicePhoneMobileIcon className="w-4 h-4 text-white" />
                        ) : (
                          <ComputerDesktopIcon className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{session.device}</div>
                        <Text size="sm" className="text-muted-foreground">
                          {session.location}
                        </Text>
                        <Text size="sm" className="text-muted-foreground">
                          {session.lastActive}
                        </Text>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {session.current && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                          Current
                        </Badge>
                      )}
                      {!session.current && (
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Revoke
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Events */}
        <Card className="shadow-sm border border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-2" />
              {t("admin.security.recentEvents")}
            </CardTitle>
            <CardDescription>{t("admin.security.securityEventLog")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <div className="font-medium">{event.type.replace("_", " ").toUpperCase()}</div>
                      <Text size="sm" className="text-muted-foreground">
                        {event.user}
                      </Text>
                      <Text size="sm" className="text-muted-foreground">
                        {event.device} • {event.location}
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={getEventBadgeColor(event.status)}>
                      {event.status}
                    </Badge>
                    <Text size="sm" className="text-muted-foreground w-24">
                      {event.timestamp}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
