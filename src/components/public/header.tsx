"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Sprout,
  ChevronRight,
  UserCheck,
  MapPin,
  Globe,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/button";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();

  const isEn = language === "en";

  const navLinks = [
    { href: "/", label: t("मुख्यपृष्ठ", "Home") },
    { href: "/about", label: t("आमच्याबद्दल", "About Us") },
    { href: "/commodities", label: t("उत्पादने", "Products") },
    { href: "/commodities#services", label: t("व्यवसाय / सेवा", "Services / Business") },
    { href: "/sell-produce", label: t("माल विक्री", "Sell Produce") },
    { href: "/track-request", label: t("ट्रॅक विनंती", "Track Request") },
    { href: "/contact", label: t("संपर्क", "Contact") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E1E8E1] transition-all">
      {/* Top quick-bar on desktop: Operating Mandis, Location, Phone, and Admin */}
      <div className="hidden lg:block bg-[#14532D] text-white text-xs py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Sprout className="w-3.5 h-3.5 text-amber-400" />
              {t(
                "महाराष्ट्र APMC बाजार समिती परवानाधारक कृषी आडत व व्यापार",
                "Licensed APMC Agricultural Commodity Trading & Adat"
              )}
            </span>
            <span className="text-emerald-400">|</span>
            <span>{t("हिंगोली • वसमत • नांदेड • परभणी • लातूर", "Hingoli • Basmath • Nanded • Parbhani • Latur")}</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={BUSINESS_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-200 hover:text-amber-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{t("दुकानाचे ठिकाण", "Shop Location")}</span>
            </a>

            <a
              href={buildCallLink()}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{t("कॉल:", "Call:")} {BUSINESS_CONFIG.contact.displayPhone}</span>
            </a>

            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded"
            >
              <UserCheck className="w-3 h-3 text-emerald-300" />
              <span>{t("कर्मचारी / ॲडमीन", "Staff / Admin")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#14532D] to-[#16A34A] flex items-center justify-center text-white shadow-sm group-hover:shadow transition-shadow">
              <Sprout className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-[#14532D] leading-tight">
                {isEn ? BUSINESS_CONFIG.nameEn : BUSINESS_CONFIG.nameMr}
              </span>
              <span className="text-[11px] md:text-xs font-semibold tracking-wider text-[#647067] uppercase">
                {isEn ? BUSINESS_CONFIG.nameMr : BUSINESS_CONFIG.nameEn}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#14532D] bg-[#F0FDF4] font-semibold"
                      : "text-[#17231B] hover:text-[#14532D] hover:bg-[#F8FAF8]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs: Language Switcher, WhatsApp & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  isEn
                    ? "bg-[#14532D] text-white shadow-xs font-bold"
                    : "text-[#14532D] hover:bg-emerald-100"
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="text-emerald-300 px-0.5">|</span>
              <button
                type="button"
                onClick={() => setLanguage("mr")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  !isEn
                    ? "bg-[#14532D] text-white shadow-xs font-bold"
                    : "text-[#14532D] hover:bg-emerald-100"
                }`}
                aria-label="मराठी भाषेवर स्विच करा"
              >
                मराठी
              </button>
            </div>

            <a
              href={buildWhatsAppLink({ lang: language })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#14532D] bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg hover:bg-[#D1FAE5] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link href="/contact">
              <Button variant="primary" size="md" className="gap-2">
                <span>{t("संपर्क करा", "Contact Us")}</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Right: Language toggle, Call Button & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Compact Mobile Language Switcher */}
            <div className="flex items-center rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] p-0.5 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded-md transition-all ${
                  isEn ? "bg-[#14532D] text-white font-bold" : "text-[#14532D]"
                }`}
              >
                EN
              </button>
              <span className="text-emerald-300">|</span>
              <button
                type="button"
                onClick={() => setLanguage("mr")}
                className={`px-2 py-1 rounded-md transition-all ${
                  !isEn ? "bg-[#14532D] text-white font-bold" : "text-[#14532D]"
                }`}
              >
                मराठी
              </button>
            </div>

            <a
              href={buildCallLink()}
              className="p-2.5 rounded-lg bg-[#ECFDF5] text-[#14532D] border border-[#A7F3D0] active:bg-[#D1FAE5]"
              aria-label="कॉल करा / Call Us"
            >
              <Phone className="w-5 h-5 text-[#16A34A]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#17231B] hover:bg-[#F1F5F1] active:bg-[#E1E8E1] transition-colors"
              aria-label={mobileMenuOpen ? "मेनू बंद करा" : "मेनू उघडा"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[73px] md:top-[81px] bottom-0 bg-black/40 z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-b border-[#E1E8E1] p-5 shadow-xl max-h-[85vh] overflow-y-auto">
            {/* Language Switcher in Drawer */}
            <div className="mb-4 pb-3 border-b border-[#E1E8E1] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#647067] flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#16A34A]" />
                {t("भाषा निवडा:", "Select Language:")}
              </span>
              <div className="flex items-center rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    isEn ? "bg-[#14532D] text-white font-bold shadow-xs" : "text-[#14532D]"
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("mr")}
                  className={`px-3 py-1 rounded-md transition-all ${
                    !isEn ? "bg-[#14532D] text-white font-bold shadow-xs" : "text-[#14532D]"
                  }`}
                >
                  मराठी
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#F0FDF4] text-[#14532D] font-bold border border-[#BBF7D0]"
                        : "text-[#17231B] hover:bg-[#F8FAF8] border border-transparent"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#647067]" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-5 mt-4 border-t border-[#E1E8E1] flex flex-col gap-3">
              <Link href="/sell-produce" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  {t("माल विक्रीसाठी संपर्क करा", "Sell Produce Enquiry")}
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={buildCallLink()}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-[#14532D] font-medium text-sm active:bg-[#E1E8E1]"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>{t("कॉल करा", "Call Now")}</span>
                </a>

                <a
                  href={buildWhatsAppLink({ lang: language })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] text-[#14532D] font-medium text-sm active:bg-[#D1FAE5]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <a
                href={BUSINESS_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50 text-[#14532D] text-xs font-medium"
              >
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{t("दुकानाचे ठिकाण पहा (Google Maps)", "Shop Location (Google Maps)")}</span>
              </a>

              <div className="pt-3 flex items-center justify-between text-xs text-[#647067]">
                <span>{t("कर्मचारी लॉगिन:", "Staff Login:")}</span>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#14532D] font-medium hover:underline flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{t("ॲडमीन पोर्टल", "Admin Portal")}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
