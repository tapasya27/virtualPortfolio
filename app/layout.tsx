import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { ClientScrollProgressBar } from "@/components/ui/ClientScrollProgressBar";
import { ClientVisionBoard } from "@/components/ui/ClientVisionBoard";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Portfolio | Developer & Creator",
  description: "Personal portfolio showcasing projects, experience, and a little magic.",
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
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
      <head>
        <meta name="format-detection" content="telephone=no,date=no,email=no,address=no" />
        <script dangerouslySetInnerHTML={{ __html: `if(history.scrollRestoration)history.scrollRestoration="manual";window.scrollTo(0,0);` }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <div suppressHydrationWarning>
          <ClientVisionBoard />
          <ClientScrollProgressBar />
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}