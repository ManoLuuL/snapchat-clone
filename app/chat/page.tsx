import ChatCamera from "@/components/chat/chat-camera";

export default async function ChatRootPage() {
  return (
    <main className="flex-grow bg-sigMain items-center flex px-2">
      <div
        className="bg-chat bg-right-bottom
				rounded-3xl w-full h-[96%] flex items-center justify-center px-6"
      >
        <ChatCamera />
        <div className="hidden lg:block">
          <div className="w-[500px] h-[600px]" />
        </div>
      </div>
    </main>
  );
}
