import { API_BASE } from "./properties";

export type AuthUser = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  token?: string;
};

async function authFetch<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }
  return data as T;
}

export async function registerApi(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}) {
  const result = await authFetch<{
    success: boolean;
    data: { user: AuthUser; token: string };
  }>("/auth/register", input);
  return { ...result.data.user, token: result.data.token };
}

export async function loginApi(input: { email: string; password: string }) {
  const result = await authFetch<{
    success: boolean;
    data: { user: AuthUser; token: string };
  }>("/auth/login", input);
  return { ...result.data.user, token: result.data.token };
}
