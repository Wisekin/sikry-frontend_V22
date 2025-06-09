"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserGroupIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function TeamPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B]">
      <SecondaryMenuBar />

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">Team Management</h1>
            <p className="text-gray-500 mt-1">
              Manage your team members, roles, and permissions.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="grid gap-6">
          <TabsList className="mb-6 bg-gray-100 p-1 rounded-lg max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Members</CardTitle>
                  <UserGroupIcon className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1B1F3B]">24</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">+3 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Now</CardTitle>
                  <UserCircleIcon className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1B1F3B]">12</div>
                  <p className="text-xs text-gray-500">50% of team online</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Pending Invites</CardTitle>
                  <UserPlusIcon className="w-5 h-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-[#1B1F3B]">3</div>
                  <p className="text-xs text-amber-600">Requires action</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredMembers.map((member) => (
                <Card key={member.id} className="bg-white border-none shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#2A3050]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roles">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
                <CardDescription>Configure team roles and their associated permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Role management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Permission Settings</CardTitle>
                <CardDescription>Manage detailed permission settings for different roles.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Permission management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
