"use client";

import * as React from "react";
import {
  PhoneCall,
  Languages,
  FileSpreadsheet,
  SearchCheck,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/language-context";

export function BenefitsSection() {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: PhoneCall,
      title: t("सोपा थेट संपर्क", "Direct Access"),
      desc: t(
        "कोणत्याही मध्यस्थाशिवाय थेट आशिष एंटरप्राइजेसच्या आडत कार्यालयाशी संपर्क साधता येतो.",
        "Connect directly with Ashish Enterprises trading desk without intermediaries."
      ),
    },
    {
      icon: Languages,
      title: t("द्विभाषिक (मराठी व इंग्रजी) अनुभव", "Bilingual Support"),
      desc: t(
        "शेतकऱ्यांच्या सुलभतेसाठी मराठी आणि इंग्रजी दोन्ही भाषांमध्ये संवाद व माहिती उपलब्ध.",
        "Accessible experience available in both Marathi and English."
      ),
    },
    {
      icon: FileSpreadsheet,
      title: t("शेतमालाची पारदर्शक नोंद", "Accurate Recording"),
      desc: t(
        "तुमच्या शेतमालाचे प्रमाण, जात व गुणवत्ता याची संगणकीय नोंद व व्यवस्थित हिशोब.",
        "Computerized recording of commodity type, volume, and quality grading."
      ),
    },
    {
      icon: SearchCheck,
      title: t("Request Tracking सुविधा", "Request Tracking"),
      desc: t(
        "तुमची विक्री विनंती कोणत्या टप्प्यावर आहे हे पारदर्शकपणे घरबसल्या तपासा.",
        "Track your produce enquiry stage from inspection to payment completion."
      ),
    },
    {
      icon: MessageCircle,
      title: t("Call आणि WhatsApp सुविधा", "Call & WhatsApp"),
      desc: t(
        "एका क्लिकवर कॉल किंवा WhatsApp मेसेज पाठवून बाजारभावाची ताजी माहिती मिळवा.",
        "One-click calling and WhatsApp chat for quick price and arrival guidance."
      ),
    },
    {
      icon: ShieldCheck,
      title: t("बाजार समिती नियमांचे पालन", "APMC Compliance"),
      desc: t(
        "सर्व व्यवहार महाराष्ट्र कृषी उत्पन्न बाजार समितीच्या कायदेशीर चौकटीत व नियमांनुसार.",
        "All transactions comply with Maharashtra APMC agricultural market regulations."
      ),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t("शेतकऱ्यांसाठी खास वैशिष्ट्ये", "Key Benefits")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            {t("आशिष एंटरप्राइजेस सोबत व्यापाराचे फायदे", "Why Trade With Ashish Enterprises")}
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            {t(
              "आम्ही पारंपारिक आडत व्यापाराला आधुनिक तंत्रज्ञानाची जोड देऊन शेतकऱ्यांचा शेतमाल विक्रीचा अनुभव सोपा आणि विश्वासाचा केला आहे.",
              "Combining experienced agricultural trading with modern transparency, easy contact, and reliable buyer connectivity."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAF8] border border-[#E1E8E1] hover:border-[#86EFAC] transition-all space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-[#14532D] flex items-center justify-center group-hover:bg-[#14532D] group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#14532D]">
                  {benefit.title}
                </h3>
                <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
