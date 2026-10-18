-- Auto-generated Seed SQL for KrishiSetu
USE krishisetu;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE scheme_documents;
TRUNCATE TABLE saved_schemes;
TRUNCATE TABLE application_progress;
TRUNCATE TABLE eligibility_submissions;
TRUNCATE TABLE recently_viewed;
TRUNCATE TABLE chat_messages;
TRUNCATE TABLE user_profiles;
DELETE FROM users;
DELETE FROM schemes;
DELETE FROM scheme_categories;
SET FOREIGN_KEY_CHECKS = 1;
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (1, 'all', 'All Schemes', 'सभी योजनाएं', '🌱', 1);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (2, 'Income Support & Pension', 'Income Support & Pension', 'आय व पेंशन', '💰', 2);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (3, 'Crop Insurance', 'Crop Insurance', 'फसल बीमा', '🛡️', 3);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (4, 'Credit & Finance', 'Credit & Finance', 'ऋण और वित्त', '💳', 4);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (5, 'Irrigation & Water', 'Irrigation & Water', 'सिंचाई और जल', '💧', 5);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (6, 'Soil & Inputs', 'Soil & Inputs', 'मृदा व उर्वरक', '🧪', 6);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (7, 'Market Access', 'Market Access', 'बाजार व मूल्य', '📈', 7);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (8, 'Farm Mechanization', 'Farm Mechanization', 'कृषि यंत्रीकरण', '🚜', 8);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (9, 'Horticulture', 'Horticulture', 'बागवानी', '🍎', 9);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (10, 'Livestock & Dairy', 'Livestock & Dairy', 'पशुपालन व डेयरी', '🐄', 10);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (11, 'Fisheries', 'Fisheries', 'मत्स्य पालन', '🐟', 11);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (12, 'Food Processing', 'Food Processing', 'खाद्य प्रसंस्करण', '🏭', 12);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (13, 'Rural Development', 'Rural Development', 'ग्रामीण विकास', '🏡', 13);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (14, 'Education & Skilling', 'Education & Skilling', 'शिक्षा व कौशल', '🎓', 14);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (15, 'Women & SHG', 'Women & SHG', 'महिला एवं SHG', '👩‍🌾', 15);
INSERT INTO scheme_categories (id, slug, name_en, name_hi, icon, display_order) VALUES (16, 'NGO & Private CSR', 'NGO & CSR Programs', 'एनजीओ एवं सीएसआर', '🤝', 16);
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pm-kisan', 'PMK-001', 'pm-kisan', 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)', 'पीएम-किसान (प्रधानमंत्री किसान सम्मान निधि)', 2,
    'Central Government (MoA&FW)', 'केंद्र सरकार (कृषि एवं किसान कल्याण मंत्रालय)', 'Direct income support of ₹6,000 per year in 3 equal instalments.', 'प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता 3 समान किस्तों में।',
    '["₹6,000 per financial year transferred directly to Aadhaar-linked bank accounts in 3 instalments of ₹2,000 every four months.","100% centrally funded scheme with zero middlemen fee or deduction.","Ensures liquidity for purchasing seeds, fertilizers, and farm inputs before sowing seasons."]', '["Farmer family owning cultivable landholding in their name (verified via state land records / Bhulekh).","Valid Aadhaar card linked with active bank account and NPCI DBT-enabled.","Exclusions: Institutional landholders, serving/retired government officers, income-tax payees in last assessment year, doctors/engineers/lawyers."]', '["Aadhaar Card","Land Record Documents (Khasra/Khatauni / Ror / 7/12 extract)","Aadhaar-seeded Bank Passbook / Account statement with IFSC","Active Mobile number linked to Aadhaar (for e-KYC OTP)"]', '[{"step":1,"title":"Land Record & e-KYC Verification","desc":"Ensure your land records are digitized in your state Bhulekh portal and your mobile number is linked with Aadhaar."},{"step":2,"title":"Self Registration","desc":"Navigate to pmkisan.gov.in → Click on \'Farmers Corner\' → \'New Farmer Registration\'. Select Rural or Urban farmer."},{"step":3,"title":"Enter Details & Land Details","desc":"Input Aadhaar number, state, district, sub-district, village, and survey/Khasra/Khata numbers accurately."},{"step":4,"title":"e-KYC Completion","desc":"Complete mandatory OTP-based e-KYC on the portal or biometric e-KYC at your nearest Common Service Centre (CSC)."},{"step":5,"title":"State Approval & First Instalment","desc":"State Nodal Officer verifies land eligibility. Track real-time status under \'Know Your Status\' on the portal."}]',
    'https://pmkisan.gov.in', 'https://pmkisan.gov.in/RegistrationFormUpdated.aspx', '["marginal","small","medium","large"]', '["pm kisan","samman nidhi","6000","income support","dbt","kist","installment","aay","aadhaar kyc","kisht"]',
    '₹6,000 / year (Direct DBT)', 'Direct Benefit Transfer', 0, 999,
    'All landholding farmer families', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-kisan', 'PM-KISAN Revised Operational Guidelines', 'https://pmkisan.gov.in/Documents/Revised_Operational_Guidelines_of_PM_KISAN_Scheme.pdf', 'pdf', 'Department of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-kisan', 'PM-KISAN Farmer Registration & e-KYC FAQ', 'https://pmkisan.gov.in/Documents/FAQ_English.pdf', 'pdf', 'Ministry of Agriculture & Farmers Welfare', '2025'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pm-kmy', 'PMK-002', 'pm-kmy', 'PM Kisan Maan-Dhan Yojana (PM-KMY)', 'पीएम किसान मान-धन योजना (वृद्धावस्था पेंशन)', 2,
    'Central Government (MoA&FW / LIC)', 'केंद्र सरकार (कृषि मंत्रालय एवं एलआईसी)', 'Assured monthly pension of ₹3,000 after reaching 60 years of age.', '60 वर्ष की आयु के बाद ₹3,000 की सुनिश्चित मासिक पेंशन।',
    '["Guaranteed minimum pension of ₹3,000 per month upon turning 60 years.","Equal co-contribution by Central Government (50:50 ratio with farmer, ranging ₹55 to ₹200/mo depending on entry age).","Family pension: 50% of pension to spouse in case of subscriber\'s demise."]', '["Small and marginal farmers holding cultivable land up to 2 hectares (5 acres).","Age of entry between 18 and 40 years.","Must not be covered under other social security schemes (NPS, ESIC, PM-SYM)."]', '["Aadhaar Card","Bank Savings Account Passbook with IFSC","Copy of Land Record (Khasra/Khatauni)","Nominee details and relationship proof"]', '[{"step":1,"title":"Locate Nearest CSC","desc":"Visit your village Village Level Entrepreneur (VLE) at the CSC or visit maandhan.in."},{"step":2,"title":"Enrollment & Age Calculation","desc":"Provide Aadhaar and bank details. Monthly contribution auto-debit (₹55 - ₹200) is calculated based on current age."},{"step":3,"title":"Auto-Debit Consent","desc":"Sign the mandate form authorizing monthly deduction directly from savings bank or PM-KISAN credit."},{"step":4,"title":"Kisan Pension Card Generation","desc":"Receive unique Kisan Pension Account Number (KPAN) and physical laminated card."}]',
    'https://maandhan.in', 'https://maandhan.in/auth/login', '["marginal","small"]', '["maan dhan","pension","3000","old age","vridhavastha","lic","social security","retirement"]',
    '₹3,000 / month pension', 'Old Age Security', 0.1, 2,
    'Small and marginal farmers aged 18 to 40 years', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-kmy', 'PM-KMY Salient Features & Pension Structure', 'https://pmkisan.gov.in/Documents/PM-KMY%20Salient%20Features.pdf', 'pdf', 'Ministry of Agriculture & Farmers Welfare / LIC', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pmfby', 'PMF-001', 'pmfby', 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', 'प्रधानमंत्री फसल बीमा योजना (पीएमएफबीवाई)', 3,
    'Central Government (MoA&FW)', 'केंद्र सरकार (कृषि मंत्रालय)', 'Comprehensive crop loss protection against natural disasters with lowest farmer premium.', 'न्यूनतम प्रीमियम पर प्राकृतिक आपदाओं से व्यापक फसल सुरक्षा।',
    '["Uniform maximum premium payable by farmer: only 2% for Kharif crops, 1.5% for Rabi crops, and 5% for Annual Commercial/Horticultural crops.","Remainder subsidy balance shared equally 50:50 by Central and State Governments.","Full sum insured payout for prevented sowing, localized calamities (hailstorm, landslide, inundation), and post-harvest losses up to 14 days."]', '["All farmers including sharecroppers and tenant farmers growing notified crops in notified insurance units.","Non-loanee farmers can opt-in voluntarily; loanee KCC holders auto-covered unless opted out."]', '["Aadhaar Card","Land Ownership Document (RoR / 7/12) or Tenant/Sharecropper Agreement Declaration","Sowing Certificate / Crop declaration issued by Patwari / Village Revenue Officer","Cancelled Cheque / Bank Passbook"]', '[{"step":1,"title":"Check Crop Cut-Off Date","desc":"Check deadline on pmfby.gov.in for your state and crop (usually July 31 for Kharif, Dec 31 for Rabi)."},{"step":2,"title":"Online Application or Bank/CSC","desc":"Visit pmfby.gov.in → \'Farmer Corner\' → \'Guest Farmer\' or visit your loan branch/CSC."},{"step":3,"title":"Upload Sowing Certificate","desc":"Enter crop name, acreage, and upload clear photo of Sowing Certificate and Land document."},{"step":4,"title":"Pay Farmer Share of Premium","desc":"Pay nominal 1.5% or 2% premium online or at counter. Keep policy acknowledgement number."},{"step":5,"title":"Claim Reporting within 72 Hours","desc":"In case of crop loss, report immediately within 72 hours via Crop Insurance App or toll-free 14447."}]',
    'https://pmfby.gov.in', 'https://pmfby.gov.in/farmerRegistrationForm', '["marginal","small","medium","large"]', '["fasal bima","crop insurance","pmfby","weather loss","flood","drought","bima","claim","damage"]',
    'Premium capped: 1.5% to 2%', 'Closing Soon: Kharif Window', 0.1, 999,
    'All farmers growing notified crops in notified areas (loanee & non-loanee)', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pmfby', 'PMFBY Revised Operational Guidelines', 'https://pmfby.gov.in/pdf/Revised_Operational_Guidelines.pdf', 'pdf', 'Department of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'rwbcis', 'RWB-002', 'rwbcis', 'Restructured Weather Based Crop Insurance Scheme (RWBCIS)', 'पुनर्गठित मौसम आधारित फसल बीमा योजना', 3,
    'Central & State Governments', 'केंद्र एवं राज्य सरकारें', 'Parametric weather index insurance against rainfall deficit, frost, excess heat, and humidity.', 'कम वर्षा, पाला, अत्यधिक तापमान व आर्द्रता के विरुद्ध मौसम सूचकांक बीमा।',
    '["Settlement triggered automatically based on Reference Weather Station (RWS) data without waiting for crop-cutting experiments.","Farmer pays only nominal 2% (food crops) or 5% (commercial/horticulture fruit crops) premium.","Covers apple, mango, pomegranate, citrus, grapes, potato, and spices against weather perils."]', '["Farmers growing notified horticultural and commercial crops in notified weather reference grids."]', '["Aadhaar","Land Records (7/12 / Patta)","Fruit Orchard / Crop Plantation proof","Bank Account Details"]', '[{"step":1,"title":"Verify Weather Grid","desc":"Check if your Gram Panchayat is notified under an Automatic Weather Station (AWS)."},{"step":2,"title":"Register on PMFBY Portal","desc":"Select RWBCIS under Scheme selection and input orchard area in hectares."},{"step":3,"title":"Automated Claim Processing","desc":"If temperature/rainfall breaches trigger index, claim is directly credited to bank account."}]',
    'https://pmfby.gov.in', 'https://pmfby.gov.in', '["marginal","small","medium","large"]', '["weather insurance","rwbcis","rainfall","temperature","frost","unseasonal rain","mausam bima"]',
    'Subsidy up to 90% of actuarial premium', 'Parametric Payout', 0.1, 999,
    'Perennial horticultural fruit growers and sensitive cash crop farmers', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'rwbcis', 'RWBCIS Operational Guidelines & Weather Triggers', 'https://pmfby.gov.in/pdf/RWBCIS_Guidelines.pdf', 'pdf', 'Ministry of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'kcc', 'KCC-001', 'kcc', 'Kisan Credit Card (KCC) Scheme', 'किसान क्रेडिट कार्ड (केसीसी) योजना', 4,
    'NABARD & Reserve Bank of India', 'नाबार्ड एवं भारतीय रिज़र्व बैंक', 'Short-term crop loan up to ₹3 Lakh at an effective interest rate of just 4% per annum.', 'मात्र 4% प्रभावी वार्षिक ब्याज दर पर ₹3 लाख तक का अल्पकालिक फसल ऋण।',
    '["Credit limit up to ₹3,00,000 at 7% normal interest, reduced to 4% with prompt repayment incentive (3% subvention).","Collateral-free loan limit up to ₹1.60 Lakh (extended to ₹2.0 Lakh in select banks).","Revolving cash credit account valid for 5 years with simple annual renewal.","Covers post-harvest expenses, crop cultivation, maintenance of farm assets, and domestic consumption needs."]', '["Individual or joint owner-cultivators, tenant farmers, oral lessees, and sharecroppers.","Self Help Groups (SHGs) or Joint Liability Groups (JLGs) of farmers.","Dairy, poultry, and fishery rearers are also eligible for working capital KCC up to ₹2 Lakh."]', '["Completed 1-page KCC application form","Aadhaar Card and PAN Card / Voter ID","Land Ownership Record / Certified Copy of Patta / Tenancy deed","Declaration of existing crop loans and village revenue officer verification"]', '[{"step":1,"title":"Download 1-Page KCC Form","desc":"Download standard simplified 1-page form from pmkisan.gov.in or nabard.org."},{"step":2,"title":"Submit to Bank Branch","desc":"Submit along with land record and Aadhaar copy to your local Rural, Cooperative, or Commercial Bank."},{"step":3,"title":"14-Day Service Guarantee","desc":"Banks are mandated by RBI to process and sanction KCC within 14 days of complete application."},{"step":4,"title":"Receive RuPay KCC ATM Card","desc":"Use the RuPay card to withdraw money from any ATM or make digital payments for agri-inputs."}]',
    'https://www.nabard.org', 'https://pmkisan.gov.in/Documents/KCC_Form.pdf', '["marginal","small","medium","large"]', '["kisan credit card","kcc","crop loan","4 percent interest","short term credit","rin","karz","bank loan"]',
    'Effective 4% interest rate (3% subvention)', 'Low Interest Credit', 0.1, 999,
    'All farmers, animal husbandry, dairy farmers, and fishers', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'kcc', 'RBI Master Circular - Kisan Credit Card (KCC) Lending Norms', 'https://rbidocs.rbi.org.in/rdocs/notification/PDFs/74MCKCC030714.pdf', 'pdf', 'Reserve Bank of India / NABARD', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'miss', 'MIS-002', 'miss', 'Modified Interest Subvention Scheme (MISS)', 'संशोधित ब्याज अनुदान योजना', 4,
    'Ministry of Agriculture & Farmers Welfare', 'कृषि एवं किसान कल्याण मंत्रालय', 'Central subsidy on short-term crop loans ensuring cheap working capital.', 'अल्पकालिक फसल ऋणों पर केंद्रीय ब्याज सब्सिडी ताकि सस्ता ऋण मिले।',
    '["1.5% per annum interest subvention to lending institutions.","Additional 3% per annum incentive to farmers repaying their loan on or before the due date.","Distress relief: Post-harvest loan against Negotiable Warehouse Receipts (e-NWR) available for up to 6 months at subvented rate."]', '["Farmers with active KCC loans up to ₹3 Lakhs who repay within 1 year."]', '["KCC Account details","Repayment receipt","Aadhaar Card"]', '[{"step":1,"title":"Automatic Application","desc":"Applied automatically by your bank branch when you repay your KCC loan on or before due date."}]',
    'https://agriwelfare.gov.in', 'https://pmkisan.gov.in/Documents/KCC_Form.pdf', '["marginal","small","medium","large"]', '["interest subvention","miss","interest rebate","subsidized loan","prompt repayment","byaj chhoot"]',
    '3% Prompt Repayment Incentive', 'Interest Subvention', 0.1, 999,
    'Farmers availing short-term crop loans through KCC', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'miss', 'Modified Interest Subvention Scheme (MISS) Operational Guidelines', 'https://agricoop.nic.in/en/schemes', 'page', 'Ministry of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pmksy', 'PMS-001', 'pmksy', 'PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)', 'प्रधानमंत्री कृषि सिंचाई योजना (प्रति बूंद अधिक फसल)', 5,
    'MoA&FW / Ministry of Jal Shakti', 'कृषि मंत्रालय एवं जल शक्ति मंत्रालय', 'Up to 55% subsidy on drip and sprinkler micro-irrigation systems to maximize water efficiency.', 'सूक्ष्म सिंचाई (ड्रिप और स्प्रिंकलर) पर 55% तक की सरकारी सब्सिडी।',
    '["55% financial assistance for Small & Marginal farmers; 45% assistance for other farmers.","Saves up to 40-50% water while increasing crop yield by 20-30%.","Fertigation facility allows precise fertilizer delivery directly to plant root zone."]', '["All categories of farmers having cultivable land and an assured water source (borewell, open well, canal, farm pond).","Members of Water User Associations (WUAs) or FPOs receive fast-track allocation."]', '["Aadhaar Card and Land Record (7/12, Khatauni)","Water source proof & electricity connection bill/solar pump certificate","Quotation / Design layout from registered micro-irrigation supplier","Soil & water test report (optional/desirable)"]', '[{"step":1,"title":"State Horticulture / Agri Portal","desc":"Register on your state micro-irrigation portal (e.g., e-Udyan, MahaDBT, TNHORT)."},{"step":2,"title":"Field Inspection by Department","desc":"Block Horticulture Officer visits your plot to assess water source, crop, and pipeline layout."},{"step":3,"title":"Select Empanelled Vendor","desc":"Choose from government-empanelled drip manufacturers (Jain, Netafim, EPC, etc.)."},{"step":4,"title":"Installation & Verification","desc":"Vendor installs system. Joint inspection & geo-tagged photo uploaded on PMKSY app."},{"step":5,"title":"Subsidy Release","desc":"Subsidy amount credited via DBT or directly adjusted in manufacturer bill."}]',
    'https://pmksy.gov.in', NULL, '["marginal","small","medium"]', '["pm krishi sinchayee yojana (pmksy - per drop more crop)","irrigation & water"]',
    'Up to 55% subsidy on Drip & Sprinkler', 'Water Conservation', 0.2, 5,
    'Farmers with assured water source seeking micro-irrigation installation', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pmksy', 'PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop) Official Overview', 'https://agriwelfare.gov.in/en/Major', 'page', 'MoA&FW / Ministry of Jal Shakti', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pm-kusum', 'KUS-001', 'pm-kusum', 'PM-KUSUM (Solar Pump & Farm Solarization)', 'पीएम-कुसुम (सौर ऊर्जा कृषि पंप योजना)', 5,
    'Ministry of New and Renewable Energy (MNRE)', 'नवीन और नवीकरणीय ऊर्जा मंत्रालय', 'Up to 60% total government subsidy for standalone solar agri pumps (Component B).', 'सोलर वाटर पंप लगाने पर केंद्र व राज्य सरकार द्वारा 60% तक भारी सब्सिडी।',
    '["Component B: 30% Central subsidy + 30% State subsidy. Farmer contributes only 10-40% (bank loan available for 30%).","Replaces costly diesel pumps, reducing operating cost to near-zero.","Component C: Solarization of existing grid-connected agri pumps with option to sell excess electricity back to DISCOM for extra income."]', '["Farmers having land ownership and existing borewell/dug well without an electric connection (Component B).","Farmers with existing electric connection for Component C."]', '["Aadhaar Card","Land Ownership Documents (Jamabandi / ROR)","Bank Account details with IFSC","Passport size photographs & Mobile number"]', '[{"step":1,"title":"Apply on State Renewable Energy Portal","desc":"Visit your state nodal agency portal (e.g., UPNEDA, HAREDA, MEDA, RREC)."},{"step":2,"title":"Choose Pump Capacity","desc":"Select 3 HP, 5 HP, or 7.5 HP AC/DC submersible or surface solar pump based on water depth."},{"step":3,"title":"Deposit Beneficiary Share","desc":"Deposit farmer share (approx 10-40% of total cost) into the nodal agency escrow account."},{"step":4,"title":"Site Survey & Installation","desc":"Empanelled vendor installs solar panels, controller, and pump within 60 days."}]',
    'https://pmkusum.mnre.gov.in', 'https://pmkusum.mnre.gov.in/landing.html', '["marginal","small","medium","large"]', '["solar pump","pm kusum","solar energy","tubewell solar","grid connected solar","mnre","bijli","solar tube"]',
    '60% Subsidy (30% Central + 30% State)', 'Renewable Energy Subsidy', 0.5, 999,
    'Individual farmers, Water User Associations, and Panchayats in off-grid areas', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-kusum', 'PM-KUSUM Comprehensive Scheme Implementation Guidelines', 'https://mnre.gov.in/img/documents/uploads/file_f-1678881268689.pdf', 'pdf', 'Ministry of New and Renewable Energy (MNRE)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'soil-health-card', 'SHC-001', 'soil-health-card', 'Soil Health Card Scheme', 'मृदा स्वास्थ्य कार्ड योजना', 6,
    'Central Government (MoA&FW)', 'केंद्र सरकार (कृषि मंत्रालय)', 'Free periodic testing of 12 chemical parameters of farm soil with crop-wise nutrient advice.', 'खेत की मिट्टी के 12 पोषक तत्वों की निःशुल्क जांच एवं फसलवार खाद सलाह।',
    '["Detailed report on 12 parameters: Macro-nutrients (N, P, K), Secondary-nutrients (S), Micro-nutrients (Zn, Fe, Cu, Mn, Bo), and Physical parameters (pH, EC, OC).","Reduces fertilizer usage by 15-25% while boosting crop yield by 8-12%.","Customized fertilizer dosages recommendations for 6 chosen crops."]', '["Any farmer holding agricultural land in India."]', '["Aadhaar Card","Survey / Khasra number of land parcel"]', '[{"step":1,"title":"Soil Sample Collection","desc":"Agri department extension staff collects grid samples from field (0-15 cm depth) using GPS coordinates."},{"step":2,"title":"Laboratory Analysis","desc":"Sample tested in district Soil Testing Laboratory (STL) or mobile van."},{"step":3,"title":"Card Delivery / Download","desc":"Download digital Soil Health Card directly from soilhealth.dac.gov.in by entering state and village."}]',
    'https://soilhealth.dac.gov.in', NULL, '["marginal","small","medium","large"]', '["soil health card scheme","soil & inputs"]',
    '100% Free Soil Testing', 'Free Diagnostic', 0, 999,
    'All farming families across all states every 3 years', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'soil-health-card', 'Soil Health Card Scheme Official Overview', 'https://agriwelfare.gov.in/en/Major', 'page', 'Central Government (MoA&FW)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pkvy', 'PKV-001', 'pkvy', 'Paramparagat Krishi Vikas Yojana (PKVY)', 'परम्परागत कृषि विकास योजना (जैविक खेती)', 6,
    'MoA&FW (National Mission on Sustainable Agri)', 'कृषि मंत्रालय (सतत कृषि राष्ट्रीय मिशन)', 'Financial assistance of ₹50,000 per hectare for cluster-based organic farming and certification.', 'क्लस्टर आधारित जैविक खेती और प्रमाणीकरण के लिए ₹50,000 प्रति हेक्टेयर की मदद।',
    '["₹31,000/ha provided directly for organic inputs (seeds, bio-fertilizers, vermicompost, botanical extracts).","Free Participatory Guarantee System (PGS-India) organic certification for 3 years.","₹8,800/ha for value addition, packaging, and marketing in organic fairs and e-NAM."]', '["Farmers forming a cluster of minimum 20 hectares committing to organic cultivation without synthetic chemicals."]', '["Cluster formation agreement","Aadhaar Card","Land papers","Bank account details"]', '[{"step":1,"title":"Form Farmers Group","desc":"Gather 20-50 farmers in your village with adjacent fields totaling at least 20-50 ha."},{"step":2,"title":"Register with Block Agri Officer","desc":"Submit cluster application to Regional Council under PGS-India."},{"step":3,"title":"DBT Disbursement","desc":"Funds credited over 3 years directly to farmer bank accounts in milestone tranches."}]',
    'https://pgsindia-ncof.gov.in', 'https://pgsindia-ncof.gov.in/registration', '["marginal","small","medium"]', '["organic farming","pkvy","jaivik kheti","cluster certification","pgs india","bio fertilizer","compost","chemical free"]',
    '₹50,000 / hectare assistance', 'Organic Farming', 0.5, 2,
    'Farmer clusters (groups of 20-50 farmers with 20-50 hectares)', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pkvy', 'Paramparagat Krishi Vikas Yojana (PKVY) Guidelines', 'https://agricoop.nic.in/sites/default/files/PKVY_Guidelines.pdf', 'pdf', 'National Centre of Organic and Natural Farming', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'nmnf', 'NMN-002', 'nmnf', 'National Mission on Natural Farming (NMNF)', 'राष्ट्रीय प्राकृतिक खेती मिशन', 6,
    'Central Government (MoA&FW)', 'केंद्र सरकार (कृषि मंत्रालय)', 'Support for chemical-free livestock-based natural farming with input resource centers.', 'रसायन मुक्त, गो-आधारित प्राकृतिक खेती के लिए अनुदान और प्रशिक्षण।',
    '["₹15,000 per hectare incentive over 3 years for adopting natural farming.","Assistance to establish village Bio-Input Resource Centres (BRCs).","Continuous mentoring by Krishi Sakhis and Master Trainers."]', '["Farmers owning indigenous cows or willing to practice livestock-based zero-chemical farming."]', '["Aadhaar","Land Record","Bank Passbook"]', '[{"step":1,"title":"Enroll in Village Gram Sabha","desc":"Register your name during Gram Sabha natural farming drive."},{"step":2,"title":"Attend 3-Day KVK Workshop","desc":"Complete mandatory practical training on preparation of Beejamrit and Jeevamrit."}]',
    'https://naturalfarming.dac.gov.in', 'https://naturalfarming.dac.gov.in', '["marginal","small","medium"]', '["natural farming","prakritik kheti","nmnf","zero budget","cow dung","jeevamrit","ghanjeevamrit","desi cow"]',
    '₹15,000 / ha financial support', 'Chemical Free', 0.2, 5,
    'Farmers adopting Jeevamrit, Beejamrit, and indigenous cow farming', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'nmnf', 'National Mission on Natural Farming (NMNF) Framework', 'https://agricoop.nic.in/en/natural-farming', 'page', 'Ministry of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'enam', 'ENM-001', 'enam', 'e-NAM (National Agriculture Market)', 'ई-नाम (राष्ट्रीय कृषि बाजार)', 7,
    'Small Farmers\' Agri-Business Consortium (SFAC)', 'लघु कृषक कृषि व्यापार संघ (एसएफएसी)', 'Pan-India electronic trading portal uniting 1,400+ mandis for transparent price discovery.', '1,400+ मंडियों को जोड़ने वाला ऑनलाइन ई-ट्रेडिंग प्लेटफॉर्म।',
    '["Access to pan-India buyers across 23+ states, removing local cartelization and middleman cut.","Scientific assaying and quality testing of produce at mandi gate free of cost.","100% online payment directly credited to farmer bank account on same day of auction.","Warehouse-based sales (e-NWR trade) allows selling stored produce from registered cold storages."]', '["Any farmer possessing marketable agricultural or horticultural surplus."]', '["Aadhaar Card","Bank Account details with cancelled cheque","Mobile number for SMS auction notifications"]', '[{"step":1,"title":"Register on e-NAM App","desc":"Download e-NAM Mobile App or visit enam.gov.in → Select \'Farmer Registration\'."},{"step":2,"title":"Gate Entry at Mandi","desc":"Take produce to nearest e-NAM enabled APMC mandi. Gate staff generates digital lot number."},{"step":3,"title":"Assaying & Electronic Bidding","desc":"Produce sample is tested for moisture and grade. Live transparent bidding starts on portal."},{"step":4,"title":"Accept Bid & Online Settlement","desc":"Accept best bid online. Payment settled directly into bank account via payment gateway."}]',
    'https://enam.gov.in', 'https://enam.gov.in/web/dashboard/farmer-registration', '["marginal","small","medium","large"]', '["enam","e nam","mandi","online trading","msp sale","direct selling","national market","bhav","fasal bikri"]',
    'Direct online payment & zero mandi cuts', 'Pan-India Trading', 0, 999,
    'All farmers selling farm produce in APMC mandis or from farmgate', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'enam', 'e-NAM Portal Integration & Farmer Registration Manual', 'https://enam.gov.in/web/resources/guidelines', 'page', 'Small Farmers\' Agri-Business Consortium (SFAC)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pm-aasha', 'ASH-001', 'pm-aasha', 'PM-AASHA (Pradhan Mantri Annadata Aay Sanrakshan Abhiyan)', 'पीएम-आशा (अन्नदाता आय संरक्षण अभियान)', 7,
    'Department of Agriculture & Farmers Welfare', 'कृषि एवं किसान कल्याण विभाग', 'Guaranteed MSP price protection for pulses, oilseeds, and copra through procurement and deficit payment.', 'दलहन, तिलहन और खोपरा पर न्यूनतम समर्थन मूल्य (एमएसपी) की गारंटी।',
    '["Price Support Scheme (PSS): Physical procurement of notified pulses and oilseeds by NAFED/FCI at full MSP.","Price Deficiency Payment Scheme (PDPS): Direct cash transfer of price difference between MSP and selling price if market crashes.","Protects farmers from distress sales during peak harvest glut."]', '["Farmers registered on state procurement portal growing notified MSP crops."]', '["Aadhaar","Land Records (Girdawari / Sowing verification)","Bank Passbook"]', '[{"step":1,"title":"Pre-Harvest Registration","desc":"Register on state procurement portal (e.g., e-Uparjan, Meri Fasal Mera Byora) during sowing."},{"step":2,"title":"Procurement Slot Booking","desc":"Book an appointment slot at nearest NAFED / State warehouse procurement center."},{"step":3,"title":"Weighment & DBT Settlement","desc":"Deliver produce adhering to Fair Average Quality (FAQ) standards. Payment credited within 72 hrs."}]',
    'https://agriwelfare.gov.in', NULL, '["marginal","small","medium","large"]', '["pm-aasha (pradhan mantri annadata aay sanrakshan abhiyan)","market access"]',
    '100% MSP realization guarantee', 'Price Support Scheme', 0.1, 999,
    'Farmers cultivating pulses (Gram, Tur, Urad, Moong) and oilseeds (Mustard, Groundnut, Soybean)', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-aasha', 'PM-AASHA (Pradhan Mantri Annadata Aay Sanrakshan Abhiyan) Official Overview', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 'page', 'Department of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'smam', 'SMA-001', 'smam', 'Sub-Mission on Agricultural Mechanization (SMAM)', 'कृषि यंत्रीकरण पर उप-मिशन (स्मम योजना)', 8,
    'MoA&FW (Machinery & Technology Division)', 'कृषि मंत्रालय (मशीनरी विभाग)', '40% to 50% capital subsidy on tractors, rotavators, power tillers, and harvesters.', 'ट्रैक्टर, रोटावेटर, पावर टिलर और थ्रेशर पर 40% से 50% तक सरकारी अनुदान।',
    '["50% financial assistance for SC, ST, Small/Marginal farmers, and Women; 40% for General category.","Subsidy up to ₹10 Lakh (80% funding) for establishing village Custom Hiring Centres (CHCs).","Covers 100+ machinery types: Laser Land Levellers, Multi-crop threshers, Super Seeders, Happy Seeders, Balers."]', '["Farmers holding valid land records who have not availed tractor/machinery subsidy in the last 7 years.","Valid driver license required for tractor purchase."]', '["Aadhaar Card","Land Ownership Record (Khatauni / Patta)","Bank Account details","Caste Certificate (for SC/ST benefit) and Quotation from authorized machinery dealer"]', '[{"step":1,"title":"Register on Farmech Portal","desc":"Visit agrimachinery.nic.in → Click \'Registration\' → \'Farmer Registration\'."},{"step":2,"title":"Select Implement & Dealer","desc":"Select desired machinery model and authorized dealer in your district."},{"step":3,"title":"Lottery / Priority Approval","desc":"District Agricultural Engineer issues administrative sanction letter."},{"step":4,"title":"Purchase & Physical Verification","desc":"Purchase equipment. Department inspector verifies serial number and geo-tags equipment."},{"step":5,"title":"DBT Release","desc":"Subsidy amount directly credited to farmer bank account."}]',
    'https://agrimachinery.nic.in', 'https://agrimachinery.nic.in/Index/FarmerRegistration', '["marginal","small","medium","large"]', '["tractor subsidy","farm machinery","smam","rotavator","harvester","custom hiring centre","krishi yantra","chc"]',
    '40% - 50% Subsidy on Farm Machinery', 'Machinery Subsidy', 0.5, 999,
    'Individual farmers, SHGs, FPOs, and rural youth establishing Custom Hiring Centres', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'smam', 'Sub-Mission on Agricultural Mechanization (SMAM) Guidelines', 'https://agrimachinery.nic.in/Files/Guidelines/SMAM_Guidelines.pdf', 'pdf', 'Department of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'namo-drone-didi', 'NDD-001', 'namo-drone-didi', 'Namo Drone Didi Scheme', 'नमो ड्रोन दीदी योजना', 8,
    'Central Government (MoA&FW / MoRD)', 'केंद्र सरकार (कृषि एवं ग्रामीण विकास मंत्रालय)', '80% financial assistance (up to ₹8 Lakh) to Women Self Help Groups for agri-drones.', 'महिला स्वयं सहायता समूहों को कृषि ड्रोन हेतु 80% (₹8 लाख तक) का अनुदान।',
    '["80% subsidy (up to ₹8 Lakh) on cost of agricultural drone package and accessories.","15-day certified drone pilot training with DGCA remote pilot license included free of cost.","SHG can rent drone services to local farmers for liquid nano-urea / pesticide spraying earning ₹10,000-15,000/month."]', '["Active member of an established Women Self Help Group under DAY-NRLM.","Minimum 10th standard pass for designated drone pilot member."]', '["Aadhaar Card","SHG Registration Certificate","10th Marksheet of pilot","Bank Passbook"]', '[{"step":1,"title":"SHG Resolution","desc":"Pass resolution in SHG meeting and apply through Block Mission Management Unit (BMMU)."},{"step":2,"title":"Pilot Training","desc":"Selected Didi attends 15 days residential DGCA drone flying and maintenance course."},{"step":3,"title":"Drone Handover","desc":"Fertilizer company / Lead agency delivers certified agri-drone with 1 year warranty."}]',
    'https://agriwelfare.gov.in', NULL, '["marginal","small","medium","large"]', '["drone didi","namo drone","shg","women drone pilot","drone spray","fertilizer spray","pesticide drone","mahila shg"]',
    '80% subsidy up to ₹8,00,000', 'Women & High Tech', 0, 999,
    'Women members of DAY-NRLM Self Help Groups (SHGs)', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'namo-drone-didi', 'Namo Drone Didi Scheme Operational Guidelines', 'https://agricoop.nic.in/en/drone-didi', 'page', 'Department of Agriculture & Farmers Welfare / MoRD', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'digital-agri-mission', 'DAM-001', 'digital-agri-mission', 'Digital Agriculture Mission (Agristack & Kisan e-Mitra)', 'डिजिटल कृषि मिशन (एग्रीस्टैक एवं किसान मित्र)', 8,
    'Cabinet Committee on Economic Affairs (CCEA)', 'आर्थिक मामलों की कैबिनेट समिति', 'Digital Farmer ID (Kisan Pehchan) for single-window access to all subsidies and crop surveys.', 'सभी योजनाओं और फसल सर्वेक्षणों के लिए डिजिटल किसान पहचान पत्र।',
    '["Unique Farmer ID linked with Aadhaar and geo-referenced land parcel.","Automatic digital crop survey eliminates need for paper Girdawari from Patwari.","Instant sanction of KCC crop loans and calamity compensation directly into account."]', '["All farmers with verified land records."]', '["Aadhaar","Land Records"]', '[{"step":1,"title":"Digital Farmer Registry","desc":"Enroll during village digital registry camp or via state farmer portal."}]',
    'https://agristack.gov.in', NULL, '["marginal","small","medium","large"]', '["digital agriculture mission (agristack & kisan e-mitra)","farm mechanization"]',
    'Instant digital KYC for all schemes', 'Digital AgriStack', 0, 999,
    'All registered farmers in India', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'digital-agri-mission', 'Digital Agriculture Mission (Agristack & Kisan e-Mitra) Official Overview', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 'page', 'Cabinet Committee on Economic Affairs (CCEA)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'midh', 'MID-001', 'midh', 'Mission for Integrated Development of Horticulture (MIDH)', 'एकीकृत बागवानी विकास मिशन (एमआईडीएच)', 9,
    'Central Government (MoA&FW)', 'केंद्र सरकार (कृषि मंत्रालय)', 'Up to 50% subsidy on polyhouses, shade nets, cold storage, and fruit plantation.', 'पॉलीहाउस, शेडनेट, कोल्ड स्टोरेज और फलों के बाग लगाने पर 50% तक सब्सिडी।',
    '["50% subsidy for setting up Naturally Ventilated Polyhouses and Shade Net Houses.","Subsidy of ₹40,000 to ₹1,00,000 per hectare for new high-density fruit orchards (Mango, Apple, Citrus, Guava).","Financial assistance for on-farm pack houses, solar cold rooms, and mushroom cultivation units."]', '["Farmers with ownership or registered lease of land for at least 10 years."]', '["Aadhaar","Land Record (Jamabandi / 7/12)","Detailed Project Report (DPR)","Bank Account"]', '[{"step":1,"title":"Submit DPR to District Horticulture Officer","desc":"Prepare project estimate and submit through state horticulture portal."},{"step":2,"title":"Work Order Issuance","desc":"Receive technical sanction and work order before starting construction."},{"step":3,"title":"Verification & Release","desc":"Geo-tagged verification by department committee and release of back-ended subsidy."}]',
    'https://midh.gov.in', 'https://midh.gov.in', '["marginal","small","medium","large"]', '["horticulture","midh","fruits","vegetables","polyhouse","greenhouse","cold storage","bagwani","flower cultivation"]',
    'Up to 50% capital subsidy', 'High Value Crops', 0.2, 4,
    'Farmers growing fruits, vegetables, flowers, spices, and protected cultivation', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'midh', 'MIDH Operational Guidelines for Horticulture Development', 'https://midh.gov.in/PDF/MIDH_Guidelines_2021.pdf', 'pdf', 'Mission for Integrated Development of Horticulture', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'nbhm', 'NBH-002', 'nbhm', 'National Beekeeping & Honey Mission (NBHM)', 'राष्ट्रीय मधुमक्खी पालन एवं शहद मिशन', 9,
    'National Bee Board (NBB / MoA&FW)', 'राष्ट्रीय मधुमक्खी बोर्ड', 'Sweet Revolution: up to 80% subsidy for bee colonies, bee boxes, and honey extraction equipment.', 'मधुमक्खी के बक्से, कालोनियां और शहद निष्कर्षण उपकरण पर 80% तक सहायता।',
    '["Subsidy on purchase of 10 to 50 bee boxes and colonies.","Increases crop yield by 20-30% through enhanced bee pollination in mustard, sunflower, and fruits.","Additional income of ₹1,00,000 to ₹2,50,000 per year from raw honey, beeswax, and royal jelly."]', '["Trained beekeepers or farmers completing 7-day certified training from KVK/NBB."]', '["Aadhaar","Training Completion Certificate","Bank Passbook"]', '[{"step":1,"title":"Complete NBB Training","desc":"Attend certified beekeeping training at your local Krishi Vigyan Kendra (KVK)."},{"step":2,"title":"Register on Madhukranti Portal","desc":"Register as beekeeper on madhukranti.in for source traceability."},{"step":3,"title":"Apply for Equipment Subsidy","desc":"Submit application to District Horticulture Officer for bee boxes and colonies."}]',
    'https://nbhm.gov.in', 'https://nbhm.gov.in', '["marginal","small","medium","large"]', '["beekeeping","honey mission","nbhm","madhumakhi palan","bee boxes","sweet revolution","honey processing"]',
    'Up to 80% subsidy for SHGs/FPOs', 'Sweet Revolution', 0, 999,
    'Beekeepers, farmers, landless rural youth, and women SHGs', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'nbhm', 'National Beekeeping & Honey Mission (NBHM) Guidelines', 'https://nbhm.gov.in/guidelines', 'page', 'National Bee Board (NBB)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'rashtriya-gokul-mission', 'RGM-001', 'rashtriya-gokul-mission', 'Rashtriya Gokul Mission (RGM)', 'राष्ट्रीय गोकुल मिशन', 10,
    'Department of Animal Husbandry & Dairying (DAHD)', 'पशुपालन और डेयरी विभाग', 'Up to 50% capital subsidy (up to ₹2 Crore) for indigenous cattle breed development and IVF tech.', 'देशी गोवंश संवर्धन, डेयरी फार्मिंग और कृत्रिम गर्भाधान पर 50% तक सब्सिडी।',
    '["Free doorstep Artificial Insemination (AI) using high genetic merit sex-sorted semen.","50% capital subsidy (up to ₹4 Lakh) for individual farmers setting up small breed multiplication farms.","Promotes indigenous breeds: Gir, Sahiwal, Red Sindhi, Tharparkar, Kankrej."]', '["Dairy farmers having suitable land/shed for housing cattle."]', '["Aadhaar","Land/Shed ownership or lease","Training Certificate in Dairy Management","Bank Account"]', '[{"step":1,"title":"Doorstep AI Request","desc":"Contact local MAITRI worker or Veterinary Hospital for free artificial insemination."},{"step":2,"title":"Commercial Farm Subsidy","desc":"Apply on dahd.nic.in along with detailed project proposal and bank appraisal."}]',
    'https://dahd.nic.in', NULL, '["marginal","small","medium","large"]', '["rashtriya gokul mission (rgm)","livestock & dairy"]',
    '50% capital subsidy (up to ₹2 Cr)', 'Dairy Development', 0, 999,
    'Dairy farmers, cooperatives, entrepreneurs, and cattle breeders', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'rashtriya-gokul-mission', 'Rashtriya Gokul Mission (RGM) Official Overview', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 'page', 'Department of Animal Husbandry & Dairying (DAHD)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'nlm', 'NLM-002', 'nlm', 'National Livestock Mission (NLM)', 'राष्ट्रीय पशुधन मिशन', 10,
    'Department of Animal Husbandry & Dairying', 'पशुपालन एवं डेयरी विभाग', '50% capital subsidy up to ₹50 Lakh for goat, sheep, piggery, and poultry breeding farms.', 'बकरी, भेड़, सुअर और मुर्गी पालन ब्रीडिंग फार्म पर 50% (₹50 लाख तक) सब्सिडी।',
    '["50% back-ended capital subsidy on total project cost (e.g., ₹25 Lakh on a ₹50 Lakh 500-goat breeding unit).","Subsidy up to ₹25 Lakh for rural backyard poultry parent farms (1,000 birds).","Fodder and feed infrastructure subsidy up to ₹50 Lakh for silage and TMR units."]', '["Applicants having own or leased land for livestock shed and trained in animal husbandry."]', '["Aadhaar","Land title deed","Project Report (DPR)","Bank in-principle loan sanction letter"]', '[{"step":1,"title":"Register on NLM Portal","desc":"Visit nlm.udyamimitra.in and submit project proposal."},{"step":2,"title":"State Level Committee Approval","desc":"State Level Executive Committee (SLEC) reviews and forwards to SIDBI."},{"step":3,"title":"Subsidy in 2 Tranches","desc":"First 50% subsidy released upon bank disbursement; second 50% upon physical completion."}]',
    'https://nlm.udyamimitra.in', 'https://nlm.udyamimitra.in', '["marginal","small","medium","large"]', '["livestock mission","nlm","poultry","goat farming","sheep","silage","pashudhan","bakri palan","murgi palan"]',
    '50% Subsidy up to ₹50 Lakhs', 'Poultry & Goat Breeding', 0, 999,
    'Individuals, SHGs, FPOs, JLGs, and Section 8 companies', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'nlm', 'National Livestock Mission (NLM) Entrepreneurship Guidelines', 'https://dahd.nic.in/sites/default/files/NLM_Guidelines_2021.pdf', 'pdf', 'Department of Animal Husbandry & Dairying', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pmmsy', 'PMS-002', 'pmmsy', 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)', 'प्रधानमंत्री मत्स्य संपदा योजना', 11,
    'Department of Fisheries (MoFAHD)', 'मत्स्य पालन विभाग', '40% to 60% subsidy for fish ponds, biofloc, Recirculating Aquaculture Systems (RAS), and boats.', 'मछली तालाब निर्माण, बायोफ्लॉक और नावों पर 40% से 60% तक भारी सब्सिडी।',
    '["60% financial assistance for Women and SC/ST beneficiaries; 40% for General category.","Subsidy for constructing new freshwater fish ponds (₹7 Lakh/ha unit cost).","Assistance for Biofloc aquaculture systems, ice plants, refrigerated vans, and retail fish kiosks."]', '["Own or leased land with adequate fresh water supply suitable for pond construction."]', '["Aadhaar","Land Document / Long term lease deed (minimum 10 years)","Water quality test report","Bank Details"]', '[{"step":1,"title":"Online Application","desc":"Apply via pmmsy.dof.gov.in or submit DPR to District Fisheries Development Officer (DFDO)."},{"step":2,"title":"Site Inspection & Sanction","desc":"Fisheries inspector inspects soil permeability and water table."},{"step":3,"title":"Direct Benefit Transfer","desc":"Subsidy released stage-wise in sync with pond excavation and fingerling stocking."}]',
    'https://pmmsy.dof.gov.in', 'https://pmmsy.dof.gov.in/applicant/login', '["marginal","small","medium","large"]', '["matsya sampada","pmmsy","fisheries","fish pond","aquaculture","biofloc","ras","machhli palan","fishing boat"]',
    '40% to 60% financial assistance', 'Blue Revolution', 0.2, 999,
    'Fishers, fish farmers, fish workers, SHGs, and fisheries cooperatives', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pmmsy', 'PMMSY Operational Guidelines (Fisheries Sector)', 'https://dof.gov.in/sites/default/files/2020-07/PMMSY_Guidelines.pdf', 'pdf', 'Department of Fisheries (MoFAHD)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'deds', 'DED-001', 'deds', 'Dairy Processing & Infrastructure Development (DIDIF / DEDS)', 'डेयरी उद्यमिता विकास योजना', 10,
    'NABARD & DAHD', 'नाबार्ड एवं पशुपालन विभाग', 'Subsidy for small dairy units (2 to 10 crossbred cows/buffaloes) and milk chilling equipment.', '2 से 10 दुधारू पशुओं की डेयरी यूनिट और मिल्क चिलिंग उपकरणों पर अनुदान।',
    '["25% capital subsidy for General (up to ₹1.75 Lakh for 10 milch animal unit); 33.33% for SC/ST (up to ₹2.33 Lakh).","Loans available from Commercial, Regional Rural, and Cooperative Banks.","Covers milking machines, bulk milk coolers, and dairy sheds."]', '["Farmers and individuals interested in starting or expanding clean milk production."]', '["Aadhaar","Bank Account Details","Land or Shed verification","Veterinary fitness certificate of animals"]', '[{"step":1,"title":"Submit Application to Bank","desc":"Submit loan application for dairy project to your nearest commercial or rural bank."},{"step":2,"title":"Bank Sanction & Upload to NABARD","desc":"Bank inspects shed, sanctions loan, and claims subsidy through NABARD portal."}]',
    'https://www.nabard.org', NULL, '["marginal","small","medium"]', '["dairy processing & infrastructure development (didif / deds)","livestock & dairy"]',
    '25% (Gen) / 33.33% (SC/ST) subsidy', 'Dairy Entrepreneur', 0, 999,
    'Small farmers, milk producers, and rural youth', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'deds', 'Dairy Processing & Infrastructure Development (DIDIF / DEDS) Official Overview', 'https://agriwelfare.gov.in/en/Major', 'page', 'NABARD & DAHD', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pmfme', 'FME-001', 'pmfme', 'PM Formalisation of Micro Food Processing Enterprises (PMFME)', 'पीएम सूक्ष्म खाद्य उद्योग उन्नयन योजना', 12,
    'Ministry of Food Processing Industries (MoFPI)', 'खाद्य प्रसंस्करण उद्योग मंत्रालय', '35% credit-linked capital subsidy up to ₹10 Lakh under One District One Product (ODOP).', 'एक जिला एक उत्पाद (ओडीओपी) के तहत खाद्य प्रसंस्करण इकाई पर 35% (₹10 लाख तक) सब्सिडी।',
    '["35% credit-linked capital subsidy on eligible project cost up to maximum ₹10 Lakh per unit.","Seed capital of ₹40,000 per member for SHGs for working capital and small tool purchases.","Free technical training, FSSAI licensing support, packaging, and branding assistance under ODOP."]', '["Existing or aspiring food processing entrepreneurs, FPOs, SHGs, and Producer Cooperatives.","Individual must be above 18 years of age with minimum 8th class education."]', '["Aadhaar & PAN Card","Electricity bill of processing premises / Rent agreement","Detailed Project Report (DPR) generated on portal","Bank Account details & 6 months statement"]', '[{"step":1,"title":"Register on PMFME Portal","desc":"Visit pmfme.mofpi.gov.in → Sign up as Applicant."},{"step":2,"title":"District Resource Person (DRP) Assistance","desc":"Free assigned DRP helps you prepare DPR and upload FSSAI papers."},{"step":3,"title":"Bank Credit & Subsidy Credit","desc":"Bank sanctions loan; MoFPI credits 35% subsidy into bank escrow account."}]',
    'https://pmfme.mofpi.gov.in', 'https://pmfme.mofpi.gov.in/pmfme/#/Home-Page', '["marginal","small","medium","large"]', '["food processing","pmfme","odop","micro enterprise","flour mill","oil mill","pickle making","khadya prasanskaran"]',
    '35% subsidy up to ₹10,00,000', 'ODOP Food Processing', 0, 999,
    'Existing or new micro food processing units (flour mills, oil extraction, pickle/jam, spice grinding)', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pmfme', 'PMFME Scheme Guidelines & One District One Product (ODOP) Framework', 'https://mofpi.gov.in/sites/default/files/pmfme_guidelines.pdf', 'pdf', 'Ministry of Food Processing Industries', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'rkvy', 'RKV-001', 'rkvy', 'Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)', 'राष्ट्रीय कृषि विकास योजना (रफ्तार)', 13,
    'Central & State Governments (MoA&FW)', 'केंद्र एवं राज्य सरकारें', 'Grants up to ₹25 Lakh for agri-startups, farm infrastructure, and value-chain development.', 'कृषि स्टार्टअप्स और कृषि अवसंरचना के लिए ₹25 लाख तक का सरकारी अनुदान।',
    '["Idea stage grant: up to ₹5 Lakh (85% grant) for agripreneurship orientation.","Seed stage grant: up to ₹25 Lakh (85% grant) for market-ready agricultural innovations.","State-specific custom projects: cold chains, warehouses, veterinary clinics, post-harvest centers."]', '["Indian citizens, farmer groups, or registered startups addressing agricultural challenges."]', '["Aadhaar","Pitch Deck / DPR","Educational qualification proof","Bank details"]', '[{"step":1,"title":"Apply at Knowledge Partner Incubation Center","desc":"Submit application to RKVY incubation center (e.g., IARI Pusa, MANAGE, CCS HAU)."},{"step":2,"title":"Two-Month Mentorship","desc":"Complete 2 months residential/virtual incubation program with ₹10,000/month stipend."},{"step":3,"title":"Grant Disbursement","desc":"Present to Seed Support Committee for milestone-based fund release."}]',
    'https://rkvy.nic.in', 'https://rkvy.nic.in', '["marginal","small","medium","large"]', '["rkvy","raftaar","agri startup","incubation","infrastructure","krishi vikas","agri entrepreneur"]',
    'Grants up to ₹25 Lakhs for Agri-Entrepreneurs', 'Agri Innovation', 0, 999,
    'Farmers, agri-startups, youth innovators, and rural cooperatives', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'rkvy', 'RKVY-RAFTAAR Operational Guidelines', 'https://rkvy.nic.in/static/download/pdf/RKVY_RAFTAAR_Guidelines.pdf', 'pdf', 'Department of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pm-ddky', 'DDK-001', 'pm-ddky', 'PM Dhan-Dhaanya Krishi Yojana (PM-DDKY)', 'प्रधानमंत्री धन-धान्य कृषि योजना', 13,
    'Convergence Mission (MoA&FW & State Depts)', 'अभिसरण मिशन (कृषि मंत्रालय)', 'Intensive 100-district convergence scheme providing priority credit, irrigation, and storage.', '100 चयनित कृषि जिलों में प्राथमिकता आधारित ऋण, सिंचाई और भंडारण की योजना।',
    '["Bundled single-window access to KCC, PMKSY, Soil Health, and crop insurance.","Fast-track doorstep sanction through district special task forces.","Assistance for setting up primary processing clusters at village panchayat level."]', '["Residents of notified target districts owning agricultural land."]', '["Aadhaar","Land Records","Bank Passbook"]', '[{"step":1,"title":"District Camp Enrollment","desc":"Visit block-level convergence camps organized fortnightly."}]',
    'https://agriwelfare.gov.in', 'https://agricoop.nic.in', '["marginal","small","medium"]', '["dhan dhaanya","pm ddky","pulses self sufficiency","oilseeds incentive","crop diversification","dal utpadan"]',
    'Priority district fast-track subsidy', '100 District Focus', 0.1, 999,
    'Farmers in 100 low-productivity aspirational agricultural districts', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-ddky', 'PM Dhan-Dhaanya Krishi Guidelines & Pulses Incentive Framework', 'https://pib.gov.in/PressReleasePage.aspx?PRID=2028810', 'page', 'Ministry of Agriculture & Farmers Welfare', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'mgnrega-farm-pond', 'MGN-001', 'mgnrega-farm-pond', 'MGNREGA - Individual Farm Pond & Well Scheme', 'मनरेगा - व्यक्तिगत खेत तालाब एवं कुआं निर्माण', 13,
    'Ministry of Rural Development (MoRD)', 'ग्रामीण विकास मंत्रालय', '100% grant for constructing individual farm ponds (Khet Talab), open irrigation wells, and bunding.', 'खेत तालाब (खेत तलाई), सिंचाई कुआं और मेड़बंदी के लिए 100% सरकारी सहायता।',
    '["100% cost of labor and construction material funded by government (typical unit cost ₹1.5 Lakh to ₹3.5 Lakh).","Creates perennial on-farm water reservoir for critical crop irrigation during dry spells.","Improves ground water table and allows integrated fish farming in the pond."]', '["Must hold a valid MGNREGA Job Card in the household.","Small/Marginal farmer, SC/ST, Forest Rights Act beneficiary, or Women-headed household.","Must own land suitable for water harvesting structure."]', '["MGNREGA Job Card","Aadhaar Card","Land Ownership Documents (Khatauni / 7/12)","Gram Panchayat recommendation resolution"]', '[{"step":1,"title":"Submit Demand in Gram Sabha","desc":"Submit individual work demand to Gram Rozgar Sahayak (GRS) or Sarpanch during Gram Sabha."},{"step":2,"title":"Technical Sanction & Estimate","desc":"Junior Engineer (JE) visits farm, calculates dimensions, and prepares estimate."},{"step":3,"title":"Work Muster Roll Issuance","desc":"Muster roll issued. Farmer and family members work on their own land and receive weekly wages."},{"step":4,"title":"Material Payment","desc":"Lining/cement material payments credited directly via DBT to supplier and beneficiary."}]',
    'https://nrega.nic.in', NULL, '["marginal","small"]', '["mgnrega - individual farm pond & well scheme","rural development"]',
    '100% Grant (Labor + Material up to ₹3.5 Lakh)', '100% Centrally Funded', 0.2, 5,
    'Small and marginal farmers holding active MGNREGA Job Cards (Priority to SC/ST/Women/FRA)', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'mgnrega-farm-pond', 'MGNREGA - Individual Farm Pond & Well Scheme Official Overview', 'https://agriwelfare.gov.in/en/Major', 'page', 'Ministry of Rural Development (MoRD)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pmay-g', 'PMA-001', 'pmay-g', 'Pradhan Mantri Awaas Yojana – Gramin (PMAY-G)', 'प्रधानमंत्री आवास योजना – ग्रामीण', 13,
    'Ministry of Rural Development', 'ग्रामीण विकास मंत्रालय', 'Financial grant of ₹1.20 Lakh to ₹1.30 Lakh for construction of pucca house with toilet.', 'पक्का मकान बनाने के लिए ₹1.20 लाख से ₹1.30 लाख तक की प्रत्यक्ष सहायता।',
    '["Direct grant of ₹1,20,000 in plains and ₹1,30,000 in hilly/difficult/North-Eastern areas.","Additional 90-95 days of unskilled wage labor under MGNREGA (~₹25,000 extra).","₹12,000 assistance for toilet construction under Swachh Bharat Mission (SBM-G)."]', '["Families identified in SECC 2011 / Awaas+ list without pucca house."]', '["Aadhaar","Job Card","Bank Account Details","Land title / House site document"]', '[{"step":1,"title":"Check Name in Awaas+ List","desc":"Check priority ranking on pmayg.nic.in or at Panchayat office."},{"step":2,"title":"Geo-tagging of Kutcha House","desc":"Panchayat secretary clicks geo-tagged photo of existing kutcha house."},{"step":3,"title":"Instalment Release","desc":"Funds released in 3 instalments upon completion of foundation, lintel, and roof."}]',
    'https://pmayg.nic.in', 'https://awaassoft.nic.in', '["marginal","small"]', '["pmay g","rural housing","farmer house","pucca house","awaas yojana","gramin awas","makan anudan"]',
    '₹1,20,000 - ₹1,30,000 Direct Grant', 'Rural Housing', 0, 2,
    'Homeless and households living in kutcha/dilapidated houses in rural areas', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pmay-g', 'Pradhan Mantri Awaas Yojana - Gramin Framework for Implementation', 'https://pmayg.nic.in/netiay/PMAY-G_Framework_for_Implementation.pdf', 'pdf', 'Ministry of Rural Development', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'atma', 'ATM-001', 'atma', 'Agricultural Technology Management Agency (ATMA)', 'कृषि प्रौद्योगिकी प्रबंधन अभिकरण (आत्मा)', 14,
    'Central & State Governments (Extension Division)', 'केंद्र एवं राज्य सरकारें', 'Free hands-on training, exposure visits, demonstrations, and progressive farmer awards.', 'निःशुल्क तकनीकी प्रशिक्षण, अन्य राज्यों में भ्रमण, प्रदर्शन और पुरस्कार।',
    '["Free 3 to 5 day practical training courses in modern agronomy, integrated pest management, and horticulture.","100% sponsored inter-district and inter-state exposure tours to premier agri universities (IARI, PAU, GBPUAT).","Demonstration plot subsidy up to ₹5,000 per demo on the farmer\'s own field.","District Progressive Farmer Awards of ₹25,000 to ₹50,000."]', '["Any practicing farmer interested in upgrading farming practices."]', '["Aadhaar Card","Bank Account Details","Farmer Interest Group (FIG) membership (optional)"]', '[{"step":1,"title":"Contact Block Technology Manager","desc":"Visit Block Development Office and meet the ATMA Block Technology Manager (BTM)."},{"step":2,"title":"Select Training Course","desc":"Enroll in upcoming seasonal calendar for training, demonstration, or interstate exposure."}]',
    'https://agricoop.nic.in', 'https://extensionreforms.da.gov.in', '["marginal","small","medium","large"]', '["atma","farmer training","exposure visit","farmer school","kisan sangh","krishi prashikshan","extension reforms"]',
    '100% Free Training & Inter-State Exposure', 'Free Skill Training', 0, 999,
    'All practicing farmers, women food security groups (FSGs), and farm youth', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'atma', 'ATMA Guidelines for Support to State Extension Programmes', 'https://agricoop.nic.in/sites/default/files/ATMA_Guidelines_2018.pdf', 'pdf', 'Directorate of Extension / MoA&FW', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'kvk', 'KVK-001', 'kvk', 'Krishi Vigyan Kendra (KVK) Skill & Frontline Demos', 'कृषि विज्ञान केंद्र (केवीके) कौशल कार्यक्रम', 14,
    'Indian Council of Agricultural Research (ICAR)', 'भारतीय कृषि अनुसंधान परिषद', 'District-level frontline crop demonstrations, quality seed distribution, and certified vocational training.', 'प्रत्येक जिले में वैज्ञानिक खेती प्रशिक्षण, उन्नत बीज वितरण एवं निःशुल्क मार्गदर्शन।',
    '["Frontline demonstrations of newly released climate-resilient crop varieties on farmer fields.","Availability of certified breeder and foundation seeds, bio-pesticides, and poultry chicks at subsidized cost.","Free soil, water, and plant disease testing clinic."]', '["Open to all farmers in the district."]', '["Aadhaar","Land Record"]', '[{"step":1,"title":"Visit District KVK Campus","desc":"Walk in to your district KVK or check training schedule on kvk.icar.gov.in."}]',
    'https://kvk.icar.gov.in', NULL, '["marginal","small","medium","large"]', '["krishi vigyan kendra (kvk) skill & frontline demos","education & skilling"]',
    'Certified Training & Seed Subsidies', 'ICAR Certified', 0, 999,
    'Farmers in all 730+ districts across India', 'September 2026', 'https://agriwelfare.gov.in/en/Major', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'kvk', 'Krishi Vigyan Kendra (KVK) Skill & Frontline Demos Official Overview', 'https://agriwelfare.gov.in/en/Major', 'page', 'Indian Council of Agricultural Research (ICAR)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'day-nrlm-mksp', 'DAY-001', 'day-nrlm-mksp', 'DAY-NRLM (Mahila Kisan Sashaktikaran Pariyojana)', 'दीनदयाल अंत्योदय - महिला किसान सशक्तिकरण', 15,
    'Ministry of Rural Development', 'ग्रामीण विकास मंत्रालय', 'Dedicated credit and sustainable agriculture support for women farmers and SHG federations.', 'महिला किसानों और स्वयं सहायता समूहों के लिए रियायती ऋण और कृषि उपकरण बैंक।',
    '["Revolving fund of ₹15,000 to ₹20,000 and Community Investment Fund (CIF) up to ₹1.5 Lakh per SHG.","Subsidized bank loan linkage at 7% interest (further reduced to 4% with prompt repayment).","Establishment of Custom Hiring Centres managed exclusively by women farmers."]', '["Women farmers belonging to active SHGs under DAY-NRLM."]', '["Aadhaar Card","SHG Passbook","Bank Account Details"]', '[{"step":1,"title":"Join Village SHG","desc":"Connect with Village Organization (VO) or Cluster Level Federation (CLF)."},{"step":2,"title":"Micro-Credit Plan (MCP)","desc":"Prepare farm investment plan with help of Krishi Sakhi and receive loan."}]',
    'https://nrlm.gov.in', 'https://aajeevika.gov.in', '["marginal","small"]', '["mahila kisan","mksp","day nrlm","women farmer","shg group","livelihoods","aajeevika","swayam sahayata samooh"]',
    'Revolving Fund & Capital Subsidy for Women SHGs', 'Women Empowerment', 0, 2,
    'Smallholder women farmers organized in SHGs', 'September 2026', 'https://pib.gov.in/PressReleaseIframePage.aspx?PRID=2002012', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'day-nrlm-mksp', 'Mahila Kisan Sashaktikaran Pariyojana (MKSP) Guidelines', 'https://aajeevika.gov.in/sites/default/files/mksp_guidelines.pdf', 'pdf', 'Ministry of Rural Development (MoRD)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'itc-sunehra-kal', 'NGO-001', 'itc-sunehra-kal', 'ITC Mission Sunehra Kal (Agri CSR Program)', 'आईटीसी मिशन सुनहरा कल (कृषि सीएसआर)', 16,
    'ITC Limited Corporate Social Responsibility', 'आईटीसी लिमिटेड सीएसआर', 'Water stewardship, climate-smart agriculture, and assured buyback for wheat and soya farmers.', 'जलवायु अनुकूल कृषि, जल संचयन एवं गेहूं व सोयाबीन किसानों को सुनिश्चित बाजार।',
    '["Assistance in zero-tillage sowing, laser land levelling, and micro-irrigation layout.","Free village watershed construction: stop-dams, check-dams, and contour trenches.","Direct procurement of wheat, soybean, and chili at competitive market price through ITC e-Choupal centers."]', '["Farmers situated in ITC intervention catchment districts."]', '["Aadhaar Card","Land Record","Bank Passbook"]', '[{"step":1,"title":"Connect with Sanyojak / e-Choupal","desc":"Visit your village ITC e-Choupal lead farmer (Sanyojak)."},{"step":2,"title":"Enroll in Climate Smart Village Program","desc":"Register for free input advisory and demonstration package."}]',
    'https://www.itcportal.com/sustainability/mission-sunehra-kal.aspx', NULL, '["marginal","small","medium","large"]', '["itc mission sunehra kal (agri csr program)","ngo & private csr"]',
    '100% Free Agri-Extension & Market Tie-up', 'Verified CSR Initiative', 0.1, 999,
    'Farmers in 17+ states (MP, AP, Telangana, Maharashtra, Rajasthan, Karnataka)', 'September 2026', 'https://www.itcportal.com', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'itc-sunehra-kal', 'ITC Mission Sunehra Kal (Agri CSR Program) Official Overview', 'https://www.itcportal.com', 'page', 'ITC Limited Corporate Social Responsibility', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'tata-trusts-lakhpati', 'NGO-002', 'tata-trusts-lakhpati', 'Tata Trusts - Lakhpati Kisan Initiative', 'टाटा ट्रस्ट्स - लखपति किसान पहल', 16,
    'Tata Trusts / Collectives for Integrated Livelihood Initiatives (CInI)', 'टाटा ट्रस्ट्स (सीआईएनआई)', 'Multi-layered farming and gravity-flow irrigation transforming small tribal farmers into ₹1 Lakh+ earners.', 'बहुस्तरीय खेती और सिंचाई से छोटे व सीमांत किसानों की आय ₹1 लाख+ करने की पहल।',
    '["Grant support for solar micro-lift irrigation schemes and drip systems.","High-value vegetable cultivation (capsicum, tomato, bitter gourd, watermelon) on small plots.","FPO formation providing quality inputs at wholesale rates and collective marketing."]', '["Marginal and small tribal or backward community households."]', '["Aadhaar","Land Records","Ration Card"]', '[{"step":1,"title":"Community Mobilization","desc":"Contact local CInI / Tata Trusts field team in your block."},{"step":2,"title":"Family Livelihood Plan","desc":"Create a 3-year multi-cropping roadmap and receive technical and input support."}]',
    'https://www.tatatrusts.org', NULL, '["marginal","small"]', '["tata trusts - lakhpati kisan initiative","ngo & private csr"]',
    'Comprehensive Livelihood Grant & Infrastructure', 'Verified NGO Initiative', 0.2, 2,
    'Small and marginal tribal farmers in Jharkhand, Odisha, Gujarat, and Maharashtra', 'September 2026', 'https://www.tatatrusts.org', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'tata-trusts-lakhpati', 'Tata Trusts - Lakhpati Kisan Initiative Official Overview', 'https://www.tatatrusts.org', 'page', 'Tata Trusts / Collectives for Integrated Livelihood Initiatives (CInI)', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'baif-wadi', 'NGO-003', 'baif-wadi', 'BAIF Development Research Foundation - Wadi Agro-Forestry', 'बाइफ (BAIF) - वाडी कृषि-वानिकी मॉडल', 16,
    'BAIF & NABARD Tribal Development Fund', 'बाइफ रिसर्च फाउंडेशन एवं नाबार्ड', 'One-acre orchard model (Mango & Cashew) with soil conservation for wasteland revival.', 'बंजर जमीन पर 1 एकड़ आम व काजू बागवानी (वाडी) मॉडल हेतु संपूर्ण सहायता।',
    '["Free supply of 40-60 grafted fruit plants (Mango, Cashew, Aonla, Guava) per acre.","Funding for fencing, trenching, water storage structure, and drip irrigation.","Provides sustained yearly income of ₹50,000 to ₹1,50,000 for 30+ years."]', '["Small/Marginal landholders in BAIF operational talukas."]', '["Aadhaar","Land Title Deed / Forest Rights Title"]', '[{"step":1,"title":"Contact BAIF Field Officer","desc":"BAIF field officer surveys degraded land parcel."},{"step":2,"title":"Plantation & 5-Year Maintenance","desc":"Establish pit digging, manure, plantation, and maintenance under technical supervision."}]',
    'https://baif.org.in', NULL, '["marginal","small"]', '["baif","wadi","agro forestry","mango orchard","cashew plantation","tribal farm development","baif foundation"]',
    'Full 7-Year Plant & Irrigation Grant', 'Agro-Forestry Model', 0.5, 2,
    'Tribal and marginal farmers with degraded or undulating land', 'September 2026', 'https://baif.org.in', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'baif-wadi', 'BAIF Wadi Agro-Horti-Forestry Model Guidelines', 'https://baif.org.in/wadi-programme', 'page', 'BAIF Development Research Foundation', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'reliance-water', 'NGO-004', 'reliance-water', 'Reliance Foundation - Bharat India Jodo (BIJ) Agri Program', 'रिलायंस फाउंडेशन - भारत इंडिया जोड़ो कृषि कार्यक्रम', 16,
    'Reliance Foundation', 'रिलायंस फाउंडेशन', 'Toll-free voice advisory, weather alerts, and farm pond water security for marginalized farmers.', 'टोल-फ्री फोन परामर्श, मौसम अलर्ट और खेत तालाब निर्माण में सहायता।',
    '["Direct line to agri-scientists via 1800 419 8800 for instant diagnosis of crop pests and diseases.","Subsidized machinery rental and community check dam construction in drought-prone taluks.","Real-time WhatsApp crop alerts and market price updates."]', '["Open to all Indian farmers."]', '["Mobile Number"]', '[{"step":1,"title":"Call Toll-Free Number","desc":"Dial 1800-419-8800 between 9:30 AM and 6:00 PM for free voice consultation."}]',
    'https://www.reliancefoundation.org', NULL, '["marginal","small","medium","large"]', '["reliance foundation - bharat india jodo (bij) agri program","ngo & private csr"]',
    'Free Toll-Free (1800 419 8800) Advisory & Ponds', 'CSR Advisory & Water', 0, 999,
    'Farmers and fishers across India', 'September 2026', 'https://www.reliancefoundation.org', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'reliance-water', 'Reliance Foundation - Bharat India Jodo (BIJ) Agri Program Official Overview', 'https://www.reliancefoundation.org', 'page', 'Reliance Foundation', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'wotr-resilient', 'NGO-005', 'wotr-resilient', 'Watershed Organisation Trust (WOTR) Climate Resilient Agri', 'वाटरशेड ऑर्गनाइजेशन ट्रस्ट (WOTR) जलवायु अनुकूल खेती', 16,
    'WOTR Non-Profit Organization', 'WOTR संस्था', 'Community watershed development, soil rejuvenation, and agro-meteorological advisories.', 'सामुदायिक वाटरशेड विकास, मृदा पुनर्जीवन एवं सटीक मौसम पूर्वानुमान।',
    '["Community watershed treatment: continuous contour trenches, earthen bunds, and check dams.","Automated weather station installations providing hyper-local 3-day weather forecasts.","Farm-level soil carbon enrichment techniques."]', '["Villages agreeing to participatory watershed management."]', '["Panchayat resolution","Aadhaar"]', '[{"step":1,"title":"Village Watershed Committee","desc":"Form Village Development Committee (VDC) with WOTR facilitators."}]',
    'https://wotr.org', NULL, '["marginal","small","medium"]', '["watershed organisation trust (wotr) climate resilient agri","ngo & private csr"]',
    'Community Watershed Grants', 'Climate Resilience', 0.1, 5,
    'Rainfed farming communities in Maharashtra, MP, Rajasthan, Jharkhand', 'September 2026', 'https://wotr.org', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'wotr-resilient', 'Watershed Organisation Trust (WOTR) Climate Resilient Agri Official Overview', 'https://wotr.org', 'page', 'WOTR Non-Profit Organization', '2024'
      );
INSERT INTO schemes (
    id, code, slug, name_en, name_hi, category_id, issuing_body, issuing_body_hi,
    summary_en, summary_hi, benefits, eligibility, documents_required, steps,
    official_url, apply_url, tags, keywords, subsidy_highlight, badge,
    min_land_hectares, max_land_hectares, target_beneficiary, last_verified_date, source_url, is_active
  ) VALUES (
    'pm-pranam', 'PRN-001', 'pm-pranam', 'PM-PRANAM (Promotion of Alternate Nutrients for Agriculture Management)', 'पीएम-प्रणाम (रासायनिक उर्वरक विकल्प एवं संतुलित पोषण योजना)', 6,
    'Central Government (Department of Fertilizers / MoA&FW)', 'केंद्र सरकार (उर्वरक विभाग एवं कृषि मंत्रालय)', 'Incentivizing states and farmers to adopt bio-fertilizers and reduce chemical fertilizer dependence.', 'जैव उर्वरकों को अपनाने और रासायनिक खादों पर निर्भरता कम करने के लिए प्रोत्साहन।',
    '["50% of the subsidy savings achieved by reducing chemical fertilizer (Urea/DAP) passed on to States as grants.","70% of grant allocated for village-level bio-fertilizer and compost infrastructure creation.","Subsidized distribution of Nano-Urea, Nano-DAP, and bio-decomposers to participating farmers."]', '["All farmers practicing balanced fertilizer use or transitioning to bio/organic nutrients.","Gram Panchayats adopting community vermi-compost and bio-fertilizer units.","FPOs and SHGs engaged in alternate nutrient production."]', '["Aadhaar Card","Soil Health Card or Land Record Extract","Active Bank Account Passbook","Gram Panchayat / Block Agriculture Officer Endorsement"]', '[{"step":1,"title":"Soil Nutrient Assessment","desc":"Obtain Soil Health Card recommendation from your local Agriculture Extension Officer or KVK."},{"step":2,"title":"Register with Gram Panchayat / FPO","desc":"Enroll in the village alternate nutrient cluster managed under the State Agriculture Directorate."},{"step":3,"title":"Adopt Nano & Bio Inputs","desc":"Procure subsidized Nano Urea / Nano DAP from PACS or registered cooperatives."},{"step":4,"title":"Incentive Disbursal","desc":"Panchayats and farmer clusters achieving target fertilizer reduction receive infrastructure assistance."}]',
    'https://www.fert.nic.in', NULL, '["marginal","small","medium","large"]', '["pm pranam","nano urea","chemical fertilizer reduction","bio fertilizer","pranam scheme","organic nutrient","fert.nic.in","soil nutrients"]',
    '50% Fertilizer Subsidy Savings Sharing', 'Eco Agriculture', 0, 999,
    'Farmers and Gram Panchayats promoting bio-organic nutrient balance', 'September 2026', 'https://pib.gov.in/PressReleasePage.aspx?PRID=1935876', 1
  );
