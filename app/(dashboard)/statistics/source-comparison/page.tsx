"use client";

import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Database, CheckShield, BarChartBig, Filter as FilterIcon, ListChecks, TrendingUp } from 'lucide-react'; // CheckShield for quality, Added TrendingUp

interface DataSourceComparisonMetric {
  id: string;
  name: string;
  dataVolume: number;
  qualityScore?: number; // e.g., 0-100
  coveragePercent?: number; // e.g., 0-100
  updateFrequency?: string; // e.g., "Daily", "Weekly"
  color?: string; // For charts
}

const SourceComparisonPage = () => {
  // Mock data
  const stats = {
    totalSources: 4,
    highestVolumeSource: "Internal DB",
    bestQualitySource: "Premium API XYZ", // Based on mock quality score
  };

  const mockSourceData: DataSourceComparisonMetric[] = [
    { id: 'internal_db', name: 'Internal Database', dataVolume: 1250000, qualityScore: 92, coveragePercent: 85, updateFrequency: 'Real-time', color: 'hsl(200 80% 50%)' },
    { id: 'public_api_a', name: 'Public API Alpha', dataVolume: 750000, qualityScore: 78, coveragePercent: 60, updateFrequency: 'Daily', color: 'hsl(142.1 76.2% 42.2%)' },
    { id: 'scraped_data_x', name: 'Scraped Data (Source X)', dataVolume: 300000, qualityScore: 65, coveragePercent: 40, updateFrequency: 'Weekly', color: 'hsl(38.3 95.8% 53.1%)' },
    { id: 'partner_feed_b', name: 'Partner Feed Beta', dataVolume: 950000, qualityScore: 88, coveragePercent: 75, updateFrequency: 'Daily', color: 'hsl(260 70% 60%)' },
  ];
  const maxVolume = Math.max(...mockSourceData.map(s => s.dataVolume), 0) || 1;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Data Source Comparison" subtitle="Evaluate and compare the performance of your different data sources." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Total Data Sources" value={stats.totalSources.toLocaleString()} icon={<Database className="text-blue-600" />} />
          <QualityMetricCard title="Highest Volume Source" value={stats.highestVolumeSource} icon={<BarChartBig className="text-emerald-600" />} />
          <QualityMetricCard title="Best Quality Source" value={stats.bestQualitySource} icon={<CheckShield className="text-purple-600" />} />
        </div>

        {/* Filters Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-start items-center gap-3">
                <h3 className="text-md font-semibold text-[#1B1F3B] mr-4">Compare by:</h3>
                <select className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all_metrics">All Metrics</option>
                    <option value="volume">Data Volume</option>
                    <option value="quality">Quality Score</option>
                    <option value="coverage">Coverage Percentage</option>
                </select>
                <select className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all_types">All Data Types</option>
                    <option value="companies">Companies</option>
                    <option value="contacts">Contacts</option>
                </select>
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg flex items-center text-sm ml-auto">
                    <FilterIcon size={16} className="mr-1.5" /> Apply
                </button>
            </div>
        </div>


        {/* Chart Placeholder Section (e.g., Grouped Bar Chart) */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4">Source Performance Metrics</h2>
            <div className="h-96 bg-slate-100 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-400 text-lg">Chart Visualization Placeholder (e.g., Grouped Bar Chart)</p>
                {/* Simple textual representation for now */}
                {/* <div className="grid grid-cols-3 gap-4 w-full p-4">
                    {mockSourceData.map(source => (
                        <div key={source.id}>
                            <p className="font-semibold" style={{color: source.color}}>{source.name}</p>
                            <p className="text-xs">Volume: {source.dataVolume.toLocaleString()}</p>
                            <p className="text-xs">Quality: {source.qualityScore}%</p>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>

        {/* Data Table Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4 flex items-center"><ListChecks className="mr-2 text-gray-500"/>Detailed Source Metrics</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Source Name</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Data Volume</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Quality Score (%)</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Coverage (%)</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Update Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockSourceData.map(source => (
                  <tr key={source.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800" style={{color: source.color}}>{source.name}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{source.dataVolume.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{source.qualityScore !== undefined ? `${source.qualityScore}%` : 'N/A'}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{source.coveragePercent !== undefined ? `${source.coveragePercent}%` : 'N/A'}</td>
                    <td className="px-4 py-3 text-gray-600">{source.updateFrequency || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceComparisonPage;
