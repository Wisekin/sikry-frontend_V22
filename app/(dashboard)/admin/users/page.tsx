"use client"

import { useState } from "react"
import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function UsersPage() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const users = [
    {
      id: "1",
      name: "SIKRY Admin",
      email: "sikry@sikso.com",
      role: "admin",
      status: "active",
      lastActive: "2 minutes ago",
      avatar: null,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@sikso.com",
      role: "manager",
      status: "active",
      lastActive: "1 hour ago",
      avatar: null,
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@sikso.com",
      role: "member",
      status: "inactive",
      lastActive: "2 days ago",
      avatar: null,
    },
    {
      id: "4",
      name: "Emma Wilson",
      email: "emma@sikso.com",
      role: "member",
      status: "active",
      lastActive: "30 minutes ago",
      avatar: null,
    },
  ]

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-50 text-red-700 border-red-200"
      case "manager":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "member":
        return "bg-gray-50 text-gray-700 border-gray-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "inactive":
        return "bg-gray-50 text-gray-700 border-gray-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>{t("admin.users.title")}</Heading>
            <Text className="text-muted-foreground">{t("admin.users.description")}</Text>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <UserPlusIcon className="w-4 h-4 mr-2" />
            {t("admin.users.inviteUser")}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("admin.users.totalUsers")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <Text size="sm" className="text-muted-foreground">
                +1 this month
              </Text>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("admin.users.activeUsers")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">3</div>
              <Text size="sm" className="text-emerald-600">
                75% active rate
              </Text>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t("admin.users.admins")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <Text size="sm" className="text-muted-foreground">
                System admin
              </Text>
            </CardContent>
          </Card>

          <Card className="shadow-sm border border-border/40">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("admin.users.pendingInvites")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <Text size="sm" className="text-muted-foreground">
                No pending
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="shadow-sm border border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2" />
              {t("admin.users.userManagement")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t("admin.users.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48">
                  <FunnelIcon className="w-4 h-4 mr-2" />
                  <SelectValue placeholder={t("admin.users.filterByRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("admin.users.allRoles")}</SelectItem>
                  <SelectItem value="admin">{t("admin.users.admin")}</SelectItem>
                  <SelectItem value="manager">{t("admin.users.manager")}</SelectItem>
                  <SelectItem value="member">{t("admin.users.member")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Users Table */}
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <Text size="sm" className="text-muted-foreground">
                        {user.email}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                      {t(`admin.users.${user.role}`)}
                    </Badge>
                    <Badge variant="outline" className={getStatusBadgeColor(user.status)}>
                      {t(`admin.users.${user.status}`)}
                    </Badge>
                    <Text size="sm" className="text-muted-foreground w-24">
                      {user.lastActive}
                    </Text>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <PencilIcon className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <TrashIcon className="w-3 h-3" />
                      </Button>
                    </div>
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
