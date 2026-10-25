"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { useLanguage } from "@/context/language-context";

export function FloatingWhatsApp() {
  const { language } = useLanguage();

  const isEn = language === "en";
  const defaultMessage = isEn
    ? "Hello Ashish Enterprises, I would like to enquire about agricultural commodities."
    : "नमस्कार आशिष एंटरप्राइजेस, मला कृषी मालाबद्दल माहिती हवी आहे.";

  const href = `https://wa.me/${BUSINESS_CONFIG.contact.whatsAppNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  const ariaLabel = isEn
    ? "Chat on WhatsApp with Ashish Enterprises"
    : "आशिष एंटरप्राइजेस सोबत WhatsApp वर संपर्क करा";

  const buttonText = isEn ? "Chat on WhatsApp" : "WhatsApp वर संपर्क";

  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed bottom-5 right-5 z-50 flex items-center group"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa51] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <MessageCircle className="w-6 h-6 fill-white stroke-[#25D366]" />
        <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
          {buttonText}
        </span>
        {/* Pulsing online indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-100" />
        </span>
      </a>
    </aside>
  );
}
