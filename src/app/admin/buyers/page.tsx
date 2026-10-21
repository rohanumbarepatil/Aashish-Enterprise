"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockService } from "@/lib/mock-service";
import { Buyer } from "@/types";
import { Search, Phone, ShieldAlert } from "lucide-react";

export default function AdminBuyersPage() {
  const [buyers, setBuyers] = React.useState<Buyer[]>([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    mockService.getAdminBuyers().then((data) => {
      setBuyers(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = buyers.filter(
    (b) =>
      b.companyName.toLowerCase().includes(search.toLowerCase()) ||
      b.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      b.commodityCategory.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayoutWrapper
      title="खरेदीदार व व्यापारी नेटवर्क (Private Merchant Directory)"
      subtitleMr="हळद प्रोसेसर्स, दाल मिल्स, जिनिंग मिल्स आणि अधिकृत घाऊक खरेदीदार"
    >
      <div className="space-y-6">
        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>गोपनीयता सूचना:</strong> ही खरेदीदार निर्देशिका केवळ अंतर्गत व्यापारी संबंधांसाठी आहे. ही माहिती कोणत्याही सार्वजनिक पेजवर प्रसारित केली जात नाही.
          </span>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="कंपनीचे नाव, संपर्क व्यक्ती किंवा शेतमाल..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs focus:ring-2 focus:ring-[#16A34A]"
          />
        </div>

        {/* Buyers Grid */}
        {isLoading ? (
          <div className="p-8 text-center text-sm text-[#647067]">खरेदीदार निर्देशिका लोड होत आहे...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((buyer) => (
              <Card key={buyer.id} className="shadow-xs hover:shadow-md transition-shadow">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#16A34A] uppercase tracking-wider block">
                      {buyer.commodityCategory}
                    </span>
                    <h3 className="font-bold text-base text-[#14532D]">
                      {buyer.companyName}
                    </h3>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#14532D] border border-emerald-300">
                    सक्रिय (Verified)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1 border-t border-[#F1F5F1]">
                  <div>
                    <span className="text-[#647067] block">संपर्क व्यक्ती:</span>
                    <strong className="text-[#17231B]">{buyer.contactPerson}</strong>
                  </div>
                  <div>
                    <span className="text-[#647067] block">स्थान / ठिकाण:</span>
                    <strong className="text-[#17231B]">{buyer.location}</strong>
                  </div>
                  <div>
                    <span className="text-[#647067] block">GSTIN नोंदणी:</span>
                    <span className="font-mono text-[#4B5563]">{buyer.gstin || "APMC Reg"}</span>
                  </div>
                  <div>
                    <span className="text-[#647067] block">एकूण व्यवहार संख्या:</span>
                    <span className="font-bold text-[#14532D]">{buyer.totalDealsCount} व्यवहार</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F1F5F1] flex items-center justify-between">
                  <div className="font-mono text-xs text-[#374151]">
                    +९१ {buyer.mobile}
                  </div>
                  <a href={`tel:${buyer.mobile}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>कॉल करा</span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
