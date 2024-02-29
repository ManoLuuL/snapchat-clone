import { Document, PopulatedDoc, Types } from "mongoose";

export type ChatDTO = {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
};

export type ChatDocumentDTO = ChatDTO &
  Document & {
    createdAt: Date;
    updatedAt: Date;
  };

export interface IUser {
  username: string;
  fullName: string;
  email: string;
  avatar?: string;
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  sender: Types.ObjectId | PopulatedDoc<IUserDocument>;
  receiver: Types.ObjectId | PopulatedDoc<IUserDocument>;
  content: string;
  messageType: "text" | "image";
  opened: boolean;
}

export interface IMessageDocument extends IMessage, Document {
  createdAt: Date;
  updatedAt: Date;
}
