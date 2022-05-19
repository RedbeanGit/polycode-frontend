import axios from 'axios';

export const DEFAULT_TIMEOUT = Number(process.env.DEFAULT_TIMEOUT) || 10000;
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export interface ApiResponse<T> {
  data?: T;
  status: number;
  error?: ApiError;
}

export function getHeaders(withAuth = false) {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
  }
  if (withAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
}

export async function makeRequest<T>(axiosOptions): Promise<ApiResponse<T>> {
  try {
    const response = await axios(axiosOptions);
    return { data: response.data, status: response.status };
  } catch (error) {
    if (error.response) {
      return { status: error.response.status, error: error.response.data };
    } else if (error.request) {
      return {
        status: 0,
        error: {
          statusCode: 0,
          message: 'Unknown network error',
          error: 'Unknown network error',
        },
      };
    } else {
      console.error('Something went wrong', error.message);
      return { status: -1, error: error.message };
    }
  }
}

async function makeRequestWithData<T>(
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  data: any,
  withAuth?: boolean,
): Promise<ApiResponse<T>> {
  const axiosOptions = {
    method,
    url: `${API_URL}${url}`,
    data,
    headers: getHeaders(withAuth),
    timeout: DEFAULT_TIMEOUT,
  };
  return await makeRequest<T>(axiosOptions);
}

export async function getRequest<T>(
  url: string,
  params?: any,
  withAuth?: boolean
): Promise<ApiResponse<T>> {
  const axiosOptions = {
    method: 'GET',
    url: `${API_URL}${url}`,
    params,
    headers: getHeaders(withAuth),
    timeout: DEFAULT_TIMEOUT,
  };
  return await makeRequest<T>(axiosOptions);
}

export async function postRequest<T>(
  url: string,
  data?: any,
  withAuth?: boolean
): Promise<ApiResponse<T>> {
  return await makeRequestWithData<T>('POST', url, data, withAuth);
}

export async function putRequest<T>(
  url: string,
  data?: any,
  withAuth?: boolean
): Promise<ApiResponse<T>> {
  return await makeRequestWithData<T>('PUT', url, data, withAuth);
}

export async function patchRequest<T>(
  url: string,
  data?: any,
  withAuth?: boolean
): Promise<ApiResponse<T>> {
  return await makeRequestWithData<T>('PATCH', url, data, withAuth);
}

export async function deleteRequest<T>(
  url: string,
  data?: any,
  withAuth?: boolean
): Promise<ApiResponse<T>> {
  return await makeRequestWithData<T>('DELETE', url, data, withAuth);
}