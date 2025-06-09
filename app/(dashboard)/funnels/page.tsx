import React from 'react';
import Link from 'next/link';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Filter as FunnelIcon, Settings2, Users, DollarSign, Percent, TrendingUp, BarChartHorizontal, Zap } from 'lucide-react'; // Using Filter as a generic funnel icon and Zap for automation

const FunnelsPage = () => {
  // Mock data for overview
  const overviewStats = {
    activeFunnels: 5,
    totalLeadsInFunnels: 1250,
    overallConversionRate: 12.5, // Percentage
    revenueFromFunnels: 75000, // USD
  };

  // Mock data for a simple chart
  const topFunnels = [
    { name: 'SaaS Demo Funnel', conversionRate: 25, revenue: 35000, color: 'hsl(142.1 76.2% 42.2%)' }, // Green
    { name: 'Webinar Signup Funnel', conversionRate: 18, revenue: 15000, color: 'hsl(200 80% 50%)' },   // Blue
    { name: 'Ebook Download Funnel', conversionRate: 10, revenue: 5000, color: 'hsl(38.3 95.8% 53.1%)' },  // Amber
    { name: 'Consultation Booking Funnel', conversionRate: 8, revenue: 20000, color: 'hsl(260 70% 60%)' }, // Purple
  ];
  const maxConversionRate = Math.max(...topFunnels.map(f => f.conversionRate), 0) || 1;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Funnels Overview" subtitle="Design, monitor, and optimize your sales and marketing funnels." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard
            title="Active Funnels"
            value={overviewStats.activeFunnels.toLocaleString()}
            icon={<FunnelIcon className="text-blue-600" />}
          />
          <QualityMetricCard
            title="Total Leads in Funnels"
            value={overviewStats.totalLeadsInFunnels.toLocaleString()}
            icon={<Users className="text-emerald-600" />}
            change="+50 this week"
            changeColor="text-green-600"
          />
          <QualityMetricCard
            title="Overall Conversion Rate"
            value={`${overviewStats.overallConversionRate.toFixed(1)}%`}
            icon={<Percent className="text-amber-600" />}
          />
          <QualityMetricCard
            title="Revenue from Funnels (USD)"
            value={overviewStats.revenueFromFunnels.toLocaleString()}
            icon={<DollarSign className="text-purple-600" />}
            change="+$5k last month"
            changeColor="text-green-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Navigation to Subpages */}
          <Link href="/funnels/builder" className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
            <div className="flex items-center mb-2">
              <Settings2 size={20} className="mr-3 text-blue-600 group-hover:text-blue-700" />
              <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">Funnel Builder</h3>
            </div>
            <p className="text-sm text-gray-600">Visually design and configure your multi-step funnels.</p>
          </Link>

          <Link href="/funnels/progress" className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
            <div className="flex items-center mb-2">
              <TrendingUp size={20} className="mr-3 text-emerald-600 group-hover:text-emerald-700" />
              <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">Funnel Progress</h3>
            </div>
            <p className="text-sm text-gray-600">Track lead progression and conversion rates through each funnel stage.</p>
          </Link>

          <Link href="/funnels/automation" className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
            <div className="flex items-center mb-2">
              <Zap size={20} className="mr-3 text-purple-600 group-hover:text-purple-700" /> {/* Zap icon for automation */}
              <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">Funnel Automation</h3>
            </div>
            <p className="text-sm text-gray-600">Set up automated actions and triggers within your funnels.</p>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4 flex items-center">
            <BarChartHorizontal className="mr-2 text-gray-500" /> Top Performing Funnels (by Conversion Rate)
          </h2>
          <div className="space-y-3">
            {topFunnels.map(funnel => (
              <div key={funnel.name} className="p-3 rounded-md bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{funnel.name}</span>
                  <span className="text-sm font-semibold" style={{color: funnel.color}}>{funnel.conversionRate}% Conv.</span>
                </div>
                <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{ width: `${(funnel.conversionRate / maxConversionRate) * 100}%`, backgroundColor: funnel.color }}
                    ></div>
                </div>
                 <p className="text-xs text-gray-500 mt-1">Revenue: ${funnel.revenue.toLocaleString()}</p>
              </div>
            ))}
             {topFunnels.length === 0 && <p className="text-sm text-gray-500">No funnel performance data available yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelsPage;
