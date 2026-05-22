import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Niharika Mishra — Designer who builds.",
  description:
    "Designer with an engineering background. I think in systems, design for humans, and build to ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
