import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function VSLPagesLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="My VSL Pages" subtitle="Loading your VSL pages..." />
      <div className="p-6 md:p-10">
        <div className="flex justify-end mb-6">
            <Skeleton className="h-10 w-48 rounded-lg bg-white" /> {/* Create Button Skeleton */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <Skeleton className="h-8 w-full rounded-md bg-slate-200 mb-4" /> {/* Table Header */}
            {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md bg-slate-200 mb-2" /> /* Table Rows */
            ))}
        </div>
      </div>
    </div>
  );
}
