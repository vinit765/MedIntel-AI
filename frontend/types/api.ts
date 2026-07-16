export type HealthResponse = {
  status: string;
  service: string;
};

export type User = {
  id: string;
  email: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
};

export type AuthToken = {
  access_token: string;
  token_type: "bearer";
  user: User;
};
