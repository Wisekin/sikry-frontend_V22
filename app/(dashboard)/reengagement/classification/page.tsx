import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Thermometer, Meh, Frown, HelpCircle, Edit3, ListFilter } from 'lucide-react'; // Icons for classifications

interface LeadClassificationStats {
  hot: number;
  warm: number;
  cold: number;
  unclassified: number;
}

interface ClassificationRule {
  id: string;
  name: string;
  description: string; // User-friendly description of the rule
  classification: 'Hot' | 'Warm' | 'Cold';
  criteriaSummary: string; // e.g., "Last active > 90 days, Low engagement"
}

const LeadClassificationPage = () => {
  // Mock data - will be replaced by API calls
  const classificationStats: LeadClassificationStats = {
    hot: 78,
    warm: 230,
    cold: 1150,
    unclassified: 310,
  };

  const classificationRules: ClassificationRule[] = [
    { id: 'rule_cold_1', name: 'Inactive Users', classification: 'Cold', description: 'Users who have not logged in or opened an email in the last 90 days.', criteriaSummary: 'Last active > 90 days' },
    { id: 'rule_cold_2', name: 'Low Engagement', classification: 'Cold', description: 'Users with an engagement score below 10, indicating minimal interaction.', criteriaSummary: 'Engagement score < 10' },
    { id: 'rule_warm_1', name: 'Recent Interest', classification: 'Warm', description: 'Users who visited key product pages or the pricing page in the last 14 days.', criteriaSummary: 'Visited key pages recently' },
    { id: 'rule_hot_1', name: 'High Intent Signals', classification: 'Hot', description: 'Users who requested a demo, started a trial, or had multiple high-value interactions.', criteriaSummary: 'Demo request or Trial started' },
  ];

  // Mock leads for the table placeholder
  const mockLeads = [
    { id: 'lead_001', name: 'John Doe', email: 'john.doe@example.com', classification: 'Cold', lastActivity: '2023-05-10' },
    { id: 'lead_002', name: 'Jane Smith', email: 'jane.smith@example.com', classification: 'Warm', lastActivity: '2023-10-20' },
    { id: 'lead_003', name: 'Alice Brown', email: 'alice.brown@example.com', classification: 'Hot', lastActivity: '2023-11-01' },
    { id: 'lead_004', name: 'Bob Green', email: 'bob.green@example.com', classification: 'Unclassified', lastActivity: '2023-09-15' },
  ];


  return (
    <div>
      <EnterprisePageHeader title="Lead Classification" subtitle="Define, manage, and monitor lead classifications for targeted re-engagement." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard title="Hot Leads" value={classificationStats.hot.toLocaleString()} icon={<Thermometer size={24} className="text-red-500" />} />
          <QualityMetricCard title="Warm Leads" value={classificationStats.warm.toLocaleString()} icon={<Meh size={24} className="text-yellow-500" />} />
          <QualityMetricCard title="Cold Leads" value={classificationStats.cold.toLocaleString()} icon={<Frown size={24} className="text-blue-500" />} />
          <QualityMetricCard title="Unclassified" value={classificationStats.unclassified.toLocaleString()} icon={<HelpCircle size={24} className="text-gray-500" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Classification Rules Section */}
          <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Classification Rules</h2>
              <button className="bg-[#3C4568] hover:bg-[#4A5578] text-white py-2 px-4 rounded-lg flex items-center text-sm">
                <Edit3 size={16} className="mr-2" /> Add New Rule
              </button>
            </div>
            {classificationRules.length > 0 ? (
              <ul className="space-y-3">
                {classificationRules.map(rule => (
                  <li key={rule.id} className="p-3 bg-[#1B1F3B] rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{rule.name} <span className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                          rule.classification === 'Hot' ? 'bg-red-500/30 text-red-300' :
                          rule.classification === 'Warm' ? 'bg-yellow-500/30 text-yellow-300' :
                          'bg-blue-500/30 text-blue-300'
                        }`}>{rule.classification}</span></h3>
                        <p className="text-xs text-gray-400 mt-1">{rule.criteriaSummary}</p>
                      </div>
                      {/* <p className="text-sm text-gray-300">{rule.description}</p> */}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No classification rules defined.</p>
            )}
          </div>

          {/* Placeholder for Lead List / Management */}
          <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Leads Overview</h2>
                <button className="bg-[#3C4568] hover:bg-[#4A5578] text-white py-2 px-4 rounded-lg flex items-center text-sm">
                    <ListFilter size={16} className="mr-2" /> Filter Leads
                </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">A list of leads with their current classification. Advanced filtering and manual classification options will be available here.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-[#1B1F3B]">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Email</th>
                    <th className="px-3 py-2 text-left">Classification</th>
                    <th className="px-3 py-2 text-left">Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-[#3C4568] hover:bg-[#3C4568]/50">
                      <td className="px-3 py-2">{lead.name}</td>
                      <td className="px-3 py-2">{lead.email}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          lead.classification === 'Hot' ? 'bg-red-500/30 text-red-300' :
                          lead.classification === 'Warm' ? 'bg-yellow-500/30 text-yellow-300' :
                          lead.classification === 'Cold' ? 'bg-blue-500/30 text-blue-300' :
                          'bg-gray-500/30 text-gray-300'
                        }`}>{lead.classification}</span>
                      </td>
                      <td className="px-3 py-2">{lead.lastActivity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadClassificationPage;
