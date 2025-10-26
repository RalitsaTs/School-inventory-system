export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiration: Date;
  user: {
    id: string;
    email: string;
    name?: string;
    roles: string[];
  };
}

export interface AssignRoleRequest {
  email: string;
  role: string;
}

export interface UpdateUserRoleRequest {
  role: string;
}