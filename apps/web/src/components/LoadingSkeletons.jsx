
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ArticleCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border flex flex-col h-full">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6 flex flex-col flex-grow gap-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="mt-auto pt-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col items-center text-center">
      <Skeleton className="h-16 w-16 rounded-xl mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6 mt-1" />
    </div>
  );
}

export function DownloadCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
        <div className="flex-grow">
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-6" />
      <Skeleton className="h-10 w-full mt-auto" />
    </div>
  );
}
