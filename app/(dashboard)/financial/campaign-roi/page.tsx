import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Target, TrendingUp, DollarSign, Percent } from 'lucide-react';

interface CampaignRoiData {
  id: string;
  name: string;
  totalSpend: number;
  totalRevenue: number;
  netProfit: number;
  roiPercentage: number;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'planned';
}

const CampaignRoiPage = () => {
  // Mock data for campaign ROI - will be replaced by API call
  const mockCampaigns: CampaignRoiData[] = [
    { id: 'camp_001', name: 'Q4 Holiday Push 2023', totalSpend: 15000, totalRevenue: 45000, netProfit: 30000, roiPercentage: 200, startDate: '2023-11-01', endDate: '2023-12-31', status: 'completed' },
    { id: 'camp_002', name: 'Spring Product Launch 2023', totalSpend: 25000, totalRevenue: 60000, netProfit: 35000, roiPercentage: 140, startDate: '2023-03-15', endDate: '2023-05-15', status: 'completed' },
    { id: 'camp_003', name: 'Summer SaaS Promo', totalSpend: 10000, totalRevenue: 12000, netProfit: 2000, roiPercentage: 20, startDate: '2023-06-01', endDate: '2023-08-31', status: 'completed' },
    { id: 'camp_004', name: 'New Year Engagement 2024', totalSpend: 12000, totalRevenue: 5000, netProfit: -7000, roiPercentage: -58.33, startDate: '2024-01-01', status: 'active' },
    { id: 'camp_005', name: 'Influencer Outreach Q1 2024', totalSpend: 8000, totalRevenue: 0, netProfit: -8000, roiPercentage: -100, startDate: '2024-02-01', status: 'planned' },
  ];

  const overallRoi = mockCampaigns.length > 0
    ? (mockCampaigns.reduce((sum, camp) => sum + camp.netProfit, 0) / mockCampaigns.reduce((sum, camp) => sum + camp.totalSpend, 0)) * 100
    : 0;

  const topPerformingCampaign = mockCampaigns.length > 0
    ? mockCampaigns.reduce((prev, current) => (prev.roiPercentage > current.roiPercentage) ? prev : current)
    : null;

  return (
    <div>
      <EnterprisePageHeader title="Campaign ROI Analysis" subtitle="Evaluate the performance of your marketing campaigns." />

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard
            title="Overall Campaign ROI"
            value={`${overallRoi.toFixed(2)}%`}
            icon={<Percent size={24} />}
          />
          {topPerformingCampaign && (
            <QualityMetricCard
              title="Top Campaign"
              value={topPerformingCampaign.name}
              unit={`ROI: ${topPerformingCampaign.roiPercentage.toFixed(2)}%`}
              icon={<TrendingUp size={24} />}
            />
          )}
          <QualityMetricCard
            title="Total Campaigns Tracked"
            value={mockCampaigns.length}
            icon={<Target size={24} />}
          />
        </div>

        {/* Placeholder for Filters */}
        <div className="mb-6 bg-[#2A3050] p-4 rounded-lg shadow-md text-[#FFFFFF]">
          <h3 className="text-lg font-semibold">Filters</h3>
          <div className="flex space-x-4 mt-2">
            <input type="date" className="p-2 rounded bg-[#1B1F3B] text-white" placeholder="Start Date" />
            <input type="date" className="p-2 rounded bg-[#1B1F3B] text-white" placeholder="End Date" />
            <select className="p-2 rounded bg-[#1B1F3B] text-white">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>
          </div>
        </div>

        <div className="bg-[#2A3050] p-6 rounded-lg shadow-md text-[#FFFFFF]">
          <h2 className="text-xl font-semibold mb-4">Campaign Performance Details</h2>
          {mockCampaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#1B1F3B]">
                  <tr>
                    <th className="px-4 py-2 text-left">Campaign Name</th>
                    <th className="px-4 py-2 text-right">Spend</th>
                    <th className="px-4 py-2 text-right">Revenue</th>
                    <th className="px-4 py-2 text-right">Net Profit</th>
                    <th className="px-4 py-2 text-right">ROI (%)</th>
                    <th className="px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b border-[#3C4568] hover:bg-[#3C4568]/50">
                      <td className="px-4 py-2">{campaign.name}</td>
                      <td className="px-4 py-2 text-right">${campaign.totalSpend.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right">${campaign.totalRevenue.toLocaleString()}</td>
                      <td className="px-4 py-2 text-right" style={{ color: campaign.netProfit < 0 ? '#EF4444' : '#22C55E' }}>
                        ${campaign.netProfit.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 text-right" style={{ color: campaign.roiPercentage < 0 ? '#EF4444' : '#22C55E' }}>
                        {campaign.roiPercentage.toFixed(2)}%
                      </td>
                      <td className="px-4 py-2 capitalize">{campaign.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No campaign data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignRoiPage;
