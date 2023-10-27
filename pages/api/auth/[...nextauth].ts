import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile): any {
        console.log("Google Profile:", profile);
        let role = "user";

        if (profile.email === "sonmezmiray@gmail.com") {
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "email",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials): Promise<any> {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = {
          id: "42",
          email: "admin@admin.com",
          password: "123456",
          role: "admin",
        };

        if (
          credentials?.email === user.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
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
