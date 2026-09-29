import axios from "axios";
import { getAccessToken } from "../../auth/session";

function createHttpClient(requireAuth = false) {
  const client = axios.create();

  client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (!token && requireAuth) {
      throw new Error("Authentication is required to access the queue API.");
    }
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return client;
}

const http = createHttpClient();
export const queueHttp = createHttpClient(true);

export default http;