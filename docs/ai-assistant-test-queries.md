# Krishi Mitra AI Assistant — Evaluation & Test Query Suite

This document records the 45 test queries used to verify grounded retrieval, intent detection, domain cluster matching, and multi-turn context retention in **Krishi Mitra (कृषि मित्र)** across English and Hindi.

## Methodology & Success Criteria
1. **Zero Hallucination:** Every response cites specific scheme codes, subsidies, and documents strictly from `SCHEMES_DATA` or database records.
2. **Intent Accuracy:** Questions about documents return document checklists; procedures return chronological steps; eligibility returns land limits and target groups.
3. **Bilingual Fidelity:** Hindi queries receive Hindi responses; English queries receive English responses.
4. **Actionable Links:** Every scheme inquiry provides a direct link to the scheme modal (`openSchemeDetail`) and authentic portal.

---

### Category 1: Natural Language Discovery (Irrigation & Water)
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 1 | I am a farmer who wants a scheme for irrigation | EN | PMKSY (Per Drop More Crop) | PASS |
| 2 | mujhe drip irrigation par subsidy chahiye | HI | PMKSY (प्रति बूंद अधिक फसल) | PASS |
| 3 | sprinkler lagane ke liye kitna anudan milta hai? | HI | PMKSY | PASS |
| 4 | Can I get water pump subsidy for my small farm? | EN | PMKSY / PM-KUSUM | PASS |
| 5 | खेत में बोरवेल या तालाब बनवाने की योजना | HI | MGNREGA Farm Pond / PMKSY | PASS |

### Category 2: Solar Energy & Renewable Pumps
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 6 | solar pump lagwana hai kitna subsidy milega | HI | PM-KUSUM (60% Subsidy) | PASS |
| 7 | PM KUSUM solar pump scheme details | EN | PM-KUSUM Component B | PASS |
| 8 | Can I sell solar power back to the grid as a farmer? | EN | PM-KUSUM Component A | PASS |
| 9 | सौर ऊर्जा कृषि पम्प योजना 3HP या 5HP | HI | PM-KUSUM | PASS |

### Category 3: Crop Insurance & Disaster Protection
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 10 | My crops were destroyed by unseasonal rain. Which scheme protects me? | EN | PMFBY (Pradhan Mantri Fasal Bima Yojana) | PASS |
| 11 | fasal bima yojana me kitna premium dena hota hai | HI | PMFBY (1.5% Rabi, 2% Kharif, 5% Commercial) | PASS |
| 12 | What is the deadline to report crop loss under PMFBY? | EN | PMFBY (Within 72 Hours) | PASS |
| 13 | सूखा पड़ने पर मुआवजा किस योजना से मिलता है | HI | PMFBY / State Disaster Relief | PASS |

### Category 4: Direct Cash Income & Pensions
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 14 | When is the next 2000 rupee installment of PM Kisan? | EN | PM-KISAN (₹6,000 in 3 installments) | PASS |
| 15 | pm kisan samman nidhi patrata aur niyam | HI | PM-KISAN | PASS |
| 16 | Farmer pension scheme for 60 years old | EN | PM-KMY (Pradhan Mantri Kisan Maan-Dhan) | PASS |
| 17 | 60 वर्ष के बाद 3000 रुपये मासिक पेंशन | HI | PM-KMY | PASS |

### Category 5: Farm Credit & Low-Interest Loans
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 18 | What is the interest rate on Kisan Credit Card loan? | EN | KCC (4% effective with prompt repayment) | PASS |
| 19 | kcc loan lene ke liye jameen ke kya kagaz lagenge | HI | KCC (भू-अभिलेख खसरा/खतौनी, आधार, बैंक पासबुक) | PASS |
| 20 | Collateral-free farm loan limit | EN | KCC (Up to ₹1.60 Lakh without collateral) | PASS |
| 21 | पशुपालन या मछली पालन के लिए केसीसी | HI | KCC for Animal Husbandry & Fisheries | PASS |

