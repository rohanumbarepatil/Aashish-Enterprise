"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { mockService } from "@/lib/mock-service";
import { Payment } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, CheckCircle2 } from "lucide-react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [search, setSearch] = React.useState("");
  const [stageFilter, setStageFilter] = React.useState("ALL");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    mockService.getAdminPayments().then((data) => {
      setPayments(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = payments.filter((p) => {
    const matchesSearch =
      p.paymentNumber.toLowerCase().includes(search.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      p.referenceNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStage = stageFilter === "ALL" || p.paymentStage === stageFilter;

    return matchesSearch && matchesStage;
  });

  const stageLabels: Record<Payment["paymentStage"], string> = {
    ADVANCE: "आगाऊ रक्कम (Advance)",
    INTERIM: "मध्यम हप्ता (Interim)",
    FINAL_SETTLEMENT: "अंतिम हिशोब (Final Settlement)",
  };

  return (
    <AdminLayoutWrapper
      title="पेमेंट नोंदवही (Farmer Payments Ledger)"
      subtitleMr="शेतकऱ्यांना अदा केलेल्या आगाऊ व अंतिम रकमा, बँक संदर्भ आणि पेमेंट पावती नोंदी"
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
            <div className="relative">
              <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="पेमेंट क्र., शेतकरी किंवा बँक रेफरन्स..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs focus:ring-2 focus:ring-[#16A34A]"
              />
            </div>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs focus:ring-2 focus:ring-[#16A34A]"
            >
              <option value="ALL">सर्व टप्पे (All Stages)</option>
              <option value="ADVANCE">आगाऊ रक्कम (Advance)</option>
              <option value="FINAL_SETTLEMENT">अंतिम हिशोब (Final)</option>
            </select>
          </div>

          <div className="text-xs text-[#647067] font-medium">
            एकूण नोंदी: {filtered.length}
          </div>
        </div>

        {/* Payments Table */}
        <Card className="shadow-xs overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                लोड होत आहे...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                कोणतीही पेमेंट नोंद सापडली नाही.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                  <tr>
                    <th className="p-3.5 pl-5">पावती क्र.</th>
                    <th className="p-3.5">तारीख</th>
                    <th className="p-3.5">शेतकरी</th>
                    <th className="p-3.5">व्यवहार संदर्भ</th>
                    <th className="p-3.5">रक्कम (Amount)</th>
                    <th className="p-3.5">पेमेंट पद्धत</th>
                    <th className="p-3.5">हप्ता प्रकार</th>
                    <th className="p-3.5">बँक / UTR रेफरन्स</th>
                    <th className="p-3.5 pr-5">स्थिती</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F1]">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAF8] transition-colors">
                      <td className="p-3.5 pl-5 font-mono font-bold text-[#14532D]">
                        {p.paymentNumber}
                      </td>
                      <td className="p-3.5 text-[#647067]">
                        {formatDate(p.paymentDate)}
                      </td>
                      <td className="p-3.5 font-bold text-[#17231B]">
                        {p.farmerName}
                      </td>
                      <td className="p-3.5 font-mono text-[#4B5563]">
                        {p.transactionNumber}
                      </td>
                      <td className="p-3.5 font-extrabold text-[#14532D] text-sm">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="p-3.5 font-semibold text-[#17231B]">
                        <span className="px-2 py-0.5 rounded bg-gray-100 font-mono text-[11px]">
                          {p.paymentMode}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#4B5563]">
                        {stageLabels[p.paymentStage]}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-[#647067]">
                        {p.referenceNumber}
                      </td>
                      <td className="p-3.5 pr-5">
                        <span className="inline-flex items-center gap-1 text-[#16A34A] font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>पूर्ण (Paid)</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayoutWrapper>
  );
}
