"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Loader2, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { IUserDocument } from "@/models/types";
import { SelectUserDialogProps } from "./types";
import { TextMessageSent } from "@/components/chat-svg";
import UserCard from "./user-card";
import { sendMessageAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

const SelectUserDialog = (props: SelectUserDialogProps) => {
  const { selectedFile, onClose, onPrev } = props;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<IUserDocument | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      setIsFetchingUsers(true);
      try {
        const res = await fetch("/api/chat/get-users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetchingUsers(false);
      }
    };

    getUsers();
  }, []);

  const handleSelectUser = (user: IUserDocument) => setSelectedUser(user);

  const handleSendMessage = async () => {
    setIsSendingMessage(true);
    try {
      await sendMessageAction(selectedUser?._id, selectedFile, "image");
      router.push(`/chat/${selectedUser?._id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <Dialog open={!!selectedFile}>
      <DialogContent
        className="bg-sigMain border border-sigColorBgBorder text-white max-w-xs"
        onInteractOutside={onClose}
      >
        <DialogHeader>
          <div className=" text-gray-400 p-1  flex gap-2 rounded-full bg-sigSurface border border-sigColorBgBorder">
            <SearchIcon className="text-gray-400 w-5" />
            <input
              className="bg-transparent border-none text-sm text-white placeholder-gray-400 focus:outline-none w-full"
              placeholder="To:"
              type="text"
            />
          </div>
          <p className="font-semibold py-2">Chats:</p>
          {users.map((user: IUserDocument) => (
            <div
              key={user._id}
              className="flex flex-col max-h-48 bg-sigSurface rounded-md overflow-auto"
            >
              <UserCard
                user={user}
                handleSelectUser={handleSelectUser}
                selectedUser={selectedUser}
              />
            </div>
          ))}

          {isFetchingUsers && (
            <div className="flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}
        </DialogHeader>
        <DialogFooter className="mx-auto flex items-center">
          <DialogClose asChild>
            <Button
              variant="destructive"
              size={"sm"}
              onClick={onClose}
              className="rounded-full bg-sigSnapImg"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button size={"sm"} onClick={onPrev} className="rounded-full px-4">
            Prev
          </Button>
          <Button
            size={"sm"}
            className="rounded-full bg-sigSnapChat hover:bg-sigSnapChat gap-1"
            onClick={handleSendMessage}
            disabled={!selectedUser || isSendingMessage}
          >
            {isSendingMessage ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                Send To{" "}
                <TextMessageSent className="text-white scale-95 my-auto" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectUserDialog;
