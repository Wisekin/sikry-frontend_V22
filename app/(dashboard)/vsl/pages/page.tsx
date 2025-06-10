"use client";

import React, { useEffect, useState } from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Eye, Edit3, BarChart3, Settings, Trash2, AlertCircle, Video } from 'lucide-react';
import Link from 'next/link';


interface VSLPageStat {
  views: number;
  conversions: number;
}
interface VSLPageEntry {
  id: string; // Changed from page_id for frontend consistency
  title: string;
  templateName: string; // Changed from template_name
  status: 'Draft' | 'Published' | 'Archived';
  stats: VSLPageStat;
  createdAt: string; // Changed from created_at
  liveUrl?: string; // Changed from live_url
}

interface VSLPagesData {
    pages: VSLPageEntry[];
}

const VSLPagesPage = () => {
  const [data, setData] = useState<VSLPagesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    fetch('/api/vsl/pages')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch VSL pages');
        return res.json();
      })
      .then(responseData => {
        if (responseData.error) {
            throw new Error(responseData.error.message || 'Failed to fetch VSL pages');
        }
        // Map API data (snake_case) to frontend data (camelCase)
        const mappedPages = responseData.data.pages.map((page: any) => ({
            id: page.page_id,
            title: page.title,
            templateName: page.template_name,
            status: page.status,
            stats: page.stats,
            createdAt: page.created_at,
            liveUrl: page.live_url
        }));
        setData({ pages: mappedPages });
      })
      .catch(err => { setError(err.message); setData(null); })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusBadgeStyle = (status: VSLPageEntry['status']) => {
    if (status === 'Published') return 'bg-green-100 text-green-700';
    if (status === 'Archived') return 'bg-gray-200 text-gray-600';
    return 'bg-yellow-100 text-yellow-700'; // Draft
  };

  // Fallback for loading state
  if (isLoading) {
    return (
        <div className="min-h-screen bg-gray-50/50">
          <EnterprisePageHeader title="My VSL Pages" subtitle="Loading your VSL pages..." />
          <div className="p-6 md:p-10">
            <div className="flex justify-end mb-6">
                <Skeleton className="h-10 w-52 rounded-lg bg-white" /> {/* Button Skeleton for "Create New VSL Page" */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Skeleton className="h-10 w-full rounded-md bg-slate-200 mb-4" /> {/* Table Header */}
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-md bg-slate-200 mb-2" />
                ))}
            </div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="My VSL Pages" subtitle="Error" />
         <div className="p-6 md:p-10 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Could not load VSL pages</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button variant="destructive" onClick={fetchData}>
                    Try Again
                </Button>
            </div>
        </div>
      </div>
    );
  }

  if (!data || data.pages.length === 0) return (
     <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="My VSL Pages" subtitle="Manage your created Video Sales Letters." />
        <div className="p-6 md:p-10">
            <div className="flex justify-end mb-6">
                <Link href="/vsl/templates">
                    <Button className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white">
                        <PlusCircle size={18} className="mr-2" /> Create New VSL Page
                    </Button>
                </Link>
            </div>
            <div className="text-center py-10 text-gray-500 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <Video size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-[#1B1F3B] mb-2">No VSL Pages Found</h2>
                <p className="mb-4">Get started by creating a new VSL page from a template.</p>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="My VSL Pages" subtitle="Manage your created Video Sales Letters." />
      <div className="p-6 md:p-10">
        <div className="flex justify-end mb-6">
            <Link href="/vsl/templates"> {/* Assuming new VSL creation starts from selecting a template */}
                <Button className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white">
                    <PlusCircle size={18} className="mr-2" /> Create New VSL Page
                </Button>
            </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600 font-medium">Page Title</TableHead>
                <TableHead className="text-gray-600 font-medium">Template</TableHead>
                <TableHead className="text-gray-600 font-medium">Status</TableHead>
                <TableHead className="text-right text-gray-600 font-medium">Views</TableHead>
                <TableHead className="text-right text-gray-600 font-medium">Conversions</TableHead>
                <TableHead className="text-right text-gray-600 font-medium">Conv. Rate</TableHead>
                <TableHead className="text-gray-600 font-medium">Created</TableHead>
                <TableHead className="text-center text-gray-600 font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.pages.map((page) => {
                const convRate = page.stats.views > 0 ? (page.stats.conversions / page.stats.views) * 100 : 0;
                return (
                  <TableRow key={page.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-gray-800">{page.title}</TableCell>
                    <TableCell className="text-gray-600">{page.templateName}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeStyle(page.status)}`}>
                        {page.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-gray-600">{page.stats.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-gray-600">{page.stats.conversions.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-gray-600">{convRate.toFixed(1)}%</TableCell>
                    <TableCell className="text-gray-600">{new Date(page.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-center space-x-1">
                      {page.liveUrl && <Button variant="outline" size="icon" title="View Live Page" className="h-8 w-8 border-gray-300" onClick={() => window.open(page.liveUrl, '_blank')}><Eye size={16} className="text-blue-600" /></Button>}
                      <Button variant="outline" size="icon" title="Edit Page" className="h-8 w-8 border-gray-300"><Edit3 size={16} className="text-green-600" /></Button>
                      <Button variant="outline" size="icon" title="View Stats" className="h-8 w-8 border-gray-300"><BarChart3 size={16} className="text-purple-600" /></Button>
                      <Button variant="outline" size="icon" title="Delete Page" className="h-8 w-8 border-gray-300"><Trash2 size={16} className="text-red-600" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default VSLPagesPage;
