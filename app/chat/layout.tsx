import { ChatLayoutProps } from "./types";
import ChatSideBar from "@/components/chat/chat-sidebar";

const Layout = (props: ChatLayoutProps) => {
  const { children } = props;

  return (
    <main className="flex h-screen">
      <ChatSideBar />
      {children}
    </main>
  );
};
export default Layout;
