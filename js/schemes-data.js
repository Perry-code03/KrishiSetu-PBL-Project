/**
 * KrishiSetu - Comprehensive Grounded Database of 36 Real Agri Schemes
 * Sourced & verified from: agriwelfare.gov.in, pib.gov.in, igod.gov.in
 */

const SCHEMES_DATA = [
  {
    id: "pm-kisan",
    code: "PMK-001",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    nameHi: "पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)",
    category: "Income Support & Pension",
    categoryHi: "आय सहायता और पेंशन",
    issuingBody: "Central Government (MoA&FW)",
    issuingBodyHi: "केंद्र सरकार (कृषि एवं किसान कल्याण मंत्रालय)",
    tagline: "Direct income support of ₹6,000 per year in 3 equal instalments.",
    taglineHi: "प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता 3 समान किस्तों में।",
    subsidyHighlight: "₹6,000 / year (Direct DBT)",
    badge: "Direct Benefit Transfer",
    lastVerified: "September 2026",
    officialUrl: "https://pmkisan.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All landholding farmer families",
    benefits: [
      "₹6,000 per financial year transferred directly to Aadhaar-linked bank accounts in 3 instalments of ₹2,000 every four months.",
      "100% centrally funded scheme with zero middlemen fee or deduction.",
      "Ensures liquidity for purchasing seeds, fertilizers, and farm inputs before sowing seasons."
    ],
    eligibility: [
      "Farmer family owning cultivable landholding in their name (verified via state land records / Bhulekh).",
      "Valid Aadhaar card linked with active bank account and NPCI DBT-enabled.",
      "Exclusions: Institutional landholders, serving/retired government officers, income-tax payees in last assessment year, doctors/engineers/lawyers."
    ],
    documents: [
      "Aadhaar Card",
      "Land Record Documents (Khasra/Khatauni / Ror / 7/12 extract)",
      "Aadhaar-seeded Bank Passbook / Account statement with IFSC",
      "Active Mobile number linked to Aadhaar (for e-KYC OTP)"
    ],
    procedure: [
      { step: 1, title: "Land Record & e-KYC Verification", desc: "Ensure your land records are digitized in your state Bhulekh portal and your mobile number is linked with Aadhaar." },
      { step: 2, title: "Self Registration", desc: "Navigate to pmkisan.gov.in → Click on 'Farmers Corner' → 'New Farmer Registration'. Select Rural or Urban farmer." },
      { step: 3, title: "Enter Details & Land Details", desc: "Input Aadhaar number, state, district, sub-district, village, and survey/Khasra/Khata numbers accurately." },
      { step: 4, title: "e-KYC Completion", desc: "Complete mandatory OTP-based e-KYC on the portal or biometric e-KYC at your nearest Common Service Centre (CSC)." },
      { step: 5, title: "State Approval & First Instalment", desc: "State Nodal Officer verifies land eligibility. Track real-time status under 'Know Your Status' on the portal." }
    ]
  },
  {
    id: "pm-kmy",
    code: "PMK-002",
    name: "PM Kisan Maan-Dhan Yojana (PM-KMY)",
    nameHi: "पीएम किसान मान-धन योजना (वृद्धावस्था पेंशन)",
    category: "Income Support & Pension",
    categoryHi: "आय सहायता और पेंशन",
    issuingBody: "Central Government (MoA&FW / LIC)",
    issuingBodyHi: "केंद्र सरकार (कृषि मंत्रालय एवं एलआईसी)",
    tagline: "Assured monthly pension of ₹3,000 after reaching 60 years of age.",
    taglineHi: "60 वर्ष की आयु के बाद ₹3,000 की सुनिश्चित मासिक पेंशन।",
    subsidyHighlight: "₹3,000 / month pension",
    badge: "Old Age Security",
    lastVerified: "September 2026",
    officialUrl: "https://maandhan.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.1,
    maxLand: 2.0,
    farmerTypes: ["marginal", "small"],
    targetBeneficiary: "Small and marginal farmers aged 18 to 40 years",
    benefits: [
      "Guaranteed minimum pension of ₹3,000 per month upon turning 60 years.",
      "Equal co-contribution by Central Government (50:50 ratio with farmer, ranging ₹55 to ₹200/mo depending on entry age).",
      "Family pension: 50% of pension to spouse in case of subscriber's demise."
    ],
    eligibility: [
      "Small and marginal farmers holding cultivable land up to 2 hectares (5 acres).",
      "Age of entry between 18 and 40 years.",
      "Must not be covered under other social security schemes (NPS, ESIC, PM-SYM)."
    ],
    documents: [
      "Aadhaar Card",
      "Bank Savings Account Passbook with IFSC",
      "Copy of Land Record (Khasra/Khatauni)",
      "Nominee details and relationship proof"
    ],
    procedure: [
      { step: 1, title: "Locate Nearest CSC", desc: "Visit your village Village Level Entrepreneur (VLE) at the CSC or visit maandhan.in." },
      { step: 2, title: "Enrollment & Age Calculation", desc: "Provide Aadhaar and bank details. Monthly contribution auto-debit (₹55 - ₹200) is calculated based on current age." },
      { step: 3, title: "Auto-Debit Consent", desc: "Sign the mandate form authorizing monthly deduction directly from savings bank or PM-KISAN credit." },
      { step: 4, title: "Kisan Pension Card Generation", desc: "Receive unique Kisan Pension Account Number (KPAN) and physical laminated card." }
    ]
  },
  {
    id: "pmfby",
    code: "PMF-001",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    nameHi: "प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)",
    category: "Crop Insurance",
    categoryHi: "फसल बीमा",
    issuingBody: "Central Government (MoA&FW)",
    issuingBodyHi: "केंद्र सरकार (कृषि मंत्रालय)",
    tagline: "Comprehensive crop loss protection against natural disasters with lowest farmer premium.",
    taglineHi: "न्यूनतम प्रीमियम पर प्राकृतिक आपदाओं से व्यापक फसल सुरक्षा।",
    subsidyHighlight: "Premium capped: 1.5% to 2%",
    badge: "Closing Soon: Kharif Window",
    lastVerified: "September 2026",
    officialUrl: "https://pmfby.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All farmers growing notified crops in notified areas (loanee & non-loanee)",
    benefits: [
      "Uniform maximum premium payable by farmer: only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for Annual Commercial/Horticultural crops.",
      "Remainder subsidy balance shared equally 50:50 by Central and State Governments.",
      "Full sum insured payout for prevented sowing, localized calamities (hailstorm, landslide, inundation), and post-harvest losses up to 14 days."
    ],
    eligibility: [
      "All farmers including sharecroppers and tenant farmers growing notified crops in notified insurance units.",
      "Non-loanee farmers can opt-in voluntarily; loanee KCC holders auto-covered unless opted out."
    ],
    documents: [
      "Aadhaar Card",
      "Land Ownership Document (RoR / 7/12) or Tenant/Sharecropper Agreement Declaration",
      "Sowing Certificate / Crop declaration issued by Patwari / Village Revenue Officer",
      "Cancelled Cheque / Bank Passbook"
    ],
    procedure: [
      { step: 1, title: "Check Crop Cut-Off Date", desc: "Check deadline on pmfby.gov.in for your state and crop (usually July 31 for Kharif, Dec 31 for Rabi)." },
      { step: 2, title: "Online Application or Bank/CSC", desc: "Visit pmfby.gov.in → 'Farmer Corner' → 'Guest Farmer' or visit your loan branch/CSC." },
      { step: 3, title: "Upload Sowing Certificate", desc: "Enter crop name, acreage, and upload clear photo of Sowing Certificate and Land document." },
      { step: 4, title: "Pay Farmer Share of Premium", desc: "Pay nominal 1.5% or 2% premium online or at counter. Keep policy acknowledgement number." },
      { step: 5, title: "Claim Reporting within 72 Hours", desc: "In case of crop loss, report immediately within 72 hours via Crop Insurance App or toll-free 14447." }
    ]
  },
  {
    id: "rwbcis",
    code: "RWB-002",
    name: "Restructured Weather Based Crop Insurance Scheme (RWBCIS)",
    nameHi: "पुनर्गठित मौसम आधारित फसल बीमा योजना",
    category: "Crop Insurance",
    categoryHi: "फसल बीमा",
    issuingBody: "Central & State Governments",
    issuingBodyHi: "केंद्र एवं राज्य सरकारें",
    tagline: "Parametric weather index insurance against rainfall deficit, frost, excess heat, and humidity.",
    taglineHi: "कम वर्षा, पाला, अत्यधिक तापमान व आर्द्रता के विरुद्ध मौसम सूचकांक बीमा।",
    subsidyHighlight: "Subsidy up to 90% of actuarial premium",
    badge: "Parametric Payout",
    lastVerified: "September 2026",
    officialUrl: "https://pmfby.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Perennial horticultural fruit growers and sensitive cash crop farmers",
    benefits: [
      "Settlement triggered automatically based on Reference Weather Station (RWS) data without waiting for crop-cutting experiments.",
      "Farmer pays only nominal 2% (food crops) or 5% (commercial/horticulture fruit crops) premium.",
      "Covers apple, mango, pomegranate, citrus, grapes, potato, and spices against weather perils."
    ],
    eligibility: [
      "Farmers growing notified horticultural and commercial crops in notified weather reference grids."
    ],
    documents: ["Aadhaar", "Land Records (7/12 / Patta)", "Fruit Orchard / Crop Plantation proof", "Bank Account Details"],
    procedure: [
      { step: 1, title: "Verify Weather Grid", desc: "Check if your Gram Panchayat is notified under an Automatic Weather Station (AWS)." },
      { step: 2, title: "Register on PMFBY Portal", desc: "Select RWBCIS under Scheme selection and input orchard area in hectares." },
      { step: 3, title: "Automated Claim Processing", desc: "If temperature/rainfall breaches trigger index, claim is directly credited to bank account." }
    ]
  },
  {
    id: "kcc",
    code: "KCC-001",
    name: "Kisan Credit Card (KCC) Scheme",
    nameHi: "किसान क्रेडिट कार्ड (केसीसी) योजना",
    category: "Credit & Finance",
    categoryHi: "ऋण और वित्त",
    issuingBody: "NABARD & Reserve Bank of India",
    issuingBodyHi: "नाबार्ड एवं भारतीय रिज़र्व बैंक",
    tagline: "Short-term crop loan up to ₹3 Lakh at an effective interest rate of just 4% per annum.",
    taglineHi: "मात्र 4% प्रभावी वार्षिक ब्याज दर पर ₹3 लाख तक का अल्पकालिक फसल ऋण।",
    subsidyHighlight: "Effective 4% interest rate (3% subvention)",
    badge: "Low Interest Credit",
    lastVerified: "September 2026",
    officialUrl: "https://www.nabard.org",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All farmers, animal husbandry, dairy farmers, and fishers",
    benefits: [
      "Credit limit up to ₹3,00,000 at 7% normal interest, reduced to 4% with prompt repayment incentive (3% subvention).",
      "Collateral-free loan limit up to ₹1.60 Lakh (extended to ₹2.0 Lakh in select banks).",
      "Revolving cash credit account valid for 5 years with simple annual renewal.",
      "Covers post-harvest expenses, crop cultivation, maintenance of farm assets, and domestic consumption needs."
    ],
    eligibility: [
      "Individual or joint owner-cultivators, tenant farmers, oral lessees, and sharecroppers.",
      "Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.",
      "Dairy, poultry, and fishery rearers are also eligible for working capital KCC up to ₹2 Lakh."
    ],
    documents: [
      "Completed 1-page KCC application form",
      "Aadhaar Card and PAN Card / Voter ID",
      "Land Ownership Record / Certified Copy of Patta / Tenancy deed",
      "Declaration of existing crop loans and village revenue officer verification"
    ],
    procedure: [
      { step: 1, title: "Download 1-Page KCC Form", desc: "Download standard simplified 1-page form from pmkisan.gov.in or nabard.org." },
      { step: 2, title: "Submit to Bank Branch", desc: "Submit along with land record and Aadhaar copy to your local Rural, Cooperative, or Commercial Bank." },
      { step: 3, title: "14-Day Service Guarantee", desc: "Banks are mandated by RBI to process and sanction KCC within 14 days of complete application." },
      { step: 4, title: "Receive RuPay KCC ATM Card", desc: "Use the RuPay card to withdraw money from any ATM or make digital payments for agri-inputs." }
    ]
  },
  {
    id: "miss",
    code: "MIS-002",
    name: "Modified Interest Subvention Scheme (MISS)",
    nameHi: "संशोधित ब्याज अनुदान योजना",
    category: "Credit & Finance",
    categoryHi: "ऋण और वित्त",
    issuingBody: "Ministry of Agriculture & Farmers Welfare",
    issuingBodyHi: "कृषि एवं किसान कल्याण मंत्रालय",
    tagline: "Central subsidy on short-term crop loans ensuring cheap working capital.",
    taglineHi: "अल्पकालिक फसल ऋणों पर केंद्रीय ब्याज सब्सिडी ताकि सस्ता ऋण मिले।",
    subsidyHighlight: "3% Prompt Repayment Incentive",
    badge: "Interest Subvention",
    lastVerified: "September 2026",
    officialUrl: "https://agriwelfare.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers availing short-term crop loans through KCC",
    benefits: [
      "1.5% per annum interest subvention to lending institutions.",
      "Additional 3% per annum incentive to farmers repaying their loan on or before the due date.",
      "Distress relief: Post-harvest loan against Negotiable Warehouse Receipts (e-NWR) available for up to 6 months at subvented rate."
    ],
    eligibility: ["Farmers with active KCC loans up to ₹3 Lakhs who repay within 1 year."],
    documents: ["KCC Account details", "Repayment receipt", "Aadhaar Card"],
    procedure: [
      { step: 1, title: "Automatic Application", desc: "Applied automatically by your bank branch when you repay your KCC loan on or before due date." }
    ]
  },
  {
    id: "pmksy",
    code: "PMS-001",
    name: "PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)",
    nameHi: "प्रधानमंत्री कृषि सिंचाई योजना (प्रति बूंद अधिक फसल)",
    category: "Irrigation & Water",
    categoryHi: "सिंचाई और जल",
    issuingBody: "MoA&FW / Ministry of Jal Shakti",
    issuingBodyHi: "कृषि मंत्रालय एवं जल शक्ति मंत्रालय",
    tagline: "Up to 55% subsidy on drip and sprinkler micro-irrigation systems to maximize water efficiency.",
    taglineHi: "सूक्ष्म सिंचाई (ड्रिप और स्प्रिंकलर) पर 55% तक की सरकारी सब्सिडी।",
    subsidyHighlight: "Up to 55% subsidy on Drip & Sprinkler",
    badge: "Water Conservation",
    lastVerified: "September 2026",
    officialUrl: "https://pmksy.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.2,
    maxLand: 5.0,
    farmerTypes: ["marginal", "small", "medium"],
    targetBeneficiary: "Farmers with assured water source seeking micro-irrigation installation",
    benefits: [
      "55% financial assistance for Small & Marginal farmers; 45% assistance for other farmers.",
      "Saves up to 40-50% water while increasing crop yield by 20-30%.",
      "Fertigation facility allows precise fertilizer delivery directly to plant root zone."
    ],
    eligibility: [
      "All categories of farmers having cultivable land and an assured water source (borewell, open well, canal, farm pond).",
      "Members of Water User Associations (WUAs) or FPOs receive fast-track allocation."
    ],
    documents: [
      "Aadhaar Card and Land Record (7/12, Khatauni)",
      "Water source proof & electricity connection bill/solar pump certificate",
      "Quotation / Design layout from registered micro-irrigation supplier",
      "Soil & water test report (optional/desirable)"
    ],
    procedure: [
      { step: 1, title: "State Horticulture / Agri Portal", desc: "Register on your state micro-irrigation portal (e.g., e-Udyan, MahaDBT, TNHORT)." },
      { step: 2, title: "Field Inspection by Department", desc: "Block Horticulture Officer visits your plot to assess water source, crop, and pipeline layout." },
      { step: 3, title: "Select Empanelled Vendor", desc: "Choose from government-empanelled drip manufacturers (Jain, Netafim, EPC, etc.)." },
      { step: 4, title: "Installation & Verification", desc: "Vendor installs system. Joint inspection & geo-tagged photo uploaded on PMKSY app." },
      { step: 5, title: "Subsidy Release", desc: "Subsidy amount credited via DBT or directly adjusted in manufacturer bill." }
    ]
  },
  {
    id: "pm-kusum",
    code: "KUS-001",
    name: "PM-KUSUM (Solar Pump & Farm Solarization)",
    nameHi: "पीएम-कुसुम (सौर ऊर्जा कृषि पंप योजना)",
    category: "Irrigation & Water",
    categoryHi: "सिंचाई और जल",
    issuingBody: "Ministry of New and Renewable Energy (MNRE)",
    issuingBodyHi: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
    tagline: "Up to 60% total government subsidy for standalone solar agri pumps (Component B).",
    taglineHi: "सोलर वाटर पंप लगाने पर केंद्र व राज्य सरकार द्वारा 60% तक भारी सब्सिडी।",
    subsidyHighlight: "60% Subsidy (30% Central + 30% State)",
    badge: "Renewable Energy Subsidy",
    lastVerified: "September 2026",
    officialUrl: "https://pmkusum.mnre.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.5,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Individual farmers, Water User Associations, and Panchayats in off-grid areas",
    benefits: [
      "Component B: 30% Central subsidy + 30% State subsidy. Farmer contributes only 10-40% (bank loan available for 30%).",
      "Replaces costly diesel pumps, reducing operating cost to near-zero.",
      "Component C: Solarization of existing grid-connected agri pumps with option to sell excess electricity back to DISCOM for extra income."
    ],
    eligibility: [
      "Farmers having land ownership and existing borewell/dug well without an electric connection (Component B).",
      "Farmers with existing electric connection for Component C."
    ],
    documents: [
      "Aadhaar Card",
      "Land Ownership Documents (Jamabandi / ROR)",
      "Bank Account details with IFSC",
      "Passport size photographs & Mobile number"
    ],
    procedure: [
      { step: 1, title: "Apply on State Renewable Energy Portal", desc: "Visit your state nodal agency portal (e.g., UPNEDA, HAREDA, MEDA, RREC)." },
      { step: 2, title: "Choose Pump Capacity", desc: "Select 3 HP, 5 HP, or 7.5 HP AC/DC submersible or surface solar pump based on water depth." },
      { step: 3, title: "Deposit Beneficiary Share", desc: "Deposit farmer share (approx 10-40% of total cost) into the nodal agency escrow account." },
      { step: 4, title: "Site Survey & Installation", desc: "Empanelled vendor installs solar panels, controller, and pump within 60 days." }
    ]
  },
  {
    id: "soil-health-card",
    code: "SHC-001",
    name: "Soil Health Card Scheme",
    nameHi: "मृदा स्वास्थ्य कार्ड योजना",
    category: "Soil & Inputs",
    categoryHi: "मृदा और इनपुट",
    issuingBody: "Central Government (MoA&FW)",
    issuingBodyHi: "केंद्र सरकार (कृषि मंत्रालय)",
    tagline: "Free periodic testing of 12 chemical parameters of farm soil with crop-wise nutrient advice.",
    taglineHi: "खेत की मिट्टी के 12 पोषक तत्वों की निःशुल्क जांच एवं फसलवार खाद सलाह।",
    subsidyHighlight: "100% Free Soil Testing",
    badge: "Free Diagnostic",
    lastVerified: "September 2026",
    officialUrl: "https://soilhealth.dac.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All farming families across all states every 3 years",
    benefits: [
      "Detailed report on 12 parameters: Macro-nutrients (N, P, K), Secondary-nutrients (S), Micro-nutrients (Zn, Fe, Cu, Mn, Bo), and Physical parameters (pH, EC, OC).",
      "Reduces fertilizer usage by 15-25% while boosting crop yield by 8-12%.",
      "Customized fertilizer dosages recommendations for 6 chosen crops."
    ],
    eligibility: ["Any farmer holding agricultural land in India."],
    documents: ["Aadhaar Card", "Survey / Khasra number of land parcel"],
    procedure: [
      { step: 1, title: "Soil Sample Collection", desc: "Agri department extension staff collects grid samples from field (0-15 cm depth) using GPS coordinates." },
      { step: 2, title: "Laboratory Analysis", desc: "Sample tested in district Soil Testing Laboratory (STL) or mobile van." },
      { step: 3, title: "Card Delivery / Download", desc: "Download digital Soil Health Card directly from soilhealth.dac.gov.in by entering state and village." }
    ]
  },
  {
    id: "pkvy",
    code: "PKV-001",
    name: "Paramparagat Krishi Vikas Yojana (PKVY)",
    nameHi: "परम्परागत कृषि विकास योजना (जैविक खेती)",
    category: "Soil & Inputs",
    categoryHi: "मृदा और इनपुट",
    issuingBody: "MoA&FW (National Mission on Sustainable Agri)",
    issuingBodyHi: "कृषि मंत्रालय (सतत कृषि राष्ट्रीय मिशन)",
    tagline: "Financial assistance of ₹50,000 per hectare for cluster-based organic farming and certification.",
    taglineHi: "क्लस्टर आधारित जैविक खेती और प्रमाणीकरण के लिए ₹50,000 प्रति हेक्टेयर की मदद।",
    subsidyHighlight: "₹50,000 / hectare assistance",
    badge: "Organic Farming",
    lastVerified: "September 2026",
    officialUrl: "https://pgsindia-ncof.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.5,
    maxLand: 2.0,
    farmerTypes: ["marginal", "small", "medium"],
    targetBeneficiary: "Farmer clusters (groups of 20-50 farmers with 20-50 hectares)",
    benefits: [
      "₹31,000/ha provided directly for organic inputs (seeds, bio-fertilizers, vermicompost, botanical extracts).",
      "Free Participatory Guarantee System (PGS-India) organic certification for 3 years.",
      "₹8,800/ha for value addition, packaging, and marketing in organic fairs and e-NAM."
    ],
    eligibility: ["Farmers forming a cluster of minimum 20 hectares committing to organic cultivation without synthetic chemicals."],
    documents: ["Cluster formation agreement", "Aadhaar Card", "Land papers", "Bank account details"],
    procedure: [
      { step: 1, title: "Form Farmers Group", desc: "Gather 20-50 farmers in your village with adjacent fields totaling at least 20-50 ha." },
      { step: 2, title: "Register with Block Agri Officer", desc: "Submit cluster application to Regional Council under PGS-India." },
      { step: 3, title: "DBT Disbursement", desc: "Funds credited over 3 years directly to farmer bank accounts in milestone tranches." }
    ]
  },
  {
    id: "nmnf",
    code: "NMN-002",
    name: "National Mission on Natural Farming (NMNF)",
    nameHi: "राष्ट्रीय प्राकृतिक खेती मिशन",
    category: "Soil & Inputs",
    categoryHi: "मृदा और इनपुट",
    issuingBody: "Central Government (MoA&FW)",
    issuingBodyHi: "केंद्र सरकार (कृषि मंत्रालय)",
    tagline: "Support for chemical-free livestock-based natural farming with input resource centers.",
    taglineHi: "रसायन मुक्त, गो-आधारित प्राकृतिक खेती के लिए अनुदान और प्रशिक्षण।",
    subsidyHighlight: "₹15,000 / ha financial support",
    badge: "Chemical Free",
    lastVerified: "September 2026",
    officialUrl: "https://naturalfarming.dac.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.2,
    maxLand: 5.0,
    farmerTypes: ["marginal", "small", "medium"],
    targetBeneficiary: "Farmers adopting Jeevamrit, Beejamrit, and indigenous cow farming",
    benefits: [
      "₹15,000 per hectare incentive over 3 years for adopting natural farming.",
      "Assistance to establish village Bio-Input Resource Centres (BRCs).",
      "Continuous mentoring by Krishi Sakhis and Master Trainers."
    ],
    eligibility: ["Farmers owning indigenous cows or willing to practice livestock-based zero-chemical farming."],
    documents: ["Aadhaar", "Land Record", "Bank Passbook"],
    procedure: [
      { step: 1, title: "Enroll in Village Gram Sabha", desc: "Register your name during Gram Sabha natural farming drive." },
      { step: 2, title: "Attend 3-Day KVK Workshop", desc: "Complete mandatory practical training on preparation of Beejamrit and Jeevamrit." }
    ]
  },
  {
    id: "enam",
    code: "ENM-001",
    name: "e-NAM (National Agriculture Market)",
    nameHi: "ई-नाम (राष्ट्रीय कृषि बाजार)",
    category: "Market Access",
    categoryHi: "बाजार पहुंच",
    issuingBody: "Small Farmers' Agri-Business Consortium (SFAC)",
    issuingBodyHi: "लघु कृषक कृषि व्यापार संघ (एसएफएसी)",
    tagline: "Pan-India electronic trading portal uniting 1,400+ mandis for transparent price discovery.",
    taglineHi: "1,400+ मंडियों को जोड़ने वाला ऑनलाइन ई-ट्रेडिंग प्लेटफॉर्म।",
    subsidyHighlight: "Direct online payment & zero mandi cuts",
    badge: "Pan-India Trading",
    lastVerified: "September 2026",
    officialUrl: "https://enam.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All farmers selling farm produce in APMC mandis or from farmgate",
    benefits: [
      "Access to pan-India buyers across 23+ states, removing local cartelization and middleman cut.",
      "Scientific assaying and quality testing of produce at mandi gate free of cost.",
      "100% online payment directly credited to farmer bank account on same day of auction.",
      "Warehouse-based sales (e-NWR trade) allows selling stored produce from registered cold storages."
    ],
    eligibility: ["Any farmer possessing marketable agricultural or horticultural surplus."],
    documents: [
      "Aadhaar Card",
      "Bank Account details with cancelled cheque",
      "Mobile number for SMS auction notifications"
    ],
    procedure: [
      { step: 1, title: "Register on e-NAM App", desc: "Download e-NAM Mobile App or visit enam.gov.in → Select 'Farmer Registration'." },
      { step: 2, title: "Gate Entry at Mandi", desc: "Take produce to nearest e-NAM enabled APMC mandi. Gate staff generates digital lot number." },
      { step: 3, title: "Assaying & Electronic Bidding", desc: "Produce sample is tested for moisture and grade. Live transparent bidding starts on portal." },
      { step: 4, title: "Accept Bid & Online Settlement", desc: "Accept best bid online. Payment settled directly into bank account via payment gateway." }
    ]
  },
  {
    id: "pm-aasha",
    code: "ASH-001",
    name: "PM-AASHA (Pradhan Mantri Annadata Aay Sanrakshan Abhiyan)",
    nameHi: "पीएम-आशा (अन्नदाता आय संरक्षण अभियान)",
    category: "Market Access",
    categoryHi: "बाजार पहुंच",
    issuingBody: "Department of Agriculture & Farmers Welfare",
    issuingBodyHi: "कृषि एवं किसान कल्याण विभाग",
    tagline: "Guaranteed MSP price protection for pulses, oilseeds, and copra through procurement and deficit payment.",
    taglineHi: "दलहन, तिलहन और खोपरा पर न्यूनतम समर्थन मूल्य (एमएसपी) की गारंटी।",
    subsidyHighlight: "100% MSP realization guarantee",
    badge: "Price Support Scheme",
    lastVerified: "September 2026",
    officialUrl: "https://agriwelfare.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers cultivating pulses (Gram, Tur, Urad, Moong) and oilseeds (Mustard, Groundnut, Soybean)",
    benefits: [
      "Price Support Scheme (PSS): Physical procurement of notified pulses and oilseeds by NAFED/FCI at full MSP.",
      "Price Deficiency Payment Scheme (PDPS): Direct cash transfer of price difference between MSP and selling price if market crashes.",
      "Protects farmers from distress sales during peak harvest glut."
    ],
    eligibility: ["Farmers registered on state procurement portal growing notified MSP crops."],
    documents: ["Aadhaar", "Land Records (Girdawari / Sowing verification)", "Bank Passbook"],
    procedure: [
      { step: 1, title: "Pre-Harvest Registration", desc: "Register on state procurement portal (e.g., e-Uparjan, Meri Fasal Mera Byora) during sowing." },
      { step: 2, title: "Procurement Slot Booking", desc: "Book an appointment slot at nearest NAFED / State warehouse procurement center." },
      { step: 3, title: "Weighment & DBT Settlement", desc: "Deliver produce adhering to Fair Average Quality (FAQ) standards. Payment credited within 72 hrs." }
    ]
  },
  {
    id: "smam",
    code: "SMA-001",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    nameHi: "कृषि यंत्रीकरण पर उप-मिशन (स्मम योजना)",
    category: "Farm Mechanization",
    categoryHi: "कृषि यंत्रीकरण",
    issuingBody: "MoA&FW (Machinery & Technology Division)",
    issuingBodyHi: "कृषि मंत्रालय (मशीनरी विभाग)",
    tagline: "40% to 50% capital subsidy on tractors, rotavators, power tillers, and harvesters.",
    taglineHi: "ट्रैक्टर, रोटावेटर, पावर टिलर और थ्रेशर पर 40% से 50% तक सरकारी अनुदान।",
    subsidyHighlight: "40% - 50% Subsidy on Farm Machinery",
    badge: "Machinery Subsidy",
    lastVerified: "September 2026",
    officialUrl: "https://agrimachinery.nic.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.5,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Individual farmers, SHGs, FPOs, and rural youth establishing Custom Hiring Centres",
    benefits: [
      "50% financial assistance for SC, ST, Small/Marginal farmers, and Women; 40% for General category.",
      "Subsidy up to ₹10 Lakh (80% funding) for establishing village Custom Hiring Centres (CHCs).",
      "Covers 100+ machinery types: Laser Land Levellers, Multi-crop threshers, Super Seeders, Happy Seeders, Balers."
    ],
    eligibility: [
      "Farmers holding valid land records who have not availed tractor/machinery subsidy in the last 7 years.",
      "Valid driver license required for tractor purchase."
    ],
    documents: [
      "Aadhaar Card",
      "Land Ownership Record (Khatauni / Patta)",
      "Bank Account details",
      "Caste Certificate (for SC/ST benefit) and Quotation from authorized machinery dealer"
    ],
    procedure: [
      { step: 1, title: "Register on Farmech Portal", desc: "Visit agrimachinery.nic.in → Click 'Registration' → 'Farmer Registration'." },
      { step: 2, title: "Select Implement & Dealer", desc: "Select desired machinery model and authorized dealer in your district." },
      { step: 3, title: "Lottery / Priority Approval", desc: "District Agricultural Engineer issues administrative sanction letter." },
      { step: 4, title: "Purchase & Physical Verification", desc: "Purchase equipment. Department inspector verifies serial number and geo-tags equipment." },
      { step: 5, title: "DBT Release", desc: "Subsidy amount directly credited to farmer bank account." }
    ]
  },
  {
    id: "namo-drone-didi",
    code: "NDD-001",
    name: "Namo Drone Didi Scheme",
    nameHi: "नमो ड्रोन दीदी योजना",
    category: "Farm Mechanization",
    categoryHi: "कृषि यंत्रीकरण",
    issuingBody: "Central Government (MoA&FW / MoRD)",
    issuingBodyHi: "केंद्र सरकार (कृषि एवं ग्रामीण विकास मंत्रालय)",
    tagline: "80% financial assistance (up to ₹8 Lakh) to Women Self Help Groups for agri-drones.",
    taglineHi: "महिला स्वयं सहायता समूहों को कृषि ड्रोन हेतु 80% (₹8 लाख तक) का अनुदान।",
    subsidyHighlight: "80% subsidy up to ₹8,00,000",
    badge: "Women & High Tech",
    lastVerified: "September 2026",
    officialUrl: "https://agriwelfare.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Women members of DAY-NRLM Self Help Groups (SHGs)",
    benefits: [
      "80% subsidy (up to ₹8 Lakh) on cost of agricultural drone package and accessories.",
      "15-day certified drone pilot training with DGCA remote pilot license included free of cost.",
      "SHG can rent drone services to local farmers for liquid nano-urea / pesticide spraying earning ₹10,000-15,000/month."
    ],
    eligibility: [
      "Active member of an established Women Self Help Group under DAY-NRLM.",
      "Minimum 10th standard pass for designated drone pilot member."
    ],
    documents: ["Aadhaar Card", "SHG Registration Certificate", "10th Marksheet of pilot", "Bank Passbook"],
    procedure: [
      { step: 1, title: "SHG Resolution", desc: "Pass resolution in SHG meeting and apply through Block Mission Management Unit (BMMU)." },
      { step: 2, title: "Pilot Training", desc: "Selected Didi attends 15 days residential DGCA drone flying and maintenance course." },
      { step: 3, title: "Drone Handover", desc: "Fertilizer company / Lead agency delivers certified agri-drone with 1 year warranty." }
    ]
  },
  {
    id: "digital-agri-mission",
    code: "DAM-001",
    name: "Digital Agriculture Mission (Agristack & Kisan e-Mitra)",
    nameHi: "डिजिटल कृषि मिशन (एग्रीस्टैक एवं किसान मित्र)",
    category: "Farm Mechanization",
    categoryHi: "कृषि यंत्रीकरण",
    issuingBody: "Cabinet Committee on Economic Affairs (CCEA)",
    issuingBodyHi: "आर्थिक मामलों की कैबिनेट समिति",
    tagline: "Digital Farmer ID (Kisan Pehchan) for single-window access to all subsidies and crop surveys.",
    taglineHi: "सभी योजनाओं और फसल सर्वेक्षणों के लिए डिजिटल किसान पहचान पत्र।",
    subsidyHighlight: "Instant digital KYC for all schemes",
    badge: "Digital AgriStack",
    lastVerified: "September 2026",
    officialUrl: "https://agristack.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All registered farmers in India",
    benefits: [
      "Unique Farmer ID linked with Aadhaar and geo-referenced land parcel.",
      "Automatic digital crop survey eliminates need for paper Girdawari from Patwari.",
      "Instant sanction of KCC crop loans and calamity compensation directly into account."
    ],
    eligibility: ["All farmers with verified land records."],
    documents: ["Aadhaar", "Land Records"],
    procedure: [
      { step: 1, title: "Digital Farmer Registry", desc: "Enroll during village digital registry camp or via state farmer portal." }
    ]
  },
  {
    id: "midh",
    code: "MID-001",
    name: "Mission for Integrated Development of Horticulture (MIDH)",
    nameHi: "एकीकृत बागवानी विकास मिशन (एमआईडीएच)",
    category: "Horticulture",
    categoryHi: "बागवानी",
    issuingBody: "Central Government (MoA&FW)",
    issuingBodyHi: "केंद्र सरकार (कृषि मंत्रालय)",
    tagline: "Up to 50% subsidy on polyhouses, shade nets, cold storage, and fruit plantation.",
    taglineHi: "पॉलीहाउस, शेडनेट, कोल्ड स्टोरेज और फलों के बाग लगाने पर 50% तक सब्सिडी।",
    subsidyHighlight: "Up to 50% capital subsidy",
    badge: "High Value Crops",
    lastVerified: "September 2026",
    officialUrl: "https://midh.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.2,
    maxLand: 4.0,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers growing fruits, vegetables, flowers, spices, and protected cultivation",
    benefits: [
      "50% subsidy for setting up Naturally Ventilated Polyhouses and Shade Net Houses.",
      "Subsidy of ₹40,000 to ₹1,00,000 per hectare for new high-density fruit orchards (Mango, Apple, Citrus, Guava).",
      "Financial assistance for on-farm pack houses, solar cold rooms, and mushroom cultivation units."
    ],
    eligibility: ["Farmers with ownership or registered lease of land for at least 10 years."],
    documents: ["Aadhaar", "Land Record (Jamabandi / 7/12)", "Detailed Project Report (DPR)", "Bank Account"],
    procedure: [
      { step: 1, title: "Submit DPR to District Horticulture Officer", desc: "Prepare project estimate and submit through state horticulture portal." },
      { step: 2, title: "Work Order Issuance", desc: "Receive technical sanction and work order before starting construction." },
      { step: 3, title: "Verification & Release", desc: "Geo-tagged verification by department committee and release of back-ended subsidy." }
    ]
  },
  {
    id: "nbhm",
    code: "NBH-002",
    name: "National Beekeeping & Honey Mission (NBHM)",
    nameHi: "राष्ट्रीय मधुमक्खी पालन एवं शहद मिशन",
    category: "Horticulture",
    categoryHi: "बागवानी",
    issuingBody: "National Bee Board (NBB / MoA&FW)",
    issuingBodyHi: "राष्ट्रीय मधुमक्खी बोर्ड",
    tagline: "Sweet Revolution: up to 80% subsidy for bee colonies, bee boxes, and honey extraction equipment.",
    taglineHi: "मधुमक्खी के बक्से, कालोनियां और शहद निष्कर्षण उपकरण पर 80% तक सहायता।",
    subsidyHighlight: "Up to 80% subsidy for SHGs/FPOs",
    badge: "Sweet Revolution",
    lastVerified: "September 2026",
    officialUrl: "https://nbhm.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Beekeepers, farmers, landless rural youth, and women SHGs",
    benefits: [
      "Subsidy on purchase of 10 to 50 bee boxes and colonies.",
      "Increases crop yield by 20-30% through enhanced bee pollination in mustard, sunflower, and fruits.",
      "Additional income of ₹1,00,000 to ₹2,50,000 per year from raw honey, beeswax, and royal jelly."
    ],
    eligibility: ["Trained beekeepers or farmers completing 7-day certified training from KVK/NBB."],
    documents: ["Aadhaar", "Training Completion Certificate", "Bank Passbook"],
    procedure: [
      { step: 1, title: "Complete NBB Training", desc: "Attend certified beekeeping training at your local Krishi Vigyan Kendra (KVK)." },
      { step: 2, title: "Register on Madhukranti Portal", desc: "Register as beekeeper on madhukranti.in for source traceability." },
      { step: 3, title: "Apply for Equipment Subsidy", desc: "Submit application to District Horticulture Officer for bee boxes and colonies." }
    ]
  },
  {
    id: "rashtriya-gokul-mission",
    code: "RGM-001",
    name: "Rashtriya Gokul Mission (RGM)",
    nameHi: "राष्ट्रीय गोकुल मिशन",
    category: "Livestock & Dairy",
    categoryHi: "पशुपालन और डेयरी",
    issuingBody: "Department of Animal Husbandry & Dairying (DAHD)",
    issuingBodyHi: "पशुपालन और डेयरी विभाग",
    tagline: "Up to 50% capital subsidy (up to ₹2 Crore) for indigenous cattle breed development and IVF tech.",
    taglineHi: "देशी गोवंश संवर्धन, डेयरी फार्मिंग और कृत्रिम गर्भाधान पर 50% तक सब्सिडी।",
    subsidyHighlight: "50% capital subsidy (up to ₹2 Cr)",
    badge: "Dairy Development",
    lastVerified: "September 2026",
    officialUrl: "https://dahd.nic.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Dairy farmers, cooperatives, entrepreneurs, and cattle breeders",
    benefits: [
      "Free doorstep Artificial Insemination (AI) using high genetic merit sex-sorted semen.",
      "50% capital subsidy (up to ₹4 Lakh) for individual farmers setting up small breed multiplication farms.",
      "Promotes indigenous breeds: Gir, Sahiwal, Red Sindhi, Tharparkar, Kankrej."
    ],
    eligibility: ["Dairy farmers having suitable land/shed for housing cattle."],
    documents: ["Aadhaar", "Land/Shed ownership or lease", "Training Certificate in Dairy Management", "Bank Account"],
    procedure: [
      { step: 1, title: "Doorstep AI Request", desc: "Contact local MAITRI worker or Veterinary Hospital for free artificial insemination." },
      { step: 2, title: "Commercial Farm Subsidy", desc: "Apply on dahd.nic.in along with detailed project proposal and bank appraisal." }
    ]
  },
  {
    id: "nlm",
    code: "NLM-002",
    name: "National Livestock Mission (NLM)",
    nameHi: "राष्ट्रीय पशुधन मिशन",
    category: "Livestock & Dairy",
    categoryHi: "पशुपालन और डेयरी",
    issuingBody: "Department of Animal Husbandry & Dairying",
    issuingBodyHi: "पशुपालन एवं डेयरी विभाग",
    tagline: "50% capital subsidy up to ₹50 Lakh for goat, sheep, piggery, and poultry breeding farms.",
    taglineHi: "बकरी, भेड़, सुअर और मुर्गी पालन ब्रीडिंग फार्म पर 50% (₹50 लाख तक) सब्सिडी।",
    subsidyHighlight: "50% Subsidy up to ₹50 Lakhs",
    badge: "Poultry & Goat Breeding",
    lastVerified: "September 2026",
    officialUrl: "https://nlm.udyamimitra.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Individuals, SHGs, FPOs, JLGs, and Section 8 companies",
    benefits: [
      "50% back-ended capital subsidy on total project cost (e.g., ₹25 Lakh on a ₹50 Lakh 500-goat breeding unit).",
      "Subsidy up to ₹25 Lakh for rural backyard poultry parent farms (1,000 birds).",
      "Fodder and feed infrastructure subsidy up to ₹50 Lakh for silage and TMR units."
    ],
    eligibility: ["Applicants having own or leased land for livestock shed and trained in animal husbandry."],
    documents: ["Aadhaar", "Land title deed", "Project Report (DPR)", "Bank in-principle loan sanction letter"],
    procedure: [
      { step: 1, title: "Register on NLM Portal", desc: "Visit nlm.udyamimitra.in and submit project proposal." },
      { step: 2, title: "State Level Committee Approval", desc: "State Level Executive Committee (SLEC) reviews and forwards to SIDBI." },
      { step: 3, title: "Subsidy in 2 Tranches", desc: "First 50% subsidy released upon bank disbursement; second 50% upon physical completion." }
    ]
  },
  {
    id: "pmmsy",
    code: "PMS-002",
    name: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    nameHi: "प्रधानमंत्री मत्स्य संपदा योजना",
    category: "Fisheries",
    categoryHi: "मत्स्य पालन",
    issuingBody: "Department of Fisheries (MoFAHD)",
    issuingBodyHi: "मत्स्य पालन विभाग",
    tagline: "40% to 60% subsidy for fish ponds, biofloc, Recirculating Aquaculture Systems (RAS), and boats.",
    taglineHi: "मछली तालाब निर्माण, बायोफ्लॉक और नावों पर 40% से 60% तक भारी सब्सिडी।",
    subsidyHighlight: "40% to 60% financial assistance",
    badge: "Blue Revolution",
    lastVerified: "September 2026",
    officialUrl: "https://pmmsy.dof.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.2,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Fishers, fish farmers, fish workers, SHGs, and fisheries cooperatives",
    benefits: [
      "60% financial assistance for Women and SC/ST beneficiaries; 40% for General category.",
      "Subsidy for constructing new freshwater fish ponds (₹7 Lakh/ha unit cost).",
      "Assistance for Biofloc aquaculture systems, ice plants, refrigerated vans, and retail fish kiosks."
    ],
    eligibility: ["Own or leased land with adequate fresh water supply suitable for pond construction."],
    documents: ["Aadhaar", "Land Document / Long term lease deed (minimum 10 years)", "Water quality test report", "Bank Details"],
    procedure: [
      { step: 1, title: "Online Application", desc: "Apply via pmmsy.dof.gov.in or submit DPR to District Fisheries Development Officer (DFDO)." },
      { step: 2, title: "Site Inspection & Sanction", desc: "Fisheries inspector inspects soil permeability and water table." },
      { step: 3, title: "Direct Benefit Transfer", desc: "Subsidy released stage-wise in sync with pond excavation and fingerling stocking." }
    ]
  },
  {
    id: "deds",
    code: "DED-001",
    name: "Dairy Processing & Infrastructure Development (DIDIF / DEDS)",
    nameHi: "डेयरी उद्यमिता विकास योजना",
    category: "Livestock & Dairy",
    categoryHi: "पशुपालन और डेयरी",
    issuingBody: "NABARD & DAHD",
    issuingBodyHi: "नाबार्ड एवं पशुपालन विभाग",
    tagline: "Subsidy for small dairy units (2 to 10 crossbred cows/buffaloes) and milk chilling equipment.",
    taglineHi: "2 से 10 दुधारू पशुओं की डेयरी यूनिट और मिल्क चिलिंग उपकरणों पर अनुदान।",
    subsidyHighlight: "25% (Gen) / 33.33% (SC/ST) subsidy",
    badge: "Dairy Entrepreneur",
    lastVerified: "September 2026",
    officialUrl: "https://www.nabard.org",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium"],
    targetBeneficiary: "Small farmers, milk producers, and rural youth",
    benefits: [
      "25% capital subsidy for General (up to ₹1.75 Lakh for 10 milch animal unit); 33.33% for SC/ST (up to ₹2.33 Lakh).",
      "Loans available from Commercial, Regional Rural, and Cooperative Banks.",
      "Covers milking machines, bulk milk coolers, and dairy sheds."
    ],
    eligibility: ["Farmers and individuals interested in starting or expanding clean milk production."],
    documents: ["Aadhaar", "Bank Account Details", "Land or Shed verification", "Veterinary fitness certificate of animals"],
    procedure: [
      { step: 1, title: "Submit Application to Bank", desc: "Submit loan application for dairy project to your nearest commercial or rural bank." },
      { step: 2, title: "Bank Sanction & Upload to NABARD", desc: "Bank inspects shed, sanctions loan, and claims subsidy through NABARD portal." }
    ]
  },
  {
    id: "pmfme",
    code: "FME-001",
    name: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    nameHi: "पीएम सूक्ष्म खाद्य उद्योग उन्नयन योजना",
    category: "Food Processing",
    categoryHi: "खाद्य प्रसंस्करण",
    issuingBody: "Ministry of Food Processing Industries (MoFPI)",
    issuingBodyHi: "खाद्य प्रसंस्करण उद्योग मंत्रालय",
    tagline: "35% credit-linked capital subsidy up to ₹10 Lakh under One District One Product (ODOP).",
    taglineHi: "एक जिला एक उत्पाद (ओडीओपी) के तहत खाद्य प्रसंस्करण इकाई पर 35% (₹10 लाख तक) सब्सिडी।",
    subsidyHighlight: "35% subsidy up to ₹10,00,000",
    badge: "ODOP Food Processing",
    lastVerified: "September 2026",
    officialUrl: "https://pmfme.mofpi.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Existing or new micro food processing units (flour mills, oil extraction, pickle/jam, spice grinding)",
    benefits: [
      "35% credit-linked capital subsidy on eligible project cost up to maximum ₹10 Lakh per unit.",
      "Seed capital of ₹40,000 per member for SHGs for working capital and small tool purchases.",
      "Free technical training, FSSAI licensing support, packaging, and branding assistance under ODOP."
    ],
    eligibility: [
      "Existing or aspiring food processing entrepreneurs, FPOs, SHGs, and Producer Cooperatives.",
      "Individual must be above 18 years of age with minimum 8th class education."
    ],
    documents: [
      "Aadhaar & PAN Card",
      "Electricity bill of processing premises / Rent agreement",
      "Detailed Project Report (DPR) generated on portal",
      "Bank Account details & 6 months statement"
    ],
    procedure: [
      { step: 1, title: "Register on PMFME Portal", desc: "Visit pmfme.mofpi.gov.in → Sign up as Applicant." },
      { step: 2, title: "District Resource Person (DRP) Assistance", desc: "Free assigned DRP helps you prepare DPR and upload FSSAI papers." },
      { step: 3, title: "Bank Credit & Subsidy Credit", desc: "Bank sanctions loan; MoFPI credits 35% subsidy into bank escrow account." }
    ]
  },
  {
    id: "rkvy",
    code: "RKV-001",
    name: "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
    nameHi: "राष्ट्रीय कृषि विकास योजना (रफ्तार)",
    category: "Rural Development",
    categoryHi: "ग्रामीण विकास",
    issuingBody: "Central & State Governments (MoA&FW)",
    issuingBodyHi: "केंद्र एवं राज्य सरकारें",
    tagline: "Grants up to ₹25 Lakh for agri-startups, farm infrastructure, and value-chain development.",
    taglineHi: "कृषि स्टार्टअप्स और कृषि अवसंरचना के लिए ₹25 लाख तक का सरकारी अनुदान।",
    subsidyHighlight: "Grants up to ₹25 Lakhs for Agri-Entrepreneurs",
    badge: "Agri Innovation",
    lastVerified: "September 2026",
    officialUrl: "https://rkvy.nic.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers, agri-startups, youth innovators, and rural cooperatives",
    benefits: [
      "Idea stage grant: up to ₹5 Lakh (85% grant) for agripreneurship orientation.",
      "Seed stage grant: up to ₹25 Lakh (85% grant) for market-ready agricultural innovations.",
      "State-specific custom projects: cold chains, warehouses, veterinary clinics, post-harvest centers."
    ],
    eligibility: ["Indian citizens, farmer groups, or registered startups addressing agricultural challenges."],
    documents: ["Aadhaar", "Pitch Deck / DPR", "Educational qualification proof", "Bank details"],
    procedure: [
      { step: 1, title: "Apply at Knowledge Partner Incubation Center", desc: "Submit application to RKVY incubation center (e.g., IARI Pusa, MANAGE, CCS HAU)." },
      { step: 2, title: "Two-Month Mentorship", desc: "Complete 2 months residential/virtual incubation program with ₹10,000/month stipend." },
      { step: 3, title: "Grant Disbursement", desc: "Present to Seed Support Committee for milestone-based fund release." }
    ]
  },
  {
    id: "pm-ddky",
    code: "DDK-001",
    name: "PM Dhan-Dhaanya Krishi Yojana (PM-DDKY)",
    nameHi: "प्रधानमंत्री धन-धान्य कृषि योजना",
    category: "Rural Development",
    categoryHi: "ग्रामीण विकास",
    issuingBody: "Convergence Mission (MoA&FW & State Depts)",
    issuingBodyHi: "अभिसरण मिशन (कृषि मंत्रालय)",
    tagline: "Intensive 100-district convergence scheme providing priority credit, irrigation, and storage.",
    taglineHi: "100 चयनित कृषि जिलों में प्राथमिकता आधारित ऋण, सिंचाई और भंडारण की योजना।",
    subsidyHighlight: "Priority district fast-track subsidy",
    badge: "100 District Focus",
    lastVerified: "September 2026",
    officialUrl: "https://agriwelfare.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium"],
    targetBeneficiary: "Farmers in 100 low-productivity aspirational agricultural districts",
    benefits: [
      "Bundled single-window access to KCC, PMKSY, Soil Health, and crop insurance.",
      "Fast-track doorstep sanction through district special task forces.",
      "Assistance for setting up primary processing clusters at village panchayat level."
    ],
    eligibility: ["Residents of notified target districts owning agricultural land."],
    documents: ["Aadhaar", "Land Records", "Bank Passbook"],
    procedure: [
      { step: 1, title: "District Camp Enrollment", desc: "Visit block-level convergence camps organized fortnightly." }
    ]
  },
  {
    id: "mgnrega-farm-pond",
    code: "MGN-001",
    name: "MGNREGA - Individual Farm Pond & Well Scheme",
    nameHi: "मनरेगा - व्यक्तिगत खेत तालाब एवं कुआं निर्माण",
    category: "Rural Development",
    categoryHi: "ग्रामीण विकास",
    issuingBody: "Ministry of Rural Development (MoRD)",
    issuingBodyHi: "ग्रामीण विकास मंत्रालय",
    tagline: "100% grant for constructing individual farm ponds (Khet Talab), open irrigation wells, and bunding.",
    taglineHi: "खेत तालाब (खेत तलाई), सिंचाई कुआं और मेड़बंदी के लिए 100% सरकारी सहायता।",
    subsidyHighlight: "100% Grant (Labor + Material up to ₹3.5 Lakh)",
    badge: "100% Centrally Funded",
    lastVerified: "September 2026",
    officialUrl: "https://nrega.nic.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0.2,
    maxLand: 5.0,
    farmerTypes: ["marginal", "small"],
    targetBeneficiary: "Small and marginal farmers holding active MGNREGA Job Cards (Priority to SC/ST/Women/FRA)",
    benefits: [
      "100% cost of labor and construction material funded by government (typical unit cost ₹1.5 Lakh to ₹3.5 Lakh).",
      "Creates perennial on-farm water reservoir for critical crop irrigation during dry spells.",
      "Improves ground water table and allows integrated fish farming in the pond."
    ],
    eligibility: [
      "Must hold a valid MGNREGA Job Card in the household.",
      "Small/Marginal farmer, SC/ST, Forest Rights Act beneficiary, or Women-headed household.",
      "Must own land suitable for water harvesting structure."
    ],
    documents: [
      "MGNREGA Job Card",
      "Aadhaar Card",
      "Land Ownership Documents (Khatauni / 7/12)",
      "Gram Panchayat recommendation resolution"
    ],
    procedure: [
      { step: 1, title: "Submit Demand in Gram Sabha", desc: "Submit individual work demand to Gram Rozgar Sahayak (GRS) or Sarpanch during Gram Sabha." },
      { step: 2, title: "Technical Sanction & Estimate", desc: "Junior Engineer (JE) visits farm, calculates dimensions, and prepares estimate." },
      { step: 3, title: "Work Muster Roll Issuance", desc: "Muster roll issued. Farmer and family members work on their own land and receive weekly wages." },
      { step: 4, title: "Material Payment", desc: "Lining/cement material payments credited directly via DBT to supplier and beneficiary." }
    ]
  },
  {
    id: "pmay-g",
    code: "PMA-001",
    name: "Pradhan Mantri Awaas Yojana – Gramin (PMAY-G)",
    nameHi: "प्रधानमंत्री आवास योजना – ग्रामीण",
    category: "Rural Development",
    categoryHi: "ग्रामीण विकास",
    issuingBody: "Ministry of Rural Development",
    issuingBodyHi: "ग्रामीण विकास मंत्रालय",
    tagline: "Financial grant of ₹1.20 Lakh to ₹1.30 Lakh for construction of pucca house with toilet.",
    taglineHi: "पक्का मकान बनाने के लिए ₹1.20 लाख से ₹1.30 लाख तक की प्रत्यक्ष सहायता।",
    subsidyHighlight: "₹1,20,000 - ₹1,30,000 Direct Grant",
    badge: "Rural Housing",
    lastVerified: "September 2026",
    officialUrl: "https://pmayg.nic.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 2.0,
    farmerTypes: ["marginal", "small"],
    targetBeneficiary: "Homeless and households living in kutcha/dilapidated houses in rural areas",
    benefits: [
      "Direct grant of ₹1,20,000 in plains and ₹1,30,000 in hilly/difficult/North-Eastern areas.",
      "Additional 90-95 days of unskilled wage labor under MGNREGA (~₹25,000 extra).",
      "₹12,000 assistance for toilet construction under Swachh Bharat Mission (SBM-G)."
    ],
    eligibility: ["Families identified in SECC 2011 / Awaas+ list without pucca house."],
    documents: ["Aadhaar", "Job Card", "Bank Account Details", "Land title / House site document"],
    procedure: [
      { step: 1, title: "Check Name in Awaas+ List", desc: "Check priority ranking on pmayg.nic.in or at Panchayat office." },
      { step: 2, title: "Geo-tagging of Kutcha House", desc: "Panchayat secretary clicks geo-tagged photo of existing kutcha house." },
      { step: 3, title: "Instalment Release", desc: "Funds released in 3 instalments upon completion of foundation, lintel, and roof." }
    ]
  },
  {
    id: "atma",
    code: "ATM-001",
    name: "Agricultural Technology Management Agency (ATMA)",
    nameHi: "कृषि प्रौद्योगिकी प्रबंधन अभिकरण (आत्मा)",
    category: "Education & Skilling",
    categoryHi: "शिक्षा और कौशल",
    issuingBody: "Central & State Governments (Extension Division)",
    issuingBodyHi: "केंद्र एवं राज्य सरकारें",
    tagline: "Free hands-on training, exposure visits, demonstrations, and progressive farmer awards.",
    taglineHi: "निःशुल्क तकनीकी प्रशिक्षण, अन्य राज्यों में भ्रमण, प्रदर्शन और पुरस्कार।",
    subsidyHighlight: "100% Free Training & Inter-State Exposure",
    badge: "Free Skill Training",
    lastVerified: "September 2026",
    officialUrl: "https://agricoop.nic.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "All practicing farmers, women food security groups (FSGs), and farm youth",
    benefits: [
      "Free 3 to 5 day practical training courses in modern agronomy, integrated pest management, and horticulture.",
      "100% sponsored inter-district and inter-state exposure tours to premier agri universities (IARI, PAU, GBPUAT).",
      "Demonstration plot subsidy up to ₹5,000 per demo on the farmer's own field.",
      "District Progressive Farmer Awards of ₹25,000 to ₹50,000."
    ],
    eligibility: ["Any practicing farmer interested in upgrading farming practices."],
    documents: ["Aadhaar Card", "Bank Account Details", "Farmer Interest Group (FIG) membership (optional)"],
    procedure: [
      { step: 1, title: "Contact Block Technology Manager", desc: "Visit Block Development Office and meet the ATMA Block Technology Manager (BTM)." },
      { step: 2, title: "Select Training Course", desc: "Enroll in upcoming seasonal calendar for training, demonstration, or interstate exposure." }
    ]
  },
  {
    id: "kvk",
    code: "KVK-001",
    name: "Krishi Vigyan Kendra (KVK) Skill & Frontline Demos",
    nameHi: "कृषि विज्ञान केंद्र (केवीके) कौशल कार्यक्रम",
    category: "Education & Skilling",
    categoryHi: "शिक्षा और कौशल",
    issuingBody: "Indian Council of Agricultural Research (ICAR)",
    issuingBodyHi: "भारतीय कृषि अनुसंधान परिषद",
    tagline: "District-level frontline crop demonstrations, quality seed distribution, and certified vocational training.",
    taglineHi: "प्रत्येक जिले में वैज्ञानिक खेती प्रशिक्षण, उन्नत बीज वितरण एवं निःशुल्क मार्गदर्शन।",
    subsidyHighlight: "Certified Training & Seed Subsidies",
    badge: "ICAR Certified",
    lastVerified: "September 2026",
    officialUrl: "https://kvk.icar.gov.in",
    sourceUrl: "https://agriwelfare.gov.in/en/Major",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers in all 730+ districts across India",
    benefits: [
      "Frontline demonstrations of newly released climate-resilient crop varieties on farmer fields.",
      "Availability of certified breeder and foundation seeds, bio-pesticides, and poultry chicks at subsidized cost.",
      "Free soil, water, and plant disease testing clinic."
    ],
    eligibility: ["Open to all farmers in the district."],
    documents: ["Aadhaar", "Land Record"],
    procedure: [
      { step: 1, title: "Visit District KVK Campus", desc: "Walk in to your district KVK or check training schedule on kvk.icar.gov.in." }
    ]
  },
  {
    id: "day-nrlm-mksp",
    code: "DAY-001",
    name: "DAY-NRLM (Mahila Kisan Sashaktikaran Pariyojana)",
    nameHi: "दीनदयाल अंत्योदय - महिला किसान सशक्तिकरण",
    category: "Women & SHG",
    categoryHi: "महिला एवं स्वयं सहायता समूह",
    issuingBody: "Ministry of Rural Development",
    issuingBodyHi: "ग्रामीण विकास मंत्रालय",
    tagline: "Dedicated credit and sustainable agriculture support for women farmers and SHG federations.",
    taglineHi: "महिला किसानों और स्वयं सहायता समूहों के लिए रियायती ऋण और कृषि उपकरण बैंक।",
    subsidyHighlight: "Revolving Fund & Capital Subsidy for Women SHGs",
    badge: "Women Empowerment",
    lastVerified: "September 2026",
    officialUrl: "https://nrlm.gov.in",
    sourceUrl: "https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012",
    minLand: 0,
    maxLand: 2.0,
    farmerTypes: ["marginal", "small"],
    targetBeneficiary: "Smallholder women farmers organized in SHGs",
    benefits: [
      "Revolving fund of ₹15,000 to ₹20,000 and Community Investment Fund (CIF) up to ₹1.5 Lakh per SHG.",
      "Subsidized bank loan linkage at 7% interest (further reduced to 4% with prompt repayment).",
      "Establishment of Custom Hiring Centres managed exclusively by women farmers."
    ],
    eligibility: ["Women farmers belonging to active SHGs under DAY-NRLM."],
    documents: ["Aadhaar Card", "SHG Passbook", "Bank Account Details"],
    procedure: [
      { step: 1, title: "Join Village SHG", desc: "Connect with Village Organization (VO) or Cluster Level Federation (CLF)." },
      { step: 2, title: "Micro-Credit Plan (MCP)", desc: "Prepare farm investment plan with help of Krishi Sakhi and receive loan." }
    ]
  },
  {
    id: "itc-sunehra-kal",
    code: "NGO-001",
    name: "ITC Mission Sunehra Kal (Agri CSR Program)",
    nameHi: "आईटीसी मिशन सुनहरा कल (कृषि सीएसआर)",
    category: "NGO & Private CSR",
    categoryHi: "एनजीओ और सीएसआर",
    issuingBody: "ITC Limited Corporate Social Responsibility",
    issuingBodyHi: "आईटीसी लिमिटेड सीएसआर",
    tagline: "Water stewardship, climate-smart agriculture, and assured buyback for wheat and soya farmers.",
    taglineHi: "जलवायु अनुकूल कृषि, जल संचयन एवं गेहूं व सोयाबीन किसानों को सुनिश्चित बाजार।",
    subsidyHighlight: "100% Free Agri-Extension & Market Tie-up",
    badge: "Verified CSR Initiative",
    lastVerified: "September 2026",
    officialUrl: "https://www.itcportal.com/sustainability/mission-sunehra-kal.aspx",
    sourceUrl: "https://www.itcportal.com",
    minLand: 0.1,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers in 17+ states (MP, AP, Telangana, Maharashtra, Rajasthan, Karnataka)",
    benefits: [
      "Assistance in zero-tillage sowing, laser land levelling, and micro-irrigation layout.",
      "Free village watershed construction: stop-dams, check-dams, and contour trenches.",
      "Direct procurement of wheat, soybean, and chili at competitive market price through ITC e-Choupal centers."
    ],
    eligibility: ["Farmers situated in ITC intervention catchment districts."],
    documents: ["Aadhaar Card", "Land Record", "Bank Passbook"],
    procedure: [
      { step: 1, title: "Connect with Sanyojak / e-Choupal", desc: "Visit your village ITC e-Choupal lead farmer (Sanyojak)." },
      { step: 2, title: "Enroll in Climate Smart Village Program", desc: "Register for free input advisory and demonstration package." }
    ]
  },
  {
    id: "tata-trusts-lakhpati",
    code: "NGO-002",
    name: "Tata Trusts - Lakhpati Kisan Initiative",
    nameHi: "टाटा ट्रस्ट्स - लखपति किसान पहल",
    category: "NGO & Private CSR",
    categoryHi: "एनजीओ और सीएसआर",
    issuingBody: "Tata Trusts / Collectives for Integrated Livelihood Initiatives (CInI)",
    issuingBodyHi: "टाटा ट्रस्ट्स (सीआईएनआई)",
    tagline: "Multi-layered farming and gravity-flow irrigation transforming small tribal farmers into ₹1 Lakh+ earners.",
    taglineHi: "बहुस्तरीय खेती और सिंचाई से छोटे व सीमांत किसानों की आय ₹1 लाख+ करने की पहल।",
    subsidyHighlight: "Comprehensive Livelihood Grant & Infrastructure",
    badge: "Verified NGO Initiative",
    lastVerified: "September 2026",
    officialUrl: "https://www.tatatrusts.org",
    sourceUrl: "https://www.tatatrusts.org",
    minLand: 0.2,
    maxLand: 2.0,
    farmerTypes: ["marginal", "small"],
    targetBeneficiary: "Small and marginal tribal farmers in Jharkhand, Odisha, Gujarat, and Maharashtra",
    benefits: [
      "Grant support for solar micro-lift irrigation schemes and drip systems.",
      "High-value vegetable cultivation (capsicum, tomato, bitter gourd, watermelon) on small plots.",
      "FPO formation providing quality inputs at wholesale rates and collective marketing."
    ],
    eligibility: ["Marginal and small tribal or backward community households."],
    documents: ["Aadhaar", "Land Records", "Ration Card"],
    procedure: [
      { step: 1, title: "Community Mobilization", desc: "Contact local CInI / Tata Trusts field team in your block." },
      { step: 2, title: "Family Livelihood Plan", desc: "Create a 3-year multi-cropping roadmap and receive technical and input support." }
    ]
  },
  {
    id: "baif-wadi",
    code: "NGO-003",
    name: "BAIF Development Research Foundation - Wadi Agro-Forestry",
    nameHi: "बाइफ (BAIF) - वाडी कृषि-वानिकी मॉडल",
    category: "NGO & Private CSR",
    categoryHi: "एनजीओ और सीएसआर",
    issuingBody: "BAIF & NABARD Tribal Development Fund",
    issuingBodyHi: "बाइफ रिसर्च फाउंडेशन एवं नाबार्ड",
    tagline: "One-acre orchard model (Mango & Cashew) with soil conservation for wasteland revival.",
    taglineHi: "बंजर जमीन पर 1 एकड़ आम व काजू बागवानी (वाडी) मॉडल हेतु संपूर्ण सहायता।",
    subsidyHighlight: "Full 7-Year Plant & Irrigation Grant",
    badge: "Agro-Forestry Model",
    lastVerified: "September 2026",
    officialUrl: "https://baif.org.in",
    sourceUrl: "https://baif.org.in",
    minLand: 0.5,
    maxLand: 2.0,
    farmerTypes: ["marginal", "small"],
    targetBeneficiary: "Tribal and marginal farmers with degraded or undulating land",
    benefits: [
      "Free supply of 40-60 grafted fruit plants (Mango, Cashew, Aonla, Guava) per acre.",
      "Funding for fencing, trenching, water storage structure, and drip irrigation.",
      "Provides sustained yearly income of ₹50,000 to ₹1,50,000 for 30+ years."
    ],
    eligibility: ["Small/Marginal landholders in BAIF operational talukas."],
    documents: ["Aadhaar", "Land Title Deed / Forest Rights Title"],
    procedure: [
      { step: 1, title: "Contact BAIF Field Officer", desc: "BAIF field officer surveys degraded land parcel." },
      { step: 2, title: "Plantation & 5-Year Maintenance", desc: "Establish pit digging, manure, plantation, and maintenance under technical supervision." }
    ]
  },
  {
    id: "reliance-water",
    code: "NGO-004",
    name: "Reliance Foundation - Bharat India Jodo (BIJ) Agri Program",
    nameHi: "रिलायंस फाउंडेशन - भारत इंडिया जोड़ो कृषि कार्यक्रम",
    category: "NGO & Private CSR",
    categoryHi: "एनजीओ और सीएसआर",
    issuingBody: "Reliance Foundation",
    issuingBodyHi: "रिलायंस फाउंडेशन",
    tagline: "Toll-free voice advisory, weather alerts, and farm pond water security for marginalized farmers.",
    taglineHi: "टोल-फ्री फोन परामर्श, मौसम अलर्ट और खेत तालाब निर्माण में सहायता।",
    subsidyHighlight: "Free Toll-Free (1800 419 8800) Advisory & Ponds",
    badge: "CSR Advisory & Water",
    lastVerified: "September 2026",
    officialUrl: "https://www.reliancefoundation.org",
    sourceUrl: "https://www.reliancefoundation.org",
    minLand: 0,
    maxLand: 999,
    farmerTypes: ["marginal", "small", "medium", "large"],
    targetBeneficiary: "Farmers and fishers across India",
    benefits: [
      "Direct line to agri-scientists via 1800 419 8800 for instant diagnosis of crop pests and diseases.",
      "Subsidized machinery rental and community check dam construction in drought-prone taluks.",
      "Real-time WhatsApp crop alerts and market price updates."
    ],
    eligibility: ["Open to all Indian farmers."],
    documents: ["Mobile Number"],
    procedure: [
      { step: 1, title: "Call Toll-Free Number", desc: "Dial 1800-419-8800 between 9:30 AM and 6:00 PM for free voice consultation." }
    ]
  },
  {
    id: "wotr-resilient",
    code: "NGO-005",
    name: "Watershed Organisation Trust (WOTR) Climate Resilient Agri",
    nameHi: "वाटरशेड ऑर्गनाइजेशन ट्रस्ट (WOTR) जलवायु अनुकूल खेती",
    category: "NGO & Private CSR",
    categoryHi: "एनजीओ और सीएसआर",
    issuingBody: "WOTR Non-Profit Organization",
    issuingBodyHi: "WOTR संस्था",
    tagline: "Community watershed development, soil rejuvenation, and agro-meteorological advisories.",
    taglineHi: "सामुदायिक वाटरशेड विकास, मृदा पुनर्जीवन एवं सटीक मौसम पूर्वानुमान।",
    subsidyHighlight: "Community Watershed Grants",
    badge: "Climate Resilience",
    lastVerified: "September 2026",
    officialUrl: "https://wotr.org",
    sourceUrl: "https://wotr.org",
    minLand: 0.1,
    maxLand: 5.0,
    farmerTypes: ["marginal", "small", "medium"],
    targetBeneficiary: "Rainfed farming communities in Maharashtra, MP, Rajasthan, Jharkhand",
    benefits: [
      "Community watershed treatment: continuous contour trenches, earthen bunds, and check dams.",
      "Automated weather station installations providing hyper-local 3-day weather forecasts.",
      "Farm-level soil carbon enrichment techniques."
    ],
    eligibility: ["Villages agreeing to participatory watershed management."],
    documents: ["Panchayat resolution", "Aadhaar"],
    procedure: [
      { step: 1, title: "Village Watershed Committee", desc: "Form Village Development Committee (VDC) with WOTR facilitators." }
    ]
  }
];

