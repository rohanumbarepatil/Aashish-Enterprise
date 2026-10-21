import * as React from "react";
import Link from "next/link";
import { Sprout, Phone, MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";

export function Footer() {
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
                  {BUSINESS_CONFIG.nameMr}
                </h3>
                <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                  {BUSINESS_CONFIG.nameEn}
                </p>
              </div>
            </div>

            <p className="text-sm text-emerald-100/80 leading-relaxed">
              {BUSINESS_CONFIG.taglineMr}. कृषी उत्पन्न बाजार समिती (APMC) परवानाधारक आडत व खरेदी-विक्री सेवा.
            </p>

            <div className="pt-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-2">
                कार्यरत बाजार समित्या:
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
              महत्त्वाच्या लिंक्स
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/90">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  मुख्यपृष्ठ (Home)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  आमच्याबद्दल (About Us)
                </Link>
              </li>
              <li>
                <Link href="/commodities" className="hover:text-amber-300 transition-colors">
                  शेतमाल यादी (Agricultural Commodities)
                </Link>
              </li>
              <li>
                <Link href="/sell-produce" className="hover:text-amber-300 transition-colors font-medium text-amber-200">
                  शेतमाल विक्री विनंती (Sell Produce Form)
                </Link>
              </li>
              <li>
                <Link href="/track-request" className="hover:text-amber-300 transition-colors">
                  विनंती ट्रॅकिंग (Track Your Request)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  थेट संपर्क (Contact Us)
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-amber-300 transition-colors text-xs text-emerald-300">
                  कर्मचारी पोर्टल (Admin Login)
                </Link>
              </li>
            </ul>
          </div>

          {/* Commodities List */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              प्रमुख शेतमाल
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-emerald-100/90">
              <span className="hover:text-white">• हळद (काडी/गोळा)</span>
              <span className="hover:text-white">• ताळक्या / तालक्या</span>
              <span className="hover:text-white">• सोयाबीन</span>
              <span className="hover:text-white">• कापूस</span>
              <span className="hover:text-white">• गहू (लोकवन)</span>
              <span className="hover:text-white">• ज्वारी (मालदांडी)</span>
              <span className="hover:text-white">• हरभरा (चना)</span>
              <span className="hover:text-white">• मूग (हिरवा)</span>
              <span className="hover:text-white">• हळद तुकडी</span>
              <span className="hover:text-white">• इतर शेतमाल</span>
            </div>
            <p className="text-[11px] text-emerald-300/70 pt-2 italic">
              * सर्व प्रकारच्या शेतमालाच्या आवक व विक्रीसाठी थेट संपर्क करा.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
              कार्यालय व संपर्क
            </h4>
            <div className="space-y-3 text-xs text-emerald-100/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {BUSINESS_CONFIG.registeredAddressMr}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{BUSINESS_CONFIG.contact.workingHoursMr}</span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={buildCallLink()}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-white font-medium text-xs transition-colors border border-emerald-700/50"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>कॉल: {BUSINESS_CONFIG.contact.displayPhone}</span>
                </a>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803d] text-white font-medium text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp वर चॅट करा</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Mandatory APMC Disclaimers */}
        <div className="py-6 border-b border-emerald-900/60 text-xs text-emerald-200/80 space-y-2">
          <p className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>बाजारभाव व व्यवहार सूचना:</strong> {BUSINESS_CONFIG.disclaimers.pricingNoticeMr}
            </span>
          </p>
          <p className="pl-6 text-[11px] text-emerald-300/70">
            {BUSINESS_CONFIG.disclaimers.licensingNoticeMr}
          </p>
        </div>

        {/* Copyright & Policy Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/70">
          <p>
            © 2026 {BUSINESS_CONFIG.nameMr} ({BUSINESS_CONFIG.nameEn}). सर्व हक्क राखीव.
          </p>

          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              गोपनीयता धोरण (Privacy Policy)
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              नियम व अटी (Terms & Conditions)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
