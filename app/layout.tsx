import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { VisionBoard } from "@/components/ui/VisionBoard";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Portfolio | Developer & Creator",
  description: "Personal portfolio showcasing projects, experience, and a little magic.",
  openGraph: {
    title: "Portfolio | Developer & Creator",
    description: "Personal portfolio showcasing projects, experience, and a little magic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <VisionBoard />
        <ScrollProgressBar />
        <Nav />
        {children}
      </body>
    </html>
  );
}