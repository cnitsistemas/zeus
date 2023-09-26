// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Accept': 'application/json',
  }
});

export const getBearerToken = () => {
  const sessionRoot = JSON.parse(
    window.sessionStorage.getItem("persist:root") || "{}"
  );

  const sessionUser: { [key: string]: any } = JSON.parse(sessionRoot.singin || "{}");
  const Authorization: string = `${sessionUser.auth.tokenType} ${sessionUser.auth.accessToken}`;

  return Authorization;
};

api.interceptors.request.use(
  config => {
    config.headers!['Authorization'] = getBearerToken();
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response.status

    switch (status) {
      case 401:
        throw new Error('Unauthenticated')
      case 400:
        throw new Error('Bab Request')
      case 500:
        console.error("Internal Server Error");
      default:
        return Promise.reject(error);
    }
  }
);


export default api;