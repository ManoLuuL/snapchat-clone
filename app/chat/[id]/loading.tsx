import {
  MessageContainerSkeleton,
  MessageInputSkeleton,
  MessageTopbarSkeleton,
} from "@/components/loading";

const Loading = () => {
  return (
    <div className="bg-sigMain h-screen flex-[3_3_0%] flex flex-col px-4 text-white">
      <MessageTopbarSkeleton />
      <MessageContainerSkeleton />
      <MessageInputSkeleton />
    </div>
  );
};
export default Loading;
