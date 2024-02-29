import mongoose, { Model, Schema } from "mongoose";

import { IMessageDocument } from "./types";

const messageSchema = new Schema<IMessageDocument>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    messageType: { type: String, required: true, enum: ["text", "image"] },
    opened: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message: Model<IMessageDocument> =
  mongoose.models?.Message || mongoose.model("Message", messageSchema);

export default Message;