INSERT INTO scheme_documents (scheme_id, title, url, doc_type, source_name, year) VALUES (
        'pm-pranam', 'PM-PRANAM Cabinet Approval & Operational Framework', 'https://pib.gov.in/PressReleasePage.aspx?PRID=1935876', 'page', 'Cabinet Committee on Economic Affairs (CCEA) / PIB', '2024'
      );
-- Seed Admin User
INSERT INTO users (id, full_name, email, mobile, password_hash, role, preferred_language, is_active, email_verified) VALUES (
  1, 'KrishiSetu Admin', 'admin@krishisetu.in', '9876543210', '$2b$10$dDDeQFm5Px41CevAD.zxTOMvJ9NC4YTtHSBufy.nzhQC2ADSE.Zdi', 'ADMIN', 'en', 1, 1
);
-- Seed Demo Farmer User (Ramesh Patel)
INSERT INTO users (id, full_name, email, mobile, password_hash, role, preferred_language, is_active, email_verified) VALUES (
  2, 'Ramesh Patel', 'farmer@krishisetu.in', '9876543211', '$2b$10$mL/8FJpjLVtsOUmM3NTXN.pE0GeTQJptAlvNJ2DbwF.JUyHhDC7W.', 'FARMER', 'hi', 1, 1
);
INSERT INTO user_profiles (user_id, state, district, land_size_acres, farmer_category, primary_crops, annual_income_band, gender, social_category, is_fpo_member, avatar_url) VALUES (
  2, 'Madhya Pradesh', 'Ujjain', 2.50, 'Small Farmer', 'Wheat, Soybean, Gram', 'below_2lakh', 'Male', 'OBC', 1, 'RP'
);
-- Demo Farmer Bookmarks
INSERT INTO saved_schemes (user_id, scheme_id) VALUES (2, 'pm-kisan'), (2, 'pmfby'), (2, 'kcc');
-- Demo Farmer Kanban Application Progress
INSERT INTO application_progress (user_id, scheme_id, status, notes) VALUES
  (2, 'pm-kisan', 'APPROVED', 'Received 17th installment. Aadhaar eKYC fully verified.'),
  (2, 'pmfby', 'APPLIED', 'Application submitted for Kharif Soybean crop insurance. Policy doc pending.'),
  (2, 'kcc', 'DOCUMENTS_PENDING', 'Aadhaar and Khasra copies gathered. Bank land valuation pending.'),
  (2, 'pmksy', 'NOT_STARTED', 'Evaluating drip irrigation setup for 2.5 acres.');