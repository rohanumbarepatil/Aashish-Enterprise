import { z } from "zod";

// 10-digit Indian mobile number regex (starts with 6, 7, 8, 9)
const indianMobileRegex = /^[6-9]\d{9}$/;

export const farmerSellingRequestSchema = z.object({
  farmerName: z
    .string()
    .min(2, { message: "कृपया आपले नाव प्रविष्ट करा (किमान २ अक्षरे)" })
    .max(80, { message: "नाव खूप मोठे आहे" }),
  mobile: z
    .string()
    .regex(indianMobileRegex, { message: "कृपया वैध १० अंकी मोबाईल नंबर टाका" }),
  village: z
    .string()
    .min(2, { message: "कृपया गावाचे नाव टाका" })
    .max(60, { message: "गावाचे नाव खूप मोठे आहे" }),
  taluka: z
    .string()
    .min(2, { message: "कृपया तालुक्याचे नाव टाका" })
    .max(60, { message: "तालुक्याचे नाव खूप मोठे आहे" }),
  district: z
    .string()
    .min(2, { message: "कृपया जिल्ह्याचे नाव निवडा किंवा टाका" })
    .max(60, { message: "जिल्ह्याचे नाव खूप मोठे आहे" }),
  commodityId: z
    .string()
    .min(1, { message: "कृपया शेतमालाचा प्रकार निवडा" }),
  estimatedQuantity: z
    .number()
    .positive({ message: "प्रमाण शून्यापेक्षा जास्त असावे" })
    .max(100000, { message: "प्रमाण खूप जास्त आहे" }),
  unit: z.enum(["KG", "QUINTAL", "TONNE"]),
  qualityGrade: z.string().optional(),
  expectedSellingDate: z.string().optional(),
  notes: z.string().max(500, { message: "टीप ५०० अक्षरांपेक्षा लहान असावी" }).optional(),
});

export type FarmerSellingRequestInput = z.infer<typeof farmerSellingRequestSchema>;

export const requestTrackingSchema = z.object({
  mobile: z
    .string()
    .regex(indianMobileRegex, { message: "कृपया वैध १० अंकी नोंदणीकृत मोबाईल नंबर टाका" }),
  requestId: z
    .string()
    .min(4, { message: "कृपया वैध विनंती क्र. टाका (उदा. DEMO-AE-2026-000101)" })
    .max(30, { message: "अमान्य विनंती क्र." }),
});

export type RequestTrackingInput = z.infer<typeof requestTrackingSchema>;

export const adminLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "कृपया वैध ईमेल पत्ता प्रविष्ट करा" }),
  password: z
    .string()
    .min(6, { message: "पासवर्ड किमान ६ अक्षरांचा असावा" }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: "कृपया आपले नाव प्रविष्ट करा" }),
  mobile: z.string().regex(indianMobileRegex, { message: "कृपया वैध १० अंकी मोबाईल नंबर टाका" }),
  subject: z.string().min(2, { message: "कृपया विषय निवडा किंवा टाका" }),
  message: z.string().min(5, { message: "कृपया आपला संदेश लिहा (किमान ५ अक्षरे)" }),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
