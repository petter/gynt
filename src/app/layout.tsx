import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkProvider,
} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Better PR",
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
          // biome-ignore lint/nursery/useSortedClasses: <explanation>
          className={[inter.className, "bg-slate-900 text-slate-50"].join(" ")}
        >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
