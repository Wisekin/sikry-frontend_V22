import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function VSLTemplatesLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="VSL Templates" subtitle="Loading available VSL templates..." />
      <div className="p-6 md:p-10">
        <div className="flex justify-end mb-6">
            <Skeleton className="h-10 w-48 rounded-lg bg-white" /> {/* Create New Template Button Skeleton */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 rounded-lg bg-white" />
          <Skeleton className="h-64 rounded-lg bg-white" />
          <Skeleton className="h-64 rounded-lg bg-white" />
        </div>
      </div>
    </div>
  );
}
