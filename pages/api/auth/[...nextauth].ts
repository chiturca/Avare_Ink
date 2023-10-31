import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile): any {
        let role = "user";

        if (profile.email === process.env.NEXT_PUBLIC_ADMIN_MAIL) {
          role = "admin";
        }

        return {
          ...profile,
          role: profile.role || role,
          id: profile.sub.toString(),
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      console.debug("JWT Callback - Token:", token);
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      console.debug("Session Callback - Session:", session);
      return session;
    },
  },
};
export default NextAuth(authOptions);
