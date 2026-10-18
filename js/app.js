/**
 * KrishiSetu - Main Application Logic & User Flows
 * State management, scheme catalog rendering, search & filtering,
 * compare tool, multi-step eligibility wizard, dashboard kanban,
 * text-to-speech, printable document checklists, and bilingual engine.
 */

// Global Application State
const AppState = {
  currentLang: localStorage.getItem('krishi_lang') || 'en',
  activeCategory: 'all',
  searchQuery: '',
  authorityFilter: 'all',
  sortBy: 'relevant',
  savedSchemeIds: JSON.parse(localStorage.getItem('krishi_saved_schemes') || '["pm-kisan", "pmfby", "kcc"]'),
  compareSchemeIds: [],
  userProfile: JSON.parse(localStorage.getItem('krishi_user') || JSON.stringify({
    name: "Ramesh Patel",
    nameHi: "रमेश पटेल",
    category: "Small Farmer (2.5 Acres)",
    categoryHi: "लघु किसान (2.5 एकड़)",
    state: "Madhya Pradesh",
    district: "Ujjain",
    isLoggedIn: true
  })),
  // Application Kanban tracker states: 'not_started', 'docs_pending', 'applied', 'approved'
  applicationTracker: JSON.parse(localStorage.getItem('krishi_tracker') || JSON.stringify({
    "pm-kisan": "approved",
    "pmfby": "applied",
    "kcc": "docs_pending",
    "pmksy": "not_started"
  }))
};

// UI Translations Dictionary for English <-> Hindi
const TRANSLATIONS = {
  en: {
    appTitle: "KrishiSetu",
    topBarTitle: "National Agricultural Welfare Information & Application Guidance Platform",
    topBarVerified: "🛡️ Verified Data · Updated September 2026",
    sideNavHeader: "Platform Navigation",
    navHome: "Home",
    navCatalog: "Explore Schemes",
    navEligibility: "Eligibility Checker",
    navDashboard: "My Dashboard",
    navCompare: "Compare Schemes",
    navLocator: "KVK / CSC Locator",
    heroTitle: "Find & Apply For Every Agricultural Scheme In One Place.",
    heroSubtitle: "Stop searching across dozens of broken portals. Discover verified central, state, and NGO welfare subsidies with step-by-step application guidance.",
    searchPlaceholder: "Search by scheme name, crop, subsidy, or topic (e.g., drip, KCC, tractor)...",
    statSchemes: "Verified Schemes",
    statSubsidies: "Max Subsidy Support",
    statStates: "States Covered",
    statFarmers: "Empowered Farmers",
    quickCheckTitle: "Quick Eligibility Check",
    allCategories: "All Categories",
    filterAuthority: "Issuing Authority",
    filterAllAuth: "All Authorities",
    filterCentral: "Central Government",
    filterState: "State Governments",
    filterNgo: "NGO & CSR Programs",
    sortLabel: "Sort By",
    sortRelevant: "Most Relevant",
    sortSubsidy: "Highest Subsidy",
    sortClosing: "Closing Soon",
    viewDetails: "View Guidance & Steps",
    readAloud: "Read Scheme Aloud",
    stopReading: "Stop Audio",
    applyOfficial: "Apply on Official Portal",
    downloadChecklist: "Print / Download Document Checklist",
    askAiAboutThis: "Ask AI About This Scheme",
    savedAlert: "Scheme saved to your Dashboard!",
    removedAlert: "Scheme removed from bookmarks.",
    compareMaxAlert: "You can compare up to 3 schemes at a time.",
    compareBtn: "Compare Schemes Now",
    exploreAllBtn: "Explore All 36+ Verified Schemes →",
    checkEligibilityBtn: "Check Eligibility"
  },
  hi: {
    appTitle: "कृषि सेतु",
    topBarTitle: "राष्ट्रीय कृषि कल्याण सूचना एवं आवेदन मार्गदर्शन मंच",
    topBarVerified: "🛡️ सत्यापित डेटा · अपडेटेड सितंबर 2026",
    sideNavHeader: "मंच नेविगेशन",
    navHome: "होम",
    navCatalog: "योजनाएं खोजें",
    navEligibility: "पात्रता जांचें",
    navDashboard: "मेरा डैशबोर्ड",
    navCompare: "योजना तुलना",
    navLocator: "केवीके / सीएससी केंद्र",
    heroTitle: "सभी सरकारी व एनजीओ कृषि योजनाएं अब एक ही स्थान पर।",
    heroSubtitle: "अलग-अलग वेबसाइटों पर भटकना बंद करें। चरण-दर-चरण आवेदन मार्गदर्शन के साथ सत्यापित सरकारी व सीएसआर अनुदान खोजें।",
    searchPlaceholder: "योजना का नाम, फसल, सब्सिडी या विषय खोजें (जैसे पीएम-किसान, ड्रिप, केसीसी, ट्रैक्टर)...",
    statSchemes: "सत्यापित योजनाएं",
    statSubsidies: "अधिकतम सब्सिडी",
    statStates: "सभी राज्य कवर्ड",
    statFarmers: "लाभान्वित किसान",
    quickCheckTitle: "त्वरित पात्रता जांच",
    allCategories: "सभी श्रेणियां",
    filterAuthority: "जारीकर्ता संस्था",
    filterAllAuth: "सभी संस्थाएं",
    filterCentral: "केंद्र सरकार",
    filterState: "राज्य सरकारें",
    filterNgo: "एनजीओ एवं सीएसआर",
    sortLabel: "क्रमबद्ध करें",
    sortRelevant: "सबसे प्रासंगिक",
    sortSubsidy: "अधिकतम सब्सिडी",
    sortClosing: "समाप्ति शीघ्र",
    viewDetails: "मार्गदर्शन व चरण देखें",
    readAloud: "योजना विवरण सुनें",
    stopReading: "ऑडियो रोकें",
    applyOfficial: "आधिकारिक पोर्टल पर आवेदन करें",
    downloadChecklist: "दस्तावेज़ चेकलिस्ट प्रिंट करें",
    askAiAboutThis: "इस योजना पर AI से पूछें",
    savedAlert: "योजना आपके डैशबोर्ड में सहेज ली गई!",
    removedAlert: "योजना बुकमार्क से हटा दी गई।",
    compareMaxAlert: "आप एक समय में अधिकतम 3 योजनाओं की तुलना कर सकते हैं।",
    compareBtn: "योजनाओं की तुलना करें",
    exploreAllBtn: "सभी 36+ सत्यापित योजनाएं देखें →",
    checkEligibilityBtn: "पात्रता जांचें"
  }
};

// Current SpeechSynthesis utterance reference
let currentSpeechUtterance = null;

// DOM Initialization
document.addEventListener("DOMContentLoaded", async () => {
  handleLegacyDeepLinks();
  highlightActiveSideNav();
  initHamburgerMenu();
  initAuthNav();
  await syncUserDataIfLoggedIn();
  initLanguage();
  renderCategoryChips();
  renderSchemesCatalog();
  renderHeroStats();
  renderCSCLocations();
  initCompareStickyBar();
  initComparePage();
  initEventListeners();
  updateSavedBadgeCount();
  renderDashboardKanban();
});

