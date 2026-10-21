"use client";

import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log error locally in development
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#F8FAF8] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 md:p-10 rounded-3xl border border-red-200 shadow-md space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-[#17231B]">
              काहीतरी त्रुटी आली आहे (Error)
            </h1>
            <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
              सिस्टममध्ये तात्पुरती अडचण आली आहे. कृपया खालील बटण दाबून पुन्हा प्रयत्न करा किंवा मुख्यपृष्ठावर जा.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Button
              variant="primary"
              onClick={() => reset()}
              className="w-full gap-2 justify-center"
            >
              <RefreshCw className="w-4 h-4" />
              <span>पुन्हा प्रयत्न करा (Try Again)</span>
            </Button>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full gap-2 justify-center">
                <Home className="w-4 h-4" />
                <span>मुख्यपृष्ठावर परत जा (Home)</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
