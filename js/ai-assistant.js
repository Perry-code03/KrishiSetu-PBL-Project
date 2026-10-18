/**
 * KrishiSetu - Grounded RAG-based AI Assistant ("Krishi Mitra / कृषि मित्र")
 * Strict retrieval over SCHEMES_DATA, intent detection, keyword cluster scoring,
 * session context tracking, bilingual response generation, and Spring Boot backend integration.
 */

// Domain Keyword Clusters for Accurate Intent & Topic Matching
const KEYWORD_CLUSTERS = {
  irrigation: ['irrigation', 'drip', 'sprinkler', 'water', 'sinchai', 'jal', 'micro irrigation', 'per drop', 'pdmc', 'borewell', 'tubewell'],
  solar: ['solar', 'pump', 'kusum', 'renewable', 'saur', 'urja', 'energy', 'grid'],
  insurance: ['insurance', 'bima', 'crop insurance', 'fasal bima', 'premium', 'coverage', 'pmfby', 'claim', 'loss', 'flood', 'drought'],
  credit: ['credit', 'loan', 'kcc', 'kisan credit', 'interest', 'rin', 'byaj', 'subsidy loan', 'nabard', 'subvention'],
  income: ['income', 'pm kisan', 'pm-kisan', 'direct benefit', 'aay', 'pension', 'samman nidhi', 'maan dhan', 'dbt'],
  mechanization: ['tractor', 'machine', 'equipment', 'smam', 'farm machinery', 'krishi yantra', 'drone', 'harvester', 'rotavator', 'drone didi'],
  organic: ['organic', 'jaivik', 'natural farming', 'zero budget', 'paramparagat', 'pkvy', 'compost', 'chemical free'],
  horticulture: ['horticulture', 'fruit', 'vegetable', 'phal', 'sabzi', 'midh', 'bagwani', 'flower', 'polyhouse', 'greenhouse'],
  dairy: ['dairy', 'milk', 'cattle', 'dugdh', 'pashu', 'animal husbandry', 'cow', 'buffalo', 'gokul', 'dairy farming'],
  fisheries: ['fish', 'fisheries', 'matsya', 'aquaculture', 'pmmsy', 'pond', 'marine', 'fisherman'],
  soil: ['soil', 'soil health', 'mitti', 'urvarak', 'fertilizer', 'shc', 'testing', 'card']
};

class KrishiAIAssistant {
  constructor() {
    this.isOpen = false;
    this.isStreaming = false;
    this.chatHistory = [];
    this.lastContextScheme = null; // Memory for multi-turn conversations
    this.sessionId = 'km_session_' + Math.random().toString(36).substring(2, 10);
    this.chatCard = document.getElementById("aiChatCard");
    this.launcherBtn = document.getElementById("aiLauncherBtn");
    this.messagesContainer = document.getElementById("aiMessagesContainer");
    this.inputField = document.getElementById("aiInputField");
    this.sendBtn = document.getElementById("aiSendBtn");
    this.closeBtn = document.getElementById("aiCloseBtn");

    this.init();
  }

