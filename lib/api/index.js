import axios from "axios";

const api = axios.create({
  baseURL: "https://chikitsha-hub-server.vercel.app",
});

export async function getDoctorList(query) {
  const response = await api.get(`/search?searchTerm=${query}`);
  return response.data;
}
