import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LivEnergy - Sua economia é a nossa energia",
  keywords: ["energia", "economia", "energia renovável"],
  description: "Sua economia é a nossa energia",
  authors: [{ name: "LivEnergy" }],
  creator: "LivEnergy",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "LivEnergy - Sua economia é a nossa energia",
    description: "Sua economia é a nossa energia",
    url: "https://livenergy.com.br",
    siteName: "LivEnergy",
    locale: "pt-BR",
    type: "website",
    images: [
      {
        url: "https://d2i61nj9m5jy3t.cloudfront.net/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imagem de capa da LivEnergy",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
