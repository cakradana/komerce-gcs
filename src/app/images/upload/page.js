"use client";

import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import fetchClient from "@/lib/client/fetchClient"; // Adjust the import path as needed

const { Dragger } = Upload;

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  const props = {
    name: 'file',
    multiple: false,
    action: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/upload`, // Adjust this to your upload endpoint
    async customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetchClient({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/upload`,
          body: formData,
          auth: true, // This ensures the request is authenticated
        });

        const result = await response.json();
        onSuccess(result, file);
      } catch (error) {
        onError(error);
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div
      style={{
        marginTop: 16,
        padding: 24,
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <h1>Welcome, {session.user.username}</h1>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
    </div>
  );
}