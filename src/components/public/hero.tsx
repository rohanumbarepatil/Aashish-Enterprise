import * as React from "react";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight, ShieldCheck, Scale, MapPin } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { Button } from "@/components/ui/button";
import { buildCallLink, buildWhatsAppLink } from "@/lib/utils";

export function Hero() {
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
              <span>{BUSINESS_CONFIG.marketTypeMr}</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#14532D] tracking-tight leading-[1.25]">
              तुमचा शेतमाल, आशिष एंटरप्राइजेसशी थेट संपर्कात
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-[#374151] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              गहू, ज्वारी, हळद, ताळक्या, कापूस आणि इतर शेतमालासाठी आमच्याशी थेट संपर्क करा. तुमच्या मालाची माहिती पाठवा आणि व्यवहारासाठी आमच्या टीमशी संपर्क साधा.
            </p>

            {/* Three Required CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Primary CTA */}
              <Link href="/sell-produce" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2.5 shadow-md hover:shadow-lg">
                  <span>माल विक्रीसाठी संपर्क करा</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              {/* Secondary CTA */}
              <a href={buildCallLink()} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 border-emerald-600/40 text-[#14532D] hover:bg-emerald-50">
                  <Phone className="w-4 h-4 text-[#16A34A]" />
                  <span>आम्हाला कॉल करा</span>
                </Button>
              </a>

              {/* Third CTA */}
              <a
                href={buildWhatsAppLink()}
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
                  <span>WhatsApp वर संपर्क करा</span>
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[#E1E8E1] text-xs text-[#4B5563] text-left">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>काटा व वजन पारदर्शकता</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>नियमित बाजारभाव माहिती</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-[#16A34A] shrink-0" />
                <span>हिंगोली व मराठवाडा मंडी</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Key Commodities Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Highlight Card with Real Agricultural Focus */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-white p-5 md:p-6 shadow-xl relative z-10 space-y-4">
                <div className="flex items-center justify-between border-b border-[#F1F5F1] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="font-bold text-sm text-[#14532D]">
                      आजचे प्रमुख खरेदी शेतमाल
                    </span>
                  </div>
                  <span className="text-xs text-[#647067] font-medium">
                    APMC हिंगोली
                  </span>
                </div>

                {/* Quick grid of top 4 commodities */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <div className="text-xs font-bold text-amber-900">हळद व ताळक्या</div>
                    <div className="text-[11px] text-amber-800/80 mt-0.5">काडी, गोळा, तुकडी</div>
                    <div className="text-xs font-semibold text-emerald-800 mt-2">दैनिक आवक सुरू</div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                    <div className="text-xs font-bold text-emerald-900">सोयाबीन</div>
                    <div className="text-[11px] text-emerald-800/80 mt-0.5">JS 335 / खरीप माल</div>
                    <div className="text-xs font-semibold text-emerald-800 mt-2">थेट खरेदी केंद्र</div>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-xs font-bold text-stone-900">कापूस</div>
                    <div className="text-[11px] text-stone-700/80 mt-0.5">शुभ्र, लांब धागा</div>
                    <div className="text-xs font-semibold text-stone-700 mt-2">जिनिंग मिल्स करार</div>
                  </div>

                  <div className="p-3 rounded-xl bg-yellow-50/70 border border-yellow-200/80">
                    <div className="text-xs font-bold text-yellow-900">गहू व हरभरा</div>
                    <div className="text-[11px] text-yellow-800/80 mt-0.5">लोकवन / विजय चणा</div>
                    <div className="text-xs font-semibold text-emerald-800 mt-2">घाऊक खरेदीदार</div>
                  </div>
                </div>

                {/* Direct quick action banner */}
                <div className="p-3.5 rounded-xl bg-[#14532D] text-white flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-emerald-200">
                      तुमचा माल विकायचा आहे?
                    </div>
                    <div className="text-sm font-bold">
                      २ मिनिटांत माहिती पाठवा
                    </div>
                  </div>
                  <Link href="/sell-produce">
                    <Button variant="accent" size="sm" className="shadow-sm">
                      फॉर्म भरा
                    </Button>
                  </Link>
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
