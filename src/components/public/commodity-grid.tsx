"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Commodity } from "@/types";
import { Button } from "@/components/ui/button";

interface CommodityGridProps {
  commodities: Commodity[];
  isHomepagePreview?: boolean;
}

export function CommodityGrid({
  commodities,
  isHomepagePreview = false,
}: CommodityGridProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("ALL");

  const categories = [
    { key: "ALL", labelMr: "सर्व शेतमाल" },
    { key: "SPICE", labelMr: "हळद व मसाले" },
    { key: "OILSEED", labelMr: "तेलबिया (सोयाबीन)" },
    { key: "COMMERCIAL", labelMr: "कापूस" },
    { key: "CEREAL", labelMr: "गहू व ज्वारी" },
    { key: "PULSE", labelMr: "हरभरा व मूग" },
  ];

  const filtered = commodities.filter((item) => {
    const matchesSearch =
      item.nameMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionMr.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const displayList = isHomepagePreview ? commodities.slice(0, 8) : filtered;

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              आम्ही कोणता शेतमाल घेतो?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
              प्रमुख शेतमाल खरेदी यादी
            </h2>
            <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
              हळद (काडी, गोळा, ताळक्या), सोयाबीन, कापूस, धान्य व कडधान्य खरेदीसाठी आम्ही सदैव तत्पर आहोत. आपल्या मालाची प्रतवारीनुसार योग्य बाजारभाव मिळवा.
            </p>
          </div>

          {isHomepagePreview && (
            <Link href="/commodities">
              <Button variant="outline" className="gap-2 border-emerald-600/40 text-[#14532D]">
                <span>सर्व १२+ शेतमाल पहा</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Filter Bar (Only shown on full page) */}
        {!isHomepagePreview && (
          <div className="mb-10 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#647067] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="शेतमालाचे नाव शोधा (उदा. हळद, सोयाबीन, कापूस)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E1E8E1] bg-[#F8FAF8] text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:bg-white transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.key
                      ? "bg-[#14532D] text-white shadow-xs"
                      : "bg-[#F8FAF8] text-[#4B5563] border border-[#E1E8E1] hover:bg-emerald-50 hover:text-[#14532D]"
                  }`}
                >
                  {cat.labelMr}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cards Grid */}
        {displayList.length === 0 ? (
          <div className="text-center py-16 bg-[#F8FAF8] rounded-2xl border border-dashed border-[#E1E8E1] space-y-3">
            <Sparkles className="w-8 h-8 text-[#647067] mx-auto opacity-40" />
            <h3 className="text-base font-bold text-[#17231B]">
              कोणताही शेतमाल सापडला नाही
            </h3>
            <p className="text-xs text-[#647067]">
              कृपया दुसरे नाव शोधून पहा किंवा खाली दिलेल्या बटणावरून थेट संपर्क करा.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
              }}
            >
              सर्व शेतमाल दाखवा
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayList.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E1E8E1] bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#86EFAC] transition-all flex flex-col group"
              >
                {/* Photo with category badge */}
                <div className="relative h-44 w-full bg-emerald-50 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.nameMr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#14532D]/90 text-white backdrop-blur-xs shadow-xs">
                      {item.categoryNameMr}
                    </span>
                  </div>
                  {item.isActive ? (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#14532D] border border-emerald-300">
                        खरेदी सुरू
                      </span>
                    </div>
                  ) : (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-300">
                        हंगाम बाकी
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-[#14532D] leading-tight">
                      {item.nameMr}
                    </h3>
                    <p className="text-xs text-[#647067] font-semibold">
                      {item.nameEn}
                    </p>
                    <p className="text-xs text-[#4B5563] leading-relaxed pt-1 line-clamp-3">
                      {item.descriptionMr}
                    </p>
                  </div>

                  {/* Card Action */}
                  <div className="pt-2 border-t border-[#F1F5F1]">
                    <Link
                      href={`/sell-produce?commodity=${encodeURIComponent(item.id)}`}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between group-hover:bg-[#14532D] group-hover:text-white transition-colors"
                      >
                        <span>विक्रीसाठी नोंदवा</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner on Homepage */}
        {isHomepagePreview && (
          <div className="mt-14 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#14532D] to-[#16A34A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                यादीत नसलेला शेतमाल आहे?
              </span>
              <h3 className="text-xl md:text-2xl font-bold">
                इतर कोणत्याही शेतमालाच्या विक्रीसाठी थेट आमच्याशी बोला
              </h3>
              <p className="text-xs md:text-sm text-emerald-100/90 max-w-xl">
                उडीद, तूर, बाजरी, मका किंवा इतर धान्याच्या आवक व चालू बाजारभावासाठी आमच्या प्रतिनिधीशी फोनवर संपर्क साधा.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link href="/sell-produce" className="w-full sm:w-auto">
                <Button variant="accent" size="lg" className="w-full sm:w-auto gap-2">
                  <span>फॉर्म भरा</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
