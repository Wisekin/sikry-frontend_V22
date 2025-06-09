import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function SectorDistributionLoading() {
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
          <div className="lg:col-span-2">
            <Skeleton className="h-[500px] rounded-lg bg-white" /> {/* For filters + pie chart area */}
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-[500px] rounded-lg bg-white" /> {/* For sector breakdown list/chart */}
          </div>
        </div>
      </div>
    </div>
  );
}
