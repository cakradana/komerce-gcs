import { signIn } from "next-auth/react";
import fetchServer from "@/lib/server/fetchServer";

export async function serverLogin(values) {
  const { username, password } = values;
  try {
    const response = await fetchServer({
      method: "POST",
      url: process.env.NEXT_PUBLIC_BACKEND_API_URL + "/api/v1/login",
      body: JSON.stringify({ username, password }),
    });

    const user = await response.json();

    if (response.ok && user) {
      // Use the credentials provider to sign in
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      return { success: true, user };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred during login" };
  }
}