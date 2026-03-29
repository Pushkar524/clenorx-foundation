import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ForceLightMode } from "@/components/ForceLightMode";
import { LangProvider } from "@/components/LangProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "ClenorX Foundation — Financial Literacy for All",
  description:
    "ClenorX Foundation empowers children and Self-Help Groups in rural India with financial literacy education. Join us to build a financially responsible generation.",
  keywords: [
    "financial literacy",
    "NGO",
    "rural India",
    "children education",
    "SHG",
    "ClenorX",
  ],
  authors: [{ name: "ClenorX Foundation" }],
  openGraph: {
    title: "ClenorX Foundation",
    description: "Empowering Children With Financial Knowledge For A Better Future",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2563EB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" data-theme="light" suppressHydrationWarning style={{ colorScheme: "light" }}>
      <body className="light bg-background text-foreground" style={{ colorScheme: "light" }}>
        <ForceLightMode />
        <LangProvider>
          {children}
          <Toaster richColors position="top-right" />
        </LangProvider>
      </body>
    </html>
  );
}

