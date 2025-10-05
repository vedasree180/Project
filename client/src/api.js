// client/src/api.js
import axios from "axios";

// ✅ Create an Axios instance with a base URL to your backend API
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: Add interceptors (if you use JWT tokens later)
API.interceptors.request.use(
  (config) => {
    // Example: attach token if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 GET request — search NASA topics
export const searchKnowledge = async (query) => {
  try {
    const response = await API.get(`/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("❌ Search API error:", error);
    throw error;
  }
};

// 🔹 Example placeholder APIs (expand later if needed)
export const getUserDashboard = async () => {
  try {
    const response = await API.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("❌ Dashboard API error:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("❌ Login API error:", error);
    throw error;
  }
};

export const signupUser = async (data) => {
  try {
    const response = await API.post("/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error("❌ Signup API error:", error);
    throw error;
  }
};

// Export default instance for custom requests
export default API;
