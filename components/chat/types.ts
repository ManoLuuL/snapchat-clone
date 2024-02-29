import { Dispatch, SetStateAction } from "react";
import { IMessageDocument, IUserDocument } from "@/models/types";

import { PopulatedDoc } from "mongoose";
import { Session } from "next-auth";

export type ChatMessagesProps = {
  messages: IMessageDocument[] | PopulatedDoc<IMessageDocument>[];
  session: Session | null;
};

export type UserCardProps = {
  user: IUserDocument;
  handleSelectUser(user: IUserDocument): void;
  selectedUser: IUserDocument | null;
};

export type ChatTopbarParams = { params: { id: string } };

export type EmojiProps = {
  src: string;
  alt: string;
  onClick(): void;
};

export type ImagePreviewDialogProps = {
  selectedFile: string | undefined;
  onClose(): void;
  onImageChange(): void;
  setStep?: Dispatch<SetStateAction<number>>;
};

export type SelectUserDialogProps = {
  selectedFile: string;
  onClose(): void;
  onPrev(): void;
};
