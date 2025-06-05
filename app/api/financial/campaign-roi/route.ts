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

    const { data: campaignROI, error } = await supabase
      .from("campaign_roi")
      .select("*")
      .eq("organization_id", teamMember.organization_id)
      .order("roi_percentage", { ascending: false })

    if (error) {
      console.error("Error fetching campaign ROI:", error)
      return NextResponse.json({ error: "Failed to fetch campaign ROI" }, { status: 500 })
    }

    return NextResponse.json({ campaigns: campaignROI })
  } catch (error) {
    console.error("Campaign ROI API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
