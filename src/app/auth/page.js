"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import { serverLogin } from "../actions/auth";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    console.log("Received values of form: ", values);

    const result = await serverLogin(values);

    if (result.success) {
      router.push("/images");
    } else {
      message.error("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[url('/images/login-bg.svg')] bg-cover bg-bottom min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex justify-center items-center mb-4">
          <Image
            src="/images/komerce.svg"
            alt="Komerce Logo"
            width={75}
            height={75}
          />
          <Image
            src="/images/gcs.svg"
            alt="GCS Logo"
            width={100}
            height={100}
          />
        </div>
        <Card className="w-full max-w-sm p-4">
          <h1 className="text-3xl mb-4 text-center">Login</h1>
          <Form
            name="login"
            onFinish={onFinish}
            className="flex flex-col items-center"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              className="w-full"
            >
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              className="w-full"
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item className="w-full">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Login as Admin
              </Button>
            </Form.Item>
            <Form.Item className="w-full">
              <Button
                type="default"
                href="/images"
                className="w-full"
              >
                Login as Guest
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
