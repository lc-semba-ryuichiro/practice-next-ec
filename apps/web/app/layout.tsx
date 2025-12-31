import { Geist_Mono, Inter, Noto_Sans_JP } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";

import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Practice Next EC",
  description: "Next.js 16 EC サイト練習プロジェクト",
};

/**
 * アプリケーションのルートレイアウトコンポーネント
 * @param props - コンポーネントのプロパティ
 * @param props.children - 子要素
 * @returns ルートレイアウト要素
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
