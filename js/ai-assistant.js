/**
 * KrishiSetu - Grounded RAG-based AI Assistant ("Krishi Mitra / कृषि मित्र")
 * Strict retrieval over SCHEMES_DATA, animated thinking states,
 * matrix-dot-loader, streaming text, contextual deep links, and user state awareness.
 */

class KrishiAIAssistant {
  constructor() {
    this.isOpen = false;
    this.isStreaming = false;
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

    // Initial greeting if empty
    if (this.messagesContainer && this.messagesContainer.children.length === 0) {
      this.renderGreeting();
    }
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
    const isHi = AppState.currentLang === 'hi';
    const query = isHi 
      ? `मुझे ${scheme.nameHi} के बारे में संपूर्ण विवरण और पात्रता बताएं।`
      : `Explain the eligibility, benefits, and documents required for ${scheme.name}.`;
    this.sendMessage(query, scheme);
  }

  renderGreeting() {
    const isHi = AppState.currentLang === 'hi';
    const greetingText = isHi
      ? `नमस्ते! 🙏 मैं **कृषि मित्र** हूँ, आपका AI कृषि सहायक। मैं भारत सरकार व एनजीओ की 36+ योजनाओं, सब्सिडी दरों, आवश्यक दस्तावेज़ों और आवेदन प्रक्रिया की सटीक जानकारी देता हूँ। आप मुझसे क्या पूछना चाहते हैं?`
      : `Hello! 🙏 I am **Krishi Mitra**, your verified AI agricultural assistant. I provide 100% grounded answers regarding subsidies, required documents, eligibility, and step-by-step procedures for 36+ welfare schemes. How can I help you today?`;

    this.appendBotMessage(greetingText, false);
  }

  handleUserSend() {
    const text = this.inputField.value.trim();
    if (!text || this.isStreaming) return;

    this.inputField.value = "";
    this.sendMessage(text);
  }

  sendMessage(userQuery, injectedScheme = null) {
    // Render user message
    this.appendUserMessage(userQuery);

    // Render Thinking State with Matrix Dot Loader (Transitions.dev)
    const thinkingElement = this.appendThinkingState();

    // RAG Search & Retrieval Step
    setTimeout(() => {
      thinkingElement.remove();
      const response = this.generateGroundedResponse(userQuery, injectedScheme);
      this.streamBotResponse(response.text, response.actionLinks);
    }, 700);
  }

