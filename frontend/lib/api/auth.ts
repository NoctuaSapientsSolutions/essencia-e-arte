import { apiFetch } from "@/lib/api/client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
}

/** POST /auth/register */
export async function register(input: { name: string; email: string; password: string }): Promise<AuthResult> {
  return apiFetch<AuthResult>("/auth/register", { method: "POST", body: JSON.stringify(input) });
}

/** POST /auth/login */
export async function login(input: { email: string; password: string }): Promise<AuthResult> {
  return apiFetch<AuthResult>("/auth/login", { method: "POST", body: JSON.stringify(input) });
}

/** GET /auth/me */
export async function getMe(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>("/auth/me", { headers: { Authorization: `Bearer ${token}` } });
}
