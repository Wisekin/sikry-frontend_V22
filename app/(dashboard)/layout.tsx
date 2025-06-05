import type React from "react"
import { TranslationProvider } from "@/providers/TranslationProvider"
import { SidebarNav } from "@/components/core/navigation/SidebarNav"
import { TopNav } from "@/components/core/navigation/TopNav"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { AuthProvider } from "@/providers/AuthProvider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow border-r bg-sidebar overflow-y-auto">
              <SidebarNav />
            </div>
          </div>
    <AuthProvider>
          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto bg-background p-6">
               <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
             <div className="mx-auto max-w-7xl">{children}</div>
            </ThemeProvider>
            </main>
          </div>
</AuthProvider>
        </div>
      </div>
    </TranslationProvider>
  )
}
