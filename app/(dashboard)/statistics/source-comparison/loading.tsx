import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import { Skeleton } from '@/components/ui/skeleton';

export default function SourceComparisonLoading() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <EnterprisePageHeader title="Data Source Comparison" subtitle="Loading source performance data..." />
      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
          <Skeleton className="h-32 rounded-lg bg-white" />
        </div>
        <Skeleton className="h-24 rounded-lg bg-white mb-6" /> {/* Adjusted height for filters area */}
        <Skeleton className="h-96 rounded-lg bg-white mb-6" /> {/* For grouped bar chart */}
        <Skeleton className="h-64 rounded-lg bg-white" /> {/* For details table */}
      </div>
    </div>
  );
}
