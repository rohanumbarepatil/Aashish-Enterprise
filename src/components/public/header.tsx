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
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/button";
import { DemoBanner } from "@/components/ui/demo-banner";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", labelMr: "मुख्यपृष्ठ", labelEn: "Home" },
  { href: "/about", labelMr: "आमच्याबद्दल", labelEn: "About" },
  { href: "/commodities", labelMr: "शेतमाल सूची", labelEn: "Commodities" },
  { href: "/sell-produce", labelMr: "माल विक्री करा", labelEn: "Sell Produce" },
  { href: "/track-request", labelMr: "विनंती ट्रॅक करा", labelEn: "Track Request" },
  { href: "/contact", labelMr: "संपर्क", labelEn: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E1E8E1] transition-all">
      <DemoBanner />

      {/* Top quick-bar on desktop: Operating Mandis and Admin Login */}
      <div className="hidden lg:block bg-[#14532D] text-white text-xs py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Sprout className="w-3.5 h-3.5 text-amber-400" />
              महाराष्ट्र APMC बाजार समिती परवानाधारक कृषी आडत व व्यापार
            </span>
            <span className="text-emerald-400">|</span>
            <span>हिंगोली • वसमत • नांदेड • परभणी • लातूर</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={buildCallLink()}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>कॉल: {BUSINESS_CONFIG.contact.displayPhone}</span>
            </a>
            <Link
              href="/admin/login"
              className="flex items-center gap-1 text-emerald-200 hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded"
            >
              <UserCheck className="w-3 h-3 text-emerald-300" />
              <span>कर्मचारी / ॲडमीन लॉगिन</span>
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
                {BUSINESS_CONFIG.nameMr}
              </span>
              <span className="text-[11px] md:text-xs font-semibold tracking-wider text-[#647067] uppercase">
                {BUSINESS_CONFIG.nameEn}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
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
                  {link.labelMr}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#14532D] bg-[#ECFDF5] border border-[#A7F3D0] rounded-lg hover:bg-[#D1FAE5] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <Link href="/sell-produce">
              <Button variant="primary" size="md" className="gap-2">
                <span>माल विक्रीसाठी संपर्क</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Right Quick Action & Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={buildCallLink()}
              className="p-2.5 rounded-lg bg-[#ECFDF5] text-[#14532D] border border-[#A7F3D0] active:bg-[#D1FAE5]"
              aria-label="आम्हाला कॉल करा"
            >
              <Phone className="w-5 h-5 text-[#16A34A]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#17231B] hover:bg-[#F1F5F1] active:bg-[#E1E8E1] transition-colors"
              aria-label="मेनू उघडा"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[110px] bottom-0 bg-black/40 z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-b border-[#E1E8E1] p-5 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? "bg-[#F0FDF4] text-[#14532D] font-bold border border-[#BBF7D0]"
                        : "text-[#17231B] hover:bg-[#F8FAF8] border border-transparent"
                    }`}
                  >
                    <span>{link.labelMr}</span>
                    <span className="text-xs text-[#647067] font-normal">
                      {link.labelEn}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-5 mt-4 border-t border-[#E1E8E1] flex flex-col gap-3">
              <Link href="/sell-produce" className="w-full">
                <Button variant="primary" size="lg" className="w-full justify-center">
                  माल विक्रीसाठी संपर्क करा
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={buildCallLink()}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-[#14532D] font-medium text-sm active:bg-[#E1E8E1]"
                >
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>कॉल करा</span>
                </a>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] text-[#14532D] font-medium text-sm active:bg-[#D1FAE5]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-[#647067]">
                <span>कर्मचारी लॉगिन:</span>
                <Link
                  href="/admin/login"
                  className="text-[#14532D] font-medium hover:underline flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>ॲडमीन पोर्टल</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
