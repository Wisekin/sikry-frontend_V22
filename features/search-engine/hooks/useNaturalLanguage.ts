"use client"

import { useState, useCallback } from "react"
import { searchClient } from "@/lib/api/searchClient"

export interface SearchQuery {
  text: string
  filters: Record<string, any>
  scope: string[]
  intent: "search" | "filter" | "compare" | "analyze"
}

export interface SearchResult {
  companies: any[]
  totalCount: number
  suggestions: string[]
  queryAnalysis: {
    intent: string
    entities: string[]
    filters: Record<string, any>
  }
}

export function useNaturalLanguage() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (query: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await searchClient.naturalLanguageSearch(query)
      setResults(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const parseQuery = useCallback((query: string): SearchQuery => {
    // Basic query parsing logic
    const filters: Record<string, any> = {}
    const scope: string[] = []
    let intent: SearchQuery["intent"] = "search"

    // Extract location filters
    const locationMatch = query.match(/in\s+([^,]+)/i)
    if (locationMatch) {
      filters.location = locationMatch[1].trim()
    }

    // Extract industry filters
    const industryMatch = query.match(/(?:industry|sector):\s*([^,]+)/i)
    if (industryMatch) {
      filters.industry = industryMatch[1].trim()
    }

    // Extract size filters
    const sizeMatch = query.match(/(?:size|employees):\s*([^,]+)/i)
    if (sizeMatch) {
      filters.size = sizeMatch[1].trim()
    }

    // Determine intent
    if (query.includes("compare")) intent = "compare"
    else if (query.includes("analyze")) intent = "analyze"
    else if (query.includes("filter")) intent = "filter"

    return {
      text: query,
      filters,
      scope,
      intent,
    }
  }, [])

  return {
    search,
    parseQuery,
    isLoading,
    results,
    error,
  }
}
