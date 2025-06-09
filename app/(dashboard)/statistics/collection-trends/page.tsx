"use client"; // For potential future chart interactivity or filters

import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { LineChart, TrendingUp, CalendarDays, BarChart3, Filter as FilterIcon } from 'lucide-react';

// Mock data structure for chart
interface TrendDataPoint {
  date: string; // Could be day, week, month
  count: number;
}

const CollectionTrendsPage = () => {
  // Mock data
  const stats = {
    newRecordsThisMonth: 1250,
    growthRatePercent: 15, // e.g., vs last month
    peakCollectionValue: 180, // e.g., records on a specific day
    peakCollectionPeriod: "November 10th",
  };

  const mockTrendData: TrendDataPoint[] = [
    { date: '2023-11-01', count: 50 }, { date: '2023-11-02', count: 65 }, { date: '2023-11-03', count: 55 },
    { date: '2023-11-04', count: 70 }, { date: '2023-11-05', count: 80 }, { date: '2023-11-06', count: 95 },
    { date: '2023-11-07', count: 110 }, { date: '2023-11-08', count: 100 }, { date: '2023-11-09', count: 120 },
    { date: '2023-11-10', count: 180 }, { date: '2023-11-11', count: 150 }, { date: '2023-11-12', count: 130 },
  ];
  const maxCount = Math.max(...mockTrendData.map(d => d.count), 100); // For chart scaling

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Data Collection Trends" subtitle="Analyze trends in data acquisition over time." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="New Records This Period" value={stats.newRecordsThisMonth.toLocaleString()} icon={<BarChart3 className="text-blue-600" />} />
          <QualityMetricCard title="Growth Rate" value={`${stats.growthRatePercent}%`} icon={<TrendingUp className="text-emerald-600" />} change="vs last period" changeColor="text-gray-500"/>
          <QualityMetricCard title="Peak Collection" value={`${stats.peakCollectionValue} (on ${stats.peakCollectionPeriod})`} icon={<CalendarDays className="text-purple-600" />} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
            <h2 className="text-xl font-semibold text-[#1B1F3B] flex items-center">
              <LineChart className="mr-2 text-gray-500" /> Collection Volume Over Time
            </h2>
            <div className="flex items-center space-x-3">
              <select className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <input type="date" className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              <span className="text-gray-500 text-sm">to</span>
              <input type="date" className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg flex items-center text-sm">
                <FilterIcon size={16} className="mr-1.5" /> Apply
              </button>
            </div>
          </div>

          {/* Mock Chart Area */}
          <div className="h-96 bg-slate-50 p-4 rounded-md border border-dashed border-gray-200 flex items-end space-x-1 md:space-x-2 overflow-x-auto">
            {mockTrendData.map((data, index) => (
              <div key={index} className="flex-grow flex flex-col items-center justify-end h-full" title={`Date: ${data.date}, Count: ${data.count}`}>
                <div
                  className="w-full md:w-6 bg-blue-500 hover:bg-blue-600 transition-colors"
                  style={{ height: `${(data.count / maxCount) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-500 mt-1 transform rotate-[-45deg] origin-center whitespace-nowrap md:rotate-0">{data.date.substring(5)}</span>
              </div>
            ))}
          </div>
          {mockTrendData.length === 0 && <p className="text-center py-10 text-gray-500">No trend data available for the selected period.</p>}
        </div>
      </div>
    </div>
  );
};

export default CollectionTrendsPage;
