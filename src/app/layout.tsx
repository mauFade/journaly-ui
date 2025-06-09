import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Journaly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>{children}</ClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
