import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";

import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ModalProvider } from "@/providers/modals-provider";
import { cn } from "@/lib/utils";
import { SocketIoProvider } from "@/providers/socket-provider";
import { QueryProvider } from "@/providers/query-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord clone",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
            <SocketIoProvider>
              <ModalProvider />
                <QueryProvider>
                  {children}
                </QueryProvider>
            </SocketIoProvider>
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
