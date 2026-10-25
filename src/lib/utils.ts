import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BUSINESS_CONFIG } from "@/config/business";
import { UnitType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers as Indian Rupee currency (e.g. ₹ 1,45,200)
 */
export function formatCurrency(amount: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
  return `₹ ${formatted}`;
}

/**
 * Format date into clean readable Marathi/English format
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("mr-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Format quantity with Marathi unit label
 */
export function formatQuantity(qty: number, unit: UnitType): string {
  const unitMap: Record<UnitType, string> = {
    KG: "किलो",
    QUINTAL: "क्विंटल",
    TONNE: "टन",
  };
  return `${qty} ${unitMap[unit] || unit}`;
}

/**
 * Mask sensitive name for privacy on public tracking page
 * e.g., "ज्ञानोबा तुकाराम पाटील" -> "ज्ञा**** पा****"
 */
export function maskName(fullName: string): string {
  if (!fullName) return "";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) {
    const first = parts[0];
    return first.slice(0, 2) + "****";
  }
  return parts
    .map((part) => (part.length > 2 ? part.slice(0, 2) + "****" : part + "**"))
    .join(" ");
}

/**
 * Build prefilled Marathi WhatsApp message link
 */
export function buildWhatsAppLink(details?: {
  farmerName?: string;
  village?: string;
  commodityName?: string;
  quantity?: number;
  unit?: string;
  requestId?: string;
  lang?: "mr" | "en";
  customMessage?: string;
}): string {
  const phone = BUSINESS_CONFIG.contact.whatsAppNumber.replace(/[^0-9]/g, "");

  if (details?.customMessage) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(details.customMessage)}`;
  }

  const isEn = details?.lang === "en";

  let message = "";
  if (isEn) {
    if (details?.requestId) {
      message = `Hello Ashish Enterprises,\nI would like to enquire about my sale request ID: ${details.requestId}.`;
    } else if (details?.commodityName) {
      message = `Hello Ashish Enterprises,\nI would like to enquire about selling agricultural produce:\nCommodity: ${details.commodityName}`;
      if (details.farmerName) message += `\nName: ${details.farmerName}`;
      if (details.village) message += `\nVillage/Location: ${details.village}`;
      if (details.quantity && details.unit) {
        message += `\nEstimated Quantity: ${details.quantity} ${details.unit}`;
      }
    } else {
      message = "Hello Ashish Enterprises, I would like to know more about your agricultural commodity buying and selling services.";
    }
  } else {
    message = `नमस्कार आशिष एंटरप्राइजेस,`;
    if (details?.requestId) {
      message += `\nमाझ्या शेतमाल विक्री विनंती क्र. ${details.requestId} बाबत मला चौकशी करायची आहे.`;
    } else if (details?.commodityName) {
      message += `\nमला शेतमाल विक्रीसाठी संपर्क करायचा आहे:`;
      if (details.farmerName) message += `\nशेतकरी नाव: ${details.farmerName}`;
      if (details.village) message += `\nगाव: ${details.village}`;
      message += `\nशेतमाल: ${details.commodityName}`;
      if (details.quantity && details.unit) {
        message += `\nअंदाजे प्रमाण: ${details.quantity} ${details.unit}`;
      }
    } else {
      message = `नमस्कार आशिष एंटरप्राइजेस, मला कृषी मालाबद्दल माहिती हवी आहे.`;
    }
  }

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Build tel: link for click-to-call
 */
export function buildCallLink(): string {
  return `tel:${BUSINESS_CONFIG.contact.primaryPhone}`;
}
