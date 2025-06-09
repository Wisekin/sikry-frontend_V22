import React from 'react';
import Link from 'next/link';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { BarChart3, TrendingUp, Users, DollarSign, Goal, Activity, LineChart } from 'lucide-react'; // Goal for conversion, Activity for performance

const AnalyticsOverviewPage = () => {
  // Mock data for any overview cards - can be minimal if page is mostly for navigation
  const overviewStats = {
    keyMetric1: "Value 1",
    keyMetric2: 12345,
  };

  const navLinks = [
    { href: "/analytics/performance", title: "Performance Analytics", description: "Dive into traffic, engagement, and user behavior metrics.", icon: <Activity className="text-blue-600 group-hover:text-blue-700" /> },
    { href: "/analytics/conversion", title: "Conversion Analytics", description: "Track funnel performance and identify drop-off points.", icon: <Goal className="text-emerald-600 group-hover:text-emerald-700" /> },
    { href: "/analytics/revenue", title: "Revenue Analytics", description: "Analyze sales trends, LTV, and revenue by source.", icon: <LineChart className="text-purple-600 group-hover:text-purple-700" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Analytics Overview" subtitle="Explore key metrics and insights across your application." />
      <div className="p-6 md:p-10">
        {/* Optional: High-level QualityMetricCards if needed */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <QualityMetricCard title="Overall Key Metric" value={overviewStats.keyMetric1} icon={<BarChart3 className="text-indigo-600" />} />
          <QualityMetricCard title="Total Tracked Events" value={overviewStats.keyMetric2.toLocaleString()} icon={<Users className="text-pink-600" />} />
        </div>
        */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg hover:border-[#3C4568] transition-all duration-300 group">
              <div className="flex items-center mb-3">
                {React.cloneElement(link.icon, { size: 24, className: `${link.icon.props.className} mr-3` })}
                <h3 className="text-xl font-semibold text-[#1B1F3B] group-hover:text-[#2A3050]">{link.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AnalyticsOverviewPage;
