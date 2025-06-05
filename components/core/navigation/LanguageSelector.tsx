"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "@/lib/i18n/useTranslation"

const languages = [
  { code: "en", country: "GB", label: "English" },
  { code: "fr", country: "FR", label: "Français" }
]

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation()

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-[var(--topnav-foreground)] hover:bg-[var(--topnav-hover)]">
          <ReactCountryFlag 
            countryCode={currentLanguage.country}
            svg
            style={{
              width: '1.5em',
              height: '1.5em',
            }}
            title={currentLanguage.label}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code)}
            className={`cursor-pointer ${
              locale === lang.code ? "bg-primary/10 text-primary font-medium" : ""
            }`}
          >
            <ReactCountryFlag 
              countryCode={lang.country}
              svg
              style={{
                width: '1.2em',
                height: '1.2em',
                marginRight: '0.5rem'
              }}
            />
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
