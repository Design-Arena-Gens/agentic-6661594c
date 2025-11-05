import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnePlus Clock Widget",
  description: "Highly customizable OnePlus-style clock widget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
