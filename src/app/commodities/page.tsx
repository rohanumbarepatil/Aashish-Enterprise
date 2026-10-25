import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { CommodityGrid } from "@/components/public/commodity-grid";
import { mockService } from "@/lib/mock-service";

import { CommoditiesHeaderBanner } from "@/components/public/commodities-header-banner";

export const metadata = {
  title: "Ashish Enterprises | शेतमाल सूची | Agricultural Commodities",
  description:
    "Ashish Enterprises deals in agricultural commodities including wheat, jowar, turmeric, टाळक्या and cotton, connecting farmers with large buyers.",
};

export default async function CommoditiesPage() {
  const commodities = await mockService.getCommodities();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        <CommoditiesHeaderBanner />
        <CommodityGrid commodities={commodities} isHomepagePreview={false} />
      </main>
      <Footer />
    </div>
  );
}