// Hamburger Drawer Navigation Controller
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const sideNav = document.getElementById('sideNavPanel');
  const overlay = document.getElementById('navOverlay');
  if (!hamburgerBtn || !sideNav) return;

  function openMenu() {
    sideNav.classList.add('open');
    if (overlay) overlay.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = sideNav.querySelector('.side-nav-item a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    sideNav.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = sideNav.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideNav.classList.contains('open')) {
      closeMenu();
      hamburgerBtn.focus();
    }
  });

  sideNav.querySelectorAll('.side-nav-item a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

// Auth State & Nav Controller
function initAuthNav() {
  const loginBtn = document.getElementById('navLoginBtn');
  const profileChip = document.getElementById('navProfileChip');
  const profileDropdown = document.getElementById('profileDropdown');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (typeof KrishiApi !== 'undefined' && KrishiApi.isLoggedIn()) {
    const user = KrishiApi.getCurrentUser();
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileChip) {
      profileChip.style.display = 'flex';
      const avatar = document.getElementById('profileAvatar');
      const name = document.getElementById('profileName');
      const displayName = user.name || user.fullName || 'Farmer';
      if (avatar) avatar.textContent = displayName.charAt(0).toUpperCase();
      if (name) name.textContent = displayName;
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (profileChip) profileChip.style.display = 'none';
  }
  
  const chipBtn = document.getElementById('profileChipBtn');
  if (chipBtn && profileDropdown) {
    chipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('active');
    });
    document.addEventListener('click', () => {
      profileDropdown.classList.remove('active');
    });
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (typeof KrishiApi !== 'undefined') {
        await KrishiApi.logout();
      }
      window.location.href = 'index.html';
    });
  }
}

// Synchronize Saved Schemes & Progress when logged in
async function syncUserDataIfLoggedIn() {
  if (typeof KrishiApi === 'undefined' || !KrishiApi.isLoggedIn()) return;
  try {
    const savedIds = await KrishiApi.getSavedSchemes();
    if (Array.isArray(savedIds) && savedIds.length > 0) {
      AppState.savedSchemeIds = savedIds;
      localStorage.setItem('krishi_saved_schemes', JSON.stringify(savedIds));
    }
    const progressList = await KrishiApi.getProgress();
    if (Array.isArray(progressList)) {
      progressList.forEach(item => {
        if (item.schemeId && item.status) {
          AppState.applicationTracker[item.schemeId] = item.status;
        }
      });
      localStorage.setItem('krishi_tracker', JSON.stringify(AppState.applicationTracker));
    }
  } catch (err) {
    console.warn('Could not sync user data with backend:', err);
  }
}

// Initialize Language
function initLanguage() {
  const lang = AppState.currentLang;
  document.body.classList.toggle("lang-hi", lang === 'hi');
  const langToggleBtn = document.getElementById("langToggleBtn");
  if (langToggleBtn) {
    langToggleBtn.innerHTML = lang === 'en' 
      ? `<span>🌐 English</span> <span class="lang-active-tag">EN</span>`
      : `<span>🌐 हिन्दी</span> <span class="lang-active-tag">HI</span>`;
  }
  applyTranslations();
}

function toggleLanguage() {
  AppState.currentLang = AppState.currentLang === 'en' ? 'hi' : 'en';
  localStorage.setItem('krishi_lang', AppState.currentLang);
  initLanguage();
  renderCategoryChips();
  renderSchemesCatalog();
  renderDashboardKanban();
}

function applyTranslations() {
  const t = TRANSLATIONS[AppState.currentLang];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
        el.setAttribute('placeholder', t[key]);
      } else {
        el.textContent = t[key];
      }
    }
  });
}

// Render Category Filter Chips
function renderCategoryChips() {
  const container = document.getElementById("categoryChipsList");
  if (!container) return;

  const isHi = AppState.currentLang === 'hi';
  container.innerHTML = SCHEME_CATEGORIES.map(cat => `
    <li>
      <button class="chip-btn ${AppState.activeCategory === cat.id ? 'active' : ''}" 
              onclick="setCategory('${cat.id}')">
        <span class="chip-icon">${cat.icon}</span>
        <span>${isHi ? cat.nameHi : cat.name}</span>
      </button>
    </li>
  `).join('');
}

function setCategory(catId) {
  AppState.activeCategory = catId;
  renderCategoryChips();
  renderSchemesCatalog();
}

