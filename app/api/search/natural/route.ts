import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { QueryParser } from "@/features/search-engine/utils/queryParser"

export async function POST(request: Request) {
  try {
    const body: { query: string } = await request.json()
    const { query } = body

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query is required",
          errors: [{ code: "validation_error", message: "Query is required" }],
        },
        { status: 400 },
      )
    }

    const supabase = createClient()

    // Log search query for analytics
    await supabase.from("search_history").insert({
      query,
      type: "natural",
      created_at: new Date().toISOString(),
    })

    // Parse the natural language query
    const parsedQuery = QueryParser.parse(query)

    // Start with a base query
    let dbQuery = supabase.from("companies").select("*", { count: "exact" })

    // Apply text search
    dbQuery = dbQuery.textSearch("searchable", query, {
      type: "websearch",
      config: "english",
    })

    // Apply filters from parsed query
    if (parsedQuery.entities.locations.length > 0) {
      const locationTerms = parsedQuery.entities.locations.map((loc) => `%${loc}%`)
      dbQuery = dbQuery.or(locationTerms.map((term) => `location->country.ilike.${term}`).join(","))
    }

    if (parsedQuery.entities.industries.length > 0) {
      dbQuery = dbQuery.in("industry", parsedQuery.entities.industries)
    }

    if (parsedQuery.filters.size) {
      dbQuery = dbQuery.eq("size", parsedQuery.filters.size)
    }

    // Execute the query
    const { data, error, count } = await dbQuery.limit(20)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      meta: {
        total: count || 0,
        parsedQuery,
      },
    })
  } catch (error) {
    console.error("Natural language search API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to perform natural language search",
        errors: [{ code: "search_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
