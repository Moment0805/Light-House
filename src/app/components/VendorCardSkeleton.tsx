import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function VendorCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex items-center gap-4 mt-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </Card>
  );
}
