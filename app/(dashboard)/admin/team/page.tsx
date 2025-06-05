"use client"

import { AppShell } from "@/components/core/layout/AppShell"
import { Heading } from "@/components/core/typography/Heading"
import { Text } from "@/components/core/typography/Text"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTable } from "@/components/data/tables/DataTable"
import { UserPlus, Settings, Mail } from "lucide-react"

export default function TeamManagementPage() {
  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@company.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "/avatars/john.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@company.com",
      role: "User",
      status: "Active",
      lastActive: "1 day ago",
      avatar: "/avatars/jane.jpg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "User",
      status: "Inactive",
      lastActive: "1 week ago",
      avatar: "/avatars/mike.jpg",
    },
  ]

  const columns = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {row.original.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-secondary">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }: any) => (
        <Badge variant={row.original.role === "Admin" ? "default" : "secondary"}>{row.original.role}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>{row.original.status}</Badge>
      ),
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-3 h-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="w-3 h-3" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Heading level={1}>Team Management</Heading>
            <Text className="text-secondary">Manage users, roles, and permissions</Text>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">12</div>
              <Text size="sm" className="text-emerald-600">
                +2 this month
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">10</div>
              <Text size="sm" className="text-secondary">
                83% active
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Admins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">3</div>
              <Text size="sm" className="text-secondary">
                25% of team
              </Text>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-caption text-secondary">Pending Invites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-h2 font-semibold">2</div>
              <Text size="sm" className="text-yellow-600">
                Awaiting response
              </Text>
            </CardContent>
          </Card>
        </div>

        {/* Team Table */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>Manage your team members and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={teamMembers} />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
