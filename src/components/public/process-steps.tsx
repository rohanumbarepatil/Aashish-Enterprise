import * as React from "react";
import Link from "next/link";
import { Check, ClipboardList, PhoneCall, Handshake, ArrowRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  {
    stepNumber: 1,
    titleMr: "शेतमाल निवडा",
    descMr: "हळद, सोयाबीन, कापूस, गहू किंवा इतर शेतमालाचा प्रकार निवडा.",
    icon: Sprout,
  },
  {
    stepNumber: 2,
    titleMr: "तुमची माहिती भरा",
    descMr: "नाव, मोबाईल नंबर, गाव आणि अंदाजे गोणी/क्विंटल प्रमाण नोंदवा.",
    icon: ClipboardList,
  },
  {
    stepNumber: 3,
    titleMr: "विनंती पाठवा",
    descMr: "फॉर्म सबमिट करा. तुम्हाला तात्काळ युनिक विनंती क्र. प्राप्त होईल.",
    icon: Check,
  },
  {
    stepNumber: 4,
    titleMr: "आमच्याकडून संपर्क",
    descMr: "आमचे खरेदी प्रतिनिधी फोन किंवा WhatsApp द्वारे संपर्क साधतील.",
    icon: PhoneCall,
  },
  {
    stepNumber: 5,
    titleMr: "व्यवहाराच्या अटी निश्चित करा",
    descMr: "बाजारभाव, माल आणण्याची वेळ, तोलाई व पेमेंटच्या अटी निश्चित करा.",
    icon: Handshake,
  },
];

export function ProcessSteps() {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAF8] border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#D97706] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            सोपी व पारदर्शक पद्धत
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            शेतमाल विक्रीची सोपी प्रक्रिया
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            आशिष एंटरप्राइजेसशी व्यवहार करण्यासाठी कोणत्याही किचकट प्रक्रियेची गरज नाही. फक्त ५ सोप्या टप्प्यांत तुमचा शेतमाल विकण्याची माहिती द्या.
          </p>
        </div>

        {/* 5 Steps Grid with Connecting Line */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {STEPS.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.stepNumber}
                className="relative bg-white rounded-2xl p-6 border border-[#E1E8E1] shadow-xs hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-3 group"
              >
                {/* Step Number Badge */}
                <div className="w-12 h-12 rounded-2xl bg-[#14532D] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#16A34A] transition-colors relative">
                  <span className="text-amber-300 font-mono text-sm">०{step.stepNumber}</span>
                </div>

                <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-base font-bold text-[#14532D] leading-tight">
                  {step.titleMr}
                </h3>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {step.descMr}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <Link href="/sell-produce">
            <Button variant="primary" size="lg" className="gap-2 shadow-md">
              <span>आता विनंती पाठवा (Sell Produce)</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
