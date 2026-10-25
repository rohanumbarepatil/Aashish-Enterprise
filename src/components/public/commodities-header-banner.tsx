"use client";

import * as React from "react";
import { useLanguage } from "@/context/language-context";

export function CommoditiesHeaderBanner() {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-[#ECFDF5] to-white py-12 md:py-16 border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
          {t("संपूर्ण शेतमाल यादी", "Complete Agricultural Commodities List")}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D]">
          {t("कृषी शेतमाल सूची (Commodities)", "Agricultural Commodities Traded")}
        </h1>
        <p className="text-[#4B5563] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {t(
            "आशिष एंटरप्राइजेस गहू, ज्वारी, हळद, टाळक्या, कापूस व इतर सर्व प्रमुख शेतमालाची नियमित खरेदी व पुरवठा करते.",
            "Ashish Enterprises deals in wheat, jowar / sorghum, turmeric, टाळक्या, cotton, and other agricultural commodities, connecting farmers with large buyers."
          )}
        </p>
      </div>
    </section>
  );
}
