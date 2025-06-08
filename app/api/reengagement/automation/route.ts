import { NextResponse } from 'next/server';

interface AutomationAction {
  type: 'send_email' | 'add_tag' | 'create_task' | 'wait' | 'notify_user';
  details: Record<string, any>; // e.g., { template_id: 'tpl_xyz' } or { duration_days: 3 }
}

interface AutomationRule {
  rule_id: string;
  rule_name: string;
  trigger_type: 'lead_classification_change' | 'lead_tag_added' | 'lead_inactive_period' | 'demo_completed';
  trigger_details: Record<string, any>; // e.g., { new_classification: 'Cold' } or { days_inactive: 7 }
  actions: AutomationAction[];
  status: 'active' | 'inactive';
  performance_metrics?: { // Optional, as not all rules directly track this
    emails_sent?: number;
    open_rate_percent?: number;
    click_rate_percent?: number;
    conversions?: number;
  };
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Mock data store
let mockAutomationRules: AutomationRule[] = [
  {
    rule_id: 'auto_001',
    rule_name: 'Cold Lead Nurturing - Email 1',
    trigger_type: 'lead_classification_change',
    trigger_details: { new_classification: 'Cold', previous_classification_not: 'Cold' },
    actions: [
      { type: 'send_email', details: { template_id: 'tpl_cold_welcome_v1', subject: 'Reaching out...' } },
      { type: 'wait', details: { duration_days: 3 } },
      // Potentially another action for a sequence, or this is part of a larger "workflow"
    ],
    status: 'active',
    performance_metrics: { emails_sent: 1250, open_rate_percent: 22, click_rate_percent: 5, conversions: 15 },
    created_at: '2023-10-01T10:00:00Z',
    updated_at: '2023-10-05T14:00:00Z',
  },
  {
    rule_id: 'auto_002',
    rule_name: 'Warm Lead Follow-up Task Creation',
    trigger_type: 'lead_classification_change',
    trigger_details: { new_classification: 'Warm', minimum_days_in_status: 7 },
    actions: [
      { type: 'create_task', details: { description: 'Personalized follow-up call for Warm Lead', assigned_to_group: 'Sales Reps', priority: 'high' } },
      { type: 'add_tag', details: { tag_name: 'Warm-FollowUp-Scheduled' } },
    ],
    status: 'active',
    performance_metrics: { conversions: 35 }, // e.g. tasks created or leads moved to next stage
    created_at: '2023-10-02T11:00:00Z',
    updated_at: '2023-10-02T11:00:00Z',
  },
  {
    rule_id: 'auto_003',
    rule_name: 'Inactive Trial User Reminder',
    trigger_type: 'lead_inactive_period',
    trigger_details: { user_segment: 'trial_users', days_inactive: 5 },
    actions: [
      { type: 'send_email', details: { template_id: 'tpl_trial_reminder_inactive', subject: 'Still exploring?' } },
      { type: 'notify_user', details: { user_id_field: 'account_manager_id', message: 'Trial user X is inactive.' } },
    ],
    status: 'inactive',
    performance_metrics: { emails_sent: 50, open_rate_percent: 35, click_rate_percent: 10, conversions: 3 },
    created_at: '2023-09-15T09:00:00Z',
    updated_at: '2023-09-20T12:00:00Z',
  },
];

export async function GET(request: Request) {
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    return NextResponse.json(mockAutomationRules);
  } catch (error) {
    console.error("Error fetching automation rules:", error);
    return NextResponse.json({ message: "Error fetching automation rules" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newRuleData = await request.json() as Omit<AutomationRule, 'rule_id' | 'created_at' | 'updated_at'>;
    const newRule: AutomationRule = {
      ...newRuleData,
      rule_id: `auto_${String(Date.now()).slice(-6)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockAutomationRules.push(newRule);
    return NextResponse.json(newRule, { status: 201 });
  } catch (error) {
    console.error("Error creating automation rule:", error);
    return NextResponse.json({ message: "Error creating automation rule" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Simplified: Toggles status or updates the whole rule
  try {
    const { searchParams } = new URL(request.url);
    const ruleId = searchParams.get('ruleId');
    if (!ruleId) {
      return NextResponse.json({ message: "Rule ID is required for update" }, { status: 400 });
    }

    const updates = await request.json() as Partial<Omit<AutomationRule, 'rule_id' | 'created_at'>>;
    const ruleIndex = mockAutomationRules.findIndex(r => r.rule_id === ruleId);

    if (ruleIndex === -1) {
      return NextResponse.json({ message: "Automation rule not found" }, { status: 404 });
    }

    // Example: Toggle status if only status is provided, otherwise replace (simple mock)
    if (updates.status && Object.keys(updates).length === 1) {
         mockAutomationRules[ruleIndex].status = updates.status as 'active' | 'inactive';
    } else {
        mockAutomationRules[ruleIndex] = {
          ...mockAutomationRules[ruleIndex],
          ...updates,
        };
    }
    mockAutomationRules[ruleIndex].updated_at = new Date().toISOString();

    return NextResponse.json(mockAutomationRules[ruleIndex]);
  } catch (error)
