import { Skeleton } from "../ui/skeleton";

export const MessageTopbarSkeleton = () => {
  return (
    <div className="flex justify-between my-4">
      <div className="flex gap-2 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-32" />
      </div>
      <div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};