  generateGroundedResponse(query, forcedScheme = null) {
    const q = query.toLowerCase();
    const isHi = AppState.currentLang === 'hi';

    // Check if user is asking about their saved schemes or progress
    if (q.includes("saved") || q.includes("progress") || q.includes("status") || q.includes("मेरे") || q.includes("डैशबोर्ड")) {
      const savedCount = AppState.savedSchemeIds.length;
      if (savedCount === 0) {
        return {
          text: isHi
            ? `आपके डैशबोर्ड में वर्तमान में कोई योजना सहेजी नहीं गई है। आप कैटलॉग से दिल (❤️) आइकन दबाकर योजनाएं सहेज सकते हैं।`
            : `You do not have any saved schemes in your Dashboard yet. Click the heart (❤️) icon on any scheme card to bookmark it and track your application progress.`
        };
      }

      const savedSchemes = AppState.savedSchemeIds.map(id => SCHEMES_DATA.find(x => x.id === id)).filter(Boolean);
      let progressReport = isHi ? `आपके डैशबोर्ड में **${savedCount} योजनाएं** सहेजी गई हैं:\n\n` : `You have **${savedCount} schemes saved** in your personal tracker:\n\n`;

      savedSchemes.forEach(s => {
        const status = AppState.applicationTracker[s.id] || "not_started";
        const statusLabel = {
          not_started: isHi ? "शुरू नहीं हुआ" : "Not Started",
          docs_pending: isHi ? "दस्तावेज़ लंबित" : "Documents Pending",
          applied: isHi ? "आधिकारिक पोर्टल पर आवेदन किया" : "Applied on Portal",
          approved: isHi ? "स्वीकृत / सक्रिय" : "Approved / Active"
        }[status];

        progressReport += `• **${isHi ? s.nameHi : s.name}**: स्थिति = *${statusLabel}* (${s.subsidyHighlight})\n`;
      });

      return {
        text: progressReport,
        actionLinks: [{ label: isHi ? "डैशबोर्ड खोलें" : "Open Dashboard", action: () => {
          document.getElementById("dashboardSection").scrollIntoView({ behavior: 'smooth' });
          this.toggleOpen(false);
        }}]
      };
    }

    // Find scheme matches in SCHEMES_DATA
    let matchedScheme = forcedScheme;
    if (!matchedScheme) {
      matchedScheme = SCHEMES_DATA.find(s => 
        q.includes(s.id) ||
        q.includes(s.code.toLowerCase()) ||
        q.includes(s.name.toLowerCase()) ||
        (s.nameHi && q.includes(s.nameHi)) ||
        (q.includes("pm kisan") && s.id === "pm-kisan") ||
        (q.includes("fasal bima") && s.id === "pmfby") ||
        (q.includes("crop insurance") && s.id === "pmfby") ||
        (q.includes("kcc") && s.id === "kcc") ||
        (q.includes("kisan credit card") && s.id === "kcc") ||
        (q.includes("kusum") && s.id === "pm-kusum") ||
        (q.includes("solar") && s.id === "pm-kusum") ||
        (q.includes("drone") && s.id === "namo-drone-didi") ||
        (q.includes("soil") && s.id === "soil-health-card") ||
        (q.includes("organic") && s.id === "pkvy") ||
        (q.includes("dairy") && s.id === "rashtriya-gokul-mission") ||
        (q.includes("tractor") && s.id === "smam") ||
        (q.includes("machinery") && s.id === "smam") ||
        (q.includes("fish") && s.id === "pmmsy") ||
        (q.includes("pond") && s.id === "mgnrega-farm-pond") ||
        (q.includes("tata") && s.id === "tata-trusts-lakhpati") ||
        (q.includes("itc") && s.id === "itc-sunehra-kal")
      );
    }

    if (matchedScheme) {
      let responseText = "";
      if (q.includes("document") || q.includes("दस्तावेज़") || q.includes("कागजात")) {
        responseText = isHi
          ? `**${matchedScheme.nameHi}** के लिए आवश्यक दस्तावेज़:\n\n` + matchedScheme.documents.map(d => `• ${d}`).join('\n') + `\n\n📌 *सलाह: आप योजना विवरण में जाकर इसका चेकलिस्ट प्रिंट भी कर सकते हैं।*`
          : `**Required Documents for ${matchedScheme.name}:**\n\n` + matchedScheme.documents.map(d => `• ${d}`).join('\n') + `\n\n💡 *Tip: You can print a formatted physical checklist from the scheme details modal.*`;
      } else if (q.includes("step") || q.includes("how to apply") || q.includes("procedure") || q.includes("आवेदन") || q.includes("प्रक्रिया")) {
        responseText = isHi
          ? `**${matchedScheme.nameHi} - आवेदन करने के चरण:**\n\n` + matchedScheme.procedure.map(p => `**चरण ${p.step}: ${p.title}**\n${p.desc}`).join('\n\n')
          : `**Step-by-Step Application Procedure for ${matchedScheme.name}:**\n\n` + matchedScheme.procedure.map(p => `**Step ${p.step}: ${p.title}**\n${p.desc}`).join('\n\n');
      } else {
        responseText = isHi
          ? `**${matchedScheme.nameHi} (${matchedScheme.code})**\n` +
            `🏛️ **जारीकर्ता:** ${matchedScheme.issuingBodyHi}\n` +
            `💰 **सब्सिडी/लाभ:** ${matchedScheme.subsidyHighlight}\n\n` +
            `🎯 **पात्रता मुख्य बिंदु:**\n` + matchedScheme.eligibility.slice(0, 2).map(e => `• ${e}`).join('\n') + `\n\n` +
            `📄 **आवश्यक दस्तावेज़:** ${matchedScheme.documents.slice(0, 3).join(", ")} आदि।\n\n` +
            `🔍 *सत्यापित तिथि: ${matchedScheme.lastVerified}*`
          : `**${matchedScheme.name} (${matchedScheme.code})**\n` +
            `🏛️ **Authority:** ${matchedScheme.issuingBody}\n` +
            `💰 **Key Subsidy:** ${matchedScheme.subsidyHighlight}\n\n` +
            `🎯 **Eligibility Criteria:**\n` + matchedScheme.eligibility.slice(0, 2).map(e => `• ${e}`).join('\n') + `\n\n` +
            `📄 **Documents Required:** ${matchedScheme.documents.slice(0, 3).join(", ")}, etc.\n\n` +
            `🛡️ *Official Verification: ${matchedScheme.lastVerified}*`;
      }

      return {
        text: responseText,
        actionLinks: [
          {
            label: isHi ? "सम्पूर्ण विवरण व चेकलिस्ट देखें" : "View Full Step Guide & Checklist",
            action: () => openSchemeDetail(matchedScheme.id)
          },
          {
            label: isHi ? "आधिकारिक पोर्टल ↗" : "Official Portal ↗",
            action: () => window.open(matchedScheme.officialUrl, "_blank")
          }
        ]
      };
    }

    // Default grounded fallback (Strict anti-hallucination)
    return {
      text: isHi
        ? `मुझे आपके प्रश्न के अनुसार डेटाबेस में कोई विशिष्ट योजना नहीं मिली।\n\nमैं कृषि सेतु का आधिकारिक AI सहायक हूँ, जो केवल सत्यापित केंद्रीय/राज्य/एनजीओ योजनाओं (जैसे पीएम-किसान, केसीसी, फसल बीमा, कुसुम, ड्रिप सिंचाई) की जानकारी प्रदान करता हूँ।\n\nकृपया योजना का नाम, फसल, या कृषि उपकरण लिखकर पुनः पूछें।`
        : `I could not locate an exact match for that query in our verified agricultural database.\n\nAs a grounded assistant, I strictly avoid guessing subsidy figures or eligibility terms. You can ask me about:\n• Income support (PM-KISAN, Maan-Dhan)\n• Crop Insurance (PMFBY)\n• Loans (KCC 4% interest)\n• Solar pumps (PM-KUSUM 60% subsidy)\n• Farm machinery (SMAM, Drone Didi)\n• Or type "my saved schemes" to check your application progress.`
    };
  }

