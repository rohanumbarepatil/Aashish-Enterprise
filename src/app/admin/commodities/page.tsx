"use client";

import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockService } from "@/lib/mock-service";
import { Commodity } from "@/types";
import { Plus, X, Search } from "lucide-react";

export default function AdminCommoditiesPage() {
  const [commodities, setCommodities] = React.useState<Commodity[]>([]);
  const [search, setSearch] = React.useState("");
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);

  // New commodity form state
  const [nameMr, setNameMr] = React.useState("");
  const [nameEn, setNameEn] = React.useState("");
  const [category, setCategory] = React.useState<Commodity["category"]>("SPICE");
  const [descriptionMr, setDescriptionMr] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    mockService.getCommodities().then((data) => {
      setCommodities(data);
    });
  }, []);

  const refreshList = async () => {
    const data = await mockService.getCommodities();
    setCommodities(data);
  };

  const handleToggleStatus = async (id: string) => {
    await mockService.toggleCommodityStatus(id);
    refreshList();
  };

  const handleAddCommodity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameMr) return;

    await mockService.addCommodity({
      code: nameEn.toUpperCase().replace(/\s+/g, "_") || "CUSTOM",
      nameMr,
      nameEn: nameEn || nameMr,
      category,
      categoryNameMr: category === "SPICE" ? "मसाला पीक" : category === "OILSEED" ? "तेलबिया" : "कृषी शेतमाल",
      descriptionMr: descriptionMr || "आशिष एंटरप्राइजेस द्वारे नियमित खरेदी.",
      defaultUnit: "QUINTAL",
      imageUrl:
        imageUrl ||
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80",
      isActive: true,
      minBatchQuintal: 5,
    });

    setIsAddModalOpen(false);
    setNameMr("");
    setNameEn("");
    setDescriptionMr("");
    setImageUrl("");
    refreshList();
  };

  const filtered = commodities.filter(
    (c) =>
      c.nameMr.toLowerCase().includes(search.toLowerCase()) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayoutWrapper
      title="शेतमाल सूची व्यवस्थापन (Commodity Management)"
      subtitleMr="खरेदी केल्या जाणाऱ्या शेतमालाची नावे, फोटो, वर्गवारी आणि चालू/बंद स्थिती"
    >
      <div className="space-y-6">
        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="शेतमाल शोधा..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-[#E1E8E1] bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>नवीन शेतमाल जोडा (Add Commodity)</span>
          </Button>
        </div>

        {/* Commodity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-xs hover:shadow-md transition-shadow">
              <div className="h-36 relative bg-emerald-50">
                <img
                  src={item.imageUrl}
                  alt={item.nameMr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#14532D]/90 text-white">
                    {item.categoryNameMr}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(item.id)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                      item.isActive
                        ? "bg-emerald-100 text-[#14532D] border-emerald-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {item.isActive ? "सक्रिय (Active)" : "बंद (Inactive)"}
                  </button>
                </div>
              </div>

              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-[#14532D]">{item.nameMr}</h3>
                <p className="text-[11px] text-[#647067] font-semibold">{item.nameEn}</p>
                <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                  {item.descriptionMr}
                </p>

                <div className="pt-2 border-t border-[#F1F5F1] flex items-center justify-between text-xs">
                  <span className="text-[#647067]">डीफॉल्ट एकक:</span>
                  <span className="font-bold text-[#17231B]">{item.defaultUnit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Commodity Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full border border-[#E1E8E1] shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#F1F5F1] pb-3">
                <h3 className="text-base font-bold text-[#14532D]">
                  नवीन शेतमाल जोडा (Add New Commodity)
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddCommodity} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#17231B]">
                    मराठी नाव <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={nameMr}
                    onChange={(e) => setNameMr(e.target.value)}
                    placeholder="उदा. हळद तुकडी / सूर्यफूल"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#17231B]">
                    इंग्रजी नाव (English Name)
                  </label>
                  <input
                    type="text"
                    value={nameEn}
                    onChange={(e) => setNameEn(e.target.value)}
                    placeholder="e.g. Sunflower"
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs focus:ring-2 focus:ring-[#16A34A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#17231B]">
                    वर्गवारी (Category)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Commodity["category"])}
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs"
                  >
                    <option value="SPICE">मसाला पीक (Spice)</option>
                    <option value="OILSEED">तेलबिया (Oilseed)</option>
                    <option value="COMMERCIAL">नगदी पीक (Commercial)</option>
                    <option value="CEREAL">तृणधान्य (Cereal)</option>
                    <option value="PULSE">कडधान्य (Pulse)</option>
                    <option value="OTHER">इतर (Other)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#17231B]">
                    तपशील (Description in Marathi)
                  </label>
                  <textarea
                    rows={2}
                    value={descriptionMr}
                    onChange={(e) => setDescriptionMr(e.target.value)}
                    placeholder="मालाची वैशिष्ट्ये..."
                    className="w-full px-3 py-2 rounded-xl border border-[#E1E8E1] text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F1F5F1]">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    रद्द करा
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    शेतमाल जोडा
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
