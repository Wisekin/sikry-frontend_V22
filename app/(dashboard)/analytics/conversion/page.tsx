"use client";

import React, { useEffect, useState } from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Percent, CheckCircle2, Filter as FunnelIcon, Users, DollarSign, AlertCircle, ExternalLink, BarChart3, LineChart, Filter as FilterIcon, TrendingDown } from 'lucide-react'; // Added TrendingDown for drop-off

interface ConversionSummaryMetrics {
  overallConversionRatePercent: number;
  totalConversions: number;
  topConvertingFunnelName?: string; // Name of the best funnel
  avgCostPerConversion?: number; // Optional
}

interface FunnelStage {
  id: string;
  name: string;
  visitors: number;
  conversionRateFromPreviousPercent?: number; // % of visitors from previous stage who converted to this one
  dropOffRatePercent?: number; // % of visitors who dropped off at this stage relative to those who entered it
}

interface ConversionBySource {
  source: string;
  conversions: number;
  conversionRatePercent?: number; // Optional: source-specific conversion rate
}

interface ConversionData {
    summaryMetrics: ConversionSummaryMetrics;
    funnelStages: FunnelStage[]; // For a selected or default funnel
    conversionBySource: ConversionBySource[];
}

const ConversionAnalyticsPage = () => {
  const [data, setData] = useState<ConversionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState('last30days');
  const [selectedFunnel, setSelectedFunnel] = useState('all'); // Example filter

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/analytics/conversion?period=${period}&funnelId=${selectedFunnel}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch conversion data');
        return res.json();
      })
      .then(responseData => {
        if (responseData.error) {
            throw new Error(responseData.error.message || 'Failed to fetch conversion data');
        }
        setData(responseData.data);
      })
      .catch(err => { setError(err.message); setData(null); })
      .finally(() => setIsLoading(false));
  }, [period, selectedFunnel]);

  // Fallback for loading state if Next.js Suspense with loading.tsx isn't triggered first
  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50/50">
          <EnterprisePageHeader title="Conversion Analytics" subtitle="Analyzing conversion funnels..." />
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg bg-white" />)}
            </div>
            <Skeleton className="h-72 rounded-lg bg-white mb-6" />
            <Skeleton className="h-64 rounded-lg bg-white" />
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="Conversion Analytics" subtitle="Error" />
        <div className="p-6 md:p-10 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Could not load conversion data</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => { setIsLoading(true); setError(null); fetch(`/api/analytics/conversion?period=${period}&funnelId=${selectedFunnel}`).then(res => res.json()).then(responseData => { if(responseData.error) throw new Error(responseData.error.message); setData(responseData.data);}).catch(err => setError(err.message)).finally(() => setIsLoading(false)); }}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm"
                >
                    Try Again
                </button>
            </div>
        </div>
      </div>
    );
  }

  if (!data) return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Conversion Analytics" subtitle="No data available" />
      <div className="p-6 md:p-10 text-center text-gray-500">No conversion data available for the selected filters.</div>
    </div>
  );


  const { summaryMetrics, funnelStages, conversionBySource } = data;
  const maxStageVisitors = Math.max(...funnelStages.map(s => s.visitors), 0) || 1;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Conversion Analytics" subtitle="Understand how users convert through key funnels." />
      <div className="p-6 md:p-10">
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-start items-center gap-3">
                <label htmlFor="periodSelectConv" className="text-sm font-medium text-gray-700">Time Period:</label>
                <select id="periodSelectConv" value={period} onChange={(e) => setPeriod(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="last7days">Last 7 Days</option>
                    <option value="last30days">Last 30 Days</option>
                    <option value="last3months">Last 3 Months</option>
                </select>
                <label htmlFor="funnelSelectConv" className="text-sm font-medium text-gray-700 md:ml-4">Funnel:</label>
                <select id="funnelSelectConv" value={selectedFunnel} onChange={(e) => setSelectedFunnel(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all">All Funnels (Overall)</option>
                    <option value="onboarding_funnel">Onboarding Funnel</option>
                    <option value="sales_funnel_q4">Sales Funnel Q4</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <QualityMetricCard title="Overall Conv. Rate" value={`${summaryMetrics.overallConversionRatePercent.toFixed(1)}%`} icon={<Percent className="text-emerald-600" />} />
          <QualityMetricCard title="Total Conversions" value={summaryMetrics.totalConversions.toLocaleString()} icon={<CheckCircle2 className="text-blue-600" />} />
          <QualityMetricCard title="Top Converting Funnel" value={summaryMetrics.topConvertingFunnelName || 'N/A'} icon={<FunnelIcon className="text-purple-600" />} />
          {summaryMetrics.avgCostPerConversion !== undefined && <QualityMetricCard title="Avg. Cost / Conversion" value={`$${summaryMetrics.avgCostPerConversion.toFixed(2)}`} icon={<DollarSign className="text-amber-600" />} />}
        </div>

        {/* Funnel Visualization Section */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4">Funnel Breakdown ({selectedFunnel === 'all' ? 'Overall' : selectedFunnel.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())})</h2>
          <div className="space-y-3">
            {funnelStages.map((stage, index) => (
              <div key={stage.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h4 className="text-md font-semibold text-gray-700">{index + 1}. {stage.name}</h4>
                  <span className="text-sm text-gray-500 mt-1 sm:mt-0">Visitors: {stage.visitors.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mt-1 mb-0.5">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(stage.visitors / maxStageVisitors) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{stage.conversionRateFromPreviousPercent !== undefined ? `Conv. from prev: ${stage.conversionRateFromPreviousPercent.toFixed(1)}%` : 'Entry Point'}</span>
                  {stage.dropOffRatePercent !== undefined && <span className="text-red-500 flex items-center"><TrendingDown size={12} className="mr-1"/>Drop-off: {stage.dropOffRatePercent.toFixed(1)}%</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion by Source Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4">Conversions by Source</h2>
           <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Source</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Conversions</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Conversion Rate (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {conversionBySource.map(source => (
                  <tr key={source.source} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{source.source}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{source.conversions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{source.conversionRatePercent !== undefined ? `${source.conversionRatePercent.toFixed(1)}%` : 'N/A'}</td>
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
export default ConversionAnalyticsPage;
