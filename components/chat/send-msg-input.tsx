"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "../ui/button";
import { EmojiPopover } from "./emoji-popover";
import Image from "next/image";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { TextMessageSent } from "@/components/chat-svg";
import { sendMessageAction } from "@/lib/actions";
import { useParams } from "next/navigation";

const SendMsgInput = () => {
  const [messageContent, setMessageContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ id: string }>();
  const receiverId = params.id;

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await sendMessageAction(receiverId, messageContent, "text");
      setMessageContent("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (value: ChangeEvent<HTMLInputElement>) => {
    setMessageContent(value.target.value);
  };

  return (
    <div className="flex gap-2 items-center py-1">
      <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-sigBackgroundSecondaryHover">
        <Image
          src={"/camera.svg"}
          height={0}
          width={0}
          alt="camera icon"
          className="w-[20px] h-auto"
        />
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex-1 flex items-center gap-1 bg-sigBackgroundSecondaryHover rounded-full border border-sigColorBgBorder"
      >
        <Input
          placeholder="Send a chat"
          className="bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full"
          type="text"
          value={messageContent}
          onChange={handleInput}
          disabled={isLoading}
        />
        <Button
          size={"sm"}
          className="bg-transparent hover:bg-transparent text-sigSnapChat"
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <TextMessageSent className=" scale-150 mr-1" />
          )}
        </Button>
      </form>
      <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white bg-sigBackgroundSecondaryHover">
        <EmojiPopover />
      </div>
    </div>
  );
};
export default SendMsgInput;
