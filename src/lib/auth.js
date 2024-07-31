import fetchClient from "@/lib/fetch-client";
import { jwt } from "@/lib/utils";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";

export const authOptions = {
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
    maxAge: 1209600,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {  
        const res = await fetchClient({
          method: "POST",
          url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/v1/login",
          body: JSON.stringify(credentials),
        });

        console.log(res);

        const user = await res.json();

        console.log(user);

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
}