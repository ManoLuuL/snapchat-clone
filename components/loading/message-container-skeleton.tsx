import { Skeleton } from "../ui/skeleton";

export const MessageContainerSkeleton = () => {
  return (
    <div className="bg-sigSurface flex-1 overflow-y-auto rounded-xl my-4 border border-sigColorBgBorder py-2 px-3 flex flex-col gap">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="flex items-center space-x-4" key={i}>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