### Category 6: Farm Mechanization & Drones
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 22 | tractor par subsidy kaise milti hai | HI | SMAM (कृषि यंत्रीकरण उप-मिशन) | PASS |
| 23 | Drone Didi scheme subsidy and training | EN | Namo Drone Didi (80% up to ₹8 Lakhs) | PASS |
| 24 | Sub-Mission on Agricultural Mechanization smam guidelines | EN | SMAM | PASS |
| 25 | महिला स्वयं सहायता समूह के लिए ड्रोन योजना | HI | Namo Drone Didi | PASS |

### Category 7: Organic & Natural Farming
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 26 | जैविक खेती करने के लिए सरकारी सहायता | HI | PKVY (परम्परागत कृषि विकास योजना) | PASS |
| 27 | Financial support for organic certification and bio-fertilizer | EN | PKVY (₹50,000/ha for 3 years) | PASS |
| 28 | Zero budget natural farming subsidies | EN | BPKP / PKVY | PASS |

### Category 8: Horticulture, Vegetables & Fruits
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 29 | फल और सब्जी उगाने के लिए पॉलीहाउस सब्सिडी | HI | MIDH (एकीकृत बागवानी विकास मिशन) | PASS |
| 30 | Mission for Integrated Development of Horticulture subsidy rates | EN | MIDH | PASS |
| 31 | कोल्ड स्टोरेज या पैक हाउस बनवाने हेतु अनुदान | HI | MIDH / AIF | PASS |

### Category 9: Dairy & Animal Husbandry
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 32 | dairy farming shuru karne ke liye scheme | HI | Rashtriya Gokul Mission / AHIDF | PASS |
| 33 | Breed improvement and artificial insemination for cattle | EN | Rashtriya Gokul Mission | PASS |
| 34 | गाय और भैंस खरीदने के लिए लोन व अनुदान | HI | Rashtriya Gokul Mission | PASS |

### Category 10: Fisheries & Aquaculture
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 35 | fish farming pond subsidy Pradhan Mantri Matsya Sampada | EN | PMMSY | PASS |
| 36 | मछली पालन के लिए तालाब खुदवाने पर कितना पैसा मिलता है | HI | PMMSY (40% General, 60% SC/ST/Women) | PASS |

### Category 11: Document Checklists & Procedures
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 37 | What documents are required for PM-KISAN registration? | EN | PM-KISAN (Aadhaar, Land Khasra, Bank passbook) | PASS |
| 38 | fasal bima ke liye kaunse dastavez chahiye | HI | PMFBY (Sowing certificate, Land records, passbook) | PASS |
| 39 | Step by step procedure to apply for PM-KUSUM | EN | PM-KUSUM (State nodal portal registration) | PASS |

### Category 12: Application Pipeline & Out of Scope
| # | Test Query | Language | Expected Matched Scheme | Result |
|---|------------|----------|-------------------------|--------|
| 40 | Check my saved schemes progress | EN | User Pipeline (Kanban Statuses) | PASS |
| 41 | mere saved schemes ki sthiti batao | HI | User Pipeline (Kanban Statuses) | PASS |
| 42 | What is the weather in Delhi tomorrow? | EN | Polite out-of-scope decline | PASS |
| 43 | aaj ka sone ka bhav kya hai | HI | Polite out-of-scope decline | PASS |
| 44 | Hi Krishi Mitra! | EN | Friendly grounded greeting | PASS |
| 45 | namaste | HI | Friendly grounded greeting | PASS |

---

## Test Execution Summary
- **Total Test Cases:** 45
- **Direct Domain Passes:** 45/45 (100%)
- **Anti-Hallucination Verified:** Yes (Out-of-scope queries politely declined; only verified records cited)
- **Official Citation Attached:** All substantive answers end with `Source: KrishiSetu Verified Scheme Database`
