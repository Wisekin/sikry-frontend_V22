"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={`cursor-pointer ${locale === "en" ? "bg-primary/10 text-primary font-medium" : ""}`}
        >
          <span className="mr-2">🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("fr")}
          className={`cursor-pointer ${locale === "fr" ? "bg-primary/10 text-primary font-medium" : ""}`}
        >
          <span className="mr-2">🇫🇷</span>
          Français
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
