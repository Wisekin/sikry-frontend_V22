import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1", 10)
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10)
    const template_type = searchParams.get("template_type")
    const is_published = searchParams.get("is_published")
    const search = searchParams.get("search")

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
      .from("vsl_pages")
      .select("*", { count: "exact" })
      .eq("organization_id", teamMember.organization_id)

    // Apply filters
    if (template_type) {
      query = query.eq("template_type", template_type)
    }

    if (is_published !== null) {
      query = query.eq("is_published", is_published === "true")
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,title.ilike.%${search}%,headline.ilike.%${search}%`)
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
    console.error("VSL Pages API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch VSL pages",
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
    if (!body.name || !body.title || !body.headline) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: [{ code: "validation_error", message: "Name, title, and headline are required" }],
        },
        { status: 400 },
      )
    }

    // Generate unique slug
    const baseSlug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    let slug = baseSlug
    let counter = 1

    while (true) {
      const { data: existing } = await supabase
        .from("vsl_pages")
        .select("id")
        .eq("organization_id", teamMember.organization_id)
        .eq("slug", slug)
        .single()

      if (!existing) break
      slug = `${baseSlug}-${counter}`
      counter++
    }

    // Create VSL page
    const vslPageData = {
      organization_id: teamMember.organization_id,
      name: body.name,
      slug,
      title: body.title,
      description: body.description || null,
      video_url: body.video_url || null,
      video_thumbnail_url: body.video_thumbnail_url || null,
      video_duration_seconds: body.video_duration_seconds || null,
      template_type: body.template_type || "standard",
      primary_color: body.primary_color || "#3B82F6",
      secondary_color: body.secondary_color || "#1E40AF",
      background_type: body.background_type || "solid",
      background_value: body.background_value || null,
      headline: body.headline,
      subheadline: body.subheadline || null,
      bullet_points: body.bullet_points || [],
      testimonials: body.testimonials || [],
      cta_text: body.cta_text || "Get Started Now",
      cta_url: body.cta_url || null,
      cta_button_color: body.cta_button_color || "#10B981",
      meta_pixel_id: body.meta_pixel_id || null,
      google_analytics_id: body.google_analytics_id || null,
      custom_tracking_code: body.custom_tracking_code || null,
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      og_image_url: body.og_image_url || null,
      is_published: body.is_published || false,
      requires_opt_in: body.requires_opt_in || false,
      collect_phone: body.collect_phone || false,
      collect_company: body.collect_company || false,
      created_by: user.id,
    }

    const { data, error } = await supabase.from("vsl_pages").insert(vslPageData).select().single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "VSL page created successfully",
    })
  } catch (error) {
    console.error("VSL Pages API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create VSL page",
        errors: [{ code: "create_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
