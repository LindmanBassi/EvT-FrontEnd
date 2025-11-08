import { buildUrl } from './configApi';

export async function getUsuarios() {
  const res = await fetch(buildUrl('/usuarios'), {
    credentials: 'include',
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function criarUsuario({ nome, email, senha, cpf }) {
  const res = await fetch(buildUrl('/usuarios'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, cpf }),
    credentials: 'include',
  });
  if (!res.ok) throw res;

  return res.json();
}

export async function editarUsuario(id, { nome, email, senha, cpf }) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, cpf }),
    credentials: 'include',
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
