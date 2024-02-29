import mongoose, { Model } from "mongoose";

import { ChatDocumentDTO } from "./types";

const chatSchema = new mongoose.Schema<ChatDocumentDTO>(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat: Model<ChatDocumentDTO> =
  mongoose.models?.Chat || mongoose.model("Chat", chatSchema);

export default Chat;
