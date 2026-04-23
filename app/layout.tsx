import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ThemeToggle } from "./components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "myboard",
  description: "Erikova osobná nástenka v Claude palete",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "myboard" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F3EE" },
    { media: "(prefers-color-scheme: dark)", color: "#171411" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk" suppressHydrationWarning>
      <body style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('myboard-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})();`}
        </Script>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
