import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./lib/siteMetadata";

const title = "Niharika Mishra, Designer who builds.";
const description =
  "Designer with an engineering background. I think in systems, design for humans, and build to ship.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/home.jpg"],
  },
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
