"use client";

import React, { useEffect, useState } from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
// import QualityMetricCard from '@/components/ui/quality-metric-card'; // Not directly used here
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileText, PlusCircle, Eye, Edit3, PlayCircle, Video, AlertCircle } from 'lucide-react'; // Added Video, AlertCircle

interface VSLTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl?: string;
}

interface VSLTemplatesData {
    templates: VSLTemplate[];
}

const VSLTemplatesPage = () => {
  const [data, setData] = useState<VSLTemplatesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('/api/vsl/templates')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch VSL templates');
        return res.json();
      })
      .then(responseData => {
        if (responseData.error) {
            throw new Error(responseData.error.message || 'Failed to fetch VSL templates');
        }
        setData(responseData.data);
      })
      .catch(err => { setError(err.message); setData(null); })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) { // This will be primarily handled by loading.tsx for initial load
    return (
        <div className="min-h-screen bg-gray-50/50">
          <EnterprisePageHeader title="VSL Templates" subtitle="Loading available VSL templates..." />
          <div className="p-6 md:p-10">
            <div className="flex justify-end mb-6">
                <Skeleton className="h-10 w-48 rounded-lg bg-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div>
                        <Skeleton className="h-32 w-full rounded-md bg-slate-200 mb-4" />
                        <Skeleton className="h-6 w-3/4 rounded-md bg-slate-200 mb-2" />
                        <Skeleton className="h-4 w-full rounded-md bg-slate-200 mb-1" />
                        <Skeleton className="h-4 w-5/6 rounded-md bg-slate-200 mb-4" />
                    </div>
                    <div className="flex justify-start space-x-2 mt-auto">
                        <Skeleton className="h-9 w-24 rounded-md bg-slate-200" />
                        <Skeleton className="h-9 w-20 rounded-md bg-slate-200" />
                        <Skeleton className="h-9 w-9 rounded-md bg-slate-200" />
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="VSL Templates" subtitle="Error" />
        <div className="p-6 md:p-10 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200 text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4 mx-auto" />
                <h2 className="text-xl font-semibold text-red-700 mb-2">Could not load VSL templates</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button variant="destructive" onClick={() => { setIsLoading(true); setError(null); fetch('/api/vsl/templates').then(res => res.json()).then(responseData => { if(responseData.error) throw new Error(responseData.error.message); setData(responseData.data);}).catch(err => setError(err.message)).finally(() => setIsLoading(false)); }}>
                    Try Again
                </Button>
            </div>
        </div>
      </div>
    );
  }

  if (!data || !data.templates || data.templates.length === 0) return (
    <div className="min-h-screen bg-gray-50/50">
        <EnterprisePageHeader title="VSL Templates" subtitle="Manage your Video Sales Letter templates." />
        <div className="p-6 md:p-10">
            <div className="flex justify-end mb-6">
                <Button className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white">
                    <PlusCircle size={18} className="mr-2" /> Create New Template
                </Button>
            </div>
            <div className="text-center py-10 text-gray-500 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-[#1B1F3B] mb-2">No VSL Templates Found</h2>
                <p className="mb-4">Get started by creating your first VSL template.</p>
            </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="VSL Templates" subtitle="Browse, manage, and create new Video Sales Letter templates." />
      <div className="p-6 md:p-10">
        <div className="flex justify-end mb-6">
            <Button className="bg-[#1B1F3B] hover:bg-[#2A3050] text-white">
                <PlusCircle size={18} className="mr-2" /> Create New Template
            </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.templates.map(template => (
            <div key={template.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="w-full h-32 bg-slate-200 rounded-md mb-4 flex items-center justify-center">
                  {/* Placeholder for actual thumbnail image if thumbnailUrl was present */}
                  <Video size={48} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#1B1F3B] mb-1">{template.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2 h-8">{template.description}</p> {/* Fixed height for description */}
              </div>
              <div className="flex justify-start space-x-2 mt-auto pt-3 border-t border-gray-100">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 h-8"> {/* Fixed height for buttons */}
                  <PlayCircle size={14} className="mr-1.5" /> Use Template
                </Button>
                <Button variant="outline" className="text-xs px-3 py-1.5 h-8 border-gray-300 text-gray-700 hover:bg-gray-100">
                  <Eye size={14} className="mr-1.5" /> Preview
                </Button>
                 <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-8 w-8">
                   <Edit3 size={16} />
                 </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VSLTemplatesPage;
