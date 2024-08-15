import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchServer from "@/lib/server/fetchServer";

export const authOptions = {
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 1209600, // 14 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.data.token;
        token.username = user.data.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = { username: token.username };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetchServer({
            method: "POST",
            url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/v1/login",
            body: JSON.stringify(credentials),
          });

          const user = await res.json();

          if (res.ok && user.status === "success") {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };