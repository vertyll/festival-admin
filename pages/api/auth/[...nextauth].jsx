import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

async function isAdminEmail(email) {
  // ! THIS IS SPECIAL FOR PREVIEW DEPLOYMENTS ONLY
  // return !!(await Admin.findOne({ email }));
  return true;
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id || token.sub;
      }

      // if (await isAdminEmail(session?.user?.email)) {
      //   return session;
      // }

      if (session?.user?.email) {
        return session;
      }
      return null;
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    res.status(401).json({ error: "Unauthorized" });
    res.end();
    throw new Error("Not authenticated");
  }
}
