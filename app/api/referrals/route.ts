import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    let query = supabase
      .from("referrals")
      .select(`
        *,
        referred_user:users!referrals_referred_user_id_fkey(id, email, first_name, last_name)
      `)
      .eq("referrer_user_id", user.id)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Referrals retrieved successfully",
    })
  } catch (error) {
    console.error("Referrals API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve referrals",
        errors: [{ code: "fetch_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { referred_email, reward_type = "credits", reward_amount = 10 } = body

    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Generate unique referral code
    const { data: codeResult, error: codeError } = await supabase.rpc("generate_referral_code", {
      user_id_param: user.id,
    })

    if (codeError) {
      throw codeError
    }

    const referralData = {
      referrer_user_id: user.id,
      referred_email,
      referral_code: codeResult,
      reward_type,
      reward_amount,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    }

    const { data, error } = await supabase.from("referrals").insert(referralData).select().single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      success: true,
      message: "Referral created successfully",
    })
  } catch (error) {
    console.error("Create referral API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create referral",
        errors: [{ code: "create_error", message: error instanceof Error ? error.message : "Unknown error" }],
      },
      { status: 500 },
    )
  }
}
