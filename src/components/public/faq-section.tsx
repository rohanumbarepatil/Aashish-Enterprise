"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "शेतमालाचा दर कसा ठरवला जातो?",
    a: "शेतमालाचे दर हे कृषी उत्पन्न बाजार समितीतील दैनंदिन लिलाव, बाजारातील एकूण आवक, आणि तुमच्या मालाची प्रतवारी (ओलावा, काडी-कचरा, दाण्याचा आकार, हळदीतील कुरकुमीन रंग) यावर अवलंबून असतात. आम्ही शेतकऱ्याला पारदर्शक चालू बाजारभाव सांगतो.",
  },
  {
    q: "माल केंद्रावर कधी आणि कसा आणायचा?",
    a: "वेबसाइटवर विनंती पाठवल्यानंतर आमचे खरेदी प्रतिनिधी तुम्हाला फोन करतील. बाजारातील गर्दी आणि लिलावाच्या वेळेनुसार (सकाळी ९ ते दुपारी ३) माल घेऊन येण्याची योग्य वेळ ठरवली जाते.",
  },
  {
    q: "तोलाई (वजन) आणि हमालीचे काय नियम आहेत?",
    a: "आशिष एंटरप्राइजेसमध्ये सर्व शेतमालाचे वजन बाजार समिती मान्यताप्राप्त इलेक्ट्रॉनिक धर्मकाट्यावर अचूक केले जाते. हमाली व तोलाईचे दर APMC च्या नियमांनुसारच आकारले जातात आणि पावतीवर स्पष्ट नमूद असतात.",
  },
  {
    q: "शेतकऱ्याला पेमेंट कसे मिळते?",
    a: "माल केंद्रावर पोहोचून वजन आणि अंतिम हिशोब झाल्यावर शेतकऱ्याच्या इच्छेनुसार थेट बँक खात्यात (NEFT / RTGS) किंवा तात्काळ रोख स्वरूपात पेमेंट केले जाते. प्रत्येक व्यवहाराची अधिकृत पट्टी दिली जाते.",
  },
  {
    q: "शेतमालाची विक्री विनंती पाठवल्यावर काय होते?",
    a: "विनंती सबमिट करताच तुम्हाला DEMO विनंती क्रमांक (उदा. DEMO-AE-2026-XXXXXX) मिळतो. आमची टीम फोनवर संपर्क साधून तुमच्या मालाचे नमुने, वाहतूक व दराविषयी सविस्तर चर्चा करते.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="py-16 md:py-20 bg-[#F8FAF8] border-b border-[#E1E8E1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            शंका व समाधान
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            नेहमी विचारले जाणारे प्रश्न (FAQ)
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            शेतमाल विक्री, वजन, बाजारभाव आणि पेमेंट संदर्भातील काही महत्त्वाच्या प्रश्नांची उत्तरे.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E1E8E1] bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-base md:text-lg text-[#14532D] hover:text-[#16A34A] transition-colors gap-4"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-[#16A34A] shrink-0 transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm text-[#4B5563] leading-relaxed border-t border-[#F1F5F1] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
