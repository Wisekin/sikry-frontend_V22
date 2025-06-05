"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, Linkedin, Database, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface SmartSearchBarProps {
  placeholder?: string
  showSuggestions?: boolean
  className?: string
}

export function SmartSearchBar({
  placeholder = "Search for companies...",
  showSuggestions = false,
  className = "",
}: SmartSearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestionsList, setShowSuggestionsList] = useState(false)
  const [selectedSources, setSelectedSources] = useState<string[]>(["google", "linkedin", "crunchbase"])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const searchSuggestions = [
    "Marketing agencies in Geneva",
    "SaaS companies with Series A funding",
    "Tech startups using React",
    "Fintech companies in Switzerland",
    "E-commerce platforms with 50+ employees",
    "AI companies in Europe",
    "Healthcare startups in Zurich",
    "Consulting firms in London",
  ]

  const sources = [
    { id: "google", label: "Google", icon: Globe, color: "bg-blue-500" },
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, color: "bg-blue-600" },
    { id: "crunchbase", label: "Crunchbase", icon: Database, color: "bg-orange-500" },
  ]

  useEffect(() => {
    if (query.length > 2 && showSuggestions) {
      const filtered = searchSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestionsList(true)
    } else {
      setShowSuggestionsList(false)
    }
  }, [query, showSuggestions])

  const handleSearch = () => {
    if (query.trim()) {
      const searchParams = new URLSearchParams({
        q: query,
        sources: selectedSources.join(","),
      })
      router.push(`/search/results?${searchParams.toString()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const toggleSource = (sourceId: string) => {
    setSelectedSources((prev) => (prev.includes(sourceId) ? prev.filter((id) => id !== sourceId) : [...prev, sourceId]))
  }

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-green-700" />
        </div>
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-12 pr-24 h-14 text-lg border-2 border-slate-200 focus:border-green-700 rounded-xl shadow-lg"
        />
        <Button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      {/* Source Selectors */}
      <div className="flex items-center gap-2 mt-3">
        <span className="text-sm text-muted-foreground">Search in:</span>
        {sources.map((source) => {
          const Icon = source.icon
          const isSelected = selectedSources.includes(source.id)
          return (
            <Badge
              key={source.id}
              variant={isSelected ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                isSelected ? `${source.color} text-white hover:opacity-80` : "hover:bg-slate-100"
              }`}
              onClick={() => toggleSource(source.id)}
            >
              <Icon className="w-3 h-3 mr-1" />
              {source.label}
            </Badge>
          )
        })}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestionsList && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-600 last:border-b-0"
              onClick={() => {
                setQuery(suggestion)
                setShowSuggestionsList(false)
                inputRef.current?.focus()
              }}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
