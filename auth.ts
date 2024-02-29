import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import User from "./models/user-model";
import { connectToMongoDB } from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        await connectToMongoDB();
        if (session.user) {
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            session.user._id = user._id;
            return session;
          } else {
            throw new Error("User not found");
          }
        } else {
          throw new Error("Invalid session");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Invalid session");
      }
    },
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        await connectToMongoDB();

        try {
          const user = await User.findOne({ email: profile?.email });

          if (!user) {
            const newUser = await User.create({
              username: profile?.login,
              email: profile?.email,
              fullName: profile?.name,
              avatar: profile?.avatar_url,
            });

            await newUser.save();
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return false;
    },
  },
});
