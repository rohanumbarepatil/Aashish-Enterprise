"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sprout,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/icons";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export function Footer() {
  const { language, setLanguage, t } = useLanguage();
  const isEn = language === "en";

  return (
    <footer className="bg-[#0E3813] text-white pt-16 pb-12 border-t-4 border-[#16A34A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-emerald-900/60">
          {/* Brand Intro & Operating APMCs */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#D97706] flex items-center justify-center text-white">
                <Sprout className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white leading-tight">
                  {isEn ? BUSINESS_CONFIG.nameEn : BUSINESS_CONFIG.nameMr}
                </h3>
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  {isEn ? "Agricultural Commodity Trading" : "कृषी शेतमाल व्यापार व आडत"}
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-100/80 leading-relaxed">
              {t(
                BUSINESS_CONFIG.businessModelMr,
                BUSINESS_CONFIG.businessModelEn
              )}
            </p>

            <div className="pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
                {t("कार्यरत बाजार समित्या (APMC):", "Operating APMC Markets:")}
              </span>
              <ul className="text-xs text-emerald-200/90 space-y-1">
                {BUSINESS_CONFIG.apmcOperatingMarkets.slice(0, 3).map((mandi) => (
                  <li key={mandi} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{mandi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {t("महत्त्वाच्या लिंक्स", "Quick Links")}
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  {t("मुख्यपृष्ठ (Home)", "Home")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  {t("आमच्याबद्दल (About Us)", "About Us")}
                </Link>
              </li>
              <li>
                <Link href="/commodities" className="hover:text-amber-300 transition-colors">
                  {t("शेतमाल उत्पादने (Products)", "Products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-produce"
                  className="hover:text-amber-300 transition-colors font-medium text-amber-200"
                >
                  {t("शेतमाल विक्री नोंद (Sell Produce)", "Sell Produce Registration")}
                </Link>
              </li>
              <li>
                <Link href="/track-request" className="hover:text-amber-300 transition-colors">
                  {t("विनंती ट्रॅकिंग (Track Request)", "Track Sale Request")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  {t("संपर्क (Contact)", "Contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="hover:text-amber-300 transition-colors text-xs text-emerald-300"
                >
                  {t("कर्मचारी / ॲडमीन लॉगिन", "Staff / Admin Login")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Commodities List (5 Main + Core) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {t("प्रमुख कृषी उत्पादने", "Main Commodities")}
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-emerald-100/90">
              <Link href="/commodities" className="hover:text-white">
                • {t("गहू (Wheat)", "Wheat (गहू)")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("ज्वारी (Jowar)", "Jowar / Sorghum")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("हळद (Turmeric)", "Turmeric (हळद)")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("टाळक्या (Talakya)", "टाळक्या (Talakya)")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("कापूस (Cotton)", "Cotton (कापूस)")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("सोयाबीन (Soybean)", "Soybean (सोयाबीन)")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("हरभरा (Chana)", "Gram / Chana")}
              </Link>
              <Link href="/commodities" className="hover:text-white">
                • {t("मूग (Moong)", "Moong (मूग)")}
              </Link>
            </div>
            <p className="text-[11px] text-emerald-300/70 pt-2 italic">
              {t(
                "* शेतमाल खरेदी-विक्री व चालू दरांसाठी थेट संपर्क करा.",
                "* Contact directly for commodity buying, selling, and current mandi rates."
              )}
            </p>
          </div>

          {/* Contact Details & Direct CTAs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              {t("कार्यालय व संपर्क", "Contact & Location")}
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href={BUSINESS_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-100 leading-relaxed"
                >
                  {t(BUSINESS_CONFIG.registeredAddressMr, BUSINESS_CONFIG.registeredAddressEn)}
                  <span className="block text-[11px] text-amber-300 font-semibold mt-0.5">
                    📍 {t("दुकानाचे ठिकाण पहा (Google Maps)", "Visit Our Shop on Maps")}
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {t(BUSINESS_CONFIG.contact.workingHoursMr, BUSINESS_CONFIG.contact.workingHoursEn)}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                  className="hover:underline text-emerald-100"
                >
                  {BUSINESS_CONFIG.contact.email}
                </a>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={buildCallLink()}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-white font-medium text-xs transition-colors border border-emerald-700/50"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t("कॉल करा:", "Call Now:")} {BUSINESS_CONFIG.contact.displayPhone}</span>
                </a>

                <a
                  href={buildWhatsAppLink({ lang: language })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803d] text-white font-medium text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>{t("WhatsApp वर संपर्क करा", "Chat on WhatsApp")}</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-pink-900/40 hover:bg-pink-900/60 text-white font-medium text-xs transition-colors border border-pink-700/50"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                  <span>{t("Instagram वर Follow करा", "Follow us on Instagram")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Mandatory Disclaimers */}
        <div className="py-6 border-b border-emerald-900/60 text-xs text-emerald-200/80 space-y-2">
          <p className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>{t("बाजारभाव व व्यवहार सूचना:", "Trading Notice:")}</strong>{" "}
              {t(
                BUSINESS_CONFIG.disclaimers.pricingNoticeMr,
                BUSINESS_CONFIG.disclaimers.pricingNoticeEn
              )}
            </span>
          </p>
          <p className="pl-6 text-[11px] text-emerald-300/70">
            {t(
              BUSINESS_CONFIG.disclaimers.licensingNoticeMr,
              BUSINESS_CONFIG.disclaimers.licensingNoticeEn
            )}
          </p>
        </div>

        {/* Bottom Bar: Copyright, Language Switcher & Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>
            © 2026 {BUSINESS_CONFIG.nameEn}. {t("सर्व हक्क राखीव.", "All Rights Reserved.")}
          </p>

          {/* Languages Toggle in Footer */}
          <div className="flex items-center gap-2 text-xs">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-300/80">{t("भाषा / Language:", "Language:")}</span>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 rounded transition-colors ${
                isEn ? "text-amber-300 font-bold underline" : "text-emerald-200 hover:text-white"
              }`}
            >
              English
            </button>
            <span className="text-emerald-500">|</span>
            <button
              type="button"
              onClick={() => setLanguage("mr")}
              className={`px-2 py-0.5 rounded transition-colors ${
                !isEn ? "text-amber-300 font-bold underline" : "text-emerald-200 hover:text-white"
              }`}
            >
              मराठी
            </button>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {t("गोपनीयता धोरण (Privacy)", "Privacy Policy")}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t("नियम व अटी (Terms)", "Terms of Service")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
