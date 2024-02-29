import { IUserDocument } from "@/models/types";
import { NextResponse } from "next/server";
import User from "@/models/user-model";
import { auth } from "@/auth";
import { connectToMongoDB } from "@/lib/db";

export const GET = async () => {
  try {
    const session = await auth();
    if (!session) return;
    await connectToMongoDB();

    const users: IUserDocument[] = await User.find();
    const filteredUsers = users.filter(
      // @ts-ignore
      (user) => user._id.toString() !== session.user?._id.toString()
    );
    return NextResponse.json(filteredUsers);
  } catch (error) {
    console.log("Error in get-users route handler", error);
    throw error;
  }
};
