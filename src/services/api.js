/**
 * Base API Client configured for future backend integration.
 * Currently returns mock-handled promises for purely frontend rendering.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  get: async (endpoint) => {
    // Simulated fetch - when backend is ready, replace with real fetch(`${BASE_URL}${endpoint}`)
    return { status: 200, endpoint };
  },
  post: async (endpoint, data) => {
    // Simulated post
    return { status: 201, endpoint, data };
  },
};

export default apiClient;