  appendUserMessage(text) {
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

  appendBotMessage(markdownText, isStreaming = false) {
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

    // Stream character by character with blinking cursor
    let charIdx = 0;
    const streamInterval = setInterval(() => {
      charIdx += 4;
      const currentSub = fullText.slice(0, charIdx);
      bubble.innerHTML = this.formatMarkdown(currentSub) + `<span style="display:inline-block;width:6px;height:12px;background:var(--color-primary);margin-left:2px;animation:pulse-ring 0.8s infinite;"></span>`;
      this.scrollToBottom();

      if (charIdx >= fullText.length) {
        clearInterval(streamInterval);
        bubble.innerHTML = this.formatMarkdown(fullText);
        this.isStreaming = false;

        // Render Action Buttons if available
        if (actionLinks && actionLinks.length > 0) {
          const linksRow = document.createElement("div");
          linksRow.style.cssText = "display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px;";
          actionLinks.forEach(link => {
            const btn = document.createElement("button");
            btn.className = "btn-primary";
            btn.style.cssText = "font-size: 0.75rem; padding: 5px 10px; border-radius: 6px;";
            btn.textContent = link.label;
            btn.onclick = link.action;
            linksRow.appendChild(btn);
          });
          bubble.appendChild(linksRow);
        }

        this.scrollToBottom();
      }
    }, 20);
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
