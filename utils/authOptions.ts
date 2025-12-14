import connectDB from "@/config/database";
import User from "@/models/User";
import { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT strategy (default)
    maxAge: 10 * 60, // 10 minutes in seconds
    updateAge: 7 * 60, // Extend logged in session if user is active after 7 mins
  },
  callbacks: {
    async signIn({ account, profile }) {
      await connectDB();
      const userExist = await User.findOne({ email: profile?.email });
      let profileImage = profile?.image;
      if (account?.provider === "google") {
        profileImage = (profile as any)?.picture;
      }
      if (!userExist) {
        await User.create({
          email: profile?.email,
          username: profile?.name,
          image: profileImage,
        });
      }
      return true;
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user?.email });
      if (session.user && user) {
        session.user.id = user._id.toString();
      }
      return session;
    },
  },
};
