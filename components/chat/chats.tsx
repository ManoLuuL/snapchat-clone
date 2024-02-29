import { Avatar, AvatarImage } from "../ui/avatar";
import {
  ImageMessageSvg,
  TextMessageSent,
  TextMessageSvgReceived,
} from "../chat-svg";

import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { formatDate } from "@/lib/utils";
import { getUsersForSidebar } from "@/lib/data";

const Chats = async () => {
  const session = await auth();
  const chats = session?.user ? await getUsersForSidebar(session.user._id) : [];

  const Chat = (
    <ul>
      {chats.map((chat) => {
        // @ts-ignore
        const userToChat = chat.participants[0];
        // @ts-ignore
        const lastMessage = chat.lastMessage;
        // @ts-ignore
        const lastMessageType = lastMessage?.messageType;
        const formattedDate = lastMessage
          ? // @ts-ignore
            formatDate(lastMessage?.createdAt!)
          : formatDate(new Date());
        const amISender =
          lastMessage && lastMessage.sender._id !== userToChat?._id;
        // @ts-ignore
        const isMsgOpened = lastMessage?.opened;

        let messageStatus: string;
        let iconComponent: JSX.Element;

        if (amISender) {
          messageStatus = isMsgOpened ? "Opened" : "Sent";
          iconComponent =
            lastMessageType === "text" ? (
              <TextMessageSent
                className={
                  isMsgOpened
                    ? "text-sigSnapChat "
                    : "text-sigSnapChat fill-current"
                }
              />
            ) : (
              <ImageMessageSvg
                className={
                  isMsgOpened
                    ? "text-sigSnapImg"
                    : "text-sigSnapImg fill-current"
                }
              />
            );
        } else {
          if (!lastMessage) {
            iconComponent = <TextMessageSvgReceived className="fill-current" />;
            messageStatus = "Say Hi!";
          } else {
            messageStatus = isMsgOpened ? "Received" : "Show Message";
            iconComponent =
              lastMessageType === "text" ? (
                <TextMessageSvgReceived
                  className={
                    !isMsgOpened
                      ? "text-sigSnapChat fill-current"
                      : "text-sigSnapChat"
                  }
                />
              ) : (
                <ImageMessageSvg
                  className={
                    !isMsgOpened
                      ? "text-sigSnapImg fill-current"
                      : "text-sigSnapImg"
                  }
                />
              );
          }
        }

        return (
          <div key={chat?._id}>
            <Link href={`/chat/${userToChat?._id}`}>
              <li className="flex items-center p-2  bg-sigSurface hover:bg-sigBackgroundFeedHover cursor-pointer border-b border-b-sigColorBgBorder">
                <Avatar className="w-14 h-14 bg-black">
                  <AvatarImage
                    src={
                      userToChat?.avatar ||
                      "https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png"
                    }
                  />
                </Avatar>

                <div className="ml-3">
                  <p>{userToChat?.fullName}</p>
                  <p className="text-gray-400 text-xs flex gap-1">
                    {iconComponent}
                    {messageStatus} - {formattedDate}
                  </p>
                </div>
                <Image
                  src={"/camera.svg"}
                  height={0}
                  width={0}
                  style={{ width: "20px", height: "auto" }}
                  className="ml-auto hover:scale-95 "
                  alt="Camera Icon"
                />
              </li>
            </Link>
          </div>
        );
      })}
    </ul>
  );

  return <nav className="flex-1 overflow-y-auto">{Chat}</nav>;
};
export default Chats;
