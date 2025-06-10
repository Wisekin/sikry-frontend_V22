import { NextResponse } from 'next/server';

interface VSLPerformanceStat { totalViews: number; totalLeads: number; conversionRate: number; avgWatchTime?: number; }
interface VSLTimeSeriesDataPoint { date: string; views: number; leads: number; conversionRate?: number; }

interface VSLDetailedPerformance {
    vslPageId: string;
    vslPageTitle: string;
    summaryStats: VSLPerformanceStat;
    performanceOverTime: VSLTimeSeriesDataPoint[];
}
interface AllVSLPerformanceSummary {
    pages: Array<{ id: string; title: string; stats: VSLPerformanceStat }>;
    overallSummary: VSLPerformanceStat; // Aggregated
}
type VSLTrackingData = VSLDetailedPerformance | AllVSLPerformanceSummary;

// Mock VSL Page List (subset of what /api/vsl/pages might return)
const mockVslPagesSimpleList = [
    { page_id: "vslp_001", title: "My First VSL Campaign (Product A Launch)"},
    { page_id: "vslp_002", title: "Webinar Replay Offer VSL"},
    { page_id: "vslp_003", title: "New Service Explainer (Draft)"},
];

const generateMockTrackingData = (vslPageId: string, period: string): VSLDetailedPerformance => {
    const vsl = mockVslPagesSimpleList.find(p=>p.page_id === vslPageId);
    let days = 30;
    let periodMultiplier = 1;
    if (period === 'last7days') { days = 7; periodMultiplier = 0.23; }
    if (period === 'last3months') { days = 90; periodMultiplier = 3; }
    if (period === 'alltime') { days = 180; periodMultiplier = 6; }


    const baseViews = (Math.floor(Math.random() * 8000) + 2000) * periodMultiplier; // Scale base views by period
    const baseLeads = Math.floor(baseViews * (Math.random() * 0.1 + 0.02)); // 2-12% conversion

    const performanceOverTime: VSLTimeSeriesDataPoint[] = [];
    let currentDate = new Date();
    let currentTotalViews = 0;
    let currentTotalLeads = 0;

    for (let i = 0; i < days; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - (days - 1 - i));
        // Ensure daily numbers are somewhat proportional to the total expected for the period
        const dailyViews = Math.max(0, Math.floor(Math.random() * (baseViews / days * 2.5)) + Math.floor(baseViews / days * 0.1));
        const dailyLeads = Math.max(0, Math.floor(dailyViews * (Math.random() * 0.15 + 0.01))); // 1-16% daily conversion

        currentTotalViews += dailyViews;
        currentTotalLeads += dailyLeads;

        performanceOverTime.push({
            date: date.toISOString().split('T')[0],
            views: dailyViews,
            leads: dailyLeads,
            conversionRate: parseFloat(((dailyLeads / (dailyViews||1)) * 100).toFixed(1))
        });
    }

    // Use aggregated sums for summary to be consistent with time series
    const finalTotalViews = performanceOverTime.reduce((sum, d) => sum + d.views, 0);
    const finalTotalLeads = performanceOverTime.reduce((sum, d) => sum + d.leads, 0);


    return {
        vslPageId: vslPageId,
        vslPageTitle: vsl?.title || `VSL ${vslPageId.slice(-3)}`,
        summaryStats: {
            totalViews: finalTotalViews,
            totalLeads: finalTotalLeads,
            conversionRate: parseFloat(((finalTotalLeads / (finalTotalViews||1)) * 100).toFixed(1)),
            avgWatchTime: Math.floor(Math.random() * 120) + 30
        },
        performanceOverTime
    };
};

const generateAllVSLSummary = (period: string): AllVSLPerformanceSummary => {
    const pagesData = mockVslPagesSimpleList.map(vsl => {
        const detailedData = generateMockTrackingData(vsl.page_id, period); // Generate stats for each VSL for the period
        return { id: vsl.page_id, title: vsl.title, stats: detailedData.summaryStats };
    });
    const overallViews = pagesData.reduce((sum,p) => sum + p.stats.totalViews, 0);
    const overallLeads = pagesData.reduce((sum,p) => sum + p.stats.totalLeads, 0);
    const avgWatchTimes = pagesData.map(p => p.stats.avgWatchTime || 0).filter(t => t > 0);

    return {
        pages: pagesData,
        overallSummary: {
            totalViews: overallViews,
            totalLeads: overallLeads,
            conversionRate: parseFloat(((overallLeads / (overallViews||1)) * 100).toFixed(1)),
            avgWatchTime: avgWatchTimes.length > 0 ? Math.floor(avgWatchTimes.reduce((s,t)=> s+t, 0) / avgWatchTimes.length) : Math.floor(Math.random() * 100) + 40
        }
    };
};


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vslPageId = searchParams.get('vslPageId');
  const period = searchParams.get('period') || 'last30days';

  try {
    await new Promise(resolve => setTimeout(resolve, 650));
    let responseData: VSLTrackingData;
    if (vslPageId && vslPageId !== 'all') {
        responseData = generateMockTrackingData(vslPageId, period as string);
    } else {
        responseData = generateAllVSLSummary(period as string);
    }
    return NextResponse.json({ data: responseData });
  } catch (error) {
    console.error("Error fetching VSL tracking data:", error);
    return NextResponse.json({ error: { message: "Error fetching VSL tracking data" } }, { status: 500 });
  }
}
