"use client";

import { createElement } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FileImageOutlined, UploadOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Content, Footer } = Layout;

export default function ImagesLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const items = [
    {
      key: "/images",
      icon: FileImageOutlined,
      label: "Images",
    },
    {
      key: "/images/upload",
      icon: UploadOutlined,
      label: "Upload",
      disabled: true,
    },
  ].map((item) => ({
    ...item,
    icon: createElement(item.icon),
  }));

  const handleOnClickMenu = (el) => {
    router.push(el.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menu
        mode="horizontal"
        activeKey={pathname}
        items={items}
        onClick={handleOnClickMenu}
        style={{ width: "auto" }}
      />
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          {children}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          R. Cakradana ©{new Date().getFullYear()} Made with 💔 for Komerce
        </Footer>
      </Layout>
    </Layout>
  );
}
