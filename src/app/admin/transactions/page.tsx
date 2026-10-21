"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockService } from "@/lib/mock-service";
import { Transaction } from "@/types";
import { formatCurrency, formatQuantity, formatDate } from "@/lib/utils";
import { Search, Download } from "lucide-react";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [search, setSearch] = React.useState("");
  const [selectedTxn, setSelectedTxn] = React.useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    mockService.getAdminTransactions().then((data) => {
      setTransactions(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = transactions.filter(
    (t) =>
      t.transactionNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.farmerName.toLowerCase().includes(search.toLowerCase()) ||
      t.buyerName.toLowerCase().includes(search.toLowerCase()) ||
      t.commodityNameMr.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayoutWrapper
      title="व्यवहार नोंदवही (Transactions Ledger)"
      subtitleMr="सौदा निश्चिती, दर, कमिशन, हमाली कपात आणि शेतकऱ्याला देय अंतिम रक्कम (Net Payable)"
    >
      <div className="space-y-6">
        {/* Top Filter & Export Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="व्यवहार क्र., शेतकरी किंवा व्यापारी शोधा..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert("डेमो: CSV अहवाल डाउनलोड सिम्युलेशन यशस्वी.")}
            className="gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>व्यवहार अहवाल (CSV)</span>
          </Button>
        </div>

        {/* Transactions Table */}
        <Card className="shadow-xs overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                लोड होत आहे...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                कोणताही व्यवहार सापडला नाही.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                  <tr>
                    <th className="p-3.5 pl-5">व्यवहार क्र.</th>
                    <th className="p-3.5">तारीख</th>
                    <th className="p-3.5">शेतकरी</th>
                    <th className="p-3.5">खरेदीदार व्यापारी</th>
                    <th className="p-3.5">शेतमाल व वजन</th>
                    <th className="p-3.5">ठरलेला दर</th>
                    <th className="p-3.5">एकूण रक्कम (Gross)</th>
                    <th className="p-3.5">कमिशन व कपात</th>
                    <th className="p-3.5">अंतिम देय (Net Payable)</th>
                    <th className="p-3.5 pr-5 text-right">तपशील</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F1]">
                  {filtered.map((t) => (
                    <tr key={t.id} className="hover:bg-[#F8FAF8] transition-colors">
                      <td className="p-3.5 pl-5 font-mono font-bold text-[#14532D]">
                        {t.transactionNumber}
                      </td>
                      <td className="p-3.5 text-[#647067]">
                        {formatDate(t.transactionDate)}
                      </td>
                      <td className="p-3.5 font-bold text-[#17231B]">
                        {t.farmerName}
                      </td>
                      <td className="p-3.5 text-[#4B5563]">
                        {t.buyerName}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-[#14532D]">{t.commodityNameMr}</div>
                        <div className="text-[11px] text-[#647067]">{formatQuantity(t.agreedQuantity, t.unit)}</div>
                      </td>
                      <td className="p-3.5 font-semibold text-[#17231B]">
                        {formatCurrency(t.agreedRate)} / {t.unit}
                      </td>
                      <td className="p-3.5 font-semibold text-[#17231B]">
                        {formatCurrency(t.grossAmount)}
                      </td>
                      <td className="p-3.5 text-rose-700 font-medium">
                        - {formatCurrency(t.commissionAmount + t.mandiFee + t.hamaliDeduction + t.otherDeductions)}
                      </td>
                      <td className="p-3.5 font-extrabold text-[#14532D] text-sm">
                        {formatCurrency(t.netPayable)}
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTxn(t)}
                          className="h-7 text-xs px-2.5"
                        >
                          पट्टी पहा
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Transaction Detail & Mandi Patti Modal */}
        {selectedTxn && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full border border-[#E1E8E1] shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#F1F5F1] pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-[#14532D]">
                    शेतमाल विक्री पावती / हिशोब पट्टी
                  </h3>
                  <div className="text-xs font-mono text-[#647067]">
                    {selectedTxn.transactionNumber} (Ref: {selectedTxn.requestNumber})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTxn(null)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  ✕
                </button>
              </div>

              {/* Financial Math Breakdown Table */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 bg-[#F8FAF8] rounded-xl border border-[#E1E8E1]">
                  <div>
                    <span className="text-[#647067] block">शेतकरी:</span>
                    <strong className="text-[#17231B]">{selectedTxn.farmerName}</strong>
                  </div>
                  <div>
                    <span className="text-[#647067] block">खरेदीदार:</span>
                    <strong className="text-[#17231B]">{selectedTxn.buyerName}</strong>
                  </div>
                </div>

                <div className="border border-[#E1E8E1] rounded-xl p-4 space-y-2 bg-white">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#4B5563]">शेतमाल व एकूण वजन:</span>
                    <span className="font-bold">{selectedTxn.commodityNameMr} ({formatQuantity(selectedTxn.agreedQuantity, selectedTxn.unit)})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-[#4B5563]">निश्चित दर (Rate per Quintal):</span>
                    <span className="font-bold">{formatCurrency(selectedTxn.agreedRate)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100 font-bold text-sm text-[#14532D]">
                    <span>एकूण किंमत (Gross Amount):</span>
                    <span>{formatCurrency(selectedTxn.grossAmount)}</span>
                  </div>

                  <div className="pt-2 text-rose-700 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>आडत कमिशन ({selectedTxn.commissionPercent}%):</span>
                      <span>- {formatCurrency(selectedTxn.commissionAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>बाजार समिती उपकर / मंडी फी (१%):</span>
                      <span>- {formatCurrency(selectedTxn.mandiFee)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>हमाली कपात:</span>
                      <span>- {formatCurrency(selectedTxn.hamaliDeduction)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>तोलाई व इतर वजन आकार:</span>
                      <span>- {formatCurrency(selectedTxn.otherDeductions)}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t-2 border-[#14532D] flex justify-between text-base font-extrabold text-[#14532D]">
                    <span>शेतकऱ्याला मिळणारी निव्वळ रक्कम (Net Payable):</span>
                    <span>{formatCurrency(selectedTxn.netPayable)}</span>
                  </div>
                </div>

                {selectedTxn.notes && (
                  <p className="text-[11px] text-[#647067] italic p-2 bg-amber-50 rounded-lg border border-amber-200">
                    टीप: {selectedTxn.notes}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#F1F5F1]">
                <Button variant="outline" size="sm" onClick={() => setSelectedTxn(null)}>
                  बंद करा
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => alert("पावती प्रिंट सिम्युलेशन यशस्वी.")}
                >
                  पावती प्रिंट करा
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
