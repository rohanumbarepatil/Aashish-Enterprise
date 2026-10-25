import type { Metadata, Viewport } from "next";
import { Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { FloatingWhatsApp } from "@/components/public/floating-whatsapp";
import { BUSINESS_CONFIG } from "@/config/business";

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashish Enterprises | Agricultural Commodity Trading | कृषी माल व्यापार",
  description:
    "Ashish Enterprises deals in agricultural commodities including wheat, jowar, turmeric, टाळक्या and cotton, connecting farmers with large buyers. Contact us for business enquiries.",
  keywords: [
    "Ashish Enterprises",
    "आशिष एंटरप्राइजेस",
    "Agricultural Commodity Trading",
    "कृषी माल व्यापार",
    "Wheat",
    "गहू",
    "Jowar",
    "ज्वारी",
    "Turmeric",
    "हळद",
    "टाळक्या",
    "Cotton",
    "कापूस",
    "APMC Hingoli",
    "हिंगोली बाजार समिती",
  ],
  openGraph: {
    title: "Ashish Enterprises | Agricultural Commodity Trading",
    description:
      "Ashish Enterprises deals in agricultural commodities including wheat, jowar, turmeric, टाळक्या and cotton, connecting farmers with large buyers.",
    url: "https://ashishenterprises.local",
    siteName: "Ashish Enterprises",
    locale: "mr_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS_CONFIG.nameEn,
  alternateName: BUSINESS_CONFIG.nameMr,
  description:
    "Ashish Enterprises deals in agricultural commodities including wheat, jowar, turmeric, टाळक्या and cotton, connecting farmers with large buyers.",
  telephone: BUSINESS_CONFIG.contact.primaryPhone,
  email: BUSINESS_CONFIG.contact.email,
  hasMap: BUSINESS_CONFIG.mapsUrl,
  sameAs: [BUSINESS_CONFIG.instagramUrl],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 28, Main APMC Market Yard",
    addressLocality: "Hingoli",
    addressRegion: "Maharashtra",
    postalCode: "431513",
    addressCountry: "IN",
  },
  priceRange: "₹₹",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${notoSansDevanagari.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAF8] text-[#17231B]">
        <LanguageProvider>
          {children}
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}

