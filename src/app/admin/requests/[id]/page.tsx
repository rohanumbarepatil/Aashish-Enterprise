"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockService } from "@/lib/mock-service";
import { SaleRequest } from "@/types";
import { formatQuantity, formatDate, buildWhatsAppLink } from "@/lib/utils";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  FileText,
  CheckCircle2,
  Image as ImageIcon,
  Receipt,
  Save,
} from "lucide-react";

export default function AdminRequestDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [request, setRequest] = React.useState<SaleRequest | null>(null);
  const [internalNotes, setInternalNotes] = React.useState("");
  const [isSavingNotes, setIsSavingNotes] = React.useState(false);
  const [notesSaved, setNotesSaved] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await mockService.getAdminRequestById(id);
      if (data) {
        setRequest(data);
        setInternalNotes(data.internalStaffNotes || "");
      }
      setIsLoading(false);
    }
    load();
  }, [id]);

  const handleSaveNotes = async () => {
    if (!request) return;
    setIsSavingNotes(true);
    await mockService.updateAdminRequestStatus(
      request.id,
      request.status,
      internalNotes
    );
    setIsSavingNotes(false);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2500);
  };

  if (isLoading) {
    return (
      <AdminLayoutWrapper title="विनंती तपशील">
        <div className="text-center py-20 text-xs text-[#647067]">
          तपशील लोड होत आहे...
        </div>
      </AdminLayoutWrapper>
    );
  }

  if (!request) {
    return (
      <AdminLayoutWrapper title="विनंती सापडली नाही">
        <div className="text-center py-20 space-y-3">
          <div className="text-base font-bold text-[#17231B]">
            विनंती क्रमांक सापडला नाही
          </div>
          <Link href="/admin/requests">
            <Button variant="outline" size="sm">
              ← विनंत्या यादीवर परत जा
            </Button>
          </Link>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper
      title={`विनंती तपशील: ${request.requestNumber}`}
      subtitleMr={`${request.farmerName} (${request.farmerVillage}) यांची शेतमाल विक्री विनंती`}
    >
      <div className="space-y-6 max-w-5xl">
        {/* Top Back & Quick Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/admin/requests"
            className="text-xs font-semibold text-[#16A34A] hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>विनंत्या यादीवर परत जा</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5">
            <a href={`tel:${request.farmerMobile}`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Phone className="w-4 h-4 text-[#16A34A]" />
                <span>कॉल करा (+९१ {request.farmerMobile})</span>
              </Button>
            </a>

            <a
              href={buildWhatsAppLink({
                farmerName: request.farmerName,
                village: request.farmerVillage,
                commodityName: request.commodityNameMr,
                quantity: request.estimatedQuantity,
                unit: request.unit,
                requestId: request.requestNumber,
              })}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="leaf"
                size="sm"
                className="gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp मेसेज</span>
              </Button>
            </a>

            <Link href="/admin/transactions">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Receipt className="w-4 h-4" />
                <span>व्यवहार नोंदवा</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 2-Column Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Farmer & Produce Details (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Farmer Profile Card */}
            <Card className="shadow-xs">
              <CardHeader className="border-b border-[#F1F5F1] bg-[#F8FAF8] rounded-t-xl pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base text-[#14532D]">
                    शेतकऱ्याची माहिती
                  </CardTitle>
                  <CardDescription>
                    संपर्क व पत्ता तपशील
                  </CardDescription>
                </div>
                <Badge status={request.status} />
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm">
                  <div className="space-y-1">
                    <span className="text-[#647067] block">शेतकऱ्याचे नाव:</span>
                    <span className="font-bold text-[#17231B] text-base">{request.farmerName}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">मोबाईल नंबर:</span>
                    <span className="font-mono font-bold text-[#14532D]">
                      +९१ {request.farmerMobile}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">गाव व तालुका:</span>
                    <span className="font-semibold text-[#17231B]">
                      {request.farmerVillage}, तालुका {request.farmerTaluka}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">जिल्हा व राज्य:</span>
                    <span className="font-semibold text-[#17231B]">
                      {request.farmerDistrict}, महाराष्ट्र
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Produce Specification Card */}
            <Card className="shadow-xs">
              <CardHeader className="border-b border-[#F1F5F1] pb-3">
                <CardTitle className="text-base text-[#14532D]">
                  शेतमाल वैशिष्ट्ये (Produce Specifications)
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs md:text-sm">
                  <div className="space-y-1">
                    <span className="text-[#647067] block">शेतमालाचा प्रकार:</span>
                    <span className="font-bold text-[#14532D] text-base">
                      {request.commodityNameMr}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">अंदाजे प्रमाण:</span>
                    <span className="font-extrabold text-[#17231B] text-base">
                      {formatQuantity(request.estimatedQuantity, request.unit)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">प्रतवारी / गुणवत्ता:</span>
                    <span className="font-semibold text-[#17231B]">
                      {request.qualityGrade || "सामान्य"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">नोंदणी तारीख:</span>
                    <span className="text-[#17231B]">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#647067] block">अपेक्षित विक्री तारीख:</span>
                    <span className="text-[#17231B]">
                      {request.expectedSellingDate ? formatDate(request.expectedSellingDate) : "लवकरच"}
                    </span>
                  </div>
                </div>

                {request.notes && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <span className="font-bold text-stone-800">शेतकऱ्याची टीप:</span>
                    <p className="text-stone-700 italic leading-relaxed">
                      &quot;{request.notes}&quot;
                    </p>
                  </div>
                )}

                {/* Uploaded Photos Section */}
                <div className="space-y-3 pt-3 border-t border-[#F1F5F1]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#14532D]">
                    <ImageIcon className="w-4 h-4 text-[#16A34A]" />
                    <span>जोडलेले शेतमाल फोटो ({request.imageUrls.length})</span>
                  </div>

                  {request.imageUrls.length === 0 ? (
                    <div className="p-4 rounded-xl bg-[#F8FAF8] border border-dashed border-[#E1E8E1] text-xs text-[#647067] text-center">
                      शेतकऱ्याने कोणतेही फोटो जोडलेले नाहीत.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {request.imageUrls.map((img, idx) => (
                        <a
                          key={idx}
                          href={img}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-[#E1E8E1] overflow-hidden aspect-square block group relative"
                        >
                          <img
                            src={img}
                            alt={`Produce ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold">
                            मोठा फोटो पहा
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Internal Staff Notes & Audit Log (1 Col) */}
          <div className="space-y-6">
            {/* Private Internal Notes Card */}
            <Card className="shadow-xs border-amber-200 bg-amber-50/20">
              <CardHeader className="border-b border-amber-200/80 pb-3">
                <CardTitle className="text-base text-amber-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>अंतर्गत स्टाफ नोट्स (Private)</span>
                </CardTitle>
                <CardDescription className="text-amber-800/80">
                  केवळ आशिष एंटरप्राइजेसच्या कर्मचाऱ्यांना दिसणारी नोंद
                </CardDescription>
              </CardHeader>

              <CardContent className="p-5 space-y-3">
                <textarea
                  rows={5}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="शेतकऱ्याशी झालेल्या फोन चर्चेचा तपशील, ऑफर केलेला दर, बाजार समिती लिलाव वेळ येथे नोंदवा..."
                  className="w-full p-3 rounded-xl border border-amber-200 bg-white text-xs text-[#17231B] focus:outline-none focus:ring-2 focus:ring-amber-500"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#647067]">
                    {notesSaved ? (
                      <span className="text-[#16A34A] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        नोंद सेव्ह झाली!
                      </span>
                    ) : (
                      "बदल सेव्ह करणे आवश्यक"
                    )}
                  </span>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSaveNotes}
                    isLoading={isSavingNotes}
                    className="gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>सेव्ह करा</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Summary Pill */}
            <div className="p-4 rounded-2xl bg-white border border-[#E1E8E1] space-y-2 text-xs">
              <div className="font-bold text-[#14532D]">सिस्टम रेफरन्स:</div>
              <div className="font-mono text-[#647067] text-[11px] space-y-1">
                <div>ID: {request.id}</div>
                <div>Created: {request.createdAt}</div>
                <div>Updated: {request.updatedAt}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
