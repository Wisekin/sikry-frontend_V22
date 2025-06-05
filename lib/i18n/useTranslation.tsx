"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations } from "./translations"

export type Language = "en" | "fr"

interface TranslationContextType {
  locale: Language
  setLocale: (locale: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Utility to get nested translation keys (e.g., 'nav.dashboard')
function getNestedTranslation(obj: any, key: string): string | undefined {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj)
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  // Always start with 'en' to avoid hydration mismatch, update on client mount
  const [locale, setLocaleState] = useState<Language>("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("language") as Language
      if (storedLang === "en" || storedLang === "fr") {
        setLocaleState(storedLang)
      }
    }
  }, [])

  const setLocale = (newLocale: Language) => {
    setLocaleState(newLocale)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLocale)
    }
  }

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = translations[locale as keyof typeof translations] || translations.en
    let text = getNestedTranslation(dict, key) || key

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue))
      })
    }

    return text
  }

  return <TranslationContext.Provider value={{ locale, setLocale, t }}>{children}</TranslationContext.Provider>
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
