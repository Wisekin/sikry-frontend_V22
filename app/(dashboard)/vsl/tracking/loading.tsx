import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function VSLTrackingLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="VSL Performance Tracking" subtitle="Loading VSL performance data..." />
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
        </div>
        <Skeleton className="h-16 rounded-lg bg-white mb-6" /> {/* Filters */}
        <Skeleton className="h-96 rounded-lg bg-white mb-6" /> {/* Main Chart */}
        <Skeleton className="h-64 rounded-lg bg-white" /> {/* Details Table */}
      </div>
    </div>
  );
}
