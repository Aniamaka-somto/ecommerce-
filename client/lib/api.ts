// lib/api.ts
// Utility functions for making authenticated API calls

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

interface RequestOptions extends RequestInit {
  token?: string;
}

async function apiRequest(endpoint: string, options: RequestOptions = {}) {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  // Add auth token if available
  const authToken =
    token ||
    (typeof window !== "undefined" ? localStorage.getItem("token") : null);
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  // Handle 401 Unauthorized
  if (response.status === 401 && typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// API methods
export const api = {
  // Auth
  signup: (data: { email: string; password: string; name: string }) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiRequest("/auth/logout", {
      method: "POST",
    }),

  getCurrentUser: () => apiRequest("/auth/me"),

  // Products
  getProducts: (params?: {
    category?: string;
    search?: string;
    page?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.page) queryParams.append("page", params.page.toString());

    const query = queryParams.toString();
    return apiRequest(`/products${query ? `?${query}` : ""}`);
  },

  getProduct: (id: string) => apiRequest(`/products/${id}`),

  // Cart
  getCart: () => apiRequest("/cart"),

  addToCart: (productId: string, quantity: number) =>
    apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),

  updateCartItem: (itemId: string, quantity: number) =>
    apiRequest(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }),

  removeFromCart: (itemId: string) =>
    apiRequest(`/cart/${itemId}`, {
      method: "DELETE",
    }),

  // Orders
  getOrders: () => apiRequest("/orders"),

  getOrder: (id: string) => apiRequest(`/orders/${id}`),

  createOrder: (data: any) =>
    apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default api;
