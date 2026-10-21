import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Sprout, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#F8FAF8] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 md:p-10 rounded-3xl border border-[#E1E8E1] shadow-md space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#14532D] flex items-center justify-center mx-auto border border-emerald-200">
            <Sprout className="w-8 h-8 text-[#16A34A]" />
          </div>

          <div className="space-y-2">
            <span className="text-4xl font-extrabold text-[#14532D] font-mono">४०४</span>
            <h1 className="text-xl md:text-2xl font-bold text-[#17231B]">
              पृष्ठ सापडले नाही (Page Not Found)
            </h1>
            <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
              आपण शोधत असलेले वेबपेज उपलब्ध नाही किंवा त्याचा पत्ता बदलला असावा.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Link href="/" className="w-full">
              <Button variant="primary" className="w-full gap-2 justify-center">
                <Home className="w-4 h-4" />
                <span>मुख्यपृष्ठावर परत जा (Home)</span>
              </Button>
            </Link>

            <Link href="/track-request" className="w-full">
              <Button variant="outline" className="w-full gap-2 justify-center">
                <Search className="w-4 h-4" />
                <span>विनंती ट्रॅक करा (Track Request)</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
