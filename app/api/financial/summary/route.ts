import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

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
    const source_type = searchParams.get("source_type")
    const source_id = searchParams.get("source_id")
    const currency = searchParams.get("currency") || "USD"

    let query = supabase
      .from("financial_records")
      .select("amount, type")
      .eq("organization_id", teamMember.organization_id)
      .eq("currency", currency)

    if (source_type) {
      query = query.eq("source_type", source_type)
    }
    if (source_id) {
      query = query.eq("source_id", source_id)
    }

    const { data: records, error } = await query

    if (error) {
      console.error("Error fetching financial summary:", error)
      return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 })
    }

    const summary = records.reduce(
      (acc, record) => {
        if (record.type === "revenue") {
          acc.total_revenue += record.amount
        } else if (["cost", "expense"].includes(record.type)) {
          acc.total_costs += record.amount
        }
        acc.records_count++
        return acc
      },
      {
        total_revenue: 0,
        total_costs: 0,
        records_count: 0,
        currency,
      },
    )

    summary.net_profit = summary.total_revenue - summary.total_costs
    summary.roi_percentage = summary.total_costs > 0 ? (summary.net_profit / summary.total_costs) * 100 : 0

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Financial summary API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
