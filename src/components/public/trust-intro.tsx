import * as React from "react";
import { Scale, Users, FileCheck2, Clock, CheckCircle2 } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";

export function TrustIntro() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            विश्वसनीय आडत व खरेदी-विक्री
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            शेतकऱ्यांचा विश्वास, पारदर्शक शेतमाल व्यवहार
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            आशिष एंटरप्राइजेस गेली अनेक वर्षे मराठवाड्यातील मुख्य बाजार समित्यांमध्ये (APMC) शेतमालाची आडत व खरेदी-विक्रीचे काम प्रामाणिकपणे करत आहे. शेतकरी आणि खरेदीदार यांच्यात योग्य दुवा साधणे हे आमचे ध्येय आहे.
          </p>
        </div>

        {/* 4 Core Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E1] hover:border-[#86EFAC] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#16A34A]" />
            </div>
            <h3 className="text-base font-bold text-[#14532D]">
              काटा व वजनात १००% अचूकता
            </h3>
            <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
              मान्यताप्राप्त इलेक्ट्रॉनिक वजन काट्यावर तोलाई. वजनात कसलीही घट न होता प्रत्यक्ष वजनाची पावती शेतकऱ्याला दिली जाते.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E1] hover:border-[#86EFAC] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Users className="w-6 h-6 text-[#D97706]" />
            </div>
            <h3 className="text-base font-bold text-[#14532D]">
              थेट खरेदीदारांशी जोडणी
            </h3>
            <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
              हळद प्रोसेसर्स, दाल मिल्स, जिनिंग मिल्स आणि नामांकित व्यापाऱ्यांशी थेट संपर्क असल्याने योग्य भावात माल विक्रीस मदत होते.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E1] hover:border-[#86EFAC] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#14532D] flex items-center justify-center">
              <FileCheck2 className="w-6 h-6 text-[#16A34A]" />
            </div>
            <h3 className="text-base font-bold text-[#14532D]">
              स्पष्ट हिशोब व पट्टी
            </h3>
            <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
              बाजार समिती नियमांनुसार आडत, हमाली आणि तोलाईचे दर पारदर्शक असतात. प्रत्येक व्यवहाराची लिखित पावती दिली जाते.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E1] hover:border-[#86EFAC] transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-700" />
            </div>
            <h3 className="text-base font-bold text-[#14532D]">
              तातडीने संपर्क व मार्गदर्शन
            </h3>
            <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
              वेबसाइटवरून विनंती पाठवताच आमचे प्रतिनिधी फोन किंवा WhatsApp द्वारे संपर्क साधून बाजारातील चालू स्थिती सांगतात.
            </p>
          </div>
        </div>

        {/* Operating APMC markets badge bar */}
        <div className="mt-10 p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
            <span className="text-sm font-semibold text-[#14532D]">
              कार्यरत प्रमुख बाजार समित्या:
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#14532D]">
            {BUSINESS_CONFIG.apmcOperatingMarkets.map((m) => (
              <span
                key={m}
                className="px-3 py-1 bg-white rounded-lg border border-[#A7F3D0] shadow-xs"
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
