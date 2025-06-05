"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageSelector } from "@/components/core/navigation/LanguageSelector"
import {
  Bell, Search, HelpCircle, Settings, LogOut, User, Menu, Moon, Monitor, Sun,
  UserPlus, Briefcase, AlertTriangle, Info // Added icons for notifications
} from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"
import router from "next/router"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useAuth } from "@/providers/AuthProvider"
import { useRouter } from "next/navigation"


export function TopNav() {
  // Helper for notification styling
  const getNotificationStyle = (type: string) => {
    switch (type.toLowerCase()) {
      case 'new':
        return { icon: <UserPlus className="h-5 w-5 text-blue-500" />, bgColor: 'bg-blue-100 dark:bg-blue-900/50', textColor: 'text-blue-700 dark:text-blue-300' };
      case 'job':
        return { icon: <Briefcase className="h-5 w-5 text-green-500" />, bgColor: 'bg-green-100 dark:bg-green-900/50', textColor: 'text-green-700 dark:text-green-300' };
      case 'alert': // Example for future use
        return { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, bgColor: 'bg-red-100 dark:bg-red-900/50', textColor: 'text-red-700 dark:text-red-300' };
      default:
        return { icon: <Info className="h-5 w-5 text-gray-500" />, bgColor: 'bg-gray-100 dark:bg-gray-700/50', textColor: 'text-gray-700 dark:text-gray-300' };
    }
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { t } = useTranslation()
  const { setTheme, theme } = useTheme()
  const { user, signOut } = useAuth()
  const router = useRouter()

  // Set brand theme as default when component mounts
  useEffect(() => {
    if (!theme) {
      setTheme("brand")
    }
  }, [theme, setTheme])

  // Notification state
  type NotificationType = {
    id: number;
    type: string;
    message: string;
    time: string;
    read: boolean;
  };
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch notifications
  useEffect(() => {
    setLoading(true);
    fetch("/api/notifications")
      .then(res => res.ok ? res.json() : [])
      .then(data => setNotifications(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header className="sticky top-0 left-0 right-0 h-14 bg-[var(--topnav-bg)] text-[var(--topnav-foreground)] z-50 px-3 flex items-center justify-between shadow-md">
      <div className="flex items-center lg:hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowMobileMenu(!showMobileMenu)} 
          className="text-[var(--topnav-foreground)] hover:bg-[var(--topnav-hover)]">
          <Menu className="h-4 w-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("search.placeholder")}
             className="w-full bg-gray-700/60 border border-gray-300 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
           // className="w-full bg-background border border-input rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-2">
        <LanguageSelector />

        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-[var(--topnav-foreground)] relative hover:bg-[var(--topnav-hover)]">
              <Bell className="h-5 w-5 text-[var(--topnav-foreground)]" />
              {/* Notification badge (dynamic) */}
              {/* This will show only if there are unread notifications */}
              {notifications && notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5 text-white border border-white" style={{display: 'inline-block'}}>
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[320px] max-w-xs">
            <DropdownMenuLabel className="px-3 py-2 font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Loading state */}
            {loading && (
              <DropdownMenuItem className="py-3 px-3 text-center text-muted-foreground">Loading...</DropdownMenuItem>
            )}
            {/* Empty state */}
            {!loading && notifications.length === 0 && (
              <DropdownMenuItem className="py-3 px-3 text-center text-muted-foreground">No new notifications</DropdownMenuItem>
            )}
            {/* Notifications list */}
            {!loading && notifications.length > 0 && notifications.map((notif) => {
              const style = getNotificationStyle(notif.type);
              return (
                <DropdownMenuItem key={notif.id} className={`p-0 hover:bg-muted/50 focus:bg-muted/50 cursor-pointer border-b border-border last:border-b-0 data-[highlighted]:bg-muted/50`}>
                  <div className={`flex items-start gap-3 p-3 w-full ${!notif.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}>
                    <div className={`p-1.5 rounded-full ${style.bgColor}`}>
                      {style.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm leading-snug ${!notif.read ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                        {notif.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
                    </div>
                    {!notif.read && (
                      <div className="h-2.5 w-2.5 rounded-full bg-primary self-center"></div>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push('/notifications')} // Assuming a /notifications page or implement action
              className="py-2.5 text-center text-sm text-primary hover:bg-muted/50 focus:bg-muted/50 data-[highlighted]:bg-muted/50 cursor-pointer font-medium"
            >
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="ghost" 
          size="icon" 
          className="text-[var(--topnav-foreground)] hover:bg-[var(--topnav-hover)]">
          <HelpCircle className="h-5 w-5 text-[var(--topnav-foreground)]" />
        </Button>

        {/* Login/Logout Button */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => window.location.href='/my-account'}>My Account</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href='/profile'}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("brand")} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                <span>Brand</span>
                {theme === "brand" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
                {theme === "light" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
                {theme === "dark" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
                {theme === "system" && <span className="ml-auto text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </header>
  )
}
