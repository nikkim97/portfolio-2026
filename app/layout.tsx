import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Niharika Mishra, Designer who builds.",
  description:
    "Designer with an engineering background. I think in systems, design for humans, and build to ship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
