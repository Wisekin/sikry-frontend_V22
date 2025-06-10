import { NextResponse } from 'next/server';

interface VSLOverviewStats {
  total_vsl_pages: number;
  active_vsls: number;
  total_views_all_vsls: number;
  overall_conversion_rate_all_vsls_percent: number;
}

const mockOverviewStats: VSLOverviewStats = {
  total_vsl_pages: 12,
  active_vsls: 8,
  total_views_all_vsls: 25600,
  overall_conversion_rate_all_vsls_percent: 7.5,
};

export async function GET(request: Request) {
  try {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay
    return NextResponse.json({ data: mockOverviewStats });
  } catch (error) {
    console.error("Error fetching VSL overview data:", error);
    return NextResponse.json({ error: { message: "Error fetching VSL overview data" } }, { status: 500 });
  }
}
