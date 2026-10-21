"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { mockService } from "@/lib/mock-service";
import { AuditLog } from "@/types";
import { Search } from "lucide-react";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = React.useState<AuditLog[]>([]);
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    mockService.getAdminAuditLogs().then((data) => {
      setLogs(data);
      setIsLoading(false);
    });
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      l.actionMr.toLowerCase().includes(search.toLowerCase()) ||
      l.entityId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayoutWrapper
      title="सिस्टम ऑडिट नोंदी (System Audit Trail)"
      subtitleMr="कर्मचाऱ्यांनी केलेल्या कृती, स्थिती बदल, व्यवहार नोंदी आणि सुरक्षेचा इतिहास"
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="वापरकर्ता, कृती किंवा रेकॉर्ड क्र. शोधा..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs focus:ring-2 focus:ring-[#16A34A]"
          />
        </div>

        {/* Audit Logs Table */}
        <Card className="shadow-xs overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                लोड होत आहे...
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                कोणतीही नोंद सापडली नाही.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                  <tr>
                    <th className="p-3.5 pl-5">तारीख व वेळ</th>
                    <th className="p-3.5">वापरकर्ता (Staff User)</th>
                    <th className="p-3.5">कृती प्रकार</th>
                    <th className="p-3.5">तपशील (Action)</th>
                    <th className="p-3.5">संबंधित रेकॉर्ड ID</th>
                    <th className="p-3.5">IP ॲड्रेस</th>
                    <th className="p-3.5 pr-5">निकाल</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F1]">
                  {filtered.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F8FAF8] transition-colors">
                      <td className="p-3.5 pl-5 font-mono text-[#647067]">
                        {log.timestamp}
                      </td>
                      <td className="p-3.5 font-bold text-[#17231B]">
                        {log.userEmail}
                      </td>
                      <td className="p-3.5 font-mono text-[11px] text-[#14532D]">
                        {log.action}
                      </td>
                      <td className="p-3.5 font-medium text-[#17231B]">
                        {log.actionMr}
                      </td>
                      <td className="p-3.5 font-mono text-xs">
                        <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#14532D]">
                          {log.entityId}
                        </code>
                      </td>
                      <td className="p-3.5 font-mono text-[#647067]">
                        {log.ipAddress}
                      </td>
                      <td className="p-3.5 pr-5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#14532D] border border-emerald-300">
                          {log.result}
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
