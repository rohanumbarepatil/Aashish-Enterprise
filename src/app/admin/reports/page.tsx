"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Download, Calendar } from "lucide-react";

export default function AdminReportsPage() {
  const handleExportCsv = (reportName: string) => {
    alert(`डेमो सिम्युलेशन: "${reportName}" या अहवालाची CSV फाइल यशस्वीरित्या तयार झाली.`);
  };

  const commodityReports = [
    { name: "हळद (काडी, गोळा, ताळक्या)", volume: "१,२४० क्विंटल", value: 17608000, avgRate: "₹ १४,२०० / क्विं." },
    { name: "सोयाबीन (JS 335)", volume: "९८० क्विंटल", value: 4704000, avgRate: "₹ ४,८०० / क्विं." },
    { name: "कापूस (रुई / सरकीयुक्त)", volume: "५२० क्विंटल", value: 3770000, avgRate: "₹ ७,२५० / क्विं." },
    { name: "गहू (लोकवन / शरबती)", volume: "३१० क्विंटल", value: 852500, avgRate: "₹ २,७५० / क्विं." },
    { name: "हरभरा (चना / विजय)", volume: "१९० क्विंटल", value: 1121000, avgRate: "₹ ५,९०० / क्विं." },
  ];

  return (
    <AdminLayoutWrapper
      title="अहवाल व व्यापारी आकडेवारी (Reports & Analytics)"
      subtitleMr="शेतमालनिहाय आवक, व्यवहार उलाढाल, सरासरी बाजारभाव आणि पेमेंट सारांश"
    >
      <div className="space-y-6">
        {/* Top Export Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E1E8E1] shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#374151]">
            <Calendar className="w-4 h-4 text-[#16A34A]" />
            <span className="font-semibold">अहवाल सत्र:</span>
            <span>ऑक्टोबर २०२६ (हिंगोली मुख्य मंडी)</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExportCsv("हंगाम २०२६ संपूर्ण आवक अहवाल")}
              className="gap-1.5"
            >
              <Download className="w-4 h-4 text-[#16A34A]" />
              <span>संपूर्ण डेटा Export करा (CSV)</span>
            </Button>
          </div>
        </div>

        {/* Commodity Performance Table */}
        <Card className="shadow-xs">
          <CardHeader className="border-b border-[#F1F5F1] pb-3">
            <CardTitle className="text-base text-[#14532D]">
              शेतमालनिहाय खरेदी व उलाढाल अहवाल (Commodity Performance)
            </CardTitle>
            <CardDescription>
              प्रत्येक शेतमालाची एकूण आवक, सरासरी खरेदी दर आणि एकूण व्यवहार मूल्य
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                <tr>
                  <th className="p-3.5 pl-5">शेतमाल (Commodity)</th>
                  <th className="p-3.5">एकूण आवक (Volume)</th>
                  <th className="p-3.5">सरासरी दर (Avg Rate)</th>
                  <th className="p-3.5">एकूण उलाढाल (Traded Value)</th>
                  <th className="p-3.5 pr-5 text-right">कृती</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F1]">
                {commodityReports.map((c, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAF8] transition-colors">
                    <td className="p-3.5 pl-5 font-bold text-[#14532D]">
                      {c.name}
                    </td>
                    <td className="p-3.5 font-bold text-[#17231B]">
                      {c.volume}
                    </td>
                    <td className="p-3.5 font-semibold text-[#374151]">
                      {c.avgRate}
                    </td>
                    <td className="p-3.5 font-extrabold text-[#14532D]">
                      {formatCurrency(c.value)}
                    </td>
                    <td className="p-3.5 pr-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleExportCsv(`${c.name} अहवाल`)}
                        className="text-[#16A34A] hover:underline font-semibold"
                      >
                        डाउनलोड
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Financial & Deductions Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card className="shadow-xs p-5 space-y-2 bg-[#F0FDF4] border-[#BBF7D0]">
            <span className="text-xs font-semibold text-[#14532D] uppercase tracking-wider block">
              शेतकऱ्यांना अदा केलेली एकूण रक्कम
            </span>
            <div className="text-2xl font-extrabold text-[#14532D]">
              {formatCurrency(26500000)}
            </div>
            <p className="text-[11px] text-[#4B5563]">
              थेट बँक ट्रान्सफर व रोख पावत्यांद्वारे चुकता
            </p>
          </Card>

          <Card className="shadow-xs p-5 space-y-2 bg-amber-50 border-amber-200">
            <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">
              एकूण बाजार समिती उपकर (Mandi Cess)
            </span>
            <div className="text-2xl font-extrabold text-amber-950">
              {formatCurrency(280000)}
            </div>
            <p className="text-[11px] text-amber-800">
              APMC नियमांनुसार १% अधिकृत शासकीय उपकर जमा
            </p>
          </Card>

          <Card className="shadow-xs p-5 space-y-2 bg-blue-50 border-blue-200">
            <span className="text-xs font-semibold text-blue-900 uppercase tracking-wider block">
              हमाली व तोलाई कामगार रक्कम
            </span>
            <div className="text-2xl font-extrabold text-blue-950">
              {formatCurrency(145000)}
            </div>
            <p className="text-[11px] text-blue-800">
              अधिकृत मापाडी व हमाल कामगार हिशोब
            </p>
          </Card>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
