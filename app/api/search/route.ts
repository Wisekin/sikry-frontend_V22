import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import type { SearchParams } from "@/types/api"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const filters = searchParams.get("filters") ? JSON.parse(searchParams.get("filters") || "{}") : {}
    const scope = searchParams.get("scope") || "companies"

    const supabase = createClient()

    // Log search query for analytics
    await supabase.from("search_history").insert({
      query,
      filters: filters,
      scope,
      created_at: new Date().toISOString(),
    })

    // Start with a base query
    let dbQuery = supabase.from(scope).select("*", { count: "exact" })

    // Apply text search if query is provided
    if (query) {
      dbQuery = dbQuery.textSearch("searchable", query, {
        type: "websearch",
        config: "english",
      })
    }

    // Apply filters
    if (filters.industry) {
      dbQuery = dbQuery.in("industry", Array.isArray(filters.industry) ? filters.industry : [filters.industry])
    }

    if (filters.size) {
      dbQuery = dbQuery.in("size", Array.isArray(filters.size) ? filters.size : [filters.size])
    }

    if (filters.location?.country) {
      dbQuery = dbQuery.ilike("location->country", `%${filters.location.country}%`)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    dbQuery = dbQuery.range(from, to)

    // Execute the query
    const { data, error, count } = await dbQuery

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      meta: {
        total: count || 0,
        page,
        limit,
        hasMore: count ? from + data.length < count : false,
      },
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to perform search",
        errors: [{ code: "search_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body: SearchParams = await request.json()
    const { query, filters, page = 1, limit = 10, scope = "companies" } = body

    const supabase = createClient()

    // Log search query for analytics
    await supabase.from("search_history").insert({
      query,
      filters: filters,
      scope,
      created_at: new Date().toISOString(),
    })

    // Start with a base query
    let dbQuery = supabase.from(scope).select("*", { count: "exact" })

    // Apply text search if query is provided
    if (query) {
      dbQuery = dbQuery.textSearch("searchable", query, {
        type: "websearch",
        config: "english",
      })
    }

    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          dbQuery = dbQuery.in(key, value)
        } else if (typeof value === "object" && value !== null) {
          // Handle range filters
          if ("min" in value && value.min !== undefined) {
            dbQuery = dbQuery.gte(key, value.min)
          }
          if ("max" in value && value.max !== undefined) {
            dbQuery = dbQuery.lte(key, value.max)
          }
        } else {
          dbQuery = dbQuery.eq(key, value)
        }
      })
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    dbQuery = dbQuery.range(from, to)

    // Execute the query
    const { data, error, count } = await dbQuery

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      meta: {
        total: count || 0,
        page,
        limit,
        hasMore: count ? from + data.length < count : false,
      },
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to perform search",
        errors: [{ code: "search_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
