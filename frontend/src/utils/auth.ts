import { api } from './api'

export async function login(email: string, password: string) {
  const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
  return data.user
}

export async function getMe() { return api('/auth/me') }
export function logout() { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); }
