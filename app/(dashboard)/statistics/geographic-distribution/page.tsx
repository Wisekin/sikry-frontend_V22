"use client";

import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { MapPin, Globe, Users, BarChartHorizontal, Filter as FilterIcon, TrendingUp } from 'lucide-react'; // Using Globe as a general "regions covered" icon

interface GeoDataPoint {
  id: string;
  name: string; // Country, Region, City
  value: number; // e.g., number of records, users
  percentage?: number; // Optional, if showing distribution
  coordinates?: { lat: number; lng: number }; // Optional, for map plotting
}

const GeographicDistributionPage = () => {
  // Mock data
  const stats = {
    totalRegions: 15, // e.g., countries or major regions
    topRegionName: "North America",
    topRegionValue: 12500, // records
    regionsWithGrowth: 5,
  };

  const mockGeoData: GeoDataPoint[] = [
    { id: 'na', name: 'North America', value: 12500, percentage: 45, coordinates: { lat: 45.0, lng: -100.0 } },
    { id: 'eu', name: 'Europe', value: 8500, percentage: 30, coordinates: { lat: 50.0, lng: 10.0 } },
    { id: 'asia', name: 'Asia', value: 5000, percentage: 18, coordinates: { lat: 30.0, lng: 100.0 } },
    { id: 'sa', name: 'South America', value: 1500, percentage: 5, coordinates: { lat: -15.0, lng: -60.0 } },
    { id: 'misc', name: 'Other Regions', value: 500, percentage: 2 },
  ];
  const maxValue = Math.max(...mockGeoData.map(d => d.value), 100);


  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Geographic Data Distribution" subtitle="Visualize how your data is distributed across different regions." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard title="Total Regions Covered" value={stats.totalRegions.toLocaleString()} icon={<Globe className="text-blue-600" />} />
          <QualityMetricCard title="Top Region" value={`${stats.topRegionName} (${stats.topRegionValue.toLocaleString()})`} icon={<MapPin className="text-emerald-600" />} />
          <QualityMetricCard title="Regions with Growth" value={stats.regionsWithGrowth.toLocaleString()} icon={<TrendingUp className="text-purple-600" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Placeholder Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold text-[#1B1F3B]">Distribution Map</h2>
                <div className="flex items-center space-x-2">
                    <select className="p-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                        <option value="all_data">All Data Types</option>
                        <option value="companies">Companies</option>
                        <option value="users">Users</option>
                    </select>
                    <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg flex items-center text-sm">
                        <FilterIcon size={16} className="mr-1.5" /> Apply
                    </button>
                </div>
            </div>
            <div className="h-96 bg-slate-100 rounded-md border border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-400 text-lg">Map Visualization Placeholder</p>
              {/* In a real app, this would be an embedded map component like react-leaflet or google-maps-react */}
            </div>
          </div>

          {/* Data Table Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-[#1B1F3B] mb-4">Top Regions by Data Volume</h2>
            <div className="space-y-3">
              {mockGeoData.sort((a,b) => b.value - a.value).map(region => (
                <div key={region.id} className="p-3 rounded-md bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{region.name}</span>
                    <span className="text-sm font-semibold text-[#1B1F3B]">{region.value.toLocaleString()}</span>
                  </div>
                  {region.percentage !== undefined && (
                    <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                        <div
                          className="h-2.5 rounded-full bg-blue-500"
                          style={{ width: `${region.percentage}%` }}
                        ></div>
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

export default GeographicDistributionPage;
