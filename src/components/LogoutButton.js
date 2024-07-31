"use client";

import { signOut } from "next-auth/react";
import { Button } from "antd";

export default function LogoutButton() {
  return (
    <Button
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
    >
        Log out
    </Button>
  );
}
