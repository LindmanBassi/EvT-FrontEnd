import { buildUrl } from './configApi';

function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function loginUsuario(email, senha) {
  const res = await fetch(buildUrl('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, senha }),
  });

  if (!res.ok) throw res;

  const data = await res.json();

  try {
    if (data?.token) {
      localStorage.setItem('token', data.token);
    }
  } catch {}

  return data;
}

export async function logoutUsuario() {
  const res = await fetch(buildUrl('/auth/logout'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) throw res;
  return true;
}
