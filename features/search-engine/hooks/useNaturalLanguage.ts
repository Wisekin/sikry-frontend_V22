"use client"

import { useState, useCallback } from "react"
import { searchClient } from "@/lib/api/searchClient"

import { QueryParser, ParsedQuery } from '../utils/queryParser'

export interface EnhancedSearchResult extends ParsedQuery {
  companies: Array<{
    id: string
    name: string
    domain: string
    description: string
    matchConfidence: number
    highlights: Array<{
      field: string
      text: string
    }>
  }>
  totalCount: number
  suggestions: Array<{
    text: string
    type: 'company' | 'industry' | 'technology' | 'location'
    confidence: number
  }>
  analysis: {
    topIndustries: Array<{ name: string; count: number }>
    topTechnologies: Array<{ name: string; count: number }>
    locationDistribution: Array<{ location: string; count: number }>
    averageCompanySize: number
    confidenceStats: {
      min: number
      max: number
      average: number
    }
  }
  metadata: {
    executionTime: number
    timestamp: string
    searchSources: string[]
  }
}

import type { SearchResponse } from '@/types/search'

export function useNaturalLanguage() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SearchResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeSources, setActiveSources] = useState(new Set(['internal']))
  const [sourceResults, setSourceResults] = useState<Record<string, SearchResponse['data']>>({})
  const [searchHistory, setSearchHistory] = useState<Array<{
    query: string
    timestamp: string
    resultCount: number
    sources: string[]
  }>>([])

  const search = useCallback(async (query: string, options?: {
    sources?: string[]
    limit?: number
    includeAnalytics?: boolean
  }) => {
    setIsLoading(true)
    setError(null)

    try {
      // Parse the query using our enhanced QueryParser
      const parsedQuery = QueryParser.parse(query)

      // Call the search API with parsed query
      const response = await searchClient.naturalLanguageSearch(query)

      // Add search to history
      setSearchHistory(prev => [{
        query,
        timestamp: new Date().toISOString(),
        resultCount: response.companies.length
      }, ...prev].slice(0, 10))

      // Transform API response to EnhancedSearchResult
      const enhancedResult: EnhancedSearchResult = {
        ...parsedQuery,
        companies: response.companies.map(company => ({
          ...company,
          matchConfidence: company.confidence || 0,
          highlights: company.highlights || []
        })),
        totalCount: response.totalCount,
        suggestions: response.suggestions.map(suggestion => ({
          text: suggestion,
          type: 'company', // Default type, API should provide actual type
          confidence: 0.8 // Default confidence, API should provide actual confidence
        })),
        analysis: {
          topIndustries: [],
          topTechnologies: [],
          locationDistribution: [],
          averageCompanySize: 0,
          confidenceStats: {
            min: 0,
            max: 0,
            average: 0
          }
        },
        metadata: {
          executionTime: response.executionTime || 0,
          timestamp: new Date().toISOString(),
          searchSources: options?.sources || ['google', 'linkedin', 'crunchbase']
        }
      }

      setResults(enhancedResult)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed")
      console.error('Search error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) return []
    
    try {
      const suggestions = await searchClient.getSuggestions(query)
      return suggestions
    } catch (err) {
      console.error('Suggestions error:', err)
      return []
    }
  }, [])

  const refreshSearch = useCallback(() => {
    if (results) {
      search(results.originalQuery)
    }
  }, [results, search])

  return {
    search,
    getSuggestions,
    refreshSearch,
    isLoading,
    results,
    error,
    searchHistory
  }
}
