import { Skeleton } from "../ui/skeleton";

export const MessageInputSkeleton = () => {
  return (
    <div className="flex justify-between my-3 gap-3 items-center">
      <div className="flex gap-2 items-center flex-1">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-9 w-full" />
      </div>
      <div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
};
