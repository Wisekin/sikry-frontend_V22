"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SmartSearchBarProps {
  placeholder?: string
  showSuggestions?: boolean
  onSearch?: (query: string) => void
}

export function SmartSearchBar({
  placeholder = "Search companies...",
  showSuggestions = false,
  onSearch,
}: SmartSearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-20 py-3 text-base rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Search
        </Button>
      </div>
    </form>
  )
}
