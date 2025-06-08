import { NextResponse } from 'next/server';

interface LeadClassificationStats {
  hot_leads_count: number;
  warm_leads_count: number;
  cold_leads_count: number;
  unclassified_leads_count: number;
}

interface ClassificationRule {
  id: string;
  name: string;
  description: string;
  classification_target: 'Hot' | 'Warm' | 'Cold';
  criteria_summary: string; // A human-readable summary of the rule logic
  // In a real system, this would also include structured criteria for processing
}

// Mock data store
let mockClassificationStats: LeadClassificationStats = {
  hot_leads_count: 78,
  warm_leads_count: 230,
  cold_leads_count: 1150,
  unclassified_leads_count: 310,
};

let mockClassificationRules: ClassificationRule[] = [
    { id: 'rule_cold_1', name: 'Inactive Users', classification_target: 'Cold', description: 'Users who have not logged in or opened an email in the last 90 days.', criteria_summary: 'Last active > 90 days' },
    { id: 'rule_cold_2', name: 'Low Engagement', classification_target: 'Cold', description: 'Users with an engagement score below 10, indicating minimal interaction.', criteria_summary: 'Engagement score < 10' },
    { id: 'rule_warm_1', name: 'Recent Product Interest', classification_target: 'Warm', description: 'Users who visited key product pages or the pricing page in the last 14 days.', criteria_summary: 'Visited key pages (product, pricing) recently' },
    { id: 'rule_hot_1', name: 'High Intent Signals', classification_target: 'Hot', description: 'Users who requested a demo, started a trial, or had multiple high-value interactions in the last 30 days.', criteria_summary: 'Demo request, Trial started, or multiple high-value interactions' },
];

export async function GET(request: Request) {
  // In a real application, stats would be queried from the database based on lead data and rules.
  // Rules would also be fetched from a database.
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    return NextResponse.json({
      stats: mockClassificationStats,
      rules: mockClassificationRules,
    });
  } catch (error) {
    console.error("Error fetching lead classification data:", error);
    return NextResponse.json({ message: "Error fetching lead classification data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // This endpoint could be used to add a new classification rule.
  // For now, it's a placeholder.
  try {
    const newRule = await request.json() as Omit<ClassificationRule, 'id'>;
    const createdRule: ClassificationRule = {
      ...newRule,
      id: `rule_${String(Date.now()).slice(-5)}`,
    };
    mockClassificationRules.push(createdRule);
    // In a real app, you might want to re-calculate stats after adding a rule, or trigger a background job.
    return NextResponse.json(createdRule, { status: 201 });
  } catch (error) {
    console.error("Error creating classification rule:", error);
    return NextResponse.json({ message: "Error creating classification rule" }, { status: 500 });
  }
}

// Further development could include:
// - PUT /api/reengagement/classify-leads/rules/{rule_id} to update a rule
// - DELETE /api/reengagement/classify-leads/rules/{rule_id} to delete a rule
// - POST /api/reengagement/classify-leads/run to trigger a re-classification job for all leads
