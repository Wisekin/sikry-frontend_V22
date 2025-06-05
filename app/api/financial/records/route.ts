import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import type { FinancialFilters } from "@/types/financial"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's organization
    const { data: teamMember } = await supabase
      .from("team_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (!teamMember) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    const searchParams = request.nextUrl.searchParams
    const filters: FinancialFilters = {
      source_type: searchParams.get("source_type") || undefined,
      type: searchParams.get("type") || undefined,
      currency: searchParams.get("currency") || undefined,
      category: searchParams.get("category") || undefined,
      date_from: searchParams.get("date_from") || undefined,
      date_to: searchParams.get("date_to") || undefined,
      search: searchParams.get("search") || undefined,
    }

    let query = supabase
      .from("financial_records")
      .select("*")
      .eq("organization_id", teamMember.organization_id)
      .order("recorded_at", { ascending: false })

    // Apply filters
    if (filters.source_type) {
      query = query.eq("source_type", filters.source_type)
    }
    if (filters.type) {
      query = query.eq("type", filters.type)
    }
    if (filters.currency) {
      query = query.eq("currency", filters.currency)
    }
    if (filters.category) {
      query = query.eq("category", filters.category)
    }
    if (filters.date_from) {
      query = query.gte("recorded_at", filters.date_from)
    }
    if (filters.date_to) {
      query = query.lte("recorded_at", filters.date_to)
    }
    if (filters.search) {
      query = query.or(`description.ilike.%${filters.search}%,category.ilike.%${filters.search}%`)
    }

    const { data: records, error } = await query

    if (error) {
      console.error("Error fetching financial records:", error)
      return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 })
    }

    return NextResponse.json({ records })
  } catch (error) {
    console.error("Financial records API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's organization
    const { data: teamMember } = await supabase
      .from("team_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (!teamMember) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    const body = await request.json()
    const recordData = {
      ...body,
      organization_id: teamMember.organization_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: record, error } = await supabase.from("financial_records").insert(recordData).select().single()

    if (error) {
      console.error("Error creating financial record:", error)
      return NextResponse.json({ error: "Failed to create record" }, { status: 500 })
    }

    return NextResponse.json({ record }, { status: 201 })
  } catch (error) {
    console.error("Financial records POST error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
