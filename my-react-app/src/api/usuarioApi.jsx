import { buildUrl } from './configApi';

export async function getUsuarios() {
  const res = await fetch(buildUrl('/usuarios'), {
    credentials: 'include',
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function getUsuario(id) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    credentials: 'include',
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function criarUsuario(usuario) {
  const res = await fetch(buildUrl('/usuarios'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(usuario),
  });

  if (!res.ok) throw res;
  return res.json();
}

export async function editarUsuario(id, usuario) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(usuario),
  });

  if (!res.ok) throw res;
  return res.json();
}

export async function deletarUsuario(id) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) throw res;
  return true;
}
