import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const canchasService = {
  async getCanchas() {
    try {
      const token = localStorage.getItem("token");
      const url = API_URL + "/canchas";
      const config = {
        headers: {
          Authorization: token ? "Bearer " + token : ""
        }
      };
      const response = await axios.get(url, config);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error en servicio de canchas:", error);
      return [];
    }
  }
};
