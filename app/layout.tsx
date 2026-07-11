import type { Metadata } from "next";
import { Geist, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif_KR({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteTitle = "리봄 — 품격있는 프리미엄 시니어 멤버십";
const siteDescription =
  "50대 이상을 위한 다단계 신원 검증 기반 프리미엄 인연 플랫폼. 검증된 인연만이 모이는 공간, 리봄.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    locale: "ko_KR",
    siteName: "리봄",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${notoSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
