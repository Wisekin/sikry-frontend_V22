import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    let query = supabase
      .from("funnels")
      .select(`
        *,
        funnel_steps(*),
        funnel_analytics(*)
      `)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    if (type) {
      query = query.eq("funnel_type", type)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ funnels: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const { data: funnel, error: funnelError } = await supabase
      .from("funnels")
      .insert({
        name: body.name,
        description: body.description,
        funnel_type: body.funnel_type || "lead_nurture",
        trigger_conditions: body.trigger_conditions || {},
        exit_conditions: body.exit_conditions || {},
        steps: body.steps || [],
      })
      .select()
      .single()

    if (funnelError) {
      return NextResponse.json({ error: funnelError.message }, { status: 500 })
    }

    // Create funnel steps if provided
    if (body.steps && body.steps.length > 0) {
      const stepsData = body.steps.map((step: any, index: number) => ({
        funnel_id: funnel.id,
        step_order: index + 1,
        step_name: step.name,
        step_type: step.type,
        step_config: step.config || {},
        success_criteria: step.success_criteria || {},
        failure_criteria: step.failure_criteria || {},
      }))

      const { error: stepsError } = await supabase.from("funnel_steps").insert(stepsData)

      if (stepsError) {
        console.error("Error creating funnel steps:", stepsError)
      }
    }

    return NextResponse.json({ funnel })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
