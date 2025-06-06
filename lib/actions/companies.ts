"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCompanies(filters?: {
  industry?: string
  location?: string
  size?: string
  search?: string
  confidence_min?: number
}) {
  console.log('[Companies] Getting companies with filters:', filters);
  const supabase = await createClient()
  
  // Log cookies for debugging
  if (typeof document !== 'undefined') {
    console.log('[Companies] Cookies:', document.cookie);
  }

  // Get current user's organization
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  console.log('[Companies] User auth check:', { 
    hasUser: !!user, 
    userId: user?.id,
    error: userError 
  });

  if (userError || !user) {
    console.error('[Companies] Unauthorized access attempt:', userError?.message || 'No user found');
    throw new Error("Unauthorized: Please sign in to continue")
  }

  console.log('[Companies] Fetching team member for user:', user.id);
  const { data: teamMember, error: teamError } = await supabase
    .from("team_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .single()

  console.log('[Companies] Team member data:', { 
    teamMember, 
    error: teamError 
  });

  if (teamError || !teamMember) {
    console.error('[Companies] User not part of any organization:', teamError?.message || 'No team member found');
    throw new Error("You are not part of any organization. Please contact your administrator.")
  }

  console.log('[Companies] Building query for organization:', teamMember.organization_id);
  let query = supabase
    .from("discovered_companies")
    .select("*")
    .eq("organization_id", teamMember.organization_id)
    .order("created_at", { ascending: false })

  if (filters?.industry) {
    console.log('[Companies] Filtering by industry:', filters.industry);
    query = query.eq("industry", filters.industry)
  }

  if (filters?.size) {
    console.log('[Companies] Filtering by size:', filters.size);
    query = query.eq("company_size", filters.size)
  }

  if (filters?.confidence_min) {
    console.log('[Companies] Filtering by confidence min:', filters.confidence_min);
    query = query.gte("confidence_score", filters.confidence_min)
  }

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,domain.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
    )
  }

  console.log('[Companies] Executing database query');
  const { data, error } = await query;

  if (error) {
    console.error('[Companies] Database error:', error);
    throw new Error(`Failed to fetch companies: ${error.message}`);
  }

  console.log(`[Companies] Successfully fetched ${data?.length || 0} companies`);
  return data || []
}

export async function getCompany(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("discovered_companies")
    .select(`
      *,
      contacts(*),
      communications(*),
      insights(*)
    `)
    .eq("id", id)
    .single()

  if (error) {
    throw new Error(`Failed to fetch company: ${error.message}`)
  }

  return data
}

export async function createCompany(formData: FormData) {
  const supabase = await createClient()

  // Get current user's organization
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const { data: teamMember, error: teamError } = await supabase
    .from("team_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .single()

  if (teamError || !teamMember) {
    throw new Error("User not part of any organization")
  }

  const companyData = {
    organization_id: teamMember.organization_id,
    name: formData.get("name") as string,
    domain: (formData.get("domain") as string) || null,
    description: (formData.get("description") as string) || null,
    industry: (formData.get("industry") as string) || null,
    location_text: (formData.get("location") as string) || null,
    company_size: (formData.get("size") as string) || null,
    source_url: (formData.get("source_url") as string) || "manual_entry",
    confidence_score: Number.parseFloat(formData.get("confidence_score") as string) || 0.5,
    company_status: "active",
    tags_list: JSON.parse((formData.get("tags") as string) || "[]"),
    internal_notes: (formData.get("notes") as string) || null,
  }

  const { data, error } = await supabase.from("discovered_companies").insert(companyData).select().single()

  if (error) {
    throw new Error(`Failed to create company: ${error.message}`)
  }

  revalidatePath("/companies")
  return data
}

export async function updateCompany(id: string, formData: FormData) {
  const supabase = await createClient()

  const updateData = {
    name: formData.get("name") as string,
    domain: (formData.get("domain") as string) || null,
    description: (formData.get("description") as string) || null,
    industry: (formData.get("industry") as string) || null,
    location_text: (formData.get("location") as string) || null,
    company_size: (formData.get("size") as string) || null,
    confidence_score: Number.parseFloat(formData.get("confidence_score") as string),
    tags_list: JSON.parse((formData.get("tags") as string) || "[]"),
    internal_notes: (formData.get("notes") as string) || null,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("discovered_companies").update(updateData).eq("id", id).select().single()

  if (error) {
    throw new Error(`Failed to update company: ${error.message}`)
  }

  revalidatePath("/companies")
  revalidatePath(`/companies/${id}`)
  return data
}

export async function deleteCompany(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("discovered_companies").delete().eq("id", id)

  if (error) {
    throw new Error(`Failed to delete company: ${error.message}`)
  }

  revalidatePath("/companies")
}

export async function getCompanyStats() {
  const supabase = await createClient()

  // Get current user's organization
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const { data: teamMember, error: teamError } = await supabase
    .from("team_members")
    .select("organization_id")
    .eq("user_id", user.id)
    .single()

  if (teamError || !teamMember) {
    throw new Error("User not part of any organization")
  }

  const [{ count: totalCompanies }, { count: highConfidence }, { count: recentlyScraped }, { count: contacted }] =
    await Promise.all([
      supabase
        .from("discovered_companies")
        .select("*", { count: "exact", head: true })
        .eq("organization_id", teamMember.organization_id),
      supabase
        .from("discovered_companies")
        .select("*", { count: "exact", head: true })
        .eq("organization_id", teamMember.organization_id)
        .gte("confidence_score", 0.9),
      supabase
        .from("discovered_companies")
        .select("*", { count: "exact", head: true })
        .eq("organization_id", teamMember.organization_id)
        .gte("last_scraped_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
      supabase.from("contacts").select("*", { count: "exact", head: true }).not("last_contacted_at", "is", null),
    ])

  return {
    totalCompanies: totalCompanies || 0,
    highConfidence: highConfidence || 0,
    recentlyScraped: recentlyScraped || 0,
    contacted: contacted || 0,
  }
}
