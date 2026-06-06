import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIActReady",
  description: "EU AI Act Compliance Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-[#111] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
