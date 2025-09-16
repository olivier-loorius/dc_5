import type { Metadata } from "next";
import { Antonio, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const antonio = Antonio({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-antonio",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Boys & Toys", template: "%s | Boys & Toys" },
  icons: {
    icon: [{ url: "/Logo.png", type: "image/png" }],
    apple: [{ url: "/Logo.png", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${roboto.variable} ${antonio.variable} h-full`}>
      <body className="app-bg min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
