import type React from "react"
import { TranslationProvider } from "@/providers/TranslationProvider";
import { SidebarNav } from "@/components/core/navigation/SidebarNav";
import { TopNav } from "@/components/core/navigation/TopNav";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "../globals.css"; // Should be at the top

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
            <div className="flex flex-col flex-grow bg-sidebar overflow-y-auto">
              <SidebarNav />
            </div>
          </div>
        
          {/* Main content */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto bg-background ml-0 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0 gap-5 pt-8">
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="flex-grow ml-5 mr-5">
                  {children}
                </div>
              </ThemeProvider>
            </main>
          </div>
        </div>
      </div>
    </TranslationProvider>
  )
}
