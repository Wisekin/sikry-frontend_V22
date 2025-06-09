"use client";

import React, { useEffect, useState } from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Briefcase, TrendingUp, Filter as FilterIcon, List, PieChart as PieChartIcon, AlertCircle } from 'lucide-react';

// Import chart components
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';


interface ApiSectorDataPoint {
  sector_id: string;
  sector_name: string;
  data_count: number;
  data_percentage?: number;
  color_hint?: string;
}

interface ApiSummaryStats {
    total_sectors_with_data: number;
    top_sector: { name: string; count: number };
}

interface SectorDistributionAPIData {
  filter_summary: {
    data_type_filter?: string;
    period_filter?: string;
  };
  sectors: ApiSectorDataPoint[];
  summary_stats: ApiSummaryStats;
}


const barChartConfigConst = { // Renamed to avoid conflict if pieChartConfig uses 'value'
  data_count: {
    label: "Data Volume",
    color: "hsl(200 70% 50%)",
  },
} satisfies ChartConfig;


const SectorDistributionPage = () => {
  const [apiData, setApiData] = useState<SectorDistributionAPIData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataTypeFilter, setDataTypeFilter] = useState<string>('all_data');

  // Dynamic pieChartConfig based on fetched data
  const [pieChartConfig, setPieChartConfig] = useState<ChartConfig>({});

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`/api/statistics/sector-distribution?dataType=${dataTypeFilter}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch sector distribution data');
        return res.json();
      })
      .then(responseData => {
        if (responseData.error) {
            throw new Error(responseData.error.message || 'Failed to fetch data');
        }
        setApiData(responseData.data);
        if (responseData.data && responseData.data.sectors) {
            const newPieConfig = Object.fromEntries(
                responseData.data.sectors.map((entry: ApiSectorDataPoint) => [
                entry.sector_id,
                { label: entry.sector_name, color: entry.color_hint || 'hsl(0 0% 50%)' }
              ])
            ) satisfies ChartConfig;
            setPieChartConfig(newPieConfig);
        }
      })
      .catch(err => { setError(err.message); setApiData(null); })
      .finally(() => setIsLoading(false));
  }, [dataTypeFilter]);

  if (isLoading && !apiData) {
    return (
        <div className="min-h-screen bg-gray-50/50">
          <EnterprisePageHeader title="Sector Data Distribution" subtitle="Loading sector insights..." />
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Skeleton className="h-32 rounded-lg bg-white" />
              <Skeleton className="h-32 rounded-lg bg-white" />
              <Skeleton className="h-32 rounded-lg bg-white" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2"><Skeleton className="h-[500px] rounded-lg bg-white" /></div>
              <div className="lg:col-span-1"><Skeleton className="h-[500px] rounded-lg bg-white" /></div>
            </div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="Sector Data Distribution" subtitle="Error" />
        <div className="p-6 md:p-10 flex items-center justify-center">
             <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Could not load data</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <button
                    onClick={() => { setIsLoading(true); setError(null); fetch(`/api/statistics/sector-distribution?dataType=${dataTypeFilter}`).then(res => res.json()).then(responseData => { if(responseData.error) throw new Error(responseData.error.message); setApiData(responseData.data); if (responseData.data && responseData.data.sectors) { const newPieConfig = Object.fromEntries(responseData.data.sectors.map((entry: ApiSectorDataPoint) => [entry.sector_id, { label: entry.sector_name, color: entry.color_hint || 'hsl(0 0% 50%)' }])) satisfies ChartConfig; setPieChartConfig(newPieConfig); } }).catch(err => setError(err.message)).finally(() => setIsLoading(false)); }}
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
      <EnterprisePageHeader title="Sector Data Distribution" subtitle="No data available" />
      <div className="p-6 md:p-10 text-center text-gray-500">No sector distribution data available for the selected filters.</div>
    </div>
  );

  const { sectors, summary_stats } = apiData;
  // Mocking fastestGrowingSector as it's not in API
  const fastestGrowingSector = "Healthcare Tech (Mock)";

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Sector Data Distribution" subtitle="Analyze how your data is distributed across industry sectors." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Total Sectors Tracked" value={summary_stats.total_sectors_with_data.toLocaleString()} icon={<Briefcase className="text-blue-600" />} />
          <QualityMetricCard title="Top Sector" value={`${summary_stats.top_sector.name} (${summary_stats.top_sector.count.toLocaleString()})`} icon={<PieChartIcon className="text-emerald-600" />} />
          <QualityMetricCard title="Fastest Growing Sector" value={fastestGrowingSector} icon={<TrendingUp className="text-purple-600" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-[#1B1F3B]">Distribution by Sector</h2>
                <div className="flex items-center space-x-2">
                    <select value={dataTypeFilter} onChange={(e) => setDataTypeFilter(e.target.value)} className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <option value="all_data">All Data Types</option>
                        <option value="companies">Companies</option>
                        <option value="contacts">Contacts</option>
                    </select>
                    {/* Apply button removed */}
                </div>
            </div>
            {isLoading && apiData ? <Skeleton className="h-96 w-full" /> : sectors.length > 0 ? (
                <div className="h-96 w-full">
                <ChartContainer config={pieChartConfig} className="h-full w-full">
                    <PieChart accessibilityLayer>
                    <ChartTooltip content={<ChartTooltipContent nameKey="sector_name" hideLabel />} />
                    <Pie data={sectors} dataKey="data_percentage" nameKey="sector_name" cx="50%" cy="50%" outerRadius={120} labelLine={true}
                        label={({ sector_name, data_percentage, x, y, midAngle, outerRadius = 0, percent }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = outerRadius + 25;
                            const xLabel = x + radius * Math.cos(-midAngle! * RADIAN);
                            const yLabel = y + radius * Math.sin(-midAngle! * RADIAN);
                            return (
                            <text x={xLabel} y={yLabel} fill="hsl(var(--foreground))" textAnchor={x > midAngle! ? 'start' : 'end'} dominantBaseline="central" className="text-xs">
                                {`${sector_name} (${(percent! * 100).toFixed(0)}%)`}
                            </text>
                            );
                        }}>
                        {sectors.map((entry) => (
                        <Cell key={`cell-pie-${entry.sector_id}`} fill={entry.color_hint || 'gray'} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="sector_name" />} />
                    </PieChart>
                </ChartContainer>
                </div>
            ) : (
                <p className="text-center py-10 text-gray-500 h-96 flex items-center justify-center">No sector distribution data to display.</p>
            )}
          </div>

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4 flex items-center"><List className="mr-2 text-gray-500"/>Sector Breakdown</h2>
            {isLoading && apiData ? <Skeleton className="h-[420px] w-full" /> : sectors.length > 0 ? (
                <div className="h-[420px]">
                <ChartContainer config={barChartConfigConst} className="h-full w-full">
                    <BarChart
                    accessibilityLayer
                    data={sectors.sort((a, b) => a.data_count - b.data_count).slice(0,10)} // Show top 10
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <XAxis type="number" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(val: number) => val.toLocaleString()}/>
                    <YAxis dataKey="sector_name" type="category" tickLine={false} axisLine={false} tickMargin={5} width={110} className="text-xs"/>
                    <ChartTooltip cursor={{fill: 'rgba(128, 128, 128, 0.1)'}} content={<ChartTooltipContent />} />
                    <Bar dataKey="data_count" layout="vertical" radius={4}>
                        {sectors.sort((a, b) => a.data_count - b.data_count).slice(0,10).map((entry) => ( // Ensure colors match sorted data
                            <Cell key={`cell-bar-${entry.sector_id}`} fill={entry.color_hint || 'var(--color-data_count)'} />
                        ))}
                        <LabelList dataKey="data_count" position="right" offset={8} className="fill-foreground text-xs" formatter={(val: number) => val.toLocaleString()} />
                    </Bar>
                    </BarChart>
                </ChartContainer>
                </div>
            ) : (
                 <p className="text-center py-10 text-gray-500 h-[420px] flex items-center justify-center">No sector breakdown data to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorDistributionPage;
