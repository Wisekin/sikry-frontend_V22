import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Users, UserPlus, Clock, CheckCircle, Gift, Filter as FilterIcon, Edit2 } from 'lucide-react'; // Icons for tracking

interface ReferralTrackRecord {
  id: string;
  dateInitiated: string;
  referrerName: string;
  refereeEmail: string;
  refereeName?: string;
  status: 'Invited' | 'Signed Up' | 'Pending Criteria' | 'Converted' | 'Reward Paid' | 'Expired' | 'Failed';
  conversionDate?: string;
  rewardAmount?: number;
}

const ReferralTrackingPage = () => {
  // Mock data for referral tracking - will be replaced by API calls
  const allReferrals: ReferralTrackRecord[] = [
    { id: 'trk001', dateInitiated: '2023-10-01', referrerName: 'Alice Wonderland', refereeEmail: 'friend1@example.com', refereeName: 'Friend One', status: 'Reward Paid', conversionDate: '2023-10-05', rewardAmount: 50 },
    { id: 'trk002', dateInitiated: '2023-10-05', referrerName: 'Bob The Builder', refereeEmail: 'friend2@example.com', status: 'Signed Up' },
    { id: 'trk003', dateInitiated: '2023-10-10', referrerName: 'Charlie Brown', refereeEmail: 'friend3@example.com', refereeName: 'Friend Three', status: 'Pending Criteria' },
    { id: 'trk004', dateInitiated: '2023-10-15', referrerName: 'Diana Prince', refereeEmail: 'friend4@example.com', status: 'Invited' },
    { id: 'trk005', dateInitiated: '2023-09-20', referrerName: 'Edward Scissorhands', refereeEmail: 'friend5@example.com', status: 'Failed', conversionDate: '2023-09-25' },
    { id: 'trk006', dateInitiated: '2023-11-01', referrerName: 'Alice Wonderland', refereeEmail: 'friend6@example.com', status: 'Converted', conversionDate: '2023-11-05', rewardAmount: 50 },
  ];

  const stats = {
    totalInitiated: allReferrals.length,
    pendingAcceptance: allReferrals.filter(r => r.status === 'Invited' || r.status === 'Signed Up' || r.status === 'Pending Criteria').length,
    successfullyConverted: allReferrals.filter(r => r.status === 'Converted' || r.status === 'Reward Paid').length,
    totalRewardsDisbursed: allReferrals.filter(r => r.status === 'Reward Paid').reduce((sum, r) => sum + (r.rewardAmount || 0), 0),
  };

  const getStatusColor = (status: ReferralTrackRecord['status']) => {
    if (status === 'Reward Paid' || status === 'Converted') return 'bg-green-500/30 text-green-300';
    if (status === 'Pending Criteria' || status === 'Signed Up') return 'bg-yellow-500/30 text-yellow-300';
    if (status === 'Invited') return 'bg-blue-500/30 text-blue-300';
    return 'bg-red-500/30 text-red-300'; // Expired or Failed
  };

  return (
    <div>
      <EnterprisePageHeader title="Referral Tracking" subtitle="Monitor all referral activities and their statuses." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard title="Total Referrals Initiated" value={stats.totalInitiated.toLocaleString()} icon={<Users size={24} />} />
          <QualityMetricCard title="Pending Full Conversion" value={stats.pendingAcceptance.toLocaleString()} icon={<Clock size={24} />} />
          <QualityMetricCard title="Successfully Converted" value={stats.successfullyConverted.toLocaleString()} icon={<UserPlus size={24} />} />
          <QualityMetricCard title="Total Rewards Disbursed (USD)" value={`$${stats.totalRewardsDisbursed.toLocaleString()}`} icon={<Gift size={24} />} />
        </div>

        {/* Filters Placeholder */}
        <div className="mb-6 bg-[#2A3050] p-4 rounded-lg shadow-md text-[#FFFFFF]">
          <h3 className="text-lg font-semibold mb-2">Filter Referrals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input type="text" placeholder="Referrer Name" className="p-2 rounded bg-[#1B1F3B] text-white placeholder-gray-400" />
            <input type="text" placeholder="Referee Email" className="p-2 rounded bg-[#1B1F3B] text-white placeholder-gray-400" />
            <select className="p-2 rounded bg-[#1B1F3B] text-white">
              <option value="">All Statuses</option>
              <option value="Invited">Invited</option>
              <option value="Signed Up">Signed Up</option>
              <option value="Pending Criteria">Pending Criteria</option>
              <option value="Converted">Converted</option>
              <option value="Reward Paid">Reward Paid</option>
              <option value="Expired">Expired</option>
              <option value="Failed">Failed</option>
            </select>
            <input type="date" className="p-2 rounded bg-[#1B1F3B] text-white" />
          </div>
        </div>

        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <h2 className="text-xl font-semibold mb-4">All Referral Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1B1F3B]">
                <tr>
                  <th className="px-3 py-2 text-left">Date Initiated</th>
                  <th className="px-3 py-2 text-left">Referrer</th>
                  <th className="px-3 py-2 text-left">Referee Email</th>
                  <th className="px-3 py-2 text-left">Referee Name</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Reward</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-[#3C4568] hover:bg-[#3C4568]/50">
                    <td className="px-3 py-2">{referral.dateInitiated}</td>
                    <td className="px-3 py-2">{referral.referrerName}</td>
                    <td className="px-3 py-2">{referral.refereeEmail}</td>
                    <td className="px-3 py-2">{referral.refereeName || '-'}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {referral.rewardAmount ? `$${referral.rewardAmount.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-3 py-2">
                      <button title="Edit Status" className="text-blue-400 hover:text-blue-300"><Edit2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {allReferrals.length === 0 && <p className="text-center py-4">No referral records found.</p>}
        </div>
      </div>
    </div>
  );
};

export default ReferralTrackingPage;
