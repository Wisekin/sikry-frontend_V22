import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const is_active = searchParams.get("is_active")

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
    let query = supabase.from("lead_response_rules").select("*").eq("organization_id", teamMember.organization_id)

    // Apply filters
    if (is_active !== null) {
      query = query.eq("is_active", is_active === "true")
    }

    query = query.order("priority", { ascending: false })

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      data: data || [],
      success: true,
    })
  } catch (error) {
    console.error("Lead Response Rules API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch lead response rules",
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
    if (!body.name || !body.trigger_sources || body.trigger_sources.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: [{ code: "validation_error", message: "Name and trigger sources are required" }],
        },
        { status: 400 },
      )
    }

    // Create lead response rule
    const ruleData = {
      organization_id: teamMember.organization_id,
      name: body.name,
      description: body.description || null,
      is_active: body.is_active !== false,
      priority: body.priority || 1,
      trigger_sources: body.trigger_sources,
      trigger_conditions: body.trigger_conditions || {},
      response_delay_seconds: body.response_delay_seconds || 300,
      max_response_delay_seconds: body.max_response_delay_seconds || 1800,
      send_email: body.send_email !== false,
      send_sms: body.send_sms || false,
      make_call: body.make_call || false,
      create_task: body.create_task !== false,
      email_template_id: body.email_template_id || null,
      sms_template_id: body.sms_template_id || null,
      auto_assign: body.auto_assign !== false,
      assign_to_user_id: body.assign_to_user_id || null,
      assign_by_territory: body.assign_by_territory || false,
      assign_round_robin: body.assign_round_robin !== false,
      respect_business_hours: body.respect_business_hours !== false,
      business_hours_start: body.business_hours_start || "09:00:00",
      business_hours_end: body.business_hours_end || "17:00:00",
      business_days: body.business_days || [1, 2, 3, 4, 5],
      timezone: body.timezone || "UTC",
      max_retry_attempts: body.max_retry_attempts || 3,
      retry_delay_minutes: body.retry_delay_minutes || 15,
      escalate_on_failure: body.escalate_on_failure !== false,
      escalation_user_id: body.escalation_user_id || null,
      created_by: user.id,
    }

    const { data, error } = await supabase.from("lead_response_rules").insert(ruleData).select().single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Lead response rule created successfully",
    })
  } catch (error) {
    console.error("Lead Response Rules API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lead response rule",
        errors: [{ code: "create_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
