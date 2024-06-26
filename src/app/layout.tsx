import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Navigation } from "./navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "gynt",
  description: "Better Pull Request interface for GitHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            inter.variable,
            "flex min-h-screen flex-col bg-background font-sans antialiased",
          )}
        >
          <Navigation />
          <div className="flex-grow">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
