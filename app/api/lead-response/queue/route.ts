import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "20", 10)
    const status = searchParams.get("status")
    const rule_id = searchParams.get("rule_id")
    const assigned_to = searchParams.get("assigned_to")

    const supabase = await createClient()

    // Get current user's organization
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: teamMember, error: teamError } = await supabase
      .from("team_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (teamError || !teamMember) {
      return NextResponse.json({ error: "User not part of any organization" }, { status: 403 })
    }

    // Build query
    let query = supabase
      .from("lead_response_queue")
      .select(
        `
        *,
        rule:rule_id(name, priority),
        assigned_user:assigned_to(first_name, last_name, email)
      `,
        { count: "exact" },
      )
      .eq("organization_id", teamMember.organization_id)

    // Apply filters
    if (status) {
      query = query.eq("status", status)
    }

    if (rule_id) {
      query = query.eq("rule_id", rule_id)
    }

    if (assigned_to) {
      query = query.eq("assigned_to", assigned_to)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to).order("scheduled_at", { ascending: true })

    const { data, error, count } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      data: data || [],
      success: true,
      meta: {
        total: count || 0,
        page,
        limit,
        hasMore: count ? from + data.length < count : false,
      },
    })
  } catch (error) {
    console.error("Lead Response Queue API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lead response queue",
        errors: [{ code: "fetch_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const supabase = await createClient()

    // Get current user's organization
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: teamMember, error: teamError } = await supabase
      .from("team_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (teamError || !teamMember) {
      return NextResponse.json({ error: "User not part of any organization" }, { status: 403 })
    }

    // Validate required fields
    if (!body.rule_id || !body.lead_email) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: [{ code: "validation_error", message: "Rule ID and lead email are required" }],
        },
        { status: 400 },
      )
    }

    // Use the database function to create the lead response
    const { data, error } = await supabase.rpc("create_lead_response", {
      p_organization_id: teamMember.organization_id,
      p_rule_id: body.rule_id,
      p_lead_email: body.lead_email,
      p_lead_name: body.lead_name || null,
      p_lead_phone: body.lead_phone || null,
      p_lead_company: body.lead_company || null,
      p_lead_source: body.lead_source || "manual",
      p_lead_capture_id: body.lead_capture_id || null,
      p_contact_id: body.contact_id || null,
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      data: { queue_id: data },
      success: true,
      message: "Lead response queued successfully",
    })
  } catch (error) {
    console.error("Lead Response Queue API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to queue lead response",
        errors: [{ code: "queue_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
