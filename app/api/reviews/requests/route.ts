import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const status = searchParams.get("status")
    const platform = searchParams.get("platform")
    const contact_id = searchParams.get("contact_id")

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

    // Build query with filters
    let query = supabase
      .from("review_requests")
      .select(
        `
        *,
        contact:contact_id(id, name, email),
        campaign:campaign_id(id, name, status)
      `,
        { count: "exact" },
      )
      .eq("organization_id", teamMember.organization_id)

    if (status) {
      query = query.eq("status", status)
    }

    if (platform) {
      query = query.eq("platform", platform)
    }

    if (contact_id) {
      query = query.eq("contact_id", contact_id)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to).order("created_at", { ascending: false })

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
    console.error("Review requests API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch review requests",
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
    if (!body.contact_id || !body.review_url) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: [{ code: "validation_error", message: "Contact ID and review URL are required" }],
        },
        { status: 400 },
      )
    }

    // Create review request
    const reviewRequestData = {
      organization_id: teamMember.organization_id,
      contact_id: body.contact_id,
      campaign_id: body.campaign_id || null,
      platform: body.platform || "google",
      review_url: body.review_url,
      business_name: body.business_name || null,
      request_type: body.request_type || "manual",
      trigger_event: body.trigger_event || null,
      message_template_id: body.message_template_id || null,
      sent_via: body.sent_via || "email",
      expires_at: body.expires_at || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      metadata: body.metadata || {},
      notes: body.notes || null,
    }

    const { data, error } = await supabase
      .from("review_requests")
      .insert(reviewRequestData)
      .select(
        `
        *,
        contact:contact_id(id, name, email),
        campaign:campaign_id(id, name, status)
      `,
      )
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Review request created successfully",
    })
  } catch (error) {
    console.error("Review requests API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create review request",
        errors: [{ code: "create_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
