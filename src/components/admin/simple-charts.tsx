"use client";

import * as React from "react";

interface StatusDistributionItem {
  label: string;
  count: number;
  color: string;
}

export function StatusDistributionChart({
  items,
}: {
  items: StatusDistributionItem[];
}) {
  const total = items.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-4">
      {/* Horizontal Stacked Bar */}
      <div className="h-4 w-full rounded-full bg-gray-100 flex overflow-hidden">
        {items.map((item, idx) => {
          const percent = total > 0 ? (item.count / total) * 100 : 0;
          if (percent === 0) return null;
          return (
            <div
              key={idx}
              style={{ width: `${percent}%`, backgroundColor: item.color }}
              title={`${item.label}: ${item.count} (${percent.toFixed(1)}%)`}
              className="h-full transition-all duration-300"
            />
          );
        })}
      </div>

      {/* Legend & Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {items.map((item, idx) => {
          const percent = total > 0 ? ((item.count / total) * 100).toFixed(0) : "0";
          return (
            <div key={idx} className="flex items-center gap-2 text-xs">
              <span
                className="w-3 h-3 rounded-md shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="truncate">
                <span className="text-[#374151] font-medium block truncate">
                  {item.label}
                </span>
                <span className="text-[#647067] font-semibold">
                  {item.count} ({percent}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface CommodityVolumeItem {
  commodityName: string;
  quintals: number;
  percentage: number;
}

export function CommodityVolumeChart({
  items,
}: {
  items: CommodityVolumeItem[];
}) {
  const maxVolume = Math.max(...items.map((i) => i.quintals), 100);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const barWidth = (item.quintals / maxVolume) * 100;
        return (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#14532D]">{item.commodityName}</span>
              <span className="font-semibold text-[#374151]">
                {item.quintals} क्विंटल ({item.percentage}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-emerald-50 rounded-full overflow-hidden border border-emerald-100">
              <div
                className="h-full bg-gradient-to-r from-[#14532D] to-[#16A34A] rounded-full transition-all duration-300"
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
