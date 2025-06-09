"use client";

import React, { useEffect, useState } from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Database, ShieldCheck, BarChart2 as BarChart2Icon, Filter as FilterIcon, ListChecks, TrendingUp, AlertCircle } from 'lucide-react';

// Import chart components
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

interface ApiDataSourceComparisonMetric {
  source_id: string;
  source_name: string;
  data_volume: number;
  quality_score?: number;
  coverage_percent?: number;
  update_frequency?: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly' | 'Ad-hoc';
  color_hint?: string;
}

interface ApiSummaryStats {
    total_sources_compared: number;
    highest_volume_source?: { name: string; volume: number };
    best_quality_source?: { name:string; score: number };
}

interface SourceComparisonAPIData {
  filter_summary: {
    metric_type_filter?: string;
    period_filter?: string;
  };
  sources_metrics: ApiDataSourceComparisonMetric[];
  summary_stats: ApiSummaryStats;
}


const chartConfig = {
  data_volume: { label: "Data Volume", color: "hsl(200 70% 50%)" },
  quality_score: { label: "Quality Score (%)", color: "hsl(142.1 76.2% 42.2%)" },
  coverage_percent: { label: "Coverage (%)", color: "hsl(38.3 95.8% 53.1%)" },
} satisfies ChartConfig;

const SourceComparisonPage = () => {
  const [apiData, setApiData] = useState<SourceComparisonAPIData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metricTypeFilter, setMetricTypeFilter] = useState<string>('all_metrics');
  const [periodFilter, setPeriodFilter] = useState<string>('all_time'); // Example, API supports it

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const queryParams = new URLSearchParams();
    queryParams.append('metricType', metricTypeFilter);
    queryParams.append('period', periodFilter);

    fetch(`/api/statistics/source-comparison?${queryParams.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch source comparison data');
        return res.json();
      })
      .then(responseData => {
        if (responseData.error) {
            throw new Error(responseData.error.message || 'Failed to fetch data');
        }
        setApiData(responseData.data);
      })
      .catch(err => { setError(err.message); setApiData(null); })
      .finally(() => setIsLoading(false));
  }, [metricTypeFilter, periodFilter]);


  if (isLoading && !apiData) {
    return (
        <div className="min-h-screen bg-gray-50/50">
          <EnterprisePageHeader title="Data Source Comparison" subtitle="Loading source performance data..." />
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Skeleton className="h-32 rounded-lg bg-white" />
              <Skeleton className="h-32 rounded-lg bg-white" />
              <Skeleton className="h-32 rounded-lg bg-white" />
            </div>
            <Skeleton className="h-24 rounded-lg bg-white mb-6" />
            <Skeleton className="h-96 rounded-lg bg-white mb-6" />
            <Skeleton className="h-64 rounded-lg bg-white" />
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="Data Source Comparison" subtitle="Error" />
        <div className="p-6 md:p-10 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Could not load data</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => { setIsLoading(true); setError(null); const queryParams = new URLSearchParams({metricType: metricTypeFilter, period: periodFilter}); fetch(`/api/statistics/source-comparison?${queryParams.toString()}`).then(res => res.json()).then(responseData => { if(responseData.error) throw new Error(responseData.error.message); setApiData(responseData.data);}).catch(err => setError(err.message)).finally(() => setIsLoading(false));}}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm">
                    Try Again
                </button>
            </div>
        </div>
      </div>
    );
  }

  if (!apiData) return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="Data Source Comparison" subtitle="No data available" />
        <div className="p-6 md:p-10 text-center text-gray-500">No source comparison data available for the selected filters.</div>
    </div>
  );

  const { sources_metrics, summary_stats } = apiData;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Data Source Comparison" subtitle="Evaluate and compare the performance of your different data sources." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Total Data Sources" value={summary_stats.total_sources_compared.toLocaleString()} icon={<Database className="text-blue-600" />} />
          <QualityMetricCard title="Highest Volume Source" value={summary_stats.highest_volume_source?.name || 'N/A'} icon={<BarChart2Icon className="text-emerald-600" />} />
          <QualityMetricCard title="Best Quality Source" value={summary_stats.best_quality_source?.name || 'N/A'} icon={<ShieldCheck className="text-purple-600" />} />
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-start items-center gap-3">
                <label htmlFor="metricTypeFilter" className="text-sm font-medium text-gray-700 mr-2">Compare by:</label>
                <select id="metricTypeFilter" value={metricTypeFilter} onChange={e => setMetricTypeFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all_metrics">All Metrics</option>
                    <option value="volume">Data Volume</option>
                    <option value="quality">Quality Score</option>
                    <option value="coverage">Coverage Percentage</option>
                </select>
                <label htmlFor="periodFilter" className="text-sm font-medium text-gray-700 md:ml-4 mr-2">Period:</label>
                 <select id="periodFilter" value={periodFilter} onChange={e => setPeriodFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option value="all_time">All Time</option>
                    <option value="last_30_days">Last 30 Days</option>
                    <option value="last_90_days">Last 90 Days</option>
                </select>
                {/* Apply button removed as useEffect handles changes */}
            </div>
        </div>

        <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4">Source Performance Metrics</h2>
            {isLoading && apiData ? <Skeleton className="h-96 w-full" /> : sources_metrics.length > 0 ? (
              <div className="h-96 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart accessibilityLayer data={sources_metrics} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                      dataKey="source_name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.length > 15 ? value.substring(0,12) + "..." : value }
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="var(--color-data_volume)" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-quality_score)" tickLine={false} axisLine={false} tickMargin={8} domain={[0, 100]}/>
                    <ChartTooltip
                      cursor={true}
                      content={<ChartTooltipContent />}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar yAxisId="left" dataKey="data_volume" fill="var(--color-data_volume)" radius={4} name="Data Volume"/>
                    <Bar yAxisId="right" dataKey="quality_score" fill="var(--color-quality_score)" radius={4} name="Quality Score (%)" />
                    <Bar yAxisId="right" dataKey="coverage_percent" fill="var(--color-coverage_percent)" radius={4} name="Coverage (%)" />
                  </BarChart>
                </ChartContainer>
              </div>
            ) : (
              <p className="text-center py-10 text-gray-500 h-96 flex items-center justify-center">No source performance metrics to display.</p>
            )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4 flex items-center"><ListChecks className="mr-2 text-gray-500"/>Detailed Source Metrics</h2>
          {isLoading && apiData ? <Skeleton className="h-64 w-full" /> : sources_metrics.length > 0 ? (
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
                  {sources_metrics.map(source => (
                    <tr key={source.source_id} className="hover:bg-gray-50/50">
                      <td className="px-4 py-3 font-medium text-gray-800">{source.source_name}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{source.data_volume.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{source.quality_score !== undefined ? `${source.quality_score}%` : 'N/A'}</td>
                      <td className="px-4 py-3 text-right text-gray-600">{source.coverage_percent !== undefined ? `${source.coverage_percent}%` : 'N/A'}</td>
                      <td className="px-4 py-3 text-gray-600">{source.update_frequency || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-10 text-gray-500">No detailed source metrics to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceComparisonPage;
