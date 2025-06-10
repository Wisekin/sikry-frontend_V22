"use client"; // For potential future state if overview cards become interactive

import React from 'react';
import Link from 'next/link';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Video, FileText, ListChecks, BarChart3, Eye, CheckCircle2, Percent } from 'lucide-react'; // Added Percent

const VSLOverviewPage = () => {
  // Mock data for any overview cards - can be fetched if API provides them
  const overviewStats = {
    totalVSLPages: 12,
    activeVSLs: 8,
    totalViews: 25600,
    overallConversionRate: 7.5, // Percent
  };

  const navLinks = [
    { href: "/vsl/templates", title: "VSL Templates", description: "Browse, manage, and create new VSL templates.", icon: <FileText className="text-blue-600 group-hover:text-blue-700" /> },
    { href: "/vsl/pages", title: "My VSL Pages", description: "View, edit, and manage your created VSL pages.", icon: <Video className="text-emerald-600 group-hover:text-emerald-700" /> },
    { href: "/vsl/tracking", title: "Performance Tracking", description: "Analyze views, engagement, and conversions for your VSLs.", icon: <BarChart3 className="text-purple-600 group-hover:text-purple-700" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="VSL Management" subtitle="Create, manage, and track your Video Sales Letter pages." />
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard title="Total VSL Pages" value={overviewStats.totalVSLPages.toLocaleString()} icon={<Video className="text-indigo-600" />} />
          <QualityMetricCard title="Active VSLs" value={overviewStats.activeVSLs.toLocaleString()} icon={<CheckCircle2 className="text-green-600" />} />
          <QualityMetricCard title="Total Views" value={overviewStats.totalViews.toLocaleString()} icon={<Eye className="text-sky-600" />} />
          <QualityMetricCard title="Overall VSL Conv. Rate" value={`${overviewStats.overallConversionRate.toFixed(1)}%`} icon={<Percent className="text-pink-600" />} />
        </div>

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
export default VSLOverviewPage;
