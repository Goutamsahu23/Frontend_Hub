// src/services/auth.js
import api, { setAuthToken } from "./api";

export async function register(payload) {
  const res = await api.post("/api/auth/register", payload);
  // response contains token & user fields per backend
  if (res.data && res.data.token) setAuthToken(res.data.token);
  return res.data;
}

export async function login(payload) {
  const res = await api.post("/api/auth/login", payload);
  if (res.data && res.data.token) setAuthToken(res.data.token);
  return res.data;
}

export function logout() {
  setAuthToken(null);
  if (typeof window !== "undefined") window.location.href = "/";
}
