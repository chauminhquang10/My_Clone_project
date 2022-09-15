// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** Change Password API - Change user password PUT /api/v1/auth/change-password */
export async function changePassword(
  body: API.ChangePasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseChangePasswordResponse>('/api/v1/auth/change-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Login API - Login with username and password POST /api/v1/auth/login */
export async function login(body: API.LoginRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseAccessTokenResponseCustom>('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Logout API - invalidate refresh token to logout POST /api/v1/auth/logout */
export async function logout(body: API.LogoutRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseLogoutResponse>('/api/v1/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Refresh token API - Refresh access token POST /api/v1/auth/refresh-token */
export async function refreshToken(
  body: API.RefreshTokenRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseAccessTokenResponseCustom>('/api/v1/auth/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Reset Password API - Reset password in the first time login or forgot password PUT /api/v1/auth/reset-password */
export async function resetPassword(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseResetPasswordResponse>('/api/v1/auth/reset-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
