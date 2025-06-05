import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const contact_id = searchParams.get("contact_id")

    const supabase = await createClient()

    // Get current user's organization
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { data: teamMember, error: teamError } = await supabase
      .from("team_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (teamError || !teamMember) {
      return NextResponse.json({ success: false, message: "User not part of any organization" }, { status: 403 })
    }

    let query = supabase
      .from("reengagement_tasks")
      .select(`
        *,
        contacts(name, email),
        campaigns(name, status)
      `)
      .eq("organization_id", teamMember.organization_id)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    if (contact_id) {
      query = query.eq("contact_id", contact_id)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Re-engagement tasks retrieved successfully",
    })
  } catch (error) {
    console.error("Re-engagement tasks API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve re-engagement tasks",
        errors: [{ code: "fetch_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { contact_id, task_type, trigger_criteria, priority = 5, scheduled_for } = body

    const supabase = await createClient()

    // Get current user's organization
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { data: teamMember, error: teamError } = await supabase
      .from("team_members")
      .select("organization_id")
      .eq("user_id", user.id)
      .single()

    if (teamError || !teamMember) {
      return NextResponse.json({ success: false, message: "User not part of any organization" }, { status: 403 })
    }

    const taskData = {
      organization_id: teamMember.organization_id,
      contact_id,
      task_type,
      trigger_criteria,
      priority,
      scheduled_for: scheduled_for || new Date().toISOString(),
      status: "pending",
    }

    const { data, error } = await supabase.from("reengagement_tasks").insert(taskData).select().single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Re-engagement task created successfully",
    })
  } catch (error) {
    console.error("Create re-engagement task API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create re-engagement task",
        errors: [{ code: "create_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
