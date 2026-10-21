import * as React from "react";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";
import { BUSINESS_CONFIG } from "@/config/business";

export const metadata = {
  title: "गोपनीयता धोरण | आशिष एंटरप्राइजेस (Privacy Policy)",
  description: "आशिष एंटरप्राइजेसचे शेतकरी व ग्राहक डेटा गोपनीयता धोरण.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 border-b border-[#E1E8E1] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              कायदेशीर माहिती
            </span>
            <h1 className="text-3xl font-extrabold text-[#14532D]">
              गोपनीयता धोरण (Privacy Policy)
            </h1>
            <p className="text-xs text-[#647067]">
              शेवटचे अद्यतन: २१ ऑक्टोबर २०२६ | {BUSINESS_CONFIG.nameMr}
            </p>
          </div>

          <div className="space-y-6 text-sm text-[#374151] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                १. संकलित केली जाणारी माहिती
              </h2>
              <p>
                आशिष एंटरप्राइजेसच्या वेब पोर्टलवरून शेतमाल विक्री विनंती भरताना आम्ही शेतकऱ्यांचे नाव, मोबाईल नंबर, गाव, तालुका, जिल्हा, आणि शेतमालाचा तपशील गोळा करतो. ही माहिती केवळ शेतमाल खरेदी आणि संपर्कासाठी वापरली जाते.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                २. माहितीचा वापर आणि गोपनीयता
              </h2>
              <p>
                आम्ही शेतकऱ्यांची व्यक्तिगत माहिती कोणत्याही त्रयस्थ जाहिरातदार किंवा विपणन कंपन्यांना विकत नाही अथवा भाड्याने देत नाही. ही माहिती केवळ खालील कारणांसाठी वापरली जाते:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm">
                <li>शेतमालाच्या चालू बाजारभावाबाबत माहिती देण्यासाठी.</li>
                <li>माल केंद्रावर आणण्याच्या वेळेचे नियोजन करण्यासाठी.</li>
                <li>तोलाई व वजन पावती तयार करण्यासाठी.</li>
                <li>पेमेंट प्रक्रिया पूर्ण करून हिशोब देण्यासाठी.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                ३. सार्वजनिक ट्रॅकिंग सुरक्षा (Privacy Barrier)
              </h2>
              <p>
                आमच्या सार्वजनिक विनंती ट्रॅकिंग पेजवर शेतकऱ्याचे पूर्ण नाव अंशतः लपवले जाते (उदा. ज्ञा**** पा****). अंतर्गत कर्मचाऱ्यांच्या नोट्स, खरेदीदार व्यापाऱ्यांची नावे, अंतर्गत कमिशन व बँक खात्याचे तपशील सार्वजनिक ट्रॅकिंगमध्ये कधीही दाखवले जात नाहीत.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-[#14532D]">
                ४. संपर्क माहिती
              </h2>
              <p>
                आपल्या वैयक्तिक माहितीच्या गोपनीयतेबाबत काही प्रश्न असल्यास आपण आमच्या मुख्य कार्यालयाशी खालील पत्त्यावर संपर्क साधू शकता:
              </p>
              <p className="p-4 bg-[#F8FAF8] rounded-xl border border-[#E1E8E1] text-xs font-medium">
                {BUSINESS_CONFIG.registeredAddressMr} | फोन: {BUSINESS_CONFIG.contact.displayPhone}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
