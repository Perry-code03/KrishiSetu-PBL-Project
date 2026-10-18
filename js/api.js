/**
 * KrishiSetu - Centralized API Service Wrapper & Client-Side Auth State
 * Handles communication with the Spring Boot backend, JWT token management,
 * graceful offline fallback, and guest-to-account synchronization.
 */

const KrishiApi = (function () {
  const config = window.KrishiConfig || {
    apiBaseUrl: 'http://localhost:8080/api',
    tokenKey: 'krishi_auth_token',
    userKey: 'krishi_auth_user',
    langKey: 'krishi_lang',
    savedSchemesKey: 'krishi_saved_schemes',
    progressKey: 'krishi_app_progress'
  };

  let backendAvailable = null;

  // Helper to get token
  function getToken() {
    try {
      return localStorage.getItem(config.tokenKey);
    } catch (e) {
      return null;
    }
  }

  // Helper to set token
  function setToken(token) {
    if (token) {
      localStorage.setItem(config.tokenKey, token);
    } else {
      localStorage.removeItem(config.tokenKey);
    }
  }

  // Get current stored user object
  function getCurrentUser() {
    try {
      const u = localStorage.getItem(config.userKey);
      return u ? JSON.parse(u) : null;
    } catch (e) {
      return null;
    }
  }

  // Set stored user object
  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem(config.userKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(config.userKey);
    }
  }

  function isLoggedIn() {
    return !!getToken() && !!getCurrentUser();
  }

  // Check if backend is reachable (cached with short TTL)
  async function checkBackendOnline() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${config.apiBaseUrl}/categories`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      backendAvailable = res.ok;
      return backendAvailable;
    } catch (e) {
      backendAvailable = false;
      return false;
    }
  }

  // Universal Request wrapper
  async function request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${config.apiBaseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers || {})
    };

    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        setToken(null);
        setCurrentUser(null);
        // Only redirect to login if attempting a protected request
        if (endpoint.includes('/me') || endpoint.includes('/users/me')) {
          const currentPage = encodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
          window.location.href = `login.html?next=${currentPage}`;
        }
        return { success: false, status: 401, error: { message: 'Authentication required. Please log in.' } };
      }

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorDetails = data && data.error ? data.error : { message: `Request failed with status ${response.status}` };
        return { success: false, status: response.status, error: errorDetails };
      }

      return data;
    } catch (err) {
      backendAvailable = false;
      return {
        success: false,
        offline: true,
        error: { message: 'Network error: Backend server is not reachable.', original: err }
      };
    }
  }

  return {
    getToken,
    setToken,
    getCurrentUser,
    setCurrentUser,
    isLoggedIn,
    checkBackendOnline,
    isBackendOnline: () => backendAvailable,

    // Core HTTP Methods
    get: (endpoint, headers) => request(endpoint, { method: 'GET', headers }),
    post: (endpoint, body, headers) => request(endpoint, { method: 'POST', body: JSON.stringify(body), headers }),
    put: (endpoint, body, headers) => request(endpoint, { method: 'PUT', body: JSON.stringify(body), headers }),
    delete: (endpoint, body, headers) => request(endpoint, { method: 'DELETE', body: body ? JSON.stringify(body) : undefined, headers }),

    // Authentication Services
    async register(data) {
      const res = await request('/auth/register', { method: 'POST', body: JSON.stringify(data) });
      if (res.success && res.data && res.data.token) {
        setToken(res.data.token);
        setCurrentUser(res.data.user);
      }
      return res;
    },

    async login(login, password, rememberMe = false) {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ login, password, rememberMe })
      });
      if (res.success && res.data && res.data.token) {
        setToken(res.data.token);
        setCurrentUser(res.data.user);
      }
      return res;
    },

    async logout() {
      try {
        await request('/auth/logout', { method: 'POST' });
      } catch (ignored) {}
      setToken(null);
      setCurrentUser(null);
    },

    async fetchCurrentUser() {
      if (!getToken()) return null;
      const res = await request('/auth/me', { method: 'GET' });
      if (res.success && res.data) {
        setCurrentUser(res.data);
        return res.data;
      }
      return null;
    },

    async forgotPassword(login) {
      return request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ login }) });
    },

    async resetPassword(token, newPassword) {
      return request('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) });
    },

    async updateProfile(profileData) {
      const res = await request('/users/me', { method: 'PUT', body: JSON.stringify(profileData) });
      if (res.success && res.data) {
        setCurrentUser(res.data);
      }
      return res;
    },

    async changePassword(currentPassword, newPassword) {
      return request('/users/me/password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) });
    },

    // Schemes Directory with Offline Fallback
    async getSchemes(params = {}) {
      const query = new URLSearchParams(params).toString();
      const endpoint = `/schemes${query ? '?' + query : ''}`;
      const res = await request(endpoint, { method: 'GET' });

      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }

      // Fallback to bundled js/schemes-data.js
      if (typeof window.SCHEMES_DATA !== 'undefined') {
        let list = [...window.SCHEMES_DATA];
        if (params.category && params.category !== 'all') {
          list = list.filter(s => s.category === params.category || (s.category && s.category.toLowerCase().includes(params.category.toLowerCase())));
        }
        if (params.q) {
          const q = params.q.toLowerCase().trim();
          list = list.filter(s =>
            s.name.toLowerCase().includes(q) ||
            (s.nameHi && s.nameHi.includes(q)) ||
            (s.tagline && s.tagline.toLowerCase().includes(q)) ||
            (s.keywords && s.keywords.some(k => k.toLowerCase().includes(q)))
          );
        }
        return list;
      }
      return [];
    },

    async getSchemeDetail(slug) {
      const res = await request(`/schemes/${slug}`, { method: 'GET' });
      if (res.success && res.data) {
        return res.data;
      }
      // Fallback
      if (typeof window.SCHEMES_DATA !== 'undefined') {
        return window.SCHEMES_DATA.find(s => s.id === slug || s.code === slug) || null;
      }
      return null;
    },

    // User Bookmarks (API when logged in, LocalStorage when guest)
    async getSavedSchemes() {
      if (isLoggedIn()) {
        const res = await request('/me/saved', { method: 'GET' });
        if (res.success && Array.isArray(res.data)) {
          return res.data.map(s => s.id);
        }
      }
      // Guest localStorage fallback
      try {
        const saved = localStorage.getItem(config.savedSchemesKey);
        return saved ? JSON.parse(saved) : ['pm-kisan', 'pmfby', 'kcc'];
      } catch (e) {
        return ['pm-kisan', 'pmfby', 'kcc'];
      }
    },

    async saveScheme(schemeId) {
      if (isLoggedIn()) {
        const res = await request(`/me/saved/${schemeId}`, { method: 'POST' });
        return res.success;
      }
      // Guest mode
      try {
        const saved = await this.getSavedSchemes();
        if (!saved.includes(schemeId)) {
          saved.push(schemeId);
          localStorage.setItem(config.savedSchemesKey, JSON.stringify(saved));
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    async removeSavedScheme(schemeId) {
      if (isLoggedIn()) {
        const res = await request(`/me/saved/${schemeId}`, { method: 'DELETE' });
        return res.success;
      }
      // Guest mode
      try {
        let saved = await this.getSavedSchemes();
        saved = saved.filter(id => id !== schemeId);
        localStorage.setItem(config.savedSchemesKey, JSON.stringify(saved));
        return true;
      } catch (e) {
        return false;
      }
    },

    async mergeGuestSaved(schemeIds) {
      if (!isLoggedIn() || !schemeIds || !schemeIds.length) return;
      return request('/me/saved/merge', { method: 'POST', body: JSON.stringify({ schemeIds }) });
    },

    // Kanban Application Tracker (API when logged in, LocalStorage when guest)
    async getProgress() {
      if (isLoggedIn()) {
        const res = await request('/me/progress', { method: 'GET' });
        if (res.success && Array.isArray(res.data)) {
          return res.data;
        }
      }
      // Guest fallback
      try {
        const p = localStorage.getItem(config.progressKey);
        return p ? JSON.parse(p) : [];
      } catch (e) {
        return [];
      }
    },

    async updateProgress(schemeId, status, notes = '') {
      if (isLoggedIn()) {
        const res = await request(`/me/progress/${schemeId}`, {
          method: 'PUT',
          body: JSON.stringify({ status, notes })
        });
        return res.success;
      }
      // Guest mode
      try {
        const progressList = await this.getProgress();
        const existing = progressList.find(x => x.schemeId === schemeId);
        if (existing) {
          existing.status = status;
          if (notes) existing.notes = notes;
        } else {
          progressList.push({ schemeId, status, notes, updatedAt: new Date().toISOString() });
        }
        localStorage.setItem(config.progressKey, JSON.stringify(progressList));
        return true;
      } catch (e) {
        return false;
      }
    },

    async mergeGuestProgress(progressList) {
      if (!isLoggedIn() || !progressList || !progressList.length) return;
      return request('/me/progress/merge', { method: 'POST', body: JSON.stringify({ progressList }) });
    },

    // Eligibility History
    async recordEligibility(answers, matchedSchemeIds) {
      if (isLoggedIn()) {
        return request('/me/eligibility', { method: 'POST', body: JSON.stringify({ answers, matchedSchemeIds }) });
      }
      return null;
    },

    // AI Assistant Grounded Chat
    async sendChatMessage(message, sessionId, preferredLanguage) {
      return request('/assistant/chat', {
        method: 'POST',
        body: JSON.stringify({ message, sessionId, preferredLanguage })
      });
    }
  };
})();

if (typeof window !== 'undefined') {
  window.KrishiApi = KrishiApi;
}
