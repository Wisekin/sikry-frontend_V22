import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Link as LinkIcon, Users, CheckSquare, Clock, Gift, Copy, Share2 } from 'lucide-react'; // Icons for referrals dashboard

interface UserReferralStats {
  invitesSentOrClicks: number;
  successfulReferrals: number;
  pendingReferrals: number;
  earnedRewardsUsd: number;
}

interface ReferredFriend {
  id: string;
  nameOrEmail: string; // Masked email or name
  dateReferred: string;
  status: 'Joined' | 'Pending Action' | 'Reward Earned' | 'Inactive';
  rewardAmountUsd?: number;
}

const ReferralDashboardPage = () => {
  // Mock data - will be replaced by API calls for the logged-in user
  const userReferralLink = "https://yourapp.com/signup?ref=USER123XYZ";
  const userStats: UserReferralStats = {
    invitesSentOrClicks: 75,
    successfulReferrals: 8,
    pendingReferrals: 3,
    earnedRewardsUsd: 400,
  };
  const referredFriends: ReferredFriend[] = [
    { id: 'ref001', nameOrEmail: 'Alice B.', dateReferred: '2023-09-15', status: 'Reward Earned', rewardAmountUsd: 50 },
    { id: 'ref002', nameOrEmail: 'bob****@example.com', dateReferred: '2023-10-02', status: 'Joined', rewardAmountUsd: 0 },
    { id: 'ref003', nameOrEmail: 'Charlie D.', dateReferred: '2023-10-20', status: 'Pending Action', rewardAmountUsd: 0 },
    { id: 'ref004', nameOrEmail: 'diana****@example.com', dateReferred: '2023-08-01', status: 'Inactive', rewardAmountUsd: 0 },
    { id: 'ref005', nameOrEmail: 'Edward F.', dateReferred: '2023-07-10', status: 'Reward Earned', rewardAmountUsd: 50 },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userReferralLink).then(() => {
      alert('Referral link copied to clipboard!'); // Replace with a proper toast notification
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const getStatusColor = (status: ReferredFriend['status']) => {
    if (status === 'Reward Earned') return 'bg-green-500/30 text-green-300';
    if (status === 'Pending Action') return 'bg-yellow-500/30 text-yellow-300';
    if (status === 'Joined') return 'bg-blue-500/30 text-blue-300';
    return 'bg-gray-500/30 text-gray-300'; // Inactive
  };


  return (
    <div>
      <EnterprisePageHeader title="My Referral Dashboard" subtitle="Share your link, track your referrals, and see your rewards." />

      <div className="p-6">
        {/* Referral Link Section */}
        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF] mb-8">
          <h2 className="text-xl font-semibold mb-3">Your Unique Referral Link</h2>
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="text"
              readOnly
              value={userReferralLink}
              className="w-full sm:flex-grow p-3 bg-[#1B1F3B] border border-[#3C4568] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3C4568]"
            />
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto bg-[#3C4568] hover:bg-[#4A5578] text-white py-3 px-5 rounded-lg flex items-center justify-center text-sm"
            >
              <Copy size={18} className="mr-2" /> Copy Link
            </button>
            <button className="w-full sm:w-auto bg-transparent border border-[#3C4568] hover:bg-[#3C4568] text-white py-3 px-5 rounded-lg flex items-center justify-center text-sm">
              <Share2 size={18} className="mr-2" /> Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard title="Invites/Clicks" value={userStats.invitesSentOrClicks.toLocaleString()} icon={<LinkIcon size={24} />} />
          <QualityMetricCard title="Successful Referrals" value={userStats.successfulReferrals.toLocaleString()} icon={<Users size={24} />} />
          <QualityMetricCard title="Pending Referrals" value={userStats.pendingReferrals.toLocaleString()} icon={<Clock size={24} />} />
          <QualityMetricCard title="Total Rewards Earned (USD)" value={`$${userStats.earnedRewardsUsd.toLocaleString()}`} icon={<Gift size={24} />} />
        </div>

        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <h2 className="text-xl font-semibold mb-4">Your Referred Friends</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-[#1B1F3B]">
                <tr>
                  <th className="px-3 py-2 text-left">Name/Email</th>
                  <th className="px-3 py-2 text-left">Date Referred</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-right">Reward Earned</th>
                </tr>
              </thead>
              <tbody>
                {referredFriends.map((friend) => (
                  <tr key={friend.id} className="border-b border-[#3C4568] hover:bg-[#3C4568]/50">
                    <td className="px-3 py-2">{friend.nameOrEmail}</td>
                    <td className="px-3 py-2">{friend.dateReferred}</td>
                    <td className="px-3 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(friend.status)}`}>
                        {friend.status}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {friend.rewardAmountUsd && friend.rewardAmountUsd > 0 ? `$${friend.rewardAmountUsd.toLocaleString()}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {referredFriends.length === 0 && <p className="text-center py-4">You haven't referred anyone yet. Share your link to get started!</p>}
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboardPage;
