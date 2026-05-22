
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ArticleCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
      <Skeleton className="h-56 w-full rounded-none" />

      <div className="flex flex-col gap-4 p-6">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-2/3" />

        <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="h-full rounded-3xl border border-border/70 bg-card p-7 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-14 w-14 rounded-2xl" />
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>

      <Skeleton className="mb-3 h-7 w-3/4" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-6 h-4 w-5/6" />

      <div className="mt-auto border-t border-border/70 pt-5">
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

export function DownloadCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
      <Skeleton className="h-56 w-full rounded-none" />

      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 flex-shrink-0 rounded-2xl" />

          <div className="flex-1">
            <Skeleton className="mb-2 h-6 w-4/5" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-28 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-admin-border bg-white shadow-sm">
      <div className="border-b border-admin-border bg-gray-50 p-4">
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="divide-y divide-admin-border">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 p-4"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((__, columnIndex) => (
              <Skeleton key={columnIndex} className="h-5 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}