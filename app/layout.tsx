import type { Metadata, Viewport } from "next";
import "./globals.css";
import { TimelineNav } from "@/components/TimelineNav";

export const metadata: Metadata = {
  title: "Tapasya Sharma — Portfolio",
  description: "Interactive portfolio, résumé, and creative showcase.",
  openGraph: {
    title: "Tapasya Sharma — Portfolio",
    description: "Interactive portfolio, résumé, and creative showcase.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased gradient-bg" suppressHydrationWarning>
        <TimelineNav />
        <main className="mx-auto max-w-4xl px-5 sm:px-6 pt-20 lg:pt-16 lg:pl-56 pb-24">
          {children}
        </main>
        <footer className="border-t border-border/60 py-8 text-center text-xs sm:text-sm text-muted px-5">
          © {new Date().getFullYear()} Tapasya Sharma. Built with Next.js + Framer Motion.
        </footer>
      </body>
    </html>
  );
}
