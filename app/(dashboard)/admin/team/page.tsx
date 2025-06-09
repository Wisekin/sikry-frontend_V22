"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Shield, Key } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function TeamManagementPage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'
  const viewMode = searchParams.get('view') || 'grid'

  const teamMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Administrator",
      email: "sarah.j@company.com",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "SJ"
    },
    {
      id: "2",
      name: "Mark Wilson",
      role: "Team Lead",
      email: "mark.w@company.com",
      status: "Active",
      lastActive: "5 minutes ago",
      avatar: "MW"
    },
    // Add more team members as needed
  ];

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log('Delete member:', id);
  };

  const handleEdit = (id: string) => {
    // Implement edit functionality
    console.log('Edit member:', id);
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Members</CardTitle>
                  <Users className="w-5 h-5 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-gray-500">Active team members</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Pending Invites</CardTitle>
                  <UserPlus className="w-5 h-5 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <p className="text-xs text-gray-500">Awaiting response</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Roles</CardTitle>
                  <Shield className="w-5 h-5 text-emerald-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-emerald-600">5</div>
                  <p className="text-xs text-gray-500">Custom roles defined</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Team Overview</CardTitle>
                <CardDescription>Manage your team members and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Add team overview content here */}
                </div>
              </CardContent>
            </Card>
          </>
        )
      case 'members':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>View and manage team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {filteredMembers.map((member) => (
                  <div key={member.id} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#3C4568] text-white flex items-center justify-center font-semibold">
                      {member.avatar}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[#1B1F3B]">{member.name}</h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <p className="text-sm text-gray-400">{member.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {member.status}
                        </span>
                        <span className="text-xs text-gray-400">{member.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-[#2A3050]"
                        onClick={() => handleEdit(member.id)}
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-red-600"
                        onClick={() => handleDelete(member.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      case 'roles':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Team Roles</CardTitle>
              <CardDescription>Manage team roles and responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {/* Add roles list/grid content here */}
              </div>
            </CardContent>
          </Card>
        )
      case 'permissions':
        return (
          <Card className="bg-white border-none shadow-sm">
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Configure access permissions for roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                {/* Add permissions list/grid content here */}
              </div>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Team Management</h1>
            <p className="text-gray-500 mt-1">
              Manage your team members, roles, and permissions.
            </p>
          </div>
          <Button size="lg" className="bg-[#1B1F3B] text-white hover:bg-[#2A3050] flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            <span>Invite Member</span>
          </Button>
        </div>

        {renderContent()}
      </div>
    </div>
  )
}
