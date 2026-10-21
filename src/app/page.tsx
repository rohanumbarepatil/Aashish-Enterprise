import * as React from "react";
import { Header } from "@/components/public/header";
import { Hero } from "@/components/public/hero";
import { TrustIntro } from "@/components/public/trust-intro";
import { CommodityGrid } from "@/components/public/commodity-grid";
import { ProcessSteps } from "@/components/public/process-steps";
import { BenefitsSection } from "@/components/public/benefits-section";
import { FaqSection } from "@/components/public/faq-section";
import { Footer } from "@/components/public/footer";
import { mockService } from "@/lib/mock-service";

export default async function HomePage() {
  const commodities = await mockService.getCommodities();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustIntro />
        <CommodityGrid commodities={commodities} isHomepagePreview={true} />
        <ProcessSteps />
        <BenefitsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
