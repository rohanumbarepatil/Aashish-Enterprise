"use client";

import * as React from "react";
import Link from "next/link";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { mockService } from "@/lib/mock-service";
import { SaleRequest, RequestStatus, Commodity } from "@/types";
import { formatQuantity, formatDate, buildWhatsAppLink } from "@/lib/utils";
import {
  Search,
  Phone,
  MessageCircle,
  Eye,
  Edit,
  X,
  Check,
  RefreshCw,
} from "lucide-react";

export default function AdminRequestsPage() {
  const [requests, setRequests] = React.useState<SaleRequest[]>([]);
  const [commodities, setCommodities] = React.useState<Commodity[]>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState("ALL");
  const [selectedCommodity, setSelectedCommodity] = React.useState("ALL");
  const [isLoading, setIsLoading] = React.useState(true);

  // Status Update Modal State
  const [editingRequest, setEditingRequest] = React.useState<SaleRequest | null>(null);
  const [newStatus, setNewStatus] = React.useState<RequestStatus>("RECEIVED");
  const [staffNotes, setStaffNotes] = React.useState("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  React.useEffect(() => {
    let active = true;
    Promise.all([
      mockService.getAdminRequests({
        status: selectedStatus,
        commodityId: selectedCommodity,
        search: searchQuery,
      }),
      mockService.getCommodities(),
    ]).then(([reqs, cmds]) => {
      if (active) {
        setRequests(reqs);
        setCommodities(cmds);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [selectedStatus, selectedCommodity, searchQuery]);

  const reloadRequests = async () => {
    const [reqs, cmds] = await Promise.all([
      mockService.getAdminRequests({
        status: selectedStatus,
        commodityId: selectedCommodity,
        search: searchQuery,
      }),
      mockService.getCommodities(),
    ]);
    setRequests(reqs);
    setCommodities(cmds);
  };

  const handleOpenStatusModal = (req: SaleRequest) => {
    setEditingRequest(req);
    setNewStatus(req.status);
    setStaffNotes(req.internalStaffNotes || "");
  };

  const handleSaveStatus = async () => {
    if (!editingRequest) return;
    setIsUpdating(true);
    await mockService.updateAdminRequestStatus(
      editingRequest.id,
      newStatus,
      staffNotes
    );
    setIsUpdating(false);
    setEditingRequest(null);
    reloadRequests();
  };

  const statusOptions: { key: RequestStatus; labelMr: string }[] = [
    { key: "RECEIVED", labelMr: "१. विनंती प्राप्त (Received)" },
    { key: "PENDING_CONTACT", labelMr: "२. संपर्क बाकी (Pending Contact)" },
    { key: "CONTACTED", labelMr: "३. संपर्क साधला (Contacted)" },
    { key: "INSPECTION", labelMr: "४. माल तपासणी (Inspection)" },
    { key: "DEAL_FINALIZED", labelMr: "५. सौदा निश्चित (Deal Finalized)" },
    { key: "PRODUCE_RECEIVED", labelMr: "६. माल प्राप्त (Produce Received)" },
    { key: "PAYMENT_PENDING", labelMr: "७. पेमेंट प्रक्रिया (Payment Pending)" },
    { key: "COMPLETED", labelMr: "८. व्यवहार पूर्ण (Completed)" },
    { key: "REJECTED", labelMr: "रद्द (Rejected)" },
  ];

  return (
    <AdminLayoutWrapper
      title="शेतमाल विनंत्या व्यवस्थापन (Farmer Enquiries)"
      subtitleMr="सर्व आलेल्या विक्री विनंत्यांची तपासणी, संपर्क, आणि व्यवहार स्थिती व्यवस्थापन"
    >
      <div className="space-y-6">
        {/* Search & Filter Toolbar */}
        <Card className="shadow-xs">
          <CardContent className="p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="नाव, मोबाईल, गाव किंवा विनंती क्र..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:bg-white transition-all"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                >
                  <option value="ALL">सर्व स्थिती (All Statuses)</option>
                  {statusOptions.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.labelMr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Commodity Filter */}
              <div>
                <select
                  value={selectedCommodity}
                  onChange={(e) => setSelectedCommodity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                >
                  <option value="ALL">सर्व शेतमाल (All Commodities)</option>
                  {commodities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameMr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Action */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedStatus("ALL");
                    setSelectedCommodity("ALL");
                  }}
                  className="w-full text-xs h-9"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  <span>फिल्टर्स साफ करा</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card className="shadow-xs overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-16 text-xs text-[#647067]">
                माहिती लोड होत आहे...
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <div className="text-sm font-bold text-[#17231B]">
                  कोणतीही विनंती सापडली नाही
                </div>
                <div className="text-xs text-[#647067]">
                  कृपया फिल्टर बदला किंवा नवीन विनंती नोंदवा.
                </div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead className="bg-[#F8FAF8] border-b border-[#E1E8E1] text-[#647067] font-semibold">
                  <tr>
                    <th className="p-3.5 pl-5">विनंती क्र.</th>
                    <th className="p-3.5">शेतकरी</th>
                    <th className="p-3.5">मोबाईल</th>
                    <th className="p-3.5">गाव व जिल्हा</th>
                    <th className="p-3.5">शेतमाल</th>
                    <th className="p-3.5">प्रमाण</th>
                    <th className="p-3.5">तारीख</th>
                    <th className="p-3.5">स्थिती</th>
                    <th className="p-3.5 pr-5 text-right">कृती (Actions)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F1]">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#F8FAF8] transition-colors">
                      <td className="p-3.5 pl-5 font-mono font-bold text-[#14532D]">
                        <Link
                          href={`/admin/requests/${req.id}`}
                          className="hover:underline flex items-center gap-1"
                        >
                          <span>{req.requestNumber}</span>
                        </Link>
                      </td>
                      <td className="p-3.5 font-bold text-[#17231B]">
                        {req.farmerName}
                      </td>
                      <td className="p-3.5 font-mono text-[#374151]">
                        +९१ {req.farmerMobile}
                      </td>
                      <td className="p-3.5 text-[#4B5563]">
                        {req.farmerVillage}, {req.farmerTaluka}
                      </td>
                      <td className="p-3.5 font-semibold text-[#14532D]">
                        {req.commodityNameMr}
                      </td>
                      <td className="p-3.5 font-bold text-[#17231B]">
                        {formatQuantity(req.estimatedQuantity, req.unit)}
                      </td>
                      <td className="p-3.5 text-[#647067]">
                        {formatDate(req.createdAt)}
                      </td>
                      <td className="p-3.5">
                        <Badge status={req.status} />
                      </td>
                      <td className="p-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Call Button */}
                          <a
                            href={`tel:${req.farmerMobile}`}
                            className="p-1.5 rounded-lg border border-[#E1E8E1] hover:bg-emerald-50 text-[#14532D] transition-colors"
                            title="कॉल करा"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
                          </a>

                          {/* WhatsApp Button */}
                          <a
                            href={buildWhatsAppLink({
                              farmerName: req.farmerName,
                              village: req.farmerVillage,
                              commodityName: req.commodityNameMr,
                              quantity: req.estimatedQuantity,
                              unit: req.unit,
                              requestId: req.requestNumber,
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-[#A7F3D0] hover:bg-[#D1FAE5] text-[#14532D] transition-colors"
                            title="WhatsApp चॅट"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          </a>

                          {/* Status Update Trigger */}
                          <button
                            type="button"
                            onClick={() => handleOpenStatusModal(req)}
                            className="p-1.5 rounded-lg border border-[#E1E8E1] hover:bg-amber-50 text-amber-800 transition-colors"
                            title="स्थिती बदला"
                          >
                            <Edit className="w-3.5 h-3.5 text-amber-600" />
                          </button>

                          {/* Detail View */}
                          <Link href={`/admin/requests/${req.id}`}>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg border border-[#E1E8E1] hover:bg-gray-100 text-[#17231B] transition-colors"
                              title="तपशील उघडा"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        {/* Status Update Modal */}
        {editingRequest && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full border border-[#E1E8E1] shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#F1F5F1] pb-3">
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-[#14532D]">
                    विनंती स्थिती बदला (Update Status)
                  </h3>
                  <div className="text-xs font-mono text-[#647067]">
                    {editingRequest.requestNumber} - {editingRequest.farmerName}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingRequest(null)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#17231B]">
                    नवीन स्थिती निवडा (New Stage)
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as RequestStatus)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.labelMr}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#17231B]">
                    अंतर्गत टीप / कर्मचारी रिमार्क्स (Internal Notes)
                  </label>
                  <textarea
                    rows={3}
                    value={staffNotes}
                    onChange={(e) => setStaffNotes(e.target.value)}
                    placeholder="उदा. शेतकऱ्याशी फोनवर भाव ₹ १३,५०० निश्चित झाला. उद्या सकाळी माल आणणार..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                  />
                  <p className="text-[10px] text-[#647067]">
                    * ही टीप फक्त कर्मचाऱ्यांना दिसेल, शेतकऱ्याच्या ट्रॅकिंग स्क्रीनवर कधीही दिसणार नाही.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F1F5F1]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingRequest(null)}
                >
                  रद्द करा
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveStatus}
                  isLoading={isUpdating}
                  className="gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>बदल सेव्ह करा</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
