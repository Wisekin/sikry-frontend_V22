import React from 'react';
import Link from 'next/link';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Users, Zap, TrendingUp, Filter, Settings, ListChecks } from 'lucide-react'; // Added more icons

const ReEngagementPage = () => {
  // Mock data for overview - will be replaced by API calls or aggregated data
  const overviewStats = {
    coldLeadsIdentified: 1250,
    campaignsActive: 12,
    successfulReEngagements: 185,
    engagementRateLift: '15%', // Example lift percentage
  };

  // Mock data for a simple funnel
  const reEngagementFunnel = [
    { stage: 'Identified', count: 1250, color: '#3C4568' },
    { stage: 'Contacted', count: 980, color: '#4A5578' },
    { stage: 'Responded', count: 350, color: '#5A6588' },
    { stage: 'Re-engaged', count: 185, color: '#6A7598' },
  ];

  return (
    <div>
      <EnterprisePageHeader title="Lead Re-engagement" subtitle="Revitalize dormant leads and boost conversions." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard
            title="Cold Leads Identified"
            value={overviewStats.coldLeadsIdentified.toLocaleString()}
            icon={<Users size={24} />}
          />
          <QualityMetricCard
            title="Active Campaigns"
            value={overviewStats.campaignsActive}
            icon={<Zap size={24} />}
          />
          <QualityMetricCard
            title="Successful Re-engagements"
            value={overviewStats.successfulReEngagements.toLocaleString()}
            icon={<TrendingUp size={24} />}
          />
          <QualityMetricCard
            title="Engagement Rate Lift"
            value={overviewStats.engagementRateLift}
            icon={<TrendingUp size={24} />} // Using TrendingUp again, could be a specific lift icon
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Navigation to Subpages */}
          <Link href="/reengagement/classification" legacyBehavior>
            <a className="block bg-[#2A3050] p-6 rounded-lg shadow-md hover:bg-[#3C4568] transition-colors text-[#FFFFFF]">
              <div className="flex items-center mb-2">
                <Filter size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">Lead Classification</h3>
              </div>
              <p className="text-sm text-gray-300">Define and manage criteria for classifying leads (hot, warm, cold) to target re-engagement efforts effectively.</p>
            </a>
          </Link>

          <Link href="/reengagement/tasks" legacyBehavior>
            <a className="block bg-[#2A3050] p-6 rounded-lg shadow-md hover:bg-[#3C4568] transition-colors text-[#FFFFFF]">
              <div className="flex items-center mb-2">
                <ListChecks size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">Re-engagement Tasks</h3>
              </div>
              <p className="text-sm text-gray-300">View, assign, and track manual or automated tasks related to your re-engagement campaigns and lead follow-ups.</p>
            </a>
          </Link>

          <Link href="/reengagement/automation" legacyBehavior>
            <a className="block bg-[#2A3050] p-6 rounded-lg shadow-md hover:bg-[#3C4568] transition-colors text-[#FFFFFF]">
              <div className="flex items-center mb-2">
                <Settings size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">Automation Rules</h3>
              </div>
              <p className="text-sm text-gray-300">Configure automated workflows and triggers for re-engaging leads based on their classification and behavior.</p>
            </a>
          </Link>
        </div>

        {/* Placeholder for Re-engagement Funnel Chart */}
        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <h2 className="text-xl font-semibold mb-4">Re-engagement Funnel</h2>
          <div className="h-64 bg-[#1B1F3B] p-4 rounded flex items-end justify-around">
            {reEngagementFunnel.map(item => (
              <div key={item.stage} className="text-center mx-2 flex flex-col items-center justify-end">
                <p className="text-sm font-medium">{item.count.toLocaleString()}</p>
                <div
                  className="w-16 md:w-24 mt-1"
                  style={{ height: `${(item.count / overviewStats.coldLeadsIdentified) * 100 * 0.8}%`, backgroundColor: item.color, minHeight: '10px' }}
                  title={`${item.stage}: ${item.count.toLocaleString()}`}
                ></div>
                <p className="text-xs mt-1">{item.stage}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReEngagementPage;
