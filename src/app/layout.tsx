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
  title: "Projet Premium",
  description: "Typographies Antonio + Roboto",
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
