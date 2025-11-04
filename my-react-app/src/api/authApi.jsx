import { buildUrl } from './apiConfig';

export async function loginUsuario(email, senha) {
  const res = await fetch(buildUrl('/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error('E-mail ou senha inválidos.');
  const data = await res.json();
  try {
    if (data?.token) localStorage.setItem('token', data.token);
  } catch {}
  return data;
}

export async function logoutUsuario() {
  const res = await fetch(buildUrl('/auth/logout'), {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao fazer logout');
  return true;
}
