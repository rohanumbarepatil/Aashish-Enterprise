// ==============================================================================
// Ashish Enterprises (आशिष एंटरप्राइजेस) - Centralized Business Configuration
// All business details, contact information, APMC markets, and disclaimers are
// managed here to ensure consistency and prevent fabricated data.
// ==============================================================================

export interface BusinessConfig {
  nameEn: string;
  nameMr: string;
  taglineMr: string;
  taglineEn: string;
  establishedYear: number;
  marketTypeMr: string;
  primaryLocationMr: string;
  primaryLocationEn: string;
  apmcOperatingMarkets: string[];
  registeredAddressMr: string;
  registeredAddressEn: string;
  contact: {
    primaryPhone: string;
    displayPhone: string;
    whatsAppNumber: string;
    displayWhatsApp: string;
    email: string;
    workingHoursMr: string;
    workingHoursEn: string;
  };
  disclaimers: {
    pricingNoticeMr: string;
    licensingNoticeMr: string;
    demoNoticeMr: string;
    demoNoticeEn: string;
  };
}

export const BUSINESS_CONFIG: BusinessConfig = {
  nameEn: "Ashish Enterprises",
  nameMr: "आशिष एंटरप्राइजेस",
  taglineMr: "शेतकऱ्यांचा विश्वास, पारदर्शक कृषी व्यापार आणि आडत सेवा",
  taglineEn: "Trusted Agricultural Commodity Trading & Aadat Services",
  establishedYear: 2014,
  marketTypeMr: "कृषी उत्पन्न बाजार समिती (APMC) परवानाधारक आडत व खरेदी-विक्री",
  primaryLocationMr: "हिंगोली, महाराष्ट्र",
  primaryLocationEn: "Hingoli, Maharashtra, India",
  apmcOperatingMarkets: [
    "हिंगोली मुख्य बाजार समिती (Hingoli APMC)",
    "वसमत कृषी बाजार (Basmath APMC)",
    "नांदेड हळद व धान्य मार्केट (Nanded Market)",
    "लातूर सोयाबीन व कडधान्य मंडी (Latur Mandi)",
    "परभणी कापूस व धान्य केंद्र (Parbhani APMC)",
  ],
  registeredAddressMr:
    "गाळा क्र. २८, मुख्य कृषी उत्पन्न बाजार समिती (APMC) यार्ड, हिंगोली, महाराष्ट्र - ४३१५१३",
  registeredAddressEn:
    "Shop No. 28, Main APMC Market Yard, Hingoli, Maharashtra - 431513",
  contact: {
    // Configured with clear placeholders; easily updated via environment or settings
    primaryPhone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+919800000000",
    displayPhone: "+91 98000 00000",
    whatsAppNumber: process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "919800000000",
    displayWhatsApp: "+91 98000 00000",
    email: "contact@ashishenterprises.local",
    workingHoursMr: "सोमवार ते शनिवार: सकाळी ९:०० ते संध्याकाळी ७:०० (बाजार समिती कामाच्या दिवशी)",
    workingHoursEn: "Monday to Saturday: 9:00 AM to 7:00 PM (On APMC Trading Days)",
  },
  disclaimers: {
    pricingNoticeMr:
      "शेतमालाचे दर हे बाजार समितीतील दैनंदिन लिलाव, आवक, आणि मालाची गुणवत्ता (ओलावा, प्रतवारी, स्वच्छता) यावर अवलंबून असतात. कोणतीही पूर्व-निश्चित किंवा हमीभावाची खोटी हमी दिली जात नाही.",
    licensingNoticeMr:
      "आशिष एंटरप्राइजेस हे कृषी उत्पन्न बाजार समितीच्या नियमांनुसार व स्थानिक बाजार नियमावलीनुसार शेतमाल खरेदी-विक्री व आडत व्यवहार करते.",
    demoNoticeMr:
      "ही वेबसाइट सध्या प्रात्यक्षिक (Demo Frontend) स्वरूपात आहे. यावर सबमिट केलेली माहिती थेट प्रत्यक्ष व्यवहारासाठी ग्राह्य धरली जात नाही.",
    demoNoticeEn:
      "This is a frontend demonstration prototype. Data submitted in this demo mode is not saved to a production database.",
  },
};
