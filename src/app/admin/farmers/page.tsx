"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { mockService } from "@/lib/mock-service";
import { Farmer } from "@/types";
import { buildWhatsAppLink } from "@/lib/utils";
import { Search, Phone, MessageCircle, Users } from "lucide-react";

export default function AdminFarmersPage() {
  const [farmers, setFarmers] = React.useState<Farmer[]>([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    mockService.getAdminFarmers().then((data) => {
      setFarmers(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = farmers.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.mobile.includes(search) ||
      f.village.toLowerCase().includes(search.toLowerCase()) ||
      f.taluka.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayoutWrapper
      title="शेतकरी निर्देशिका (Farmer Directory)"
      subtitleMr="नोंदणीकृत शेतकरी, पत्ते, संपर्क व त्यांच्या एकूण शेतमाल विक्री विनंत्या"
    >
      <div className="space-y-6">
        {/* Search bar */}
        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-5">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="शेतकऱ्याचे नाव, मोबाईल किंवा गाव शोधा..."
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:bg-white transition-all"
              />
            </div>
          </CardContent>
        </Card>

        {/* Farmers Table */}
        <Card className="shadow-xs overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                लोड होत आहे...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <Users className="w-8 h-8 text-[#647067] mx-auto opacity-40" />
                <div className="text-sm font-bold text-[#17231B]">
                  शेतकरी सापडला नाही
                </div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                  <tr>
                    <th className="p-3.5 pl-5">नाव (Name)</th>
                    <th className="p-3.5">मोबाईल</th>
                    <th className="p-3.5">गाव व तालुका</th>
                    <th className="p-3.5">जिल्हा</th>
                    <th className="p-3.5">एकूण विनंत्या</th>
                    <th className="p-3.5 pr-5 text-right">थेट संपर्क</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F1]">
                  {filtered.map((f) => (
                    <tr key={f.id} className="hover:bg-[#F8FAF8] transition-colors">
                      <td className="p-3.5 pl-5 font-bold text-[#14532D]">
                        {f.name}
                      </td>
                      <td className="p-3.5 font-mono text-[#374151]">
                        +९१ {f.mobile}
                      </td>
                      <td className="p-3.5 text-[#374151]">
                        {f.village}, ता. {f.taluka}
                      </td>
                      <td className="p-3.5 text-[#647067]">
                        {f.district}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200 font-bold">
                          {f.totalRequestsCount} नोंदणी
                        </span>
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${f.mobile}`}
                            className="p-1.5 rounded-lg border border-[#E1E8E1] hover:bg-emerald-50 text-[#14532D]"
                            title="कॉल करा"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                          </a>
                          <a
                            href={buildWhatsAppLink({ farmerName: f.name, village: f.village })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-[#A7F3D0] hover:bg-[#D1FAE5]"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          </a>
                        </div>
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
