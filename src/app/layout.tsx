import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import GlobalFooter from "@/components/sections/global-footer";
import IntroSplash from "@/components/intro-splash";
import ClientLayout from "@/components/client-layout";

export const metadata: Metadata = {
  title: "Romain Rubens",
  description: "RomainRubens (EN)",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        <IntroSplash />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ClientLayout>{children}</ClientLayout>
        <GlobalFooter />
      </body>
    </html>
  );
}