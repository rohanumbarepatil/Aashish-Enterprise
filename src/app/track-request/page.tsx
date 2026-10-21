"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DemoBanner } from "@/components/ui/demo-banner";
import { mockService } from "@/lib/mock-service";
import { PublicTrackingResponse } from "@/types";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Layers,
} from "lucide-react";
import { buildCallLink, buildWhatsAppLink, formatQuantity } from "@/lib/utils";

function TrackRequestContent() {
  const searchParams = useSearchParams();
  const initialRequestId = searchParams.get("requestId") || "";
  const initialMobile = searchParams.get("mobile") || "";

  const [requestId, setRequestId] = React.useState(initialRequestId);
  const [mobile, setMobile] = React.useState(initialMobile);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<PublicTrackingResponse | null>(null);

  const handleSearch = React.useCallback(async (mob: string, reqId: string) => {
    setError(null);
    if (!mob || mob.replace(/[^0-9]/g, "").length !== 10) {
      setError("कृपया १० अंकी वैध मोबाईल नंबर टाका.");
      return;
    }
    if (!reqId || reqId.trim().length < 4) {
      setError("कृपया वैध विनंती क्रमांक टाका (उदा. DEMO-AE-2026-000101).");
      return;
    }

    try {
      setIsLoading(true);
      const res = await mockService.trackFarmerRequest(mob, reqId);
      if (res.success && res.request) {
        setResult(res.request);
      } else {
        setResult(null);
        setError(res.error || "दिलेली विनंती सापडली नाही.");
      }
    } catch {
      setError("अपेक्षित त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-search if query params are present
  React.useEffect(() => {
    if (initialRequestId && initialMobile) {
      const timer = setTimeout(() => {
        handleSearch(initialMobile, initialRequestId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialRequestId, initialMobile, handleSearch]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(mobile, requestId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-100/70 px-3.5 py-1 rounded-full border border-emerald-300">
          थेट शेतमाल विनंती ट्रॅकिंग
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14532D]">
          विनंतीची सद्यस्थिती तपासा (Track Request)
        </h1>
        <p className="text-[#4B5563] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          आपला नोंदणीकृत मोबाईल नंबर आणि विनंती क्र. (उदा. DEMO-AE-2026-000101) टाकून शेतमाल विक्री प्रक्रियेची माहिती मिळवा.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="mb-6">
        <DemoBanner
          variant="inline"
          messageMr="हे ट्रॅकिंग मॉडेल प्रात्यक्षिक (Demo) स्वरूपातील आहे. गोपनीयतेसाठी अंतर्गत नोट्स, व्यापाऱ्यांची नावे, दर आणि बँक खात्याची माहिती सार्वजनिक ट्रॅकिंगमध्ये कधीही दाखवली जात नाही."
        />
      </div>

      {/* Search Input Card */}
      <Card className="shadow-md mb-8">
        <CardContent className="p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  नोंदणीकृत मोबाईल नंबर (१० अंक) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="उदा. ९८२३४५६७८०"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#17231B]">
                  विनंती क्रमांक (Request ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  placeholder="उदा. DEMO-AE-2026-000101"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E1E8E1] bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs md:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-[#647067]">
                उदा. चाचणीसाठी: <code className="bg-emerald-50 px-1.5 py-0.5 rounded text-[#14532D] font-bold">DEMO-AE-2026-000101</code> / <code className="bg-emerald-50 px-1.5 py-0.5 rounded text-[#14532D] font-bold">9823456780</code>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="w-full sm:w-auto gap-2"
              >
                <Search className="w-4 h-4" />
                <span>स्थिती शोधा (Track Status)</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Result Card & 8-Stage Timeline */}
      {result && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Summary Box */}
          <Card className="border border-emerald-300 bg-white shadow-md">
            <CardHeader className="bg-[#F0FDF4] border-b border-[#E1E8E1] rounded-t-xl pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#647067] uppercase tracking-wider">
                    विनंती तपशील
                  </div>
                  <CardTitle className="text-xl text-[#14532D] font-mono">
                    {result.requestNumber}
                  </CardTitle>
                </div>

                <Badge status={result.status} className="self-start sm:self-auto text-sm px-3 py-1" />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs md:text-sm">
                <div className="space-y-1">
                  <span className="text-[#647067] block">शेतकऱ्याचे नाव:</span>
                  <span className="font-semibold text-[#17231B]">{result.farmerNameInitial}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#647067] block">शेतमाल:</span>
                  <span className="font-semibold text-[#14532D]">{result.commodityNameMr}</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#647067] block">अंदाजे प्रमाण:</span>
                  <span className="font-semibold text-[#17231B]">
                    {formatQuantity(result.estimatedQuantity, result.unit)}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[#647067] block">गाव व जिल्हा:</span>
                  <span className="font-semibold text-[#17231B]">
                    {result.village}, {result.district}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8-Stage Visual Timeline */}
          <Card className="shadow-md">
            <CardHeader className="border-b border-[#F1F5F1]">
              <CardTitle className="text-lg text-[#14532D] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#16A34A]" />
                <span>प्रक्रिया टप्पे (8-Stage Status Journey)</span>
              </CardTitle>
              <CardDescription>
                तुमच्या शेतमालाचा व्यवहार कोणत्या टप्प्यावर आहे याची सविस्तर माहिती:
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E1E8E1]">
                {result.timeline.map((stage) => {
                  return (
                    <div key={stage.stageNumber} className="relative flex items-start gap-4">
                      {/* Timeline Dot / Indicator */}
                      <div
                        className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          stage.isCompleted
                            ? "bg-[#16A34A] text-white ring-4 ring-emerald-100"
                            : stage.isCurrent
                            ? "bg-[#D97706] text-white ring-4 ring-amber-100 animate-pulse"
                            : "bg-white border-2 border-[#D1D5DB] text-[#9CA3AF]"
                        }`}
                      >
                        {stage.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span>{stage.stageNumber}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4
                            className={`text-sm md:text-base font-bold ${
                              stage.isCompleted
                                ? "text-[#14532D]"
                                : stage.isCurrent
                                ? "text-[#D97706]"
                                : "text-[#9CA3AF]"
                            }`}
                          >
                            {stage.titleMr}
                          </h4>
                          {stage.isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              चालू टप्पा
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#4B5563] leading-relaxed">
                          {stage.descMr}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Support Callout */}
              <div className="mt-8 pt-6 border-t border-[#F1F5F1] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F8FAF8] p-4 rounded-xl">
                <div className="text-xs text-[#4B5563]">
                  काही अडचण किंवा प्रश्न असल्यास थेट खरेदी प्रतिनिधीशी बोला:
                </div>
                <div className="flex gap-2">
                  <a href={buildCallLink()}>
                    <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                      <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>कॉल करा</span>
                    </Button>
                  </a>
                  <a
                    href={buildWhatsAppLink({ requestId: result.requestNumber })}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="leaf"
                      size="sm"
                      className="gap-1.5 text-xs bg-[#25D366] hover:bg-[#1EBE5D] text-white"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp चौकशी</span>
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function TrackRequestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[#F8FAF8] py-10 md:py-16">
        <React.Suspense fallback={<div className="text-center py-20 text-[#647067]">लोड होत आहे...</div>}>
          <TrackRequestContent />
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}
