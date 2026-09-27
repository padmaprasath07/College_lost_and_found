// CampusFind API Service - Connects React Frontend to Express & MongoDB Backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

/**
 * Robust fetch wrapper with timeout and JSON parsing
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[CampusFind API Error: ${endpoint}]`, err.message);
    throw err;
  }
}

export const api = {
  // Database Health Check & Diagnostics
  async checkHealth() {
    return request('/health');
  },

  // Reseed Database
  async reseedDatabase(force = true) {
    return request('/seed', {
      method: 'POST',
      body: JSON.stringify({ force }),
    });
  },

  // Get Items with Query Filters
  async getItems(params = {}) {
    const searchParams = new URLSearchParams();
    if (params.type && params.type !== 'all') searchParams.append('type', params.type);
    if (params.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params.category && params.category !== 'All') searchParams.append('category', params.category);
    if (params.location && params.location !== 'All Locations') searchParams.append('location', params.location);
    if (params.search) searchParams.append('search', params.search);

    const qs = searchParams.toString();
    return request(`/items${qs ? `?${qs}` : ''}`);
  },

  async getItemById(id) {
    return request(`/items/${id}`);
  },

  // Create Lost/Found Report
  async createItem(itemData) {
    return request('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },

  // Update Item Status
  async updateItem(id, updates) {
    return request(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete Item
  async deleteItem(id) {
    return request(`/items/${id}`, {
      method: 'DELETE',
    });
  },

  // Submit Anti-Fraud Verification Claim
  async submitClaim(claimData) {
    return request('/claims', {
      method: 'POST',
      body: JSON.stringify(claimData),
    });
  },

  // Get Claims
  async getClaims(itemId = '') {
    const qs = itemId ? `?itemId=${encodeURIComponent(itemId)}` : '';
    return request(`/claims${qs}`);
  },

  // Stats
  async getStats() {
    return request('/stats');
  },
};
