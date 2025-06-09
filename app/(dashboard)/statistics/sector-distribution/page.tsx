"use client";

import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { PieChart, Briefcase, TrendingUp, Filter as FilterIcon, List } from 'lucide-react'; // Using Briefcase for sectors

interface SectorDataPoint {
  id: string;
  name: string; // Industry Sector
  value: number; // e.g., number of records, companies
  percentage?: number; // Optional, for pie chart
  color?: string; // Optional, for chart segments
}

const SectorDistributionPage = () => {
  // Mock data
  const stats = {
    totalSectors: 12,
    topSectorName: "Technology",
    topSectorValue: 9800, // records or companies
    fastestGrowingSector: "Healthcare Tech",
  };

  const mockSectorData: SectorDataPoint[] = [
    { id: 'tech', name: 'Technology', value: 9800, percentage: 39.2, color: 'hsl(200 80% 50%)' },   // Blue
    { id: 'finance', name: 'Finance & Insurance', value: 5500, percentage: 22.0, color: 'hsl(142.1 76.2% 42.2%)' }, // Green
    { id: 'healthcare', name: 'Healthcare', value: 3200, percentage: 12.8, color: 'hsl(38.3 95.8% 53.1%)' },  // Amber
    { id: 'retail', name: 'Retail & E-commerce', value: 2500, percentage: 10.0, color: 'hsl(260 70% 60%)' }, // Purple
    { id: 'manufacturing', name: 'Manufacturing', value: 1800, percentage: 7.2, color: 'hsl(0 70% 60%)' }, // Red
    { id: 'other', name: 'Other Sectors', value: 2200, percentage: 8.8, color: 'hsl(210 10% 70%)' }, // Gray
  ];
  // const totalValue = mockSectorData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Sector Data Distribution" subtitle="Analyze how your data is distributed across industry sectors." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Total Sectors Tracked" value={stats.totalSectors.toLocaleString()} icon={<Briefcase className="text-blue-600" />} />
          <QualityMetricCard title="Top Sector" value={`${stats.topSectorName} (${stats.topSectorValue.toLocaleString()})`} icon={<PieChart className="text-emerald-600" />} />
          <QualityMetricCard title="Fastest Growing Sector" value={stats.fastestGrowingSector} icon={<TrendingUp className="text-purple-600" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Placeholder Section (e.g., Pie or Bar Chart) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-[#1B1F3B]">Distribution by Sector</h2>
                <div className="flex items-center space-x-2">
                    <select className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <option value="all_data">All Data Types</option>
                        <option value="companies">Companies</option>
                        <option value="contacts">Contacts</option>
                    </select>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg flex items-center text-sm">
                        <FilterIcon size={16} className="mr-1.5" /> Apply
                    </button>
                </div>
            </div>
            <div className="h-96 bg-slate-100 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
              {/* Mock Pie Chart Visualization */}
              <div className="flex flex-wrap gap-4 items-center justify-center p-4">
                {mockSectorData.map(sector => (
                    <div key={sector.id} className="flex flex-col items-center" title={`${sector.name}: ${sector.percentage}%`}>
                        <div style={{width: '80px', height: '80px', borderRadius: '50%', backgroundColor: sector.color || 'gray', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:'bold', fontSize:'1.2em'}}>
                           {/* {`${sector.percentage}%`} */}
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-center">{sector.name} ({sector.percentage}%)</p>
                    </div>
                ))}
              </div>
              {/* <p className="text-gray-400 text-lg">Chart Visualization Placeholder (e.g., Pie Chart)</p> */}
            </div>
          </div>

          {/* Data Table/List Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4 flex items-center"><List className="mr-2 text-gray-500"/>Sector Breakdown</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {mockSectorData.sort((a,b) => b.value - a.value).map(sector => (
                <div key={sector.id} className="p-3 rounded-md bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{sector.name}</span>
                    <span className="text-sm font-semibold text-[#1B1F3B]">{sector.value.toLocaleString()}</span>
                  </div>
                  {sector.percentage !== undefined && (
                    <div className="mt-1">
                      <div className="flex-grow bg-gray-200 rounded-full h-2 w-full">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${sector.percentage}%`, backgroundColor: sector.color || 'gray' }}
                          ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDistributionPage;
