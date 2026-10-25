"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sprout,
  Users,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  MessageCircle,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";

export function TrustIntro() {
  const { language, t } = useLanguage();


  return (
    <section id="about" className="py-16 md:py-20 bg-white border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section 12: About Ashish Enterprises */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            {t("आमची ओळख", "About Our Business")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            {t("आशिष एंटरप्राइजेस बद्दल", "About Ashish Enterprises")}
          </h2>
          <p className="text-[#374151] text-base md:text-lg leading-relaxed pt-2">
            {t(BUSINESS_CONFIG.aboutTextMr, BUSINESS_CONFIG.aboutTextEn)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link href="/contact">
              <Button variant="primary" size="md" className="gap-2">
                <span>{t("थेट संपर्क करा", "Contact Ashish Enterprises")}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href={buildWhatsAppLink({ lang: language })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="md"
                className="gap-2 border-emerald-600/40 text-[#14532D] hover:bg-emerald-50"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{t("WhatsApp वर बोला", "WhatsApp Now")}</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Section 11: Farmer / Buyer Value Proposition */}
        <div id="services" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {t("दोघांसाठी उपयुक्त व्यवस्था", "Value Proposition")}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#14532D]">
              {t("शेतकरी आणि खरेदीदारांसाठी आमची मूल्ये", "For Farmers & Large Buyers")}
            </h3>
            <p className="text-sm text-[#4B5563]">
              {t(
                "शेतकऱ्यांना विश्वासार्ह शेतमाल विक्री आणि मोठ्या व्यापाऱ्यांना दर्जेदार शेतमाल पुरवठा.",
                "Connecting agricultural producers with reliable commercial merchants through direct communication."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Value Proposition for Farmers */}
            <div className="rounded-3xl border-2 border-emerald-200 bg-[#F0FDF4]/60 p-7 md:p-8 space-y-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-emerald-200/80 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#14532D] text-white flex items-center justify-center shadow-xs">
                    <Sprout className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                      {t("शेतकरी बांधवांसाठी", "For Farmers")}
                    </span>
                    <h4 className="text-xl font-bold text-[#14532D]">
                      {t("सोपी व पारदर्शक शेतमाल विक्री", "Easy Produce Selling")}
                    </h4>
                  </div>
                </div>

                <ul className="space-y-3.5 text-sm text-[#1F2937]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#14532D]">{t("सोपा संपर्क:", "Easy Contact:")}</strong>{" "}
                      <span>{t("फोन कॉल आणि WhatsApp वर थेट आमच्याशी संपर्क साधता येतो.", "Direct access via phone call or WhatsApp without hurdles.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#14532D]">{t("शेतमाल विक्री नोंद:", "Commodity Selling:")}</strong>{" "}
                      <span>{t("गहू, ज्वारी, हळद, टाळक्या, कापूस विक्रीसाठी त्वरित नोंदणी करा.", "Straightforward registration for selling wheat, jowar, turmeric, cotton.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#14532D]">{t("जलद संवाद:", "Quick Communication:")}</strong>{" "}
                      <span>{t("विनंती पाठवताच प्रतिनिधीकडून लगेच संपर्क व मार्गदर्शन.", "Prompt response and guidance from our team upon enquiry.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#14532D]">{t("पारदर्शक व्यवहार:", "Transparent Dealing:")}</strong>{" "}
                      <span>{t("अधिकृत वजन तोलाई, स्पष्ट हिशोब आणि वेळेवर पेमेंट प्रक्रिया.", "Certified accurate weighing, clear statement slips and timely payments.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#14532D]">{t("सुलभ व्यापार प्रक्रिया:", "Convenient Business Process:")}</strong>{" "}
                      <span>{t("शेतकऱ्यांचा वेळ व कष्ट वाचवणारी सोपी कार्यप्रणाली.", "Hassle-free process designed to save farmers' valuable time.")}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-emerald-200/80 flex items-center justify-between">
                <Link href="/sell-produce" className="w-full">
                  <Button variant="primary" size="md" className="w-full justify-center gap-2">
                    <span>{t("शेतमाल विक्री विनंती नोंदवा", "Register Sell Produce")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Value Proposition for Buyers & Merchants */}
            <div className="rounded-3xl border-2 border-amber-200 bg-[#FFFBEB]/60 p-7 md:p-8 space-y-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-amber-200/80 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B45309]">
                      {t("मोठ्या खरेदीदार व व्यापाऱ्यांसाठी", "For Buyers & Merchants")}
                    </span>
                    <h4 className="text-xl font-bold text-[#78350F]">
                      {t("विश्वसनीय कृषी माल पुरवठा", "Reliable Commodity Sourcing")}
                    </h4>
                  </div>
                </div>

                <ul className="space-y-3.5 text-sm text-[#1F2937]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#78350F]">{t("दर्जेदार शेतमाल पुरवठा:", "Commodity Sourcing:")}</strong>{" "}
                      <span>{t("शेतकऱ्यांकडून थेट संकलित केलेला उच्च गुणवत्तेचा कृषी माल.", "Direct farm-sourced quality produce from Marathwada APMC regions.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#78350F]">{t("विविध शेतमाल श्रेणी:", "Multiple Categories:")}</strong>{" "}
                      <span>{t("गहू, ज्वारी, हळद (काडी/गोळा), टाळक्या, कापूस व कडधान्ये.", "Regular supply of wheat, sorghum, turmeric varieties, talakya & cotton.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#78350F]">{t("थेट व्यावसायिक संवाद:", "Direct Business Communication:")}</strong>{" "}
                      <span>{t("घाऊक व्यापाऱ्यांशी थेट चर्चा, दरांचे पारदर्शक नियोजन.", "Direct business interactions, clear commission & margin structures.")}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#78350F]">{t("कार्यक्षम समन्वय:", "Efficient Coordination:")}</strong>{" "}
                      <span>{t("बाजार समिती परवानाधारक विश्वासार्ह व्यवस्थापन.", "Licensed APMC handling ensuring professional fulfillment.")}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-amber-200/80 flex items-center justify-between">
                <a href={buildCallLink()} className="w-full">
                  <Button variant="outline" size="md" className="w-full justify-center gap-2 border-amber-600/40 text-[#78350F] hover:bg-amber-100/50">
                    <Phone className="w-4 h-4 text-[#D97706]" />
                    <span>{t("खरेदीसाठी संपर्क: ९९२२६५२१११", "Trade Enquiry: 9922652111")}</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Operating APMC markets badge bar */}
        <div className="p-5 md:p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#16A34A] shrink-0" />
            <span className="text-sm font-bold text-[#14532D]">
              {t("कार्यरत प्रमुख कृषी उत्पन्न बाजार समित्या (APMC):", "Operating Agricultural Market Yards (APMC):")}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#14532D]">
            {BUSINESS_CONFIG.apmcOperatingMarkets.map((m) => (
              <span
                key={m}
                className="px-3.5 py-1.5 bg-white rounded-lg border border-[#A7F3D0] shadow-xs"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
