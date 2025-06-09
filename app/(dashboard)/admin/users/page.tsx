"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import {
  UserGroupIcon,
  UserPlusIcon,
  UserCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { SecondaryMenuBar } from "@/components/core/navigation/SecondaryMenuBar"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      status: "Active",
      lastActive: "2 hours ago",
      avatar: "SJ"
    },
    {
      id: "2",
      name: "Mark Wilson",
      email: "mark.w@company.com",
      status: "Active",
      lastActive: "5 minutes ago",
      avatar: "MW"
    },
    // Add more users as needed
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen space-y-8 bg-white text-[#1B1F3B]">
      <SecondaryMenuBar />

      <div className="p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#1B1F3B]">User Management</h1>
            <p className="text-gray-500 mt-1">
              Manage all users, invitations, and user statuses.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-none shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
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
                  <p className="text-xs text-gray-500">50% of users online</p>
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

          <TabsContent value="users">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="bg-white border-none shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#2A3050]">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#3C4568] text-white flex items-center justify-center font-semibold">
                        {user.avatar}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-[#1B1F3B]">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {user.status}
                          </span>
                          <span className="text-xs text-gray-400">{user.lastActive}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-[#2A3050]"
                        >
                          <PencilSquareIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-600"
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

          <TabsContent value="invites">
            <Card className="bg-white border-none shadow-sm">
              <CardHeader>
                <CardTitle>Invitations</CardTitle>
                <CardDescription>Manage pending and sent invitations.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Invitation management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  )
}
