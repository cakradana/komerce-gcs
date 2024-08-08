import { AuthProvider } from "@/components/auth-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

export const metadata = {
  title: "Komerce GCS",
  description: "Find and upload images",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AntdRegistry>
        <AuthProvider>
          <body>{children}</body>
        </AuthProvider>
      </AntdRegistry>
    </html>
  );
}
