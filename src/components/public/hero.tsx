"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, ArrowRight, ShieldCheck, Scale, MapPin, Phone } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export function Hero() {
  const { language, t } = useLanguage();
  const isEn = language === "en";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#ECFDF5] via-[#F8FAF8] to-white py-12 md:py-20 lg:py-24 border-b border-[#E1E8E1]">
      {/* Subtle organic background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-200 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-amber-200 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines, Supporting Copy, and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-[#14532D] text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              <span>
                {t(BUSINESS_CONFIG.marketTypeMr, "Licensed APMC Commodity Trading & Adat")}
              </span>
            </div>

            {/* Primary Business Name & Headline */}
            <div className="space-y-2">
              <span className="block text-xl sm:text-2xl font-bold text-[#16A34A]">
                {isEn ? BUSINESS_CONFIG.nameEn : BUSINESS_CONFIG.nameMr}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#14532D] tracking-tight leading-[1.25]">
                {t("विश्वासार्ह कृषी माल व्यापार", "Trusted Agricultural Commodity Trading")}
              </h1>
            </div>

            {/* Supporting Text strictly as requested */}
            <p className="text-base sm:text-lg md:text-xl text-[#374151] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {t(
                "आम्ही शेतकऱ्यांकडून दर्जेदार कृषी माल खरेदी करून विश्वासार्ह मोठ्या व्यापाऱ्यांपर्यंत पोहोचवतो.",
                "We source quality agricultural commodities from farmers and connect them with reliable large buyers through a transparent and efficient trading process."
              )}
            </p>

            {/* Core Commodities Highlight Line */}
            <p className="text-xs sm:text-sm text-[#14532D] font-medium bg-white/70 py-1.5 px-3 rounded-lg border border-emerald-100 inline-block">
              🌾 {t("प्रमुख शेतमाल:", "Main Commodities:")}{" "}
              <span className="font-bold text-[#14532D]">
                {t(
                  "गहू • ज्वारी • हळद • टाळक्या • कापूस",
                  "Wheat • Jowar / Sorghum • Turmeric • टाळक्या • Cotton"
                )}
              </span>
            </p>

            {/* Three Required CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* CTA 1: Contact Us */}
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2.5 shadow-md hover:shadow-lg">
                  <span>{t("संपर्क करा", "Contact Us")}</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              {/* CTA 2: WhatsApp Us */}
              <a
                href={buildWhatsAppLink({ lang: language })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="leaf"
                  size="lg"
                  className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white border-transparent"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{t("WhatsApp करा", "WhatsApp Us")}</span>
                </Button>
              </a>

              {/* CTA 3: View Location */}
              <a
                href={BUSINESS_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-emerald-600/40 text-[#14532D] hover:bg-emerald-50">
                  <MapPin className="w-4 h-4 text-[#16A34A]" />
                  <span>{t("दुकानाचे ठिकाण", "View Location")}</span>
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#E1E8E1] text-xs text-[#4B5563] text-left">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{t("काटा व वजन पारदर्शकता", "Accurate Weighing")}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{t("पारदर्शक व्यापार पट्टी", "Transparent Accounting")}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>{t("हिंगोली व मराठवाडा मंडी", "APMC Hingoli & Region")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with 5 Key Commodities Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Highlight Card with Real Agricultural Focus */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5 md:p-6 shadow-xl relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-[#F1F5F1] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="font-bold text-sm text-[#14532D]">
                      {t("आजचे प्रमुख खरेदी शेतमाल", "Core Commodities Traded")}
                    </span>
                  </div>
                  <span className="text-xs text-[#647067] font-medium">
                    APMC {t("हिंगोली", "Hingoli")}
                  </span>
                </div>

                {/* 5 Main Commodities Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                    <div className="text-xs font-bold text-amber-950">
                      {t("गहू (Wheat)", "Wheat (गहू)")}
                    </div>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      {t("लोकवन / शरबती", "Lokwan / Sharbati")}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
                    <div className="text-xs font-bold text-amber-950">
                      {t("ज्वारी (Jowar)", "Jowar / Sorghum")}
                    </div>
                    <div className="text-[11px] text-amber-800 mt-0.5">
                      {t("मालदांडी / पांढरी", "Maldandi / White")}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-yellow-50 border border-yellow-200">
                    <div className="text-xs font-bold text-yellow-950">
                      {t("हळद (Turmeric)", "Turmeric (हळद)")}
                    </div>
                    <div className="text-[11px] text-yellow-800 mt-0.5">
                      {t("काडी, गोळा, वाळलेली", "Dried Fingers & Bulbs")}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-yellow-50 border border-yellow-200">
                    <div className="text-xs font-bold text-yellow-950">
                      टाळक्या (Talakya)
                    </div>
                    <div className="text-[11px] text-yellow-800 mt-0.5">
                      {t("लांबट जाड हळद प्रत", "Dense Finger Bulbs")}
                    </div>
                  </div>

                  <div className="col-span-2 p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-950">
                        {t("कापूस (Cotton)", "Cotton (कापूस)")}
                      </div>
                      <div className="text-[11px] text-emerald-800 mt-0.5">
                        {t("शुभ्र, लांब धागा शेतमाल", "Clean Long-Staple Raw Cotton")}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200/80 text-emerald-900">
                      {t("नियमित खरेदी", "Active Sourcing")}
                    </span>
                  </div>
                </div>

                {/* Direct quick action banner */}
                <div className="p-3.5 rounded-xl bg-[#14532D] text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-emerald-200">
                      {t("थेट संपर्क किंवा चौकशी?", "Quick Business Enquiry?")}
                    </div>
                    <div className="text-sm font-bold">
                      📞 {BUSINESS_CONFIG.contact.displayPhone}
                    </div>
                  </div>
                  <a href={`tel:${BUSINESS_CONFIG.contact.primaryPhone}`}>
                    <Button variant="accent" size="sm" className="shadow-sm gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{t("कॉल करा", "Call")}</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Decorative Accent under card */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl bg-gradient-to-br from-[#16A34A]/20 to-[#D97706]/20 -z-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
