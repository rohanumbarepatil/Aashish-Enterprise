import * as React from "react";
import {
  PhoneCall,
  Languages,
  FileSpreadsheet,
  SearchCheck,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const BENEFITS = [
  {
    icon: PhoneCall,
    titleMr: "सोपा थेट संपर्क",
    descMr: "कोणत्याही मध्यस्थाशिवाय थेट आशिष एंटरप्राइजेसच्या आडत कार्यालयाशी संपर्क साधता येतो.",
  },
  {
    icon: Languages,
    titleMr: "Marathi-first अनुभव",
    descMr: "शेतकऱ्यांच्या सुलभतेसाठी संपूर्ण प्लॅटफॉर्म आणि संवाद मराठी भाषेत उपलब्ध.",
  },
  {
    icon: FileSpreadsheet,
    titleMr: "शेतमालाची डिजिटल नोंद",
    descMr: "तुमच्या शेतमालाचे प्रमाण, जात व गुणवत्ता याची संगणकीय नोंद व युनिक रेफरन्स नंबर.",
  },
  {
    icon: SearchCheck,
    titleMr: "Request Tracking सुविधा",
    descMr: "तुमची विक्री विनंती कोणत्या टप्प्यावर आहे (उदा. तपासणी, सौदा, पेमेंट) हे घरबसल्या तपासा.",
  },
  {
    icon: MessageCircle,
    titleMr: "Call आणि WhatsApp सुविधा",
    descMr: "एका क्लिकवर कॉल किंवा WhatsApp मेसेज पाठवून बाजारभावाची ताजी माहिती मिळवा.",
  },
  {
    icon: ShieldCheck,
    titleMr: "बाजार समिती नियमांचे पालन",
    descMr: "सर्व व्यवहार महाराष्ट्र कृषी उत्पन्न बाजार समितीच्या कायदेशीर चौकटीत व नियमांनुसार.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E1E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            शेतकऱ्यांसाठी खास वैशिष्ट्ये
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            आशिष एंटरप्राइजेस सोबत व्यापाराचे फायदे
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            आम्ही पारंपारिक आडत व्यापाराला आधुनिक तंत्रज्ञानाची जोड देऊन शेतकऱ्यांचा शेतमाल विक्रीचा अनुभव सोपा आणि विश्वासाचा केला आहे.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((benefit, idx) => {
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
                  {benefit.titleMr}
                </h3>
                <p className="text-xs md:text-sm text-[#4B5563] leading-relaxed">
                  {benefit.descMr}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
