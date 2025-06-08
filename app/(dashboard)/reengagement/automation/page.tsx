import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Settings2, PlayCircle, CheckCheck, BarChart3, PlusCircle, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'; // Icons for automation

interface AutomationRule {
  id: string;
  name: string;
  trigger: string; // User-friendly description of the trigger
  actions: string[]; // User-friendly list of actions
  status: 'Active' | 'Inactive';
  emailsSent?: number;
  openRate?: number; // Percentage
  clickRate?: number; // Percentage
}

const ReEngagementAutomationPage = () => {
  // Mock data - will be replaced by API calls
  const rules: AutomationRule[] = [
    {
      id: 'rule_001',
      name: 'Cold Lead Welcome Email',
      trigger: 'Lead becomes "Cold"',
      actions: ['Send "Cold Lead Intro" email template', 'Wait 3 days'],
      status: 'Active',
      emailsSent: 1250,
      openRate: 22,
      clickRate: 5
    },
    {
      id: 'rule_002',
      name: 'Warm Lead Follow-up Task',
      trigger: 'Lead becomes "Warm" after 7 days of inactivity',
      actions: ['Create task for sales rep: "Personalized follow-up call"', 'Add tag "Warm-FollowUp"'],
      status: 'Active',
      emailsSent: 0, // Not an email-centric rule
      openRate: 0,
      clickRate: 0
    },
    {
      id: 'rule_003',
      name: 'Inactive Trial Reminder',
      trigger: 'Trial user inactive for 5 days',
      actions: ['Send "Trial Tips & Reminder" email', 'Notify account manager'],
      status: 'Inactive',
      emailsSent: 50,
      openRate: 35,
      clickRate: 10
    },
  ];

  const activeRules = rules.filter(r => r.status === 'Active').length;
  const leadsProcessedToday = 85; // Mocked
  const automatedConversions = 12; // Mocked

  return (
    <div>
      <EnterprisePageHeader title="Re-engagement Automation" subtitle="Set up and manage automated workflows to re-engage leads." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Active Automation Rules" value={activeRules} icon={<Settings2 size={24} />} />
          <QualityMetricCard title="Leads Processed Today (Auto)" value={leadsProcessedToday} icon={<PlayCircle size={24} />} />
          <QualityMetricCard title="Automated Re-engagements" value={automatedConversions} icon={<CheckCheck size={24} />} />
        </div>

        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Automation Rule List</h2>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center text-sm">
              <PlusCircle size={16} className="mr-2" /> Create New Rule
            </button>
          </div>

          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="bg-[#1B1F3B] p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${rule.status === 'Active' ? 'bg-green-500/30 text-green-300' : 'bg-gray-500/30 text-gray-300'}`}>
                      {rule.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button title={rule.status === 'Active' ? 'Deactivate' : 'Activate'} className="text-gray-400 hover:text-white">
                      {rule.status === 'Active' ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} />}
                    </button>
                    <button title="Edit Rule" className="text-gray-400 hover:text-blue-400"><Edit size={18} /></button>
                    <button title="Delete Rule" className="text-gray-400 hover:text-red-400"><Trash2 size={18} /></button>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-300"><strong className="text-gray-100">Trigger:</strong> {rule.trigger}</p>
                  <div className="mt-1">
                    <strong className="text-sm text-gray-100">Actions:</strong>
                    <ul className="list-disc list-inside ml-1 text-sm text-gray-300">
                      {rule.actions.map((action, index) => <li key={index}>{action}</li>)}
                    </ul>
                  </div>
                </div>
                {(rule.emailsSent !== undefined && rule.emailsSent > 0) && (
                  <div className="mt-3 pt-3 border-t border-[#3C4568] flex space-x-4 text-xs text-gray-400">
                    <span><BarChart3 size={14} className="inline mr-1" /> Performance:</span>
                    <span>Emails Sent: {rule.emailsSent.toLocaleString()}</span>
                    <span>Open Rate: {rule.openRate}%</span>
                    <span>Click Rate: {rule.clickRate}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {rules.length === 0 && <p className="text-center py-4">No automation rules configured.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReEngagementAutomationPage;