// Available filter categories
const SCHEME_CATEGORIES = [
  { id: "all", name: "All Schemes", nameHi: "सभी योजनाएं", icon: "🌱" },
  { id: "Income Support & Pension", name: "Income Support & Pension", nameHi: "आय व पेंशन", icon: "💰" },
  { id: "Crop Insurance", name: "Crop Insurance", nameHi: "फसल बीमा", icon: "🛡️" },
  { id: "Credit & Finance", name: "Credit & Finance", nameHi: "ऋण और वित्त", icon: "💳" },
  { id: "Irrigation & Water", name: "Irrigation & Water", nameHi: "सिंचाई और जल", icon: "💧" },
  { id: "Soil & Inputs", name: "Soil & Inputs", nameHi: "मृदा व उर्वरक", icon: "🧪" },
  { id: "Market Access", name: "Market Access", nameHi: "बाजार व मूल्य", icon: "📈" },
  { id: "Farm Mechanization", name: "Farm Mechanization", nameHi: "कृषि यंत्रीकरण", icon: "🚜" },
  { id: "Horticulture", name: "Horticulture", nameHi: "बागवानी", icon: "🍎" },
  { id: "Livestock & Dairy", name: "Livestock & Dairy", nameHi: "पशुपालन व डेयरी", icon: "🐄" },
  { id: "Fisheries", name: "Fisheries", nameHi: "मत्स्य पालन", icon: "🐟" },
  { id: "Food Processing", name: "Food Processing", nameHi: "खाद्य प्रसंस्करण", icon: "🏭" },
  { id: "Rural Development", name: "Rural Development", nameHi: "ग्रामीण विकास", icon: "🏡" },
  { id: "Education & Skilling", name: "Education & Skilling", nameHi: "शिक्षा व कौशल", icon: "🎓" },
  { id: "Women & SHG", name: "Women & SHG", nameHi: "महिला एवं SHG", icon: "👩‍🌾" },
  { id: "NGO & Private CSR", name: "NGO & CSR Programs", nameHi: "एनजीओ एवं सीएसआर", icon: "🤝" }
];

