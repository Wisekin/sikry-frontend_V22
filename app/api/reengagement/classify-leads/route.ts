import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { criteria = {} } = body

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

    // Get contacts that need classification
    const { data: contacts, error: contactsError } = await supabase
      .from("contacts")
      .select("*")
      .eq("organization_id", teamMember.organization_id)

    if (contactsError) {
      throw contactsError
    }

    const classifications = []
    const coldLeads = []

    for (const contact of contacts) {
      // Calculate lead score using the database function
      const { data: scoreResult, error: scoreError } = await supabase.rpc("calculate_lead_score", {
        contact_uuid: contact.id,
      })

      if (scoreError) {
        console.error(`Error calculating score for contact ${contact.id}:`, scoreError)
        continue
      }

      const score = scoreResult || 50
      let classification = "warm"

      if (score >= 80) classification = "hot"
      else if (score >= 60) classification = "warm"
      else if (score >= 30) classification = "cold"
      else if (score >= 10) classification = "dormant"
      else classification = "unresponsive"

      // Insert or update classification
      const classificationData = {
        organization_id: teamMember.organization_id,
        contact_id: contact.id,
        classification,
        score,
        factors: {
          engagement_score: contact.engagement_score || 0,
          days_since_contact: contact.last_contacted_at
            ? Math.floor((Date.now() - new Date(contact.last_contacted_at).getTime()) / (1000 * 60 * 60 * 24))
            : 999,
          auto_classified: true,
        },
        last_activity_date: contact.last_contacted_at,
        auto_classified: true,
      }

      const { data: classificationResult, error: classificationError } = await supabase
        .from("lead_classifications")
        .upsert(classificationData, {
          onConflict: "contact_id,classification_date",
          ignoreDuplicates: false,
        })
        .select()

      if (!classificationError) {
        classifications.push(classificationResult)

        // Track cold leads for re-engagement
        if (classification === "cold" || classification === "dormant") {
          coldLeads.push({
            contact_id: contact.id,
            classification,
            score,
          })
        }
      }
    }

    // Auto-create re-engagement tasks for cold leads
    if (coldLeads.length > 0) {
      const reengagementTasks = coldLeads.map((lead) => ({
        organization_id: teamMember.organization_id,
        contact_id: lead.contact_id,
        task_type: "auto_nurture",
        trigger_criteria: {
          classification: lead.classification,
          score: lead.score,
          auto_generated: true,
        },
        priority: lead.classification === "dormant" ? 8 : 6,
        scheduled_for: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Schedule for tomorrow
      }))

      await supabase.from("reengagement_tasks").insert(reengagementTasks)
    }

    return NextResponse.json({
      data: {
        classifications_updated: classifications.length,
        cold_leads_found: coldLeads.length,
        reengagement_tasks_created: coldLeads.length,
      },
      success: true,
      message: "Lead classification completed successfully",
    })
  } catch (error) {
    console.error("Lead classification API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to classify leads",
        errors: [{ code: "classification_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
