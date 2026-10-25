"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: t("शेतमालाचा दर कसा ठरवला जातो?", "How is the commodity price determined?"),
      a: t(
        "शेतमालाचे दर हे कृषी उत्पन्न बाजार समितीतील दैनंदिन लिलाव, बाजारातील एकूण आवक, आणि तुमच्या मालाची प्रतवारी (ओलावा, काडी-कचरा, दाण्याचा आकार, हळदीतील कुरकुमीन रंग) यावर अवलंबून असतात. आम्ही शेतकऱ्याला पारदर्शक चालू बाजारभाव सांगतो.",
        "Prices are determined by daily APMC auction rates, market arrivals, and produce quality (moisture content, purity, grain size, turmeric curcumin levels). We provide transparent, prevailing market rates."
      ),
    },
    {
      q: t("माल केंद्रावर कधी आणि कसा आणायचा?", "When and how to bring produce to the yard?"),
      a: t(
        "वेबसाइटवर विनंती पाठवल्यानंतर किंवा WhatsApp/कॉलवर चर्चा झाल्यानंतर आमचे खरेदी प्रतिनिधी बाजारातील गर्दी आणि लिलावाच्या वेळेनुसार (सकाळी ९ ते दुपारी ३) माल घेऊन येण्याची योग्य वेळ सांगतात.",
        "After submitting an enquiry or calling our team, we will confirm the ideal timing during trading hours (9 AM to 3 PM) to ensure smooth unloading and auctioning."
      ),
    },
    {
      q: t("तोलाई (वजन) आणि हमालीचे काय नियम आहेत?", "What are the weighing and handling rules?"),
      a: t(
        "आशिष एंटरप्राइजेसमध्ये सर्व शेतमालाचे वजन बाजार समिती मान्यताप्राप्त इलेक्ट्रॉनिक धर्मकाट्यावर अचूक केले जाते. हमाली व तोलाईचे दर APMC च्या नियमांनुसारच आकारले जातात आणि पावतीवर स्पष्ट नमूद असतात.",
        "All produce is weighed accurately on APMC-certified electronic weighbridges. Handling charges conform strictly to APMC regulations and are clearly itemized on transaction slips."
      ),
    },
    {
      q: t("शेतकऱ्याला पेमेंट कसे मिळते?", "How is payment settled?"),
      a: t(
        "माल केंद्रावर पोहोचून वजन आणि अंतिम हिशोब झाल्यावर शेतकऱ्याच्या पसंतीनुसार थेट बँक खात्यात (NEFT / RTGS / UPI) किंवा अधिकृत पावतीसह तात्काळ पेमेंट केले जाते.",
        "Once produce is received, graded, and weighed, payment is processed promptly via bank transfer (NEFT/RTGS/UPI) or established APMC settlement procedures with official receipt slips."
      ),
    },
    {
      q: t("कोणत्या प्रमुख शेतमालाचा व्यापार होतो?", "Which primary commodities do you trade?"),
      a: t(
        "आम्ही प्रामुख्याने गहू (Wheat), ज्वारी (Jowar / Sorghum), हळद (Turmeric), टाळक्या, आणि कापूस (Cotton) यांसह सोयाबीन व कडधान्यांची खरेदी-विक्री करतो.",
        "We primarily trade wheat, jowar / sorghum, turmeric, टाळक्या, and raw cotton, along with soybean and seasonal pulses."
      ),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F8FAF8] border-b border-[#E1E8E1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {t("शंका व समाधान", "Frequently Asked Questions")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#14532D]">
            {t("नेहमी विचारले जाणारे प्रश्न (FAQ)", "Common Questions & Answers")}
          </h2>
          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed">
            {t(
              "शेतमाल विक्री, वजन, बाजारभाव आणि पेमेंट संदर्भातील काही महत्त्वाच्या प्रश्नांची उत्तरे.",
              "Helpful information regarding commodity trading, weighing, pricing, and settlement."
            )}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
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
