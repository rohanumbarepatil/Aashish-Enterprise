"use client";

import * as React from "react";
import Link from "next/link";
import { Check, ClipboardList, PhoneCall, Handshake, ArrowRight, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export function ProcessSteps() {
  const { t } = useLanguage();

  const steps = [
    {
      stepNumber: 1,
      title: t("शेतमाल निवडा", "Select Commodity"),
      desc: t(
        "गहू, ज्वारी, हळद, टाळक्या किंवा कापूस शेतमालाचा प्रकार निवडा.",
        "Choose commodity: Wheat, Jowar, Turmeric, टाळक्या, or Cotton."
      ),
      icon: Sprout,
    },
    {
      stepNumber: 2,
      title: t("माहिती भरा", "Enter Details"),
      desc: t(
        "नाव, मोबाईल नंबर, गाव आणि अंदाजे क्विंटल प्रमाण नोंदवा.",
        "Provide your name, phone number, village, and quantity."
      ),
      icon: ClipboardList,
    },
    {
      stepNumber: 3,
      title: t("विनंती पाठवा", "Submit Enquiry"),
      desc: t(
        "फॉर्म सबमिट करा किंवा थेट WhatsApp वर मेसेज पाठवा.",
        "Submit the form or directly connect on WhatsApp."
      ),
      icon: Check,
    },
    {
      stepNumber: 4,
      title: t("आमच्याकडून संपर्क", "Quick Coordination"),
      desc: t(
        "आमचे खरेदी प्रतिनिधी फोन किंवा WhatsApp द्वारे संपर्क साधतील.",
        "Our team contacts you directly to discuss produce details."
      ),
      icon: PhoneCall,
    },
    {
      stepNumber: 5,
      title: t("व्यवहार पूर्ण करा", "Finalize Deal"),
      desc: t(
        "बाजारभाव, वजन काटा तोलाई व सुरक्षित पेमेंट प्रक्रिया पूर्ण करा.",
        "Agree on transparent rates, accurate weighing, and clear payout."
      ),
      icon: Handshake,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F8FAF8] border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#D97706] bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {t("सोपी व पारदर्शक पद्धत", "Simple & Transparent Process")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            {t("शेतमाल खरेदी-विक्रीची सोपी प्रक्रिया", "How Our Trading Works")}
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            {t(
              "आशिष एंटरप्राइजेसशी व्यवहार करण्यासाठी कोणत्याही किचकट प्रक्रियेची गरज नाही. फक्त ५ सोप्या टप्प्यांत तुमचा शेतमाल विकण्याची माहिती द्या.",
              "Trading with Ashish Enterprises is simple, transparent, and direct in 5 easy steps."
            )}
          </p>
        </div>

        {/* 5 Steps Grid with Connecting Line */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step) => {
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
                  {step.title}
                </h3>

                <p className="text-xs text-[#4B5563] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <Link href="/sell-produce">
            <Button variant="primary" size="lg" className="gap-2 shadow-md">
              <span>{t("आता विनंती पाठवा (Sell Produce)", "Start Trading With Us")}</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
