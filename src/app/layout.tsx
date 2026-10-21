import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "आशिष एंटरप्राइजेस | Ashish Enterprises - कृषी शेतमाल व्यापार",
  description:
    "महाराष्ट्र आधारित कृषी शेतमाल व्यापार व आडत सेवा. गहू, ज्वारी, हळद, ताळक्या, कापूस, सोयाबीन, मूग, हरभरा आणि इतर शेतमालासाठी थेट संपर्क करा.",
  keywords: [
    "Ashish Enterprises",
    "आशिष एंटरप्राइजेस",
    "हळद व्यापार",
    "शेतमाल खरेदी",
    "APMC Hingoli",
    "हिंगोली बाजार समिती",
    "कृषी आडत",
    "सोयाबीन भाव",
    "कापूस खरेदी",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${notoSansDevanagari.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8FAF8] text-[#17231B]">
        {children}
      </body>
    </html>
  );
}
