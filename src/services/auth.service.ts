import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const authService = {
  async login(credentials: any) {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem("CapacitorStorage.token", response.data.token);
    }
    return response.data;
  },

  async register(userData: any) {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  logout() {
    localStorage.removeItem("CapacitorStorage.token");
    window.location.href = "/login";
  }
};
