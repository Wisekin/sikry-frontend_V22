"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BellIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid"

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Scraper Completed",
      message: "LinkedIn scraper finished with 95% success rate",
      time: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Rate Limit Warning",
      message: "Approaching API rate limit for Google Maps",
      time: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Feature Available",
      message: "AI-powered lead scoring is now available",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "error",
      title: "Scraper Failed",
      message: "Website structure changed, scraper needs update",
      time: "2 hours ago",
      read: false,
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      case "error":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
      case "info":
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />
      default:
        return <InformationCircleIcon className="w-5 h-5 text-gray-500" />
    }
  }

  if (!isOpen) {
    return (
      <div className="relative">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-16 right-4 z-50 w-96">
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Notifications</CardTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <CheckIcon className="w-4 h-4 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <XMarkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-auto p-1"
                            >
                              <CheckIcon className="w-3 h-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-auto p-1"
                          >
                            <XMarkIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