  init() {
    if (!this.launcherBtn || !this.chatCard) return;

    this.launcherBtn.addEventListener("click", () => this.toggleOpen());
    if (this.closeBtn) this.closeBtn.addEventListener("click", () => this.toggleOpen(false));

    if (this.sendBtn && this.inputField) {
      this.sendBtn.addEventListener("click", () => this.handleUserSend());
      this.inputField.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          this.handleUserSend();
        }
      });
    }

    // Bind quick chips
    document.querySelectorAll(".ai-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query");
        if (query) {
          this.sendMessage(query);
        }
      });
    });

    // Restore chat history from sessionStorage
    const savedChat = sessionStorage.getItem("krishi_ai_chat_history");
    if (savedChat && this.messagesContainer) {
      try {
        const msgs = JSON.parse(savedChat);
        if (Array.isArray(msgs) && msgs.length > 0) {
          this.chatHistory = msgs;
          this.messagesContainer.innerHTML = "";
          msgs.forEach(m => {
            if (m.role === "user") {
              this.appendUserMessage(m.text, false);
            } else {
              this.appendBotMessage(m.text, false, false);
            }
          });
        } else {
          this.renderGreeting();
        }
      } catch (e) {
        this.renderGreeting();
      }
    } else if (this.messagesContainer && this.messagesContainer.children.length === 0) {
      this.renderGreeting();
    }
  }

  saveMessageToHistory(role, text) {
    this.chatHistory.push({ role, text });
    try {
      sessionStorage.setItem("krishi_ai_chat_history", JSON.stringify(this.chatHistory.slice(-25)));
    } catch (e) {}
  }

  toggleOpen(forceState = null) {
    this.isOpen = forceState !== null ? forceState : !this.isOpen;
    this.chatCard.classList.toggle("open", this.isOpen);
    if (this.isOpen) {
      setTimeout(() => this.inputField.focus(), 200);
    }
  }

  openWithContext(scheme) {
    this.toggleOpen(true);
    this.lastContextScheme = scheme;
    const isHi = AppState.currentLang === 'hi';
    const query = isHi 
      ? `मुझे ${scheme.nameHi} के बारे में संपूर्ण विवरण और पात्रता बताएं।`
      : `Explain the eligibility, benefits, and documents required for ${scheme.name}.`;
    this.sendMessage(query, scheme);
  }

  renderGreeting() {
    const isHi = AppState.currentLang === 'hi';
    const greetingText = isHi
      ? `नमस्ते! 🙏 मैं **कृषि मित्र** हूँ, आपका AI कृषि योजना सहायक।\n\nमैं भारत सरकार, राज्य सरकारों व एनजीओ की 36+ योजनाओं, सब्सिडी दरों (जैसे 80% ड्रिप सब्सिडी, पीएम-किसान ₹6000, कुसुम सोलर पंप, 4% केसीसी ऋण), आवश्यक दस्तावेज़ों और आवेदन प्रक्रिया की 100% सत्यापित जानकारी देता हूँ।\n\n*उदाहरण: "सिंचाई के लिए योजनाएं", "PM-KISAN documents", या "फसल बीमा कैसे करें"*`
      : `Hello! 🙏 I am **Krishi Mitra**, your verified AI agricultural assistant.\n\nI provide 100% grounded answers regarding subsidies, required documents, eligibility, and step-by-step procedures for 36+ agricultural schemes (PM-KISAN, KCC, PMFBY, PM-KUSUM, drip irrigation, drone subsidies, etc.).\n\n*Try asking: "I need a scheme for irrigation", "What documents for KCC loan?", or "Check my saved schemes"*`;

    this.appendBotMessage(greetingText, false);
  }

  handleUserSend() {
    const text = this.inputField.value.trim();
    if (!text || this.isStreaming) return;

    this.inputField.value = "";
    this.sendMessage(text);
  }

  async sendMessage(userQuery, injectedScheme = null) {
    this.appendUserMessage(userQuery);
    const thinkingElement = this.appendThinkingState();

    // Try backend REST API first if available and online
    if (typeof KrishiApi !== 'undefined' && KrishiApi.isBackendOnline && KrishiApi.isBackendOnline()) {
      try {
        const lang = AppState.currentLang;
        const apiRes = await KrishiApi.sendChatMessage(userQuery, this.sessionId, lang);
        if (apiRes && apiRes.success && apiRes.data && apiRes.data.reply) {
          thinkingElement.remove();
          const actionLinks = [];
          if (apiRes.data.matchedSchemeSlug) {
            actionLinks.push({
              label: lang === 'hi' ? 'विवरण देखें' : 'View Scheme',
              action: () => openSchemeDetail(apiRes.data.matchedSchemeSlug)
            });
          }
          this.streamBotResponse(apiRes.data.reply, actionLinks);
          return;
        }
      } catch (err) {
        console.warn('Backend assistant API request failed, falling back to local retrieval:', err);
      }
    }

    // Client-side grounded retrieval fallback (Strict Grounded RAG over SCHEMES_DATA)
    setTimeout(() => {
      thinkingElement.remove();
      const response = this.generateGroundedResponse(userQuery, injectedScheme);
      this.streamBotResponse(response.text, response.actionLinks);
    }, 600);
  }

  // Detect query language (Hindi vs English)
  detectLanguage(text) {
    const devanagariPattern = /[\u0900-\u097F]/;
    if (devanagariPattern.test(text)) return 'hi';
    const hindiTranslit = ['kya', 'kaise', 'batao', 'chahiye', 'yojana', 'kisano', 'kisan', 'sinchai', 'fasal', 'bima', 'anudan', 'patrata', 'dastavez'];
    const words = text.toLowerCase().split(/\s+/);
    if (words.some(w => hindiTranslit.includes(w))) return 'hi';
    return AppState.currentLang || 'en';
  }

  // Intent Classification Engine
  classifyIntent(query) {
    const q = query.toLowerCase().trim();

    if (/^(hi|hello|hey|namaste|pranam|ram ram|kese ho|how are you|good morning)/i.test(q)) {
      return 'greeting';
    }

    if (q.includes("weather") || q.includes("cricket") || q.includes("movie") || q.includes("politics") || q.includes("stock") || q.includes("crypto")) {
      return 'out_of_scope';
    }

    if (q.includes("my saved") || q.includes("saved scheme") || q.includes("mere saved") || q.includes("dashboard") || q.includes("my progress") || q.includes("application status")) {
      return 'my_saved';
    }

    if (q.includes("compare") || q.includes("difference") || q.includes("vs") || q.includes("tulna")) {
      return 'compare';
    }

    if (q.includes("document") || q.includes("paper") || q.includes("dastavez") || q.includes("kaagaz") || q.includes("proof") || q.includes("certificate") || q.includes("aadhaar")) {
      return 'documents';
    }

    if (q.includes("apply") || q.includes("how to") || q.includes("procedure") || q.includes("step") || q.includes("process") || q.includes("kaise apply") || q.includes("aavedan")) {
      return 'how_to_apply';
    }

    if (q.includes("eligible") || q.includes("eligibility") || q.includes("qualification") || q.includes("patra") || q.includes("who can apply") || q.includes("limit") || q.includes("acres") || q.includes("land")) {
      return 'eligibility';
    }

    if (q.includes("subsidy") || q.includes("benefit") || q.includes("amount") || q.includes("money") || q.includes("paisa") || q.includes("kitna") || q.includes("interest rate") || q.includes("anudan")) {
      return 'benefits';
    }

    return 'scheme_inquiry';
  }

  // Keyword Cluster & Scheme Scoring Engine
  scoreAndRankSchemes(query) {
    const q = query.toLowerCase();
    const tokens = q.split(/[\s,?.!-]+/).filter(Boolean);

    // Identify active domain clusters
    const activeClusters = [];
    Object.entries(KEYWORD_CLUSTERS).forEach(([domain, words]) => {
      if (words.some(w => q.includes(w))) {
        activeClusters.push(domain);
      }
    });

    const scored = SCHEMES_DATA.map(scheme => {
      let score = 0;
      const sId = scheme.id.toLowerCase();
      const sCode = scheme.code.toLowerCase();
      const sName = scheme.name.toLowerCase();
      const sNameHi = scheme.nameHi ? scheme.nameHi.toLowerCase() : '';
      const sCategory = scheme.category.toLowerCase();
      const sTagline = scheme.tagline.toLowerCase();
      const sKeywords = (scheme.keywords || []).map(k => k.toLowerCase());

      // Direct ID or Code exact match
      if (q.includes(sId) || q.includes(sCode)) score += 60;

      // Scheme Name Match
      if (q.includes(sName) || (sNameHi && q.includes(sNameHi))) score += 50;

      // Direct Token Matches on Name
      tokens.forEach(tok => {
        if (tok.length > 2) {
          if (sName.includes(tok)) score += 15;
          if (sKeywords.some(k => k.includes(tok))) score += 10;
          if (sCategory.includes(tok)) score += 8;
          if (sTagline.includes(tok)) score += 5;
        }
      });

      // Cluster overlap scoring
      activeClusters.forEach(cluster => {
        if (cluster === 'irrigation' && (sId.includes('pmksy') || sCategory.includes('irrigation') || sKeywords.includes('irrigation'))) score += 35;
        if (cluster === 'solar' && (sId.includes('kusum') || sKeywords.includes('solar'))) score += 40;
        if (cluster === 'insurance' && (sId.includes('pmfby') || sCategory.includes('insurance'))) score += 40;
        if (cluster === 'credit' && (sId.includes('kcc') || sId.includes('ainacf') || sCategory.includes('credit'))) score += 40;
        if (cluster === 'income' && (sId.includes('pm-kisan') || sId.includes('pm-kmy') || sCategory.includes('income'))) score += 40;
        if (cluster === 'mechanization' && (sId.includes('smam') || sId.includes('drone') || sCategory.includes('mechanization'))) score += 35;
        if (cluster === 'organic' && (sId.includes('pkvy') || sKeywords.includes('organic'))) score += 35;
        if (cluster === 'horticulture' && (sId.includes('midh') || sCategory.includes('horticulture'))) score += 35;
        if (cluster === 'dairy' && (sId.includes('gokul') || sCategory.includes('dairy'))) score += 35;
        if (cluster === 'fisheries' && (sId.includes('pmmsy') || sCategory.includes('fisheries'))) score += 40;
        if (cluster === 'soil' && (sId.includes('soil') || sKeywords.includes('soil'))) score += 40;
      });

      return { scheme, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.filter(s => s.score > 12);
  }

  // Response Generator with Strict Guardrails
  generateGroundedResponse(query, forcedScheme = null) {
    const lang = this.detectLanguage(query);
    const isHi = lang === 'hi';
    const intent = this.classifyIntent(query);

    // Intent 1: Greeting
    if (intent === 'greeting') {
      return {
        text: isHi
          ? `नमस्ते किसान भाई! 🙏 मैं कृषि सेतु का **कृषि मित्र** AI हूँ।\n\nआप मुझसे किसी भी योजना (जैसे पीएम-किसान, केसीसी ऋण, ड्रिप सब्सिडी, सोलर पंप, फसल बीमा) की पात्रता, आवश्यक कागजात या आवेदन प्रक्रिया पूछ सकते हैं। आप क्या जानना चाहते हैं?`
          : `Hello! 🙏 I am **Krishi Mitra**, your agricultural welfare guide.\n\nI can help you check eligibility, calculate subsidies, view required documents, and guide you through applications for 36+ verified schemes. How may I assist you today?`
      };
    }

    // Intent 2: Out of Scope
    if (intent === 'out_of_scope') {
      return {
        text: isHi
          ? `क्षमा करें, मैं केवल कृषि कल्याण योजनाओं, सब्सिडी, किसान ऋण और आवेदन मार्गदर्शन से संबंधित प्रश्नों का उत्तर दे सकता हूँ।\n\nकृपया कृषि या सरकारी योजनाओं से संबंधित प्रश्न पूछें (जैसे: ड्रिप सब्सिडी, केसीसी ऋण, या फसल बीमा)।`
          : `I am specialized specifically in Indian agricultural welfare schemes, subsidies, and farmer application guidance.\n\nPlease ask a farming or welfare-related question (e.g. drip irrigation subsidy, KCC loan at 4%, or PM-KISAN eligibility).`
      };
    }

    // Intent 3: Saved Schemes / Pipeline
    if (intent === 'my_saved') {
      const savedCount = AppState.savedSchemeIds.length;
      if (savedCount === 0) {
        return {
          text: isHi
            ? `आपके डैशबोर्ड में वर्तमान में कोई योजना सहेजी नहीं गई है। आप किसी भी योजना कार्ड पर दिल (❤️) आइकन दबाकर उसे सुरक्षित कर सकते हैं।`
            : `You have not saved any schemes to your dashboard yet. Browse the schemes catalog and click the ❤️ icon on any scheme card to track it.`
        };
      }
      const savedSchemes = AppState.savedSchemeIds.map(id => SCHEMES_DATA.find(x => x.id === id)).filter(Boolean);
      let text = isHi
        ? `आपके डैशबोर्ड में **${savedCount} योजनाएं** सहेजी गई हैं:\n\n`
        : `You have **${savedCount} schemes** in your pipeline:\n\n`;

      savedSchemes.forEach(s => {
        const st = AppState.applicationTracker[s.id] || 'not_started';
        const stLabel = {
          not_started: isHi ? 'शुरू नहीं हुआ' : 'Not Started',
          docs_pending: isHi ? 'दस्तावेज़ लंबित' : 'Docs Pending',
          applied: isHi ? 'पोर्टल पर आवेदन किया' : 'Applied',
          approved: isHi ? 'स्वीकृत' : 'Approved'
        }[st] || st;
        text += `• **${isHi ? s.nameHi : s.name}** [${s.code}]: *${stLabel}* (${s.subsidyHighlight})\n`;
      });
      text += `\n*Source: KrishiSetu User Pipeline*`;

      return {
        text,
        actionLinks: [
          { label: isHi ? 'डैशबोर्ड खोलें →' : 'Open Dashboard →', action: () => window.location.href = 'dashboard.html' }
        ]
      };
    }

    // Scheme Matching & Context Recovery
    let matches = this.scoreAndRankSchemes(query);
    let topMatch = matches.length > 0 ? matches[0].scheme : null;

    // Handle follow-up queries using session memory
    if (!topMatch && this.lastContextScheme && (intent === 'documents' || intent === 'how_to_apply' || intent === 'eligibility' || intent === 'benefits')) {
      topMatch = this.lastContextScheme;
    } else if (topMatch) {
      this.lastContextScheme = topMatch;
    }

    // No grounded match found
    if (!topMatch) {
      return {
        text: isHi
          ? `मुझे आपके प्रश्न के लिए डेटाबेस में कोई सत्यापित योजना नहीं मिली।\n\nकृषि सेतु पर 36+ योजनाएं उपलब्ध हैं। आप निम्न विषयों पर पूछ सकते हैं:\n• **सिंचाई**: पीएमकेएसवाई (80% सब्सिडी तक)\n• **सोलर पंप**: पीएम-कुसुम (60% सब्सिडी)\n• **ऋण**: केसीसी (4% रियायती ब्याज दर)\n• **फसल बीमा**: पीएमएफबीवाई\n• **आय सहायता**: पीएम-किसान (₹6,000/वर्ष)`
          : `I could not find a verified scheme in our database matching that specific query.\n\nAs a grounded AI assistant, I only provide verified official data. You can ask about:\n• **Irrigation**: PMKSY Drip & Sprinkler (up to 80% subsidy)\n• **Solar Pump**: PM-KUSUM (60% subsidy)\n• **Credit**: Kisan Credit Card (4% interest rate)\n• **Insurance**: PMFBY Crop Protection\n• **Income**: PM-KISAN (₹6,000/year direct cash)\n\n*Source: KrishiSetu Grounded Scheme Directory*`
      };
    }

    // Build Grounded Answer based on matched scheme and intent
    let responseText = "";
    const actionLinks = [
      {
        label: isHi ? "मार्गदर्शन व चरण देखें" : "View Steps & Guide",
        action: () => openSchemeDetail(topMatch.id)
      }
    ];

    if (topMatch.applyUrl) {
      actionLinks.push({
        label: isHi ? "सीधे आवेदन करें ↗" : "Apply Directly ↗",
        action: () => window.open(topMatch.applyUrl, "_blank", "noopener,noreferrer")
      });
    }

    if (intent === 'documents') {
      responseText = isHi
        ? `📋 **${topMatch.nameHi} (${topMatch.code})** के लिए आवश्यक दस्तावेज़:\n\n` +
          topMatch.documents.map(d => `• ${d}`).join('\n') +
          `\n\n💡 *सलाह: आप चेकलिस्ट प्रिंट करके सीएससी केंद्र ले जा सकते हैं।*`
        : `📋 **Required Documents for ${topMatch.name} (${topMatch.code}):**\n\n` +
          topMatch.documents.map(d => `• ${d}`).join('\n') +
          `\n\n💡 *Tip: You can print a physical verification checklist from the scheme detail page.*`;
    } else if (intent === 'how_to_apply') {
      responseText = isHi
        ? `🚀 **${topMatch.nameHi} (${topMatch.code}) - आवेदन प्रक्रिया:**\n\n` +
          topMatch.procedure.map(p => `**चरण ${p.step}: ${p.title}**\n${p.desc}`).join('\n\n')
        : `🚀 **How to Apply for ${topMatch.name} (${topMatch.code}):**\n\n` +
          topMatch.procedure.map(p => `**Step ${p.step}: ${p.title}**\n${p.desc}`).join('\n\n');
    } else if (intent === 'eligibility') {
      responseText = isHi
        ? `🎯 **${topMatch.nameHi} (${topMatch.code}) - पात्रता मानदंड:**\n\n` +
          topMatch.eligibility.map(e => `• ${e}`).join('\n') +
          `\n\n**लक्षित लाभार्थी:** ${topMatch.targetBeneficiary}\n` +
          `**भूमि सीमा:** ${topMatch.minLand} से ${topMatch.maxLand >= 999 ? 'कोई ऊपरी सीमा नहीं' : topMatch.maxLand + ' हेक्टेयर'}`
        : `🎯 **Eligibility Criteria for ${topMatch.name} (${topMatch.code}):**\n\n` +
          topMatch.eligibility.map(e => `• ${e}`).join('\n') +
          `\n\n**Target Beneficiary:** ${topMatch.targetBeneficiary}\n` +
          `**Landholding:** ${topMatch.minLand} to ${topMatch.maxLand >= 999 ? 'No upper limit' : topMatch.maxLand + ' Hectares'}`;
    } else if (intent === 'benefits') {
      responseText = isHi
        ? `💰 **${topMatch.nameHi} (${topMatch.code}) - वित्तीय लाभ एवं सब्सिडी:**\n\n` +
          `**मुख्य लाभ:** ${topMatch.subsidyHighlight}\n\n` +
          topMatch.benefits.map(b => `• ${b}`).join('\n')
        : `💰 **Financial Benefits & Subsidy for ${topMatch.name} (${topMatch.code}):**\n\n` +
          `**Key Subsidy:** ${topMatch.subsidyHighlight}\n\n` +
          topMatch.benefits.map(b => `• ${b}`).join('\n');
    } else {
      // General Inquiry / Overview
      responseText = isHi
        ? `🌾 **${topMatch.nameHi} (${topMatch.code})**\n` +
          `🏛️ **जारीकर्ता:** ${topMatch.issuingBodyHi}\n` +
          `💰 **मुख्य सब्सिडी / लाभ:** ${topMatch.subsidyHighlight}\n` +
          `📝 **विवरण:** ${topMatch.taglineHi}\n\n` +
          `🎯 **मुख्य पात्रता:**\n` + topMatch.eligibility.slice(0, 2).map(e => `• ${e}`).join('\n') + `\n\n` +
          `📋 **दस्तावेज़:** ${topMatch.documents.slice(0, 3).join(', ')} आदि।`
        : `🌾 **${topMatch.name} (${topMatch.code})**\n` +
          `🏛️ **Issuing Authority:** ${topMatch.issuingBody}\n` +
          `💰 **Key Subsidy:** ${topMatch.subsidyHighlight}\n` +
          `📝 **Overview:** ${topMatch.tagline}\n\n` +
          `🎯 **Key Eligibility:**\n` + topMatch.eligibility.slice(0, 2).map(e => `• ${e}`).join('\n') + `\n\n` +
          `📋 **Required Documents:** ${topMatch.documents.slice(0, 3).join(', ')}, etc.`;
    }

    // Append standard verification citation
    responseText += `\n\n🛡️ *Source: KrishiSetu Verified Scheme Database (Last verified: ${topMatch.lastVerified})*`;

    return {
      text: responseText,
      actionLinks
    };
  }

  appendUserMessage(text, save = true) {
    if (save) this.saveMessageToHistory("user", text);
    const msgDiv = document.createElement("div");
    msgDiv.className = "ai-msg user";
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    msgDiv.innerHTML = `
      <div class="ai-msg-bubble">${this.escapeHtml(text)}</div>
      <div class="ai-msg-time" style="text-align: right;">${timeStr}</div>
    `;
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
  }

  appendThinkingState() {
    const msgDiv = document.createElement("div");
    msgDiv.className = "ai-msg bot";
    msgDiv.id = "aiThinkingElement";
    msgDiv.innerHTML = `
      <div class="ai-msg-bubble" style="padding: 8px 14px;">
        <div class="matrix-dot-loader">
          <div class="matrix-dot"></div>
          <div class="matrix-dot"></div>
          <div class="matrix-dot"></div>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    return msgDiv;
  }

  appendBotMessage(markdownText, isStreaming = false, save = true) {
    if (save) this.saveMessageToHistory("bot", markdownText);
    const msgDiv = document.createElement("div");
    msgDiv.className = "ai-msg bot";
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <div class="ai-msg-bubble">${this.formatMarkdown(markdownText)}</div>
      <div class="ai-msg-time">${timeStr} · Krishi Mitra AI</div>
    `;
    this.messagesContainer.appendChild(msgDiv);
    this.scrollToBottom();
    return msgDiv;
  }

  streamBotResponse(fullText, actionLinks = []) {
    this.isStreaming = true;
    this.saveMessageToHistory("bot", fullText);
    const msgDiv = document.createElement("div");
    msgDiv.className = "ai-msg bot";
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const bubble = document.createElement("div");
    bubble.className = "ai-msg-bubble";
    msgDiv.appendChild(bubble);

    const timeDiv = document.createElement("div");
    timeDiv.className = "ai-msg-time";
    timeDiv.textContent = `${timeStr} · Krishi Mitra AI`;
    msgDiv.appendChild(timeDiv);

    this.messagesContainer.appendChild(msgDiv);

    let charIdx = 0;
    const streamInterval = setInterval(() => {
      charIdx += 6;
      const currentSub = fullText.slice(0, charIdx);
      bubble.innerHTML = this.formatMarkdown(currentSub) + `<span style="display:inline-block;width:6px;height:12px;background:var(--color-primary);margin-left:2px;"></span>`;
      this.scrollToBottom();

      if (charIdx >= fullText.length) {
        clearInterval(streamInterval);
        bubble.innerHTML = this.formatMarkdown(fullText);
        this.isStreaming = false;

        // Render Action Buttons if available
        if (actionLinks && actionLinks.length > 0) {
          const linksRow = document.createElement("div");
          linksRow.style.cssText = "display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px;";
          actionLinks.forEach(link => {
            const btn = document.createElement("button");
            btn.className = "btn-primary";
            btn.style.cssText = "font-size: 0.775rem; padding: 6px 12px; border-radius: var(--radius-sm);";
            btn.textContent = link.label;
            btn.onclick = link.action;
            linksRow.appendChild(btn);
          });
          bubble.appendChild(linksRow);
        }

        this.scrollToBottom();
      }
    }, 15);
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  formatMarkdown(text) {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/• (.*?)<br>/g, '<div style="margin-left:8px;">• $1</div>');
    return html;
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

// Instantiate and attach to window
document.addEventListener("DOMContentLoaded", () => {
  window.KrishiAI = new KrishiAIAssistant();
});