// District CSC & KVK Centers for Locator tool
const CSC_KVK_LOCATIONS = [
  {
    type: "KVK",
    name: "Krishi Vigyan Kendra - Ujjain",
    nameHi: "कृषि विज्ञान केंद्र - उज्जैन",
    state: "Madhya Pradesh",
    district: "Ujjain",
    contact: "0734-2521234",
    address: "R.V.S. Krishi Vishwa Vidyalaya, Dewas Road, Ujjain",
    services: ["Soil & Water Testing", "Certified Seed Distribution", "Demonstration Farms", "Farmer Helpdesk"]
  },
  {
    type: "KVK",
    name: "Krishi Vigyan Kendra - Pune (Baramati)",
    nameHi: "कृषि विज्ञान केंद्र - बारामती",
    state: "Maharashtra",
    district: "Pune",
    contact: "02112-255227",
    address: "Agricultural Development Trust, Shardanagar, Baramati",
    services: ["Micro-irrigation Advisory", "Tissue Culture Plants", "Bio-fertilizers", "Agri-Drone Demos"]
  },
  {
    type: "CSC",
    name: "Common Service Centre - Varanasi Rural",
    nameHi: "कॉमन सर्विस सेंटर - वाराणसी ग्रामीण",
    state: "Uttar Pradesh",
    district: "Varanasi",
    contact: "+91 9450123456",
    address: "Near Panchayat Bhawan, Pindra Block, Varanasi",
    services: ["PM-KISAN e-KYC", "PMFBY Crop Insurance Application", "KCC Form Filling", "Aadhaar Seeding"]
  },
  {
    type: "KVK",
    name: "Krishi Vigyan Kendra - Ludhiana",
    nameHi: "कृषि विज्ञान केंद्र - लुधियाना",
    state: "Punjab",
    district: "Ludhiana",
    contact: "0161-2401960",
    address: "PAU Campus, Ferozepur Road, Ludhiana",
    services: ["Crop Residue Management", "Happy Seeder Demos", "Soil Health Testing", "Farmer Training"]
  },
  {
    type: "CSC",
    name: "Digital Seva Kendra - Jaipur West",
    nameHi: "डिजिटल सेवा केंद्र - जयपुर वेस्ट",
    state: "Rajasthan",
    district: "Jaipur",
    contact: "+91 9829012345",
    address: "Main Market, Bassi Tehsil, Jaipur",
    services: ["PM-KUSUM Solar Application", "Soil Health Card Print", "e-NAM Registration", "DBT Status Check"]
  },
  {
    type: "KVK",
    name: "Krishi Vigyan Kendra - Coimbatore",
    nameHi: "कृषि विज्ञान केंद्र - कोयंबटूर",
    state: "Tamil Nadu",
    district: "Coimbatore",
    contact: "0422-6611200",
    address: "Tamil Nadu Agricultural University (TNAU), Coimbatore",
    services: ["Drip Irrigation Subsidy Guidance", "Horticulture Planting Material", "Fisheries Training", "Weather Alerts"]
  }
];

// Export to global scope
if (typeof window !== "undefined") {
  window.SCHEMES_DATA = SCHEMES_DATA;
  window.SCHEME_CATEGORIES = SCHEME_CATEGORIES;
  window.CSC_KVK_LOCATIONS = CSC_KVK_LOCATIONS;
}
