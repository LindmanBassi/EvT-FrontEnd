import { buildUrl } from './configApi';

function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

async function handleResponse(res) {
  if (!res.ok) {
    throw res;
  }

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  return data;
}

export async function getUsuarios() {
  const res = await fetch(buildUrl('/usuarios'), {
    credentials: 'include',
    headers: { ...authHeader() },
  });
  return handleResponse(res);
}

export async function getUsuario(id) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    credentials: 'include',
    headers: { ...authHeader() },
  });
  return handleResponse(res);
}

export async function criarUsuario(usuario) {
  const res = await fetch(buildUrl('/usuarios'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    credentials: 'include',
    body: JSON.stringify(usuario),
  });
  return handleResponse(res);
}

export async function editarUsuario(id, usuario) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    credentials: 'include',
    body: JSON.stringify(usuario),
  });
  return handleResponse(res);
}

export async function deletarUsuario(id) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'DELETE',
    credentials: 'include',
    headers: { ...authHeader() },
  });
  return handleResponse(res);
}
