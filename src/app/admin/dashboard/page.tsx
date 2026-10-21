"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { StatCard } from "@/components/admin/stat-card";
import { StatusDistributionChart, CommodityVolumeChart } from "@/components/admin/simple-charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockService } from "@/lib/mock-service";
import { SaleRequest, DashboardStats, AuditLog } from "@/types";
import { formatCurrency, formatQuantity } from "@/lib/utils";
import {
  ClipboardList,
  PhoneCall,
  Clock,
  CheckCircle2,
  Receipt,
  CreditCard,
  Scale,
  IndianRupee,
  ArrowRight,
  Calendar,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [recentRequests, setRecentRequests] = React.useState<SaleRequest[]>([]);
  const [recentLogs, setRecentLogs] = React.useState<AuditLog[]>([]);

  React.useEffect(() => {
    Promise.all([
      mockService.getDashboardStats(),
      mockService.getAdminRequests(),
      mockService.getAdminAuditLogs(),
    ]).then(([s, r, l]) => {
      setStats(s);
      setRecentRequests(r.slice(0, 5));
      setRecentLogs(l.slice(0, 4));
    });
  }, []);

  // Demo status breakdown items
  const statusItems = [
    { label: "१. नवीन प्राप्त", count: 8, color: "#3B82F6" },
    { label: "२. संपर्क बाकी", count: 14, color: "#F59E0B" },
    { label: "३. संपर्क साधला", count: 12, color: "#0EA5E9" },
    { label: "४. माल तपासणी", count: 9, color: "#8B5CF6" },
    { label: "५. सौदा निश्चित", count: 15, color: "#10B981" },
    { label: "६. माल प्राप्त", count: 10, color: "#14B8A6" },
    { label: "७. पेमेंट प्रक्रिया", count: 6, color: "#F97316" },
    { label: "८. व्यवहार पूर्ण", count: 52, color: "#16A34A" },
  ];

  // Demo commodity volume items
  const commodityVolume = [
    { commodityName: "हळद (काडी, गोळा, ताळक्या)", quintals: 1240, percentage: 38 },
    { commodityName: "सोयाबीन (JS 335)", quintals: 980, percentage: 30 },
    { commodityName: "कापूस (रुई)", quintals: 520, percentage: 16 },
    { commodityName: "गहू व ज्वारी", quintals: 310, percentage: 10 },
    { commodityName: "हरभरा व मूग", quintals: 190, percentage: 6 },
  ];

  return (
    <AdminLayoutWrapper
      title="व्यापार व आडत डॅशबोर्ड (Overview)"
      subtitleMr="दैनंदिन शेतमाल आवक, विनंत्या, खरेदी व्यवहार आणि पेमेंट स्थितीचा आढावा"
    >
      <div className="space-y-8">
        {/* Quick Date Range & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E1E8E1] shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#374151]">
            <Calendar className="w-4 h-4 text-[#16A34A]" />
            <span className="font-semibold">कालावधी:</span>
            <span className="bg-[#F8FAF8] px-2.5 py-1 rounded-lg border border-[#E1E8E1]">
              चालू खरीप/रब्बी हंगाम २०२६ (हिंगोली APMC)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin/requests">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ClipboardList className="w-4 h-4 text-[#16A34A]" />
                <span>सर्व विनंत्या</span>
              </Button>
            </Link>

            <Link href="/admin/transactions">
              <Button variant="primary" size="sm" className="gap-1.5">
                <Receipt className="w-4 h-4" />
                <span>व्यवहार नोंदवही</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* 8 Primary Stat Cards Grid */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <StatCard
              title="एकूण शेतमाल विनंत्या"
              value={stats.totalRequests}
              subtext="+६ आज नवीन प्राप्त"
              icon={ClipboardList}
              variant="emerald"
            />
            <StatCard
              title="संपर्क बाकी (Pending Contact)"
              value={stats.pendingContactCount}
              subtext="तातडीने कॉल करणे आवश्यक"
              icon={PhoneCall}
              variant="amber"
            />
            <StatCard
              title="सौदा निश्चित / चर्चा चालू"
              value={stats.activeNegotiationsCount}
              subtext="गुणवत्ता तपासणी व भाव चर्चा"
              icon={Clock}
              variant="blue"
            />
            <StatCard
              title="यशस्वी व्यवहार (Completed)"
              value={stats.completedTransactionsCount}
              subtext="शेतकऱ्यांना हिशोब चुकता"
              icon={CheckCircle2}
              variant="emerald"
            />
            <StatCard
              title="एकूण खरेदी आवक (Volume)"
              value={`${stats.totalVolumeQuintals} क्विंटल`}
              subtext="चालू हंगामातील एकूण वजन"
              icon={Scale}
              variant="purple"
            />
            <StatCard
              title="एकूण उलाढाल (Traded Value)"
              value={formatCurrency(stats.totalGrossTradedValue)}
              subtext="बाजार समिती लिलाव मूल्य"
              icon={IndianRupee}
              variant="emerald"
            />
            <StatCard
              title="पेमेंट प्रक्रिया चालू"
              value={stats.pendingPaymentsCount}
              subtext="बँक ट्रान्सफर प्रक्रियेत"
              icon={CreditCard}
              variant="amber"
            />
            <StatCard
              title="खरेदीदार व्यापारी नेटवर्क"
              value="४+ नामांकित"
              subtext="दाल मिल्स, हळद प्रोसेसर्स"
              icon={Receipt}
              variant="blue"
            />
          </div>
        )}

        {/* Charts Grid: Status Distribution & Commodity Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Request Status Distribution */}
          <Card className="shadow-xs">
            <CardHeader className="border-b border-[#F1F5F1] pb-3">
              <CardTitle className="text-base text-[#14532D]">
                शेतमाल विनंती स्थिती वर्गीकरण (8 Stages)
              </CardTitle>
              <CardDescription>
                प्राप्त विनंत्यांचा सध्याचा चालू टप्प्यानुसार वाटा
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <StatusDistributionChart items={statusItems} />
            </CardContent>
          </Card>

          {/* Chart 2: Commodity Volume Breakdown */}
          <Card className="shadow-xs">
            <CardHeader className="border-b border-[#F1F5F1] pb-3">
              <CardTitle className="text-base text-[#14532D]">
                प्रमुख शेतमाल आवक प्रमाण (Volume Breakdown)
              </CardTitle>
              <CardDescription>
                हळद, सोयाबीन, कापूस व धान्याची एकूण क्विंटल आवक
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CommodityVolumeChart items={commodityVolume} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Requests Table and Recent Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Requests (2 Columns) */}
          <div className="lg:col-span-2">
            <Card className="shadow-xs">
              <CardHeader className="border-b border-[#F1F5F1] pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base text-[#14532D]">
                    अलिकडील शेतमाल विनंत्या (Recent Enquiries)
                  </CardTitle>
                  <CardDescription>
                    वेबसाइट व थेट कॉलवरून प्राप्त झालेल्या ताज्या ५ नोंदी
                  </CardDescription>
                </div>
                <Link href="/admin/requests">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <span>सर्व पहा</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardHeader>

              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                    <tr>
                      <th className="p-3.5 pl-5">विनंती क्र.</th>
                      <th className="p-3.5">शेतकरी</th>
                      <th className="p-3.5">शेतमाल</th>
                      <th className="p-3.5">प्रमाण</th>
                      <th className="p-3.5">स्थिती</th>
                      <th className="p-3.5 pr-5 text-right">कृती</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F1]">
                    {recentRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-[#F8FAF8] transition-colors">
                        <td className="p-3.5 pl-5 font-mono font-bold text-[#14532D]">
                          {req.requestNumber}
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-[#17231B]">{req.farmerName}</div>
                          <div className="text-[11px] text-[#647067]">{req.farmerVillage}, {req.farmerTaluka}</div>
                        </td>
                        <td className="p-3.5 font-medium text-[#14532D]">
                          {req.commodityNameMr}
                        </td>
                        <td className="p-3.5 font-semibold text-[#17231B]">
                          {formatQuantity(req.estimatedQuantity, req.unit)}
                        </td>
                        <td className="p-3.5">
                          <Badge status={req.status} />
                        </td>
                        <td className="p-3.5 pr-5 text-right">
                          <Link href={`/admin/requests/${req.id}`}>
                            <Button variant="outline" size="sm" className="text-xs h-7 px-2.5">
                              तपशील
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity / Audit Feed (1 Column) */}
          <div className="lg:col-span-1">
            <Card className="shadow-xs h-full flex flex-col justify-between">
              <CardHeader className="border-b border-[#F1F5F1] pb-3">
                <CardTitle className="text-base text-[#14532D]">
                  ऑडिट व कृती नोंद (Activity Feed)
                </CardTitle>
                <CardDescription>
                  कर्मचाऱ्यांनी केलेल्या ताज्या सिस्टीम नोंदी
                </CardDescription>
              </CardHeader>

              <CardContent className="p-4 flex-1 space-y-3.5">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-[#F8FAF8] border border-[#E1E8E1] space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#14532D]">{log.actionMr}</span>
                      <span className="text-[10px] text-[#647067] font-mono">{log.timestamp}</span>
                    </div>
                    <div className="text-[11px] text-[#4B5563]">
                      रेकॉर्ड: <code className="bg-white px-1 py-0.5 rounded border border-gray-200">{log.entityId}</code>
                    </div>
                    <div className="text-[10px] text-[#647067]">
                      युझर: {log.userEmail}
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="p-4 border-t border-[#F1F5F1] bg-[#F8FAF8] rounded-b-xl">
                <Link href="/admin/audit-logs">
                  <Button variant="ghost" size="sm" className="w-full text-xs justify-center">
                    संपूर्ण ऑडिट लॉग पहा →
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}
