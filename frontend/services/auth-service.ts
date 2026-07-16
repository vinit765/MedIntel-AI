import { apiClient } from "@/lib/api-client";
import type { AuthToken, User } from "@/types/api";

export type RegisterPayload = {
  email: string;
  full_name: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function registerUser(payload: RegisterPayload): Promise<User> {
  const response = await apiClient.post<User>("/register", payload);
  return response.data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthToken> {
  const response = await apiClient.post<AuthToken>("/login", payload);
  return response.data;
}

export async function fetchCurrentUser(token: string): Promise<User> {
  const response = await apiClient.get<User>("/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
