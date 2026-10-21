// ==============================================================================
// Domain Types and Interfaces for Ashish Enterprises
// ==============================================================================

export type UnitType = "KG" | "QUINTAL" | "TONNE";

export type RequestStatus =
  | "RECEIVED"           // १. विनंती प्राप्त
  | "PENDING_CONTACT"   // २. संपर्क बाकी
  | "CONTACTED"         // ३. शेतकऱ्याशी संपर्क
  | "INSPECTION"        // ४. मालाची तपासणी / चर्चा
  | "DEAL_FINALIZED"    // ५. व्यवहार निश्चित
  | "PRODUCE_RECEIVED"  // ६. माल प्राप्त
  | "PAYMENT_PENDING"   // ७. पेमेंट प्रक्रिया
  | "COMPLETED"         // ८. व्यवहार पूर्ण
  | "REJECTED";         // रद्द

export interface Commodity {
  id: string;
  code: string;
  nameMr: string;
  nameEn: string;
  category: "CEREAL" | "PULSE" | "OILSEED" | "SPICE" | "COMMERCIAL" | "OTHER";
  categoryNameMr: string;
  descriptionMr: string;
  defaultUnit: UnitType;
  imageUrl: string;
  isActive: boolean;
  minBatchQuintal?: number;
}

export interface Farmer {
  id: string;
  name: string;
  mobile: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  totalRequestsCount: number;
  createdAt: string;
}

export interface SaleRequest {
  id: string;
  requestNumber: string; // e.g. DEMO-AE-2026-000101
  farmerId?: string;
  farmerName: string;
  farmerMobile: string;
  farmerVillage: string;
  farmerTaluka: string;
  farmerDistrict: string;
  commodityId: string;
  commodityNameMr: string;
  commodityNameEn?: string;
  estimatedQuantity: number;
  unit: UnitType;
  qualityGrade: string; // उदा. उत्तम, मध्यम, बारीक/सामान्य
  expectedSellingDate?: string;
  notes?: string;
  status: RequestStatus;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  internalStaffNotes?: string; // Private - never shown to farmer!
}

export interface TrackingTimelineStage {
  stageNumber: number;
  statusKey: RequestStatus;
  titleMr: string;
  descMr: string;
  isCompleted: boolean;
  isCurrent: boolean;
  dateCompleted?: string;
}

export interface PublicTrackingResponse {
  requestNumber: string;
  farmerNameInitial: string; // Masked for privacy, e.g. "र**** पा****"
  commodityNameMr: string;
  estimatedQuantity: number;
  unit: UnitType;
  village: string;
  taluka: string;
  district: string;
  status: RequestStatus;
  statusTitleMr: string;
  createdAt: string;
  timeline: TrackingTimelineStage[];
  isDemo: boolean;
}

export interface Transaction {
  id: string;
  transactionNumber: string; // e.g. TXN-2026-089
  saleRequestId: string;
  requestNumber: string;
  farmerName: string;
  farmerMobile: string;
  buyerName: string;
  commodityNameMr: string;
  agreedQuantity: number;
  unit: UnitType;
  agreedRate: number; // ₹ per unit (e.g. per quintal)
  grossAmount: number;
  commissionPercent: number; // e.g. 1.5%
  commissionAmount: number;
  mandiFee: number;
  hamaliDeduction: number;
  otherDeductions: number;
  netPayable: number;
  status: "DRAFT" | "CONFIRMED" | "SETTLED" | "CANCELLED";
  paymentStatus: "UNPAID" | "PARTIALLY_PAID" | "FULLY_PAID";
  transactionDate: string;
  notes?: string;
}

export interface Payment {
  id: string;
  paymentNumber: string; // e.g. PAY-2026-054
  transactionId: string;
  transactionNumber: string;
  farmerName: string;
  amount: number;
  paymentMode: "NEFT" | "RTGS" | "UPI" | "CASH" | "CHEQUE";
  paymentStage: "ADVANCE" | "INTERIM" | "FINAL_SETTLEMENT";
  referenceNumber: string;
  paymentDate: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  notes?: string;
}

export interface Buyer {
  id: string;
  companyName: string;
  contactPerson: string;
  mobile: string;
  location: string;
  commodityCategory: string;
  gstin?: string;
  isActive: boolean;
  totalDealsCount: number;
}

export interface AuditLog {
  id: string;
  userEmail: string;
  action: string;
  actionMr: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
  result: "SUCCESS" | "FAILURE";
}

export interface DashboardStats {
  totalRequests: number;
  newRequestsToday: number;
  pendingContactCount: number;
  activeNegotiationsCount: number;
  completedTransactionsCount: number;
  totalVolumeQuintals: number;
  totalGrossTradedValue: number;
  pendingPaymentsCount: number;
}
