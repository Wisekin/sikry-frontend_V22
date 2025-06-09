import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionTrendsLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Data Collection Trends" subtitle="Loading trend data..." />
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
        </div>
        <Skeleton className="h-[450px] rounded-lg bg-white" /> {/* For filters + chart area */}
      </div>
    </div>
  );
}
