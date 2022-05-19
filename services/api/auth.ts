import { ApiError, ApiResponse, getRequest, postRequest } from '.';
import { User } from '../../models/user';

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyRequest {
  code: string;
}

export async function me(): Promise<ApiResponse<User>> {
  return await getRequest<User>('/auth/me', {}, true);
}

export async function register(request: RegisterRequest): Promise<ApiResponse<User>> {
  return await postRequest<User>('/auth/register', request);
}

export async function login(request: LoginRequest): Promise<ApiResponse<User>> {
  const { data, status, error } = await postRequest<{
    user: User;
    token: string;
  }>('/auth/login', request);

  if (!error) {
    localStorage.setItem('token', data.token);
  }

  return { data: data?.user, status, error };
}

export async function logout(): Promise<boolean> {
  const { error } = await postRequest('/auth/logout', {}, true);

  if (error) {
    return false;
  }
  return true;
}

export async function verify(request: VerifyRequest): Promise<ApiResponse<User>> {
  const { data, status, error } = await postRequest<{
    user: User;
    token: string;
  }>('/auth/verify', request);

  if (!error) {
    localStorage.setItem('token', data.token);
  }

  return { data: data?.user, status, error };
}

export async function resend(request: LoginRequest): Promise<boolean> {
  const { error } = await postRequest('/auth/verify/resend', request);

  if (error) {
    return false;
  }
  return true;
}