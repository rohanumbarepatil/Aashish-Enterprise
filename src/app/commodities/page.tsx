import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { CommodityGrid } from "@/components/public/commodity-grid";
import { mockService } from "@/lib/mock-service";

export const metadata = {
  title: "शेतमाल सूची | आशिष एंटरप्राइजेस (Agricultural Commodities)",
  description:
    "हळद, ताळक्या, काडी, गोळा, कापूस, सोयाबीन, गहू, ज्वारी आणि हरभरा शेतमाल खरेदी यादी व तपशील.",
};

export default async function CommoditiesPage() {
  const commodities = await mockService.getCommodities();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        {/* Banner */}
        <section className="bg-gradient-to-b from-[#ECFDF5] to-white py-12 md:py-16 border-b border-[#E1E8E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
              संपूर्ण शेतमाल यादी
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#14532D]">
              कृषी शेतमाल सूची (Commodities)
            </h1>
            <p className="text-[#4B5563] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              आशिष एंटरप्राइजेस खालील सर्व शेतमालाची नियमित खरेदी व आडत व्यवस्थापन करते. आपल्या मालाचा प्रकार निवडून थेट विक्री विनंती नोंदवा.
            </p>
          </div>
        </section>

        {/* Commodity Grid with Search & Filters */}
        <CommodityGrid commodities={commodities} isHomepagePreview={false} />
      </main>
      <Footer />
    </div>
  );
}