// Render Schemes Catalog Grid
function renderSchemesCatalog() {
  const grid = document.getElementById("schemesGrid");
  const countEl = document.getElementById("resultsCount");
  if (!grid) return;

  const isHi = AppState.currentLang === 'hi';
  const query = AppState.searchQuery.toLowerCase().trim();

  // Filter schemes
  let filtered = SCHEMES_DATA.filter(scheme => {
    // Category match
    const matchCat = (AppState.activeCategory === 'all' || scheme.category === AppState.activeCategory);
    
    // Authority match
    let matchAuth = true;
    if (AppState.authorityFilter === 'central') matchAuth = scheme.issuingBody.includes("Central");
    else if (AppState.authorityFilter === 'ngo') matchAuth = scheme.category.includes("NGO") || scheme.issuingBody.includes("CSR") || scheme.issuingBody.includes("Trusts");
    
    // Search match
    let matchQuery = true;
    if (query) {
      matchQuery = scheme.name.toLowerCase().includes(query) ||
                   scheme.nameHi.toLowerCase().includes(query) ||
                   scheme.tagline.toLowerCase().includes(query) ||
                   scheme.category.toLowerCase().includes(query) ||
                   scheme.benefits.some(b => b.toLowerCase().includes(query));
    }

    return matchCat && matchAuth && matchQuery;
  });

  // Sort
  if (AppState.sortBy === 'subsidy') {
    filtered.sort((a, b) => b.subsidyHighlight.length - a.subsidyHighlight.length);
  } else if (AppState.sortBy === 'closing') {
    filtered.sort((a, b) => (b.badge.includes("Closing") ? 1 : -1));
  }

  if (countEl) {
    countEl.innerHTML = `Showing <strong>${filtered.length}</strong> verified schemes`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #FAF8F2; border-radius: 12px; border: 1px dashed var(--color-surface-border);">
        <p style="font-size: 1.2rem; font-weight: 600; color: var(--color-primary); margin-bottom: 8px;">
          ${isHi ? "कोई योजना नहीं मिली।" : "No matching schemes found."}
        </p>
        <p style="color: var(--color-ink-muted);">
          ${isHi ? "कृपया अन्य खोज शब्द या श्रेणी चुनें।" : "Try clearing your search term or selecting 'All Categories'."}
        </p>
        <button class="btn-primary" style="margin-top: 16px;" onclick="resetFilters()">
          ${isHi ? "सभी फ़िल्टर साफ़ करें" : "Reset All Filters"}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(scheme => {
    const isSaved = AppState.savedSchemeIds.includes(scheme.id);
    const isCompared = AppState.compareSchemeIds.includes(scheme.id);

    return `
      <div class="scheme-card" id="scheme-card-${scheme.id}">
        <div class="card-meta-top">
          <span class="scheme-code-badge">${scheme.code}</span>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge-pill ${scheme.badge.includes('Closing') ? 'priority' : (scheme.badge.includes('DBT') ? 'dbt' : 'general')}">
              ${scheme.badge}
            </span>
            <button class="bookmark-btn ${isSaved ? 'saved' : ''}" 
                    title="${isSaved ? 'Remove from saved' : 'Save scheme'}"
                    onclick="toggleSaveScheme('${scheme.id}', event)">
              ${isSaved ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        <h3 class="scheme-title" onclick="openSchemeDetail('${scheme.id}')">
          ${isHi ? scheme.nameHi : scheme.name}
        </h3>

        <div class="scheme-ministry">
          🏛️ ${isHi ? scheme.issuingBodyHi : scheme.issuingBody}
        </div>

        <p class="scheme-tagline">
          ${isHi ? scheme.taglineHi : scheme.tagline}
        </p>

        <div class="subsidy-box">
          <div class="subsidy-label">${isHi ? "मुख्य लाभ / अनुदान" : "Key Subsidy Benefit"}</div>
          <div class="subsidy-value">${scheme.subsidyHighlight}</div>
        </div>

        <div class="card-footer">
          <button class="card-view-btn" onclick="openSchemeDetail('${scheme.id}')">
            <span>${isHi ? "विवरण व प्रक्रिया" : "View Steps & Guide"}</span> →
          </button>
          ${scheme.applyUrl 
            ? `<a href="${scheme.applyUrl}" target="_blank" rel="noopener noreferrer" class="card-apply-btn" onclick="event.stopPropagation()" title="${isHi ? 'सीधे आवेदन करें' : 'Apply / Register Directly'}">
                <span>${isHi ? 'आवेदन करें ↗' : 'Apply ↗'}</span>
              </a>`
            : `<span class="card-apply-offline" title="${isHi ? 'सीएससी केंद्र पर ऑफलाइन आवेदन करें' : 'Apply offline via nearest CSC center'}">
                ${isHi ? 'ऑफलाइन (CSC)' : 'Offline (CSC)'}
              </span>`
          }
          <label class="card-compare-chk" title="Compare side by side">
            <input type="checkbox" ${isCompared ? 'checked' : ''} 
                   onchange="toggleCompareScheme('${scheme.id}', this.checked)">
            <span>${isHi ? "तुलना" : "Compare"}</span>
          </label>
        </div>
      </div>
    `;
  }).join('');
}

function resetFilters() {
  AppState.activeCategory = 'all';
  AppState.searchQuery = '';
  AppState.authorityFilter = 'all';
  AppState.sortBy = 'relevant';
  const sInput = document.getElementById("subSearchInput");
  if (sInput) sInput.value = '';
  renderCategoryChips();
  renderSchemesCatalog();
}

// Bookmark / Save Scheme Toggle (with Auth gating - Section 3.3)
async function toggleSaveScheme(schemeId, event) {
  if (event) event.stopPropagation();

  // Save gating: if logged out, prompt to sign in and redirect
  if (typeof KrishiApi !== 'undefined' && !KrishiApi.isLoggedIn()) {
    const isHi = AppState.currentLang === 'hi';
    const proceed = confirm(isHi 
      ? "योजनाओं को सहेजने और अपने डैशबोर्ड पर आवेदन ट्रैक करने के लिए कृपया लॉगिन करें। क्या आप लॉगिन पृष्ठ पर जाना चाहते हैं?" 
      : "Please sign in to save schemes and manage application milestones in your Dashboard. Would you like to log in now?");
    if (proceed) {
      const currentPage = encodeURIComponent(window.location.pathname.split("/").pop() || "index.html");
      window.location.href = `login.html?next=${currentPage}&action=save&scheme=${schemeId}`;
      return;
    }
  }

  const idx = AppState.savedSchemeIds.indexOf(schemeId);
  const isHi = AppState.currentLang === 'hi';

  if (idx === -1) {
    AppState.savedSchemeIds.push(schemeId);
    if (!AppState.applicationTracker[schemeId]) {
      AppState.applicationTracker[schemeId] = "not_started";
    }
    if (typeof KrishiApi !== 'undefined') {
      await KrishiApi.saveScheme(schemeId).catch(() => null);
    }
    showToast(isHi ? "योजना आपके डैशबोर्ड में सहेज ली गई!" : "Scheme saved to your Dashboard!");
  } else {
    AppState.savedSchemeIds.splice(idx, 1);
    if (typeof KrishiApi !== 'undefined') {
      await KrishiApi.removeSavedScheme(schemeId).catch(() => null);
    }
    showToast(isHi ? "योजना बुकमार्क से हटा दी गई।" : "Scheme removed from bookmarks.");
  }

  localStorage.setItem('krishi_saved_schemes', JSON.stringify(AppState.savedSchemeIds));
  localStorage.setItem('krishi_tracker', JSON.stringify(AppState.applicationTracker));

  updateSavedBadgeCount();
  renderSchemesCatalog();
  renderDashboardKanban();
}

function updateSavedBadgeCount() {
  const badge = document.getElementById("savedCountBadge");
  if (badge) {
    badge.textContent = AppState.savedSchemeIds.length;
  }
}

// Compare Schemes Drawer Logic
function toggleCompareScheme(schemeId, isChecked) {
  const isHi = AppState.currentLang === 'hi';
  if (isChecked) {
    if (AppState.compareSchemeIds.length >= 3) {
      alert(isHi ? "आप एक समय में अधिकतम 3 योजनाओं की तुलना कर सकते हैं।" : "You can compare up to 3 schemes at a time.");
      renderSchemesCatalog();
      return;
    }
    if (!AppState.compareSchemeIds.includes(schemeId)) {
      AppState.compareSchemeIds.push(schemeId);
    }
  } else {
    AppState.compareSchemeIds = AppState.compareSchemeIds.filter(id => id !== schemeId);
  }
  updateCompareStickyBar();
}

function initCompareStickyBar() {
  updateCompareStickyBar();
}

function updateCompareStickyBar() {
  const bar = document.getElementById("compareStickyBar");
  if (!bar) return;

  if (AppState.compareSchemeIds.length > 0) {
    bar.classList.add("visible");
    const container = document.getElementById("comparePillsContainer");
    if (container) {
      container.innerHTML = AppState.compareSchemeIds.map(id => {
        const s = SCHEMES_DATA.find(x => x.id === id);
        return `
          <span class="compare-pill-tag">
            ${s.code}
            <span class="remove-compare-btn" onclick="toggleCompareScheme('${id}', false)">✕</span>
          </span>
        `;
      }).join('');
    }
  } else {
    bar.classList.remove("visible");
  }
}

function openCompareModal() {
  if (AppState.compareSchemeIds.length < 2) {
    alert(AppState.currentLang === 'hi' ? "तुलना के लिए कम से कम 2 योजनाएं चुनें।" : "Please select at least 2 schemes to compare.");
    return;
  }

  const modal = document.getElementById("compareModal");
  const tableContainer = document.getElementById("compareTableContent");
  if (!modal || !tableContainer) return;

  const isHi = AppState.currentLang === 'hi';
  const schemes = AppState.compareSchemeIds.map(id => SCHEMES_DATA.find(x => x.id === id));

  tableContainer.innerHTML = `
    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
      <thead>
        <tr style="background: #F4F1EA; border-bottom: 2px solid var(--color-surface-border);">
          <th style="padding: 12px; width: 22%;">Parameter</th>
          ${schemes.map(s => `
            <th style="padding: 12px; font-family: var(--font-serif); font-size: 1.05rem; color: var(--color-primary);">
              ${isHi ? s.nameHi : s.name}
            </th>
          `).join('')}
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom: 1px solid var(--color-surface-border);">
          <td style="padding: 12px; font-weight: 600;">Authority</td>
          ${schemes.map(s => `<td style="padding: 12px;">${isHi ? s.issuingBodyHi : s.issuingBody}</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--color-surface-border); background: #FAF8F2;">
          <td style="padding: 12px; font-weight: 600;">Subsidy / Benefit</td>
          ${schemes.map(s => `<td style="padding: 12px; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary);">${s.subsidyHighlight}</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--color-surface-border);">
          <td style="padding: 12px; font-weight: 600;">Eligible Land Holding</td>
          ${schemes.map(s => `<td style="padding: 12px;">${s.minLand} - ${s.maxLand >= 999 ? 'No upper limit' : s.maxLand + ' Hectares'}</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--color-surface-border); background: #FAF8F2;">
          <td style="padding: 12px; font-weight: 600;">Target Farmers</td>
          ${schemes.map(s => `<td style="padding: 12px;">${s.targetBeneficiary}</td>`).join('')}
        </tr>
        <tr style="border-bottom: 1px solid var(--color-surface-border);">
          <td style="padding: 12px; font-weight: 600;">Required Documents</td>
          ${schemes.map(s => `<td style="padding: 12px;"><ul style="padding-left: 16px;">${s.documents.map(d => `<li>${d}</li>`).join('')}</ul></td>`).join('')}
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: 600;">Apply Link</td>
          ${schemes.map(s => `
            <td style="padding: 12px;">
              <a href="${s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.75rem; padding: 6px 12px;">
                Official Portal ↗
              </a>
            </td>
          `).join('')}
        </tr>
      </tbody>
    </table>
  `;

  modal.classList.add("active");
}

function closeCompareModal() {
  const modal = document.getElementById("compareModal");
  if (modal) modal.classList.remove("active");
}

// Scheme Detail Modal & Step-by-Step Guidance
function openSchemeDetail(schemeId) {
  const scheme = SCHEMES_DATA.find(x => x.id === schemeId);
  if (!scheme) return;

  const modal = document.getElementById("schemeDetailModal");
  const isHi = AppState.currentLang === 'hi';
  const isSaved = AppState.savedSchemeIds.includes(scheme.id);

  // Populate header
  document.getElementById("modalSchemeCode").textContent = scheme.code;
  document.getElementById("modalSchemeTitle").textContent = isHi ? scheme.nameHi : scheme.name;
  document.getElementById("modalSchemeAuthority").textContent = isHi ? scheme.issuingBodyHi : scheme.issuingBody;

  // Overview
  document.getElementById("modalSchemeTagline").textContent = isHi ? scheme.taglineHi : scheme.tagline;
  document.getElementById("modalSubsidyHighlight").textContent = scheme.subsidyHighlight;
  document.getElementById("modalTargetBeneficiary").textContent = scheme.targetBeneficiary;

  // Benefits
  const benefitsList = document.getElementById("modalBenefitsList");
  benefitsList.innerHTML = scheme.benefits.map(b => `
    <li style="margin-bottom: 8px; color: var(--color-ink-muted);">
      <strong style="color: var(--color-primary);">✓</strong> ${b}
    </li>
  `).join('');

  // Eligibility
  const eligList = document.getElementById("modalEligibilityList");
  eligList.innerHTML = scheme.eligibility.map(e => `
    <li style="margin-bottom: 8px; color: var(--color-ink-muted);">
      <strong style="color: var(--color-primary);">•</strong> ${e}
    </li>
  `).join('');

  // Required Documents (Interactive checklist)
  const docsList = document.getElementById("modalDocumentsList");
  docsList.innerHTML = scheme.documents.map((doc, idx) => `
    <label class="doc-check-item">
      <input type="checkbox" id="doc_check_${idx}">
      <span>${doc}</span>
    </label>
  `).join('');

  // Step-by-Step Procedure Timeline (Key Differentiator!)
  const procTimeline = document.getElementById("modalProcedureTimeline");
  procTimeline.innerHTML = scheme.procedure.map(p => `
    <div class="procedure-step-item">
      <div class="procedure-step-badge">${p.step}</div>
      <div class="procedure-step-content">
        <h5>${p.title}</h5>
        <p>${p.desc}</p>
      </div>
    </div>
  `).join('');

  // Trust Verification Line
  document.getElementById("modalLastVerified").textContent = `Verified: ${scheme.lastVerified}`;
  const officialLink = document.getElementById("modalOfficialLink");
  officialLink.href = scheme.officialUrl;

  // Apply / Register Directly button
  const applyContainer = document.getElementById('modalApplyBtnContainer');
  if (applyContainer) {
    if (scheme.applyUrl) {
      applyContainer.innerHTML = `
        <a href="${scheme.applyUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-accent" style="font-size: 0.9rem; padding: 10px 18px;">
          ${isHi ? '📝 सीधे आवेदन / पंजीकरण करें ↗' : '📝 Apply / Register Directly ↗'}
        </a>`;
    } else {
      applyContainer.innerHTML = `
        <div style="background: var(--color-warning-bg); padding: 10px 14px; border-radius: var(--radius-sm); font-size: 0.8125rem; color: var(--color-warning);">
          ${isHi ? '⚠️ इस योजना के लिए निकटतम सीएससी / केवीके केंद्र पर जाकर ऑफलाइन आवेदन करें।' : '⚠️ This scheme requires offline application via your nearest CSC / KVK center.'}
          <a href="locator.html" style="color: var(--color-primary); font-weight: 600; margin-left: 6px;">${isHi ? 'केंद्र खोजें →' : 'Find Center →'}</a>
        </div>`;
    }
  }

  // Official Documents / Proof Guidelines
  const docsSection = document.getElementById('modalOfficialDocsSection');
  const officialDocsList = document.getElementById('modalOfficialDocsList');
  if (docsSection && officialDocsList && scheme.officialDocuments && scheme.officialDocuments.length > 0) {
    docsSection.style.display = 'block';
    officialDocsList.innerHTML = scheme.officialDocuments.map(doc => `
      <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="official-doc-card">
        <div class="doc-icon">📄</div>
        <div class="doc-info">
          <div class="doc-title">${doc.title}</div>
          <div class="doc-meta">${doc.source} · ${doc.year}</div>
        </div>
        <span class="doc-open-icon">↗</span>
      </a>
    `).join('');
  } else if (docsSection) {
    docsSection.style.display = 'none';
  }
  // Bookmark Button in Modal
  const modalSaveBtn = document.getElementById("modalSaveBtn");
  if (modalSaveBtn) {
    modalSaveBtn.innerHTML = isSaved ? `❤️ ${isHi ? "सहेजा गया" : "Saved"}` : `🤍 ${isHi ? "सहेजें" : "Save Scheme"}`;
    modalSaveBtn.onclick = () => {
      toggleSaveScheme(scheme.id);
      openSchemeDetail(scheme.id); // re-render state
    };
  }

  // Setup TTS Button
  const ttsBtn = document.getElementById("modalTtsBtn");
  if (ttsBtn) {
    ttsBtn.classList.remove("speaking");
    ttsBtn.innerHTML = `🔊 <span>${isHi ? "योजना विवरण सुनें" : "Read Scheme Aloud"}</span>`;
    ttsBtn.onclick = () => toggleTextToSpeech(scheme);
  }

  // Setup Print Checklist Button
  const printBtn = document.getElementById("modalPrintChecklistBtn");
  if (printBtn) {
    printBtn.onclick = () => printSchemeChecklist(scheme);
  }

  // Setup "Ask AI about this scheme" shortcut
  const askAiBtn = document.getElementById("modalAskAiBtn");
  if (askAiBtn) {
    askAiBtn.onclick = () => {
      closeSchemeModal();
      if (window.KrishiAI) {
        window.KrishiAI.openWithContext(scheme);
      }
    };
  }

  modal.classList.add("active");
}

function closeSchemeModal() {
  const modal = document.getElementById("schemeDetailModal");
  if (modal) modal.classList.remove("active");
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Text-to-Speech Accessibility Engine
function toggleTextToSpeech(scheme) {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }

  const ttsBtn = document.getElementById("modalTtsBtn");
  const isHi = AppState.currentLang === 'hi';

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    if (ttsBtn) {
      ttsBtn.classList.remove("speaking");
      ttsBtn.innerHTML = `🔊 <span>${isHi ? "योजना विवरण सुनें" : "Read Scheme Aloud"}</span>`;
    }
    return;
  }

  const textToRead = isHi
    ? `${scheme.nameHi}। ${scheme.taglineHi}। सब्सिडी लाभ: ${scheme.subsidyHighlight}। आवश्यक दस्तावेज़ हैं: ${scheme.documents.join(", ")}। आवेदन करने के चरण: ${scheme.procedure.map(p => p.title).join("। ")}।`
    : `${scheme.name}. ${scheme.tagline}. Key benefit: ${scheme.subsidyHighlight}. Required documents are: ${scheme.documents.join(", ")}. Step by step application procedure: ${scheme.procedure.map(p => p.title).join(". ")}.`;

  const utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = isHi ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;

  utterance.onstart = () => {
    if (ttsBtn) {
      ttsBtn.classList.add("speaking");
      ttsBtn.innerHTML = `⏹️ <span>${isHi ? "ऑडियो रोकें" : "Stop Audio"}</span>`;
    }
  };

  utterance.onend = utterance.onerror = () => {
    if (ttsBtn) {
      ttsBtn.classList.remove("speaking");
      ttsBtn.innerHTML = `🔊 <span>${isHi ? "योजना विवरण सुनें" : "Read Scheme Aloud"}</span>`;
    }
  };

  window.speechSynthesis.speak(utterance);
}

// Printable Document Checklist
function printSchemeChecklist(scheme) {
  const printWindow = window.open('', '_blank');
  const isHi = AppState.currentLang === 'hi';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Document Checklist - ${scheme.name}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1A1A17; }
        h1 { color: #1F3B2C; margin-bottom: 4px; font-size: 24px; }
        .sub { color: #7A5C3E; font-size: 14px; margin-bottom: 24px; }
        .checklist-item { display: flex; align-items: center; margin-bottom: 14px; font-size: 16px; }
        .box { width: 22px; height: 22px; border: 2px solid #1F3B2C; border-radius: 4px; margin-right: 14px; }
        .footer { margin-top: 40px; font-size: 12px; color: #888; border-top: 1px solid #ddd; padding-top: 14px; }
      </style>
    </head>
    <body>
      <h1>${isHi ? scheme.nameHi : scheme.name}</h1>
      <div class="sub">Official Portal Checklist · Generated via KrishiSetu (कृषि सेतु)</div>
      <h3>${isHi ? "आवेदन हेतु आवश्यक दस्तावेज़ों की सूची:" : "Official Documents Verification Checklist:"}</h3>
      <div style="margin-top: 20px;">
        ${scheme.documents.map(d => `
          <div class="checklist-item">
            <div class="box"></div>
            <span>${d}</span>
          </div>
        `).join('')}
      </div>
      <div class="footer">
        Official Application Portal: <strong>${scheme.officialUrl}</strong> | Last verified: ${scheme.lastVerified}
      </div>
      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Multi-Step Eligibility Checker Logic
let wizardCurrentStep = 1;
const wizardAnswers = {
  state: "Madhya Pradesh",
  landSize: 2.0,
  cropType: "grains",
  category: "small",
  income: "below_2lakh",
  specialCategory: "none"
};

function setWizardStep(step) {
  wizardCurrentStep = step;
  for (let i = 1; i <= 4; i++) {
    const content = document.getElementById(`wizardStep${i}`);
    const node = document.getElementById(`nodeStep${i}`);
    if (content) content.classList.toggle("active", i === step);
    if (node) {
      node.classList.toggle("active", i === step);
      node.classList.toggle("completed", i < step);
    }
  }

  const fill = document.getElementById("wizardProgressFill");
  if (fill) {
    fill.style.width = `${(step / 4) * 100}%`;
  }
}

function nextWizardStep() {
  if (wizardCurrentStep === 1) {
    const st = document.getElementById("wizState");
    const land = document.getElementById("wizLand");
    if (st) wizardAnswers.state = st.value;
    if (land) wizardAnswers.landSize = parseFloat(land.value) || 1.0;
  } else if (wizardCurrentStep === 2) {
    const crop = document.getElementById("wizCrop");
    if (crop) wizardAnswers.cropType = crop.value;
  } else if (wizardCurrentStep === 3) {
    const cat = document.getElementById("wizCategory");
    const inc = document.getElementById("wizIncome");
    if (cat) wizardAnswers.category = cat.value;
    if (inc) wizardAnswers.income = inc.value;
  }

  if (wizardCurrentStep < 4) {
    setWizardStep(wizardCurrentStep + 1);
    if (wizardCurrentStep === 4) {
      calculateEligibilityResults();
    }
  }
}

function prevWizardStep() {
  if (wizardCurrentStep > 1) {
    setWizardStep(wizardCurrentStep - 1);
  }
}

function calculateEligibilityResults() {
  const container = document.getElementById("eligibilityResultsList");
  if (!container) return;

  const isHi = AppState.currentLang === 'hi';
  const land = wizardAnswers.landSize;

  // Rank schemes based on criteria
  const scoredSchemes = SCHEMES_DATA.map(s => {
    let score = 50;
    let matchReasons = [];

    // Land holding criteria check
    if (land >= s.minLand && land <= s.maxLand) {
      score += 30;
      matchReasons.push(isHi ? `आपकी भूमि (${land} हे.) इस योजना के अनुकूल है` : `Your land (${land} ha) satisfies scheme size criteria`);
    }

    // Small / Marginal match
    if ((wizardAnswers.category === 'marginal' || wizardAnswers.category === 'small') && s.farmerTypes.includes(wizardAnswers.category)) {
      score += 15;
      matchReasons.push(isHi ? "लघु व सीमांत किसान प्राथमिकता" : "Prioritized for small & marginal farmers");
    }

    // Crop match
    if (wizardAnswers.cropType === 'horticulture' && s.category === 'Horticulture') {
      score += 10;
      matchReasons.push("Matches your fruit/vegetable crop type");
    } else if (s.category === 'Income Support & Pension') {
      score += 10;
    }

    score = Math.min(score, 98);

    return {
      scheme: s,
      score,
      reasons: matchReasons
    };
  });

  scoredSchemes.sort((a, b) => b.score - a.score);
  const topMatches = scoredSchemes.slice(0, 6);

  container.innerHTML = `
    <div class="match-summary-badge">
      <div>
        <h4 style="color: var(--color-primary); font-size: 1.1rem; margin-bottom: 4px;">
          ${isHi ? "पात्रता विश्लेषण पूर्ण!" : "Eligibility Analysis Complete!"}
        </h4>
        <p style="font-size: 0.875rem; color: var(--color-ink-muted);">
          ${isHi ? `आपके विवरण के आधार पर ${topMatches.length} शीर्ष योजनाएं उपयुक्त पाई गईं।` : `Based on your profile, you qualify with high probability for ${topMatches.length} schemes.`}
        </p>
      </div>
      <button class="btn-primary btn-accent" onclick="saveAllMatchedSchemes()">
        ${isHi ? "सभी मिलान सहेजें" : "Save All Matches"}
      </button>
    </div>

    ${topMatches.map(m => `
      <div class="match-scheme-row">
        <div>
          <span class="scheme-code-badge" style="margin-bottom: 4px; display: inline-block;">${m.scheme.code}</span>
          <h4 style="color: var(--color-primary); font-size: 1.05rem;">
            ${isHi ? m.scheme.nameHi : m.scheme.name}
          </h4>
          <p style="font-size: 0.8125rem; color: var(--color-ink-muted); margin-top: 4px;">
            <strong>${isHi ? "पात्रता कारण: " : "Why you match: "}</strong> ${m.reasons.join(", ")}
          </p>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div class="match-pct-badge">${m.score}% Match</div>
          <button class="card-view-btn" onclick="openSchemeDetail('${m.scheme.id}')">
            ${isHi ? "देखें" : "View"}
          </button>
        </div>
      </div>
    `).join('')}
  `;
}

function saveAllMatchedSchemes() {
  SCHEMES_DATA.slice(0, 6).forEach(s => {
    if (!AppState.savedSchemeIds.includes(s.id)) {
      AppState.savedSchemeIds.push(s.id);
      AppState.applicationTracker[s.id] = "not_started";
    }
  });
  localStorage.setItem('krishi_saved_schemes', JSON.stringify(AppState.savedSchemeIds));
  localStorage.setItem('krishi_tracker', JSON.stringify(AppState.applicationTracker));
  updateSavedBadgeCount();
  renderDashboardKanban();
  showToast(AppState.currentLang === 'hi' ? "सभी योजनाएं डैशबोर्ड में सहेज ली गईं!" : "All matched schemes saved to your Dashboard!");
}

// Farmer Dashboard & Kanban Tracker Logic
function renderDashboardKanban() {
  const cols = {
    not_started: document.getElementById("kanbanColNotStarted"),
    docs_pending: document.getElementById("kanbanColDocsPending"),
    applied: document.getElementById("kanbanColApplied"),
    approved: document.getElementById("kanbanColApproved")
  };

  if (!cols.not_started) return;

  const isHi = AppState.currentLang === 'hi';
  const savedSchemes = AppState.savedSchemeIds.map(id => SCHEMES_DATA.find(x => x.id === id)).filter(Boolean);

  // Clear columns
  Object.keys(cols).forEach(k => {
    if (cols[k]) cols[k].innerHTML = '';
  });

  const counts = { not_started: 0, docs_pending: 0, applied: 0, approved: 0 };

  savedSchemes.forEach(scheme => {
    const status = AppState.applicationTracker[scheme.id] || "not_started";
    counts[status] = (counts[status] || 0) + 1;

    const card = document.createElement("div");
    card.className = "kanban-item-card";
    card.innerHTML = `
      <span class="scheme-code-badge">${scheme.code}</span>
      <div class="kanban-item-title" onclick="openSchemeDetail('${scheme.id}')" style="cursor: pointer;">
        ${isHi ? scheme.nameHi : scheme.name}
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.775rem; color: var(--color-primary); font-weight: 600;">
        ${scheme.subsidyHighlight}
      </div>
      <div class="kanban-item-actions">
        <select onchange="updateSchemeKanbanStatus('${scheme.id}', this.value)" style="font-size: 0.72rem; padding: 2px 4px; border-radius: 4px; border: 1px solid var(--color-surface-border);">
          <option value="not_started" ${status === 'not_started' ? 'selected' : ''}>Not Started</option>
          <option value="docs_pending" ${status === 'docs_pending' ? 'selected' : ''}>Docs Pending</option>
          <option value="applied" ${status === 'applied' ? 'selected' : ''}>Applied on Portal</option>
          <option value="approved" ${status === 'approved' ? 'selected' : ''}>Approved / Active</option>
        </select>
        <button onclick="toggleSaveScheme('${scheme.id}')" title="Remove" style="color: #E63946; font-size: 0.8rem;">✕</button>
      </div>
    `;

    if (cols[status]) {
      cols[status].appendChild(card);
    }
  });

  // Update count indicators
  document.getElementById("countNotStarted").textContent = counts.not_started;
  document.getElementById("countDocsPending").textContent = counts.docs_pending;
  document.getElementById("countApplied").textContent = counts.applied;
  document.getElementById("countApproved").textContent = counts.approved;
}

function updateSchemeKanbanStatus(schemeId, newStatus) {
  AppState.applicationTracker[schemeId] = newStatus;
  localStorage.setItem('krishi_tracker', JSON.stringify(AppState.applicationTracker));
  if (typeof KrishiApi !== 'undefined' && KrishiApi.isLoggedIn()) {
    KrishiApi.updateProgress(schemeId, newStatus).catch(() => null);
  }
  renderDashboardKanban();
  showToast(`Status updated to: ${newStatus.replace('_', ' ')}`);
}

// CSC / KVK Locator (Requirement 3.4)
function renderCSCLocations(filterType = "all", searchQuery = "") {
  const container = document.getElementById("locatorCardsGrid");
  if (!container) return;

  const isHi = AppState.currentLang === 'hi';
  const query = (searchQuery || "").toLowerCase().trim();

  let filtered = CSC_KVK_LOCATIONS.filter(loc => {
    const matchType = filterType === "all" || loc.type === filterType;
    let matchQuery = true;
    if (query) {
      matchQuery = loc.name.toLowerCase().includes(query) ||
                   (loc.nameHi && loc.nameHi.toLowerCase().includes(query)) ||
                   loc.district.toLowerCase().includes(query) ||
                   loc.state.toLowerCase().includes(query) ||
                   loc.address.toLowerCase().includes(query) ||
                   loc.services.some(s => s.toLowerCase().includes(query));
    }
    return matchType && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: #FAF8F2; border-radius: 12px; border: 1px dashed var(--color-surface-border);">
        <p style="font-size: 1.1rem; font-weight: 600; color: var(--color-primary); margin-bottom: 8px;">
          ${isHi ? "कोई केंद्र नहीं मिला।" : "No centers found matching your search."}
        </p>
        <p style="color: var(--color-ink-muted); font-size: 0.875rem;">
          ${isHi ? "कृपया अन्य जिला या राज्य लिखकर खोजें।" : "Try typing another district or state name."}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(loc => {
    const centerTitle = isHi ? loc.nameHi : loc.name;
    const googleSearchQuery = encodeURIComponent(`${loc.name} ${loc.district} ${loc.state}`);
    const googleSearchUrl = `https://www.google.com/search?q=${googleSearchQuery}`;
    const mapsQuery = encodeURIComponent(`${loc.name}, ${loc.address}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

    return `
      <div class="locator-card clickable-locator-card" 
           onclick="window.open('${googleSearchUrl}', '_blank', 'noopener,noreferrer')" 
           tabindex="0" 
           role="button"
           aria-label="${isHi ? 'Google पर खोजें: ' : 'Search on Google: '}${loc.name}"
           title="${isHi ? 'Google पर खोजें (नया टैब)' : 'Search on Google (opens in new tab)'}"
           onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.open('${googleSearchUrl}', '_blank', 'noopener,noreferrer')}">
        <div class="locator-card-header">
          <div class="locator-type-tag ${loc.type === 'KVK' ? 'kvk' : 'csc'}">
            ${loc.type === 'KVK' ? (isHi ? 'कृषि विज्ञान केंद्र (ICAR)' : 'Krishi Vigyan Kendra (ICAR)') : (isHi ? 'डिजिटल सेवा केंद्र (CSC)' : 'Digital Seva Centre (CSC)')}
          </div>
          <span class="locator-search-pill" title="${isHi ? 'Google पर खोजें' : 'Search on Google'}">
            🔍 Google ↗
          </span>
        </div>
        <h4 class="locator-name">
          ${centerTitle}
        </h4>
        <div class="locator-address-wrapper">
          <a href="${mapsUrl}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="locator-address-link"
             title="${isHi ? 'गूगल मैप्स में स्थान देखें' : 'Open in Google Maps'}"
             aria-label="${isHi ? 'गूगल मैप्स में स्थान देखें: ' : 'Open in Google Maps: '}${loc.address}"
             onclick="event.stopPropagation()">
            <span class="pin-icon">📍</span>
            <span class="address-text">${loc.address}, ${loc.state}</span>
            <span class="maps-hint">🗺️ Maps ↗</span>
          </a>
        </div>
        <div class="locator-phone">
          📞 <a href="tel:${loc.contact.replace(/\s+/g, '')}" onclick="event.stopPropagation()" title="${isHi ? 'कॉल करें' : 'Call center'}">${loc.contact}</a>
        </div>
        <div class="locator-services-list">
          ${loc.services.map(s => `<span class="service-pill">${s}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Side Nav Active Item Highlighter
function highlightActiveSideNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".side-nav-item").forEach(item => {
    const link = item.querySelector("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Deep Links Handler for Legacy Anchors (Requirement 3.3)
function handleLegacyDeepLinks() {
  const hash = window.location.hash;
  const path = window.location.pathname.toLowerCase();
  const isIndex = path.endsWith("index.html") || path.endsWith("/") || !path.includes(".html");

  if (isIndex && hash) {
    if (hash === "#catalogSection" || hash === "#schemesSection") {
      window.location.replace("schemes.html");
    } else if (hash === "#eligibilitySection") {
      window.location.replace("eligibility.html");
    } else if (hash === "#dashboardSection") {
      window.location.replace("dashboard.html");
    } else if (hash === "#locatorSection") {
      window.location.replace("locator.html");
    } else if (hash === "#compareSection") {
      window.location.replace("compare.html");
    }
  }
}

// Dedicated Compare Page Matrix
function initComparePage() {
  const container = document.getElementById("comparePageMatrix");
  if (!container) return;

  if (AppState.compareSchemeIds.length < 2) {
    AppState.compareSchemeIds = ["pm-kisan", "pmfby", "kcc"];
  }

  renderCompareMatrixPage();
}

function renderCompareMatrixPage() {
  const container = document.getElementById("comparePageMatrix");
  if (!container) return;

  const isHi = AppState.currentLang === 'hi';
  const selectedSchemes = AppState.compareSchemeIds.map(id => SCHEMES_DATA.find(x => x.id === id)).filter(Boolean);

  container.innerHTML = `
    <div style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between; background: var(--color-surface); padding: 18px 22px; border-radius: var(--radius-md); border: 1px solid var(--color-surface-border);">
      <div>
        <h3 style="font-family: var(--font-serif); color: var(--color-primary); margin-bottom: 4px;">
          ${isHi ? "तुलना के लिए योजनाएं चुनें (अधिकतम 3)" : "Select Schemes to Compare (Max 3)"}
        </h3>
        <p style="font-size: 0.8125rem; color: var(--color-ink-muted);">
          ${isHi ? "विभिन्न मापदंडों पर सीधे तुलना करने के लिए ड्रॉपडाउन से चुनें।" : "Select any scheme to inspect subsidies, land limits, and procedures side-by-side."}
        </p>
      </div>
      <div style="display: flex; flex-wrap: gap; gap: 10px;">
        ${[0, 1, 2].map(idx => `
          <select onchange="updateCompareSlot(${idx}, this.value)" style="padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-surface-border); background: var(--color-bg); font-size: 0.8125rem; font-family: inherit; font-weight: 500; color: var(--color-ink);">
            <option value="">${isHi ? "-- योजना " + (idx + 1) + " चुनें --" : "-- Select Scheme " + (idx + 1) + " --"}</option>
            ${SCHEMES_DATA.map(s => `
              <option value="${s.id}" ${selectedSchemes[idx] && selectedSchemes[idx].id === s.id ? 'selected' : ''}>
                ${s.code} - ${isHi ? s.nameHi : s.name}
              </option>
            `).join('')}
          </select>
        `).join('')}
      </div>
    </div>

    <div style="background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-surface-border); overflow-x: auto; box-shadow: var(--shadow-sm);">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
        <thead>
          <tr style="background: #F4F1EA; border-bottom: 2px solid var(--color-surface-border);">
            <th style="padding: 16px; width: 20%; color: var(--color-primary); font-size: 0.9375rem;">Parameter</th>
            ${selectedSchemes.map(s => `
              <th style="padding: 16px; font-family: var(--font-serif); font-size: 1.15rem; color: var(--color-primary);">
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                  <span>${isHi ? s.nameHi : s.name}</span>
                  <span class="scheme-code-badge">${s.code}</span>
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--color-surface-border);">
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "जारीकर्ता संस्था" : "Issuing Authority"}</td>
            ${selectedSchemes.map(s => `<td style="padding: 14px 16px; color: var(--color-secondary); font-weight: 500;">🏛️ ${isHi ? s.issuingBodyHi : s.issuingBody}</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--color-surface-border); background: #FAF8F2;">
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "सब्सिडी / मुख्य लाभ" : "Subsidy / Benefit"}</td>
            ${selectedSchemes.map(s => `<td style="padding: 14px 16px; font-family: var(--font-mono); font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">${s.subsidyHighlight}</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--color-surface-border);">
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "पात्र भूमि आकार" : "Eligible Landholding"}</td>
            ${selectedSchemes.map(s => `<td style="padding: 14px 16px;">${s.minLand} - ${s.maxLand >= 999 ? (isHi ? 'कोई ऊपरी सीमा नहीं' : 'No upper limit') : s.maxLand + ' Hectares'}</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--color-surface-border); background: #FAF8F2;">
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "लक्षित लाभार्थी" : "Target Beneficiaries"}</td>
            ${selectedSchemes.map(s => `<td style="padding: 14px 16px; color: var(--color-ink-muted);">${s.targetBeneficiary}</td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--color-surface-border);">
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "आवश्यक दस्तावेज़" : "Required Documents"}</td>
            ${selectedSchemes.map(s => `<td style="padding: 14px 16px;"><ul style="padding-left: 18px; margin: 0; color: var(--color-ink-muted);">${s.documents.map(d => `<li style="margin-bottom: 4px;">${d}</li>`).join('')}</ul></td>`).join('')}
          </tr>
          <tr style="border-bottom: 1px solid var(--color-surface-border); background: #FAF8F2;">
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "आवेदन के मुख्य चरण" : "Procedure Steps"}</td>
            ${selectedSchemes.map(s => `<td style="padding: 14px 16px;"><ol style="padding-left: 18px; margin: 0; color: var(--color-ink-muted);">${s.procedure.slice(0, 3).map(p => `<li style="margin-bottom: 4px;"><strong>${p.title}:</strong> ${p.desc}</li>`).join('')}</ol></td>`).join('')}
          </tr>
          <tr>
            <td style="padding: 14px 16px; font-weight: 600; color: var(--color-ink);">${isHi ? "कार्रवाई" : "Actions"}</td>
            ${selectedSchemes.map(s => `
              <td style="padding: 14px 16px;">
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <button class="card-view-btn" onclick="openSchemeDetail('${s.id}')" style="font-size: 0.8125rem;">
                    ${isHi ? "विवरण देखें" : "View Details"}
                  </button>
                  <a href="${s.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size: 0.8125rem; padding: 7px 12px;">
                    ${isHi ? "पोर्टल ↗" : "Official Portal ↗"}
                  </a>
                </div>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function updateCompareSlot(slotIdx, schemeId) {
  if (!schemeId) {
    if (AppState.compareSchemeIds.length > slotIdx) {
      AppState.compareSchemeIds.splice(slotIdx, 1);
    }
  } else {
    AppState.compareSchemeIds[slotIdx] = schemeId;
  }
  renderCompareMatrixPage();
  updateCompareStickyBar();
}

// Hero Live Stats Counter
function renderHeroStats() {
  const elSchemes = document.getElementById("heroStatSchemes");
  if (elSchemes) elSchemes.textContent = SCHEMES_DATA.length + "+";
  const elSubsidies = document.getElementById("heroStatSubsidies");
  if (elSubsidies) elSubsidies.textContent = "Up to 80%";
  const elStates = document.getElementById("heroStatStates");
  if (elStates) elStates.textContent = "All 28 States";
}

// Toast Notifications
function showToast(message) {
  let toast = document.getElementById("appToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "appToast";
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      background: var(--color-primary-dark);
      color: var(--color-white);
      padding: 12px 20px;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-xl);
      z-index: 1100;
      font-size: 0.875rem;
      font-weight: 500;
      transition: opacity 0.3s ease, transform 0.3s ease;
      opacity: 0;
      transform: translateY(-10px);
      border-left: 4px solid var(--color-accent);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
  }, 2800);
}

// Search and UI Event Listeners
function initEventListeners() {
  // Main Hero Search Input
  const heroSearchInput = document.getElementById("heroSearchInput");
  const heroAutoSuggest = document.getElementById("heroAutoSuggest");

  if (heroSearchInput && heroAutoSuggest) {
    heroSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        heroAutoSuggest.classList.remove("active");
        return;
      }

      const matches = SCHEMES_DATA.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.tagline.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length > 0) {
        heroAutoSuggest.innerHTML = matches.map(m => `
          <div class="suggest-item" onclick="openSchemeDetail('${m.id}')">
            <span class="suggest-title">${m.name}</span>
            <span class="suggest-cat">${m.category}</span>
          </div>
        `).join('');
        heroAutoSuggest.classList.add("active");
      } else {
        heroAutoSuggest.classList.remove("active");
      }
    });

    document.addEventListener("click", (e) => {
      if (!heroSearchInput.contains(e.target)) {
        heroAutoSuggest.classList.remove("active");
      }
    });
  }

  // Catalog Sub-Search Input
  const subSearchInput = document.getElementById("subSearchInput");
  if (subSearchInput) {
    subSearchInput.addEventListener("input", (e) => {
      AppState.searchQuery = e.target.value;
      renderSchemesCatalog();
    });
  }

  // Authority filter
  const authFilter = document.getElementById("authorityFilter");
  if (authFilter) {
    authFilter.addEventListener("change", (e) => {
      AppState.authorityFilter = e.target.value;
      renderSchemesCatalog();
    });
  }

  // Sort by
  const sortFilter = document.getElementById("sortByFilter");
  if (sortFilter) {
    sortFilter.addEventListener("change", (e) => {
      AppState.sortBy = e.target.value;
      renderSchemesCatalog();
    });
  }
}

// Expose functions to global scope
window.setCategory = setCategory;
window.toggleSaveScheme = toggleSaveScheme;
window.toggleCompareScheme = toggleCompareScheme;
window.openCompareModal = openCompareModal;
window.closeCompareModal = closeCompareModal;
window.openSchemeDetail = openSchemeDetail;
window.closeSchemeModal = closeSchemeModal;
window.toggleLanguage = toggleLanguage;
window.nextWizardStep = nextWizardStep;
window.prevWizardStep = prevWizardStep;
window.setWizardStep = setWizardStep;
window.saveAllMatchedSchemes = saveAllMatchedSchemes;
window.updateSchemeKanbanStatus = updateSchemeKanbanStatus;
window.resetFilters = resetFilters;
window.updateCompareSlot = updateCompareSlot;
window.renderCSCLocations = renderCSCLocations;
window.highlightActiveSideNav = highlightActiveSideNav;
window.initHamburgerMenu = initHamburgerMenu;
window.initAuthNav = initAuthNav;

