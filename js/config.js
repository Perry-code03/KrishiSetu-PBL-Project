/**
 * KrishiSetu - Global Application Configuration
 */
const KrishiConfig = {
  // Default Spring Boot REST API endpoint
  apiBaseUrl: window.KRISHI_API_URL || 'http://localhost:8080/api',

  // Fallback mode when Spring Boot is offline (e.g. static host on Vercel)
  enableLocalFallback: true,

  // Storage keys
  tokenKey: 'krishi_auth_token',
  userKey: 'krishi_auth_user',
  langKey: 'krishi_lang',
  savedSchemesKey: 'krishi_saved_schemes',
  progressKey: 'krishi_app_progress',
  chatSessionKey: 'krishi_chat_session_id',
  chatHistoryKey: 'krishi_ai_chat_history'
};

if (typeof window !== 'undefined') {
  window.KrishiConfig = KrishiConfig;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = KrishiConfig;
}
