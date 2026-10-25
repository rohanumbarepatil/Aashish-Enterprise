"use client";

import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { BUSINESS_CONFIG } from "@/config/business";
import {
  Scale,
  ShieldCheck,
  MapPin,
  Handshake,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";

export default function AboutPage() {
  const { language, t } = useLanguage();


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        {/* Page Banner */}
        <section className="bg-gradient-to-b from-[#ECFDF5] to-white py-12 md:py-16 border-b border-[#E1E8E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
              {t("आमची ओळख व कार्यपद्धती", "Who We Are & How We Operate")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D]">
              {t("आशिष एंटरप्राइजेस बद्दल (About Us)", "About Ashish Enterprises")}
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t(BUSINESS_CONFIG.businessTypeMr, BUSINESS_CONFIG.businessTypeEn)}
            </p>
          </div>
        </section>

        {/* Business Overview & Journey */}
        <section className="py-14 md:py-18">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-[#14532D]">
                  {t(
                    "शेतकरी आणि मोठ्या व्यापाऱ्यांमधील विश्वासार्ह दुवा",
                    "Connecting Agricultural Producers with Buyers"
                  )}
                </h2>
                {/* Section 12 text */}
                <p className="text-base text-[#374151] leading-relaxed">
                  {t(BUSINESS_CONFIG.aboutTextMr, BUSINESS_CONFIG.aboutTextEn)}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <a href={buildCallLink()}>
                    <Button variant="primary" size="sm" className="gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{t("कॉल करा: ९९२२६५२१११", "Call: 9922652111")}</span>
                    </Button>
                  </a>

                  <a
                    href={buildWhatsAppLink({ lang: language })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="leaf"
                      size="sm"
                      className="gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Agricultural Focus Box */}
              <div className="rounded-2xl border border-[#E1E8E1] bg-[#F8FAF8] p-6 md:p-8 space-y-5 shadow-xs">
                <h3 className="text-lg font-bold text-[#14532D] border-b border-[#E1E8E1] pb-3">
                  {t("आमची प्रमुख व्यावसायिक वैशिष्ट्ये", "Our Business Principles")}
                </h3>
                <ul className="space-y-3.5 text-sm text-[#374151]">
                  <li className="flex items-start gap-3">
                    <Scale className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong>{t("इलेक्ट्रॉनिक काटा:", "Accurate Weighing:")}</strong>{" "}
                      <span>{t("अधिकृत धर्मकाट्यावर अचूक वजन आणि पारदर्शक तोलाई पावती.", "Certified electronic weighing with clear receipts.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong>{t("APMC नियमांचे पालन:", "APMC Compliance:")}</strong>{" "}
                      <span>{t("महाराष्ट्र कृषी उत्पन्न बाजार समितीच्या कायदेशीर चौकटीत व्यवहार.", "Adherence to all official market yard procedures.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Handshake className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong>{t("पारदर्शक पट्टी व हिशोब:", "Transparent Accounts:")}</strong>{" "}
                      <span>{t("कमिशन, तोलाई व हमालीचा स्पष्ट व अचूक हिशोब.", "Clear documentation with no hidden charges.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong>{t("स्थानिक उपस्थिती:", "Regional Presence:")}</strong>{" "}
                      <span>{t("हिंगोली, वसमत, नांदेड, परभणी आणि लातूर बाजारपेठेत कार्यरत.", "Active presence across regional APMC trading centers.")}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Operating Mandis */}
            <div className="p-8 rounded-3xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-4">
              <h3 className="text-xl font-bold text-[#14532D]">
                {t("आमचे कार्यक्षेत्र (APMC Mandis)", "Operating Mandis")}
              </h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                {t(
                  "आम्ही प्रामुख्याने खालील कृषी उत्पन्न बाजार समित्यांमध्ये शेतमाल खरेदी व आडतीचे व्यवहार सांभाळतो:",
                  "We handle agricultural commodity trading and transactions across the following APMC market yards:"
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                {BUSINESS_CONFIG.apmcOperatingMarkets.map((mandi) => (
                  <div
                    key={mandi}
                    className="p-3 bg-white rounded-xl border border-[#A7F3D0] text-xs font-semibold text-[#14532D] shadow-2xs"
                  >
                    • {mandi}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center space-y-4 pt-6 border-t border-[#E1E8E1]">
              <h3 className="text-xl md:text-2xl font-bold text-[#14532D]">
                {t("आमच्याशी थेट संपर्क साधा", "Connect With Us Today")}
              </h3>
              <p className="text-sm text-[#4B5563] max-w-xl mx-auto">
                {t(
                  "गहू, ज्वारी, हळद, टाळक्या, कापूस खरेदी किंवा विक्रीसाठी आमच्या टीमशी थेट बोला.",
                  "Reach out to trade wheat, jowar / sorghum, turmeric, talakya, cotton or other commodities."
                )}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact">
                  <Button variant="primary" size="lg" className="gap-2">
                    <span>{t("संपर्क साधा", "Contact Us")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href={BUSINESS_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2 border-emerald-600/40 text-[#14532D]">
                    <MapPin className="w-4 h-4 text-[#16A34A]" />
                    <span>{t("दुकानाचे ठिकाण पहा", "Visit Shop on Maps")}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
