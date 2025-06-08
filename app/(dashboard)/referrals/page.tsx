import React from 'react';
import Link from 'next/link';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Users, UserPlus, Percent, Gift, BarChartHorizontal, LayoutDashboard, Eye, Award } from 'lucide-react'; // Added more icons

const ReferralsPage = () => {
  // Mock data for overview - will be replaced by API calls or aggregated data
  const overviewStats = {
    totalReferrers: 150,
    successfulReferrals: 320,
    conversionRate: '25%', // (Successful Referrals / Total Invites Sent or Clicks)
    totalRewardsPaid: 4500, // Assuming a currency like USD
  };

  // Mock data for a simple chart
  const referralsOverTime = [
    { period: 'Jan', count: 30, color: '#3C4568' },
    { period: 'Feb', count: 45, color: '#4A5578' },
    { period: 'Mar', count: 60, color: '#5A6588' },
    { period: 'Apr', count: 55, color: '#6A7598' },
    { period: 'May', count: 70, color: '#3C4568' }, // Repeating colors for example
  ];
  const maxReferrals = Math.max(...referralsOverTime.map(r => r.count), 0) || 1;


  return (
    <div>
      <EnterprisePageHeader title="Referral Program Overview" subtitle="Monitor and manage your company's referral program." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard
            title="Total Referrers"
            value={overviewStats.totalReferrers.toLocaleString()}
            icon={<Users size={24} />}
          />
          <QualityMetricCard
            title="Successful Referrals"
            value={overviewStats.successfulReferrals.toLocaleString()}
            icon={<UserPlus size={24} />}
          />
          <QualityMetricCard
            title="Conversion Rate"
            value={overviewStats.conversionRate}
            icon={<Percent size={24} />}
          />
          <QualityMetricCard
            title="Total Rewards Paid (USD)"
            value={overviewStats.totalRewardsPaid.toLocaleString()}
            icon={<Gift size={24} />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Navigation to Subpages */}
          <Link href="/referrals/dashboard" legacyBehavior>
            <a className="block bg-[#2A3050] p-6 rounded-lg shadow-md hover:bg-[#3C4568] transition-colors text-[#FFFFFF]">
              <div className="flex items-center mb-2">
                <LayoutDashboard size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">My Referral Dashboard</h3>
              </div>
              <p className="text-sm text-gray-300">View your personal referral link, track your invites, and see your earned rewards.</p>
            </a>
          </Link>

          <Link href="/referrals/tracking" legacyBehavior>
            <a className="block bg-[#2A3050] p-6 rounded-lg shadow-md hover:bg-[#3C4568] transition-colors text-[#FFFFFF]">
              <div className="flex items-center mb-2">
                <Eye size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">Referral Tracking</h3>
              </div>
              <p className="text-sm text-gray-300">Monitor the status of all referrals, see who signed up, and their progress towards earning rewards.</p>
            </a>
          </Link>

          <Link href="/referrals/rewards" legacyBehavior>
            <a className="block bg-[#2A3050] p-6 rounded-lg shadow-md hover:bg-[#3C4568] transition-colors text-[#FFFFFF]">
              <div className="flex items-center mb-2">
                <Award size={20} className="mr-3" />
                <h3 className="text-xl font-semibold">View Rewards Program</h3>
              </div>
              <p className="text-sm text-gray-300">Understand the referral reward structure, eligibility criteria, and how to claim rewards.</p>
            </a>
          </Link>
        </div>

        {/* Placeholder for Referrals Over Time Chart */}
        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <h2 className="text-xl font-semibold mb-4">Referrals Over Time</h2>
          <div className="h-64 bg-[#1B1F3B] p-4 rounded flex flex-col space-y-2">
            {referralsOverTime.map(item => (
              <div key={item.period} className="flex items-center">
                <span className="w-12 text-xs text-gray-300">{item.period}</span>
                <div
                  className="h-6 rounded-r"
                  style={{ width: `${(item.count / maxReferrals) * 80}%`, backgroundColor: item.color, minWidth: '2px' }}
                  title={`Referrals: ${item.count.toLocaleString()}`}
                ></div>
                <span className="ml-2 text-xs">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReferralsPage;
