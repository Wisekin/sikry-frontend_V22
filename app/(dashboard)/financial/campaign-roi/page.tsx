import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Target, TrendingUp, Percent, DollarSign } from 'lucide-react';

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
  const mockCampaigns: CampaignRoiData[] = [
    { id: 'camp_001', name: 'Q4 Holiday Push 2023', totalSpend: 15000, totalRevenue: 45000, netProfit: 30000, roiPercentage: 200, startDate: '2023-11-01', endDate: '2023-12-31', status: 'completed' },
    { id: 'camp_002', name: 'Spring Product Launch 2023', totalSpend: 25000, totalRevenue: 60000, netProfit: 35000, roiPercentage: 140, startDate: '2023-03-15', endDate: '2023-05-15', status: 'completed' },
    { id: 'camp_003', name: 'Summer SaaS Promo', totalSpend: 10000, totalRevenue: 12000, netProfit: 2000, roiPercentage: 20, startDate: '2023-06-01', endDate: '2023-08-31', status: 'completed' },
    { id: 'camp_004', name: 'New Year Engagement 2024', totalSpend: 12000, totalRevenue: 5000, netProfit: -7000, roiPercentage: -58.33, startDate: '2024-01-01', status: 'active' },
    { id: 'camp_005', name: 'Influencer Outreach Q1 2024', totalSpend: 8000, totalRevenue: 0, netProfit: -8000, roiPercentage: -100, startDate: '2024-02-01', status: 'planned' },
  ];

  const totalSpendAllCampaigns = mockCampaigns.reduce((sum, camp) => sum + camp.totalSpend, 0);
  const totalRevenueAllCampaigns = mockCampaigns.reduce((sum, camp) => sum + camp.totalRevenue, 0);
  const overallRoi = totalSpendAllCampaigns > 0
    ? ((totalRevenueAllCampaigns - totalSpendAllCampaigns) / totalSpendAllCampaigns) * 100
    : 0;

  const topPerformingCampaign = mockCampaigns.length > 0
    ? mockCampaigns.reduce((prev, current) => (prev.roiPercentage > current.roiPercentage) ? prev : current)
    : null;

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <EnterprisePageHeader title="Campaign ROI Analysis" subtitle="Evaluate the performance of your marketing campaigns." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard
            title="Overall Campaign ROI"
            value={`${overallRoi.toFixed(2)}%`}
            icon={<Percent size={24} />}
            change="+2.5% vs last period" // Mock change
            changeColor={overallRoi >= 0 ? "text-green-600" : "text-red-600"}
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

        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-[#1B1F3B] mb-3">Filters</h3>
          <div className="flex flex-wrap items-center gap-4">
            <input type="date" className="p-2 rounded border border-gray-300 bg-gray-100 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Start Date" />
            <input type="date" className="p-2 rounded border border-gray-300 bg-gray-100 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="End Date" />
            <select className="p-2 rounded border border-gray-300 bg-gray-100 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planned">Planned</option>
            </select>
             <button className="p-2 rounded bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors">Apply Filters</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1B1F3B]">Campaign Performance Details</h2>
          {mockCampaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Campaign Name</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Spend</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Revenue</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Net Profit</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">ROI (%)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{campaign.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">${campaign.totalSpend.toLocaleString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">${campaign.totalRevenue.toLocaleString()}</td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${campaign.netProfit < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        ${campaign.netProfit.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold text-right ${campaign.roiPercentage < 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {campaign.roiPercentage.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                          campaign.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800' // planned
                        }`}>
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No campaign data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignRoiPage;
