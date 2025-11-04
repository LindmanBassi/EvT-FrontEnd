import { buildUrl } from './apiConfig';

export async function getUsuarios() {
  const res = await fetch(buildUrl('/usuarios'), {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}

export async function criarUsuario({ nome, email, senha, cpf }) {
  const res = await fetch(buildUrl('/usuarios'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, cpf }),
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ao criar usuário (status ${res.status})`);
  }
  return res.json();
}

export async function editarUsuario(id, { nome, email, senha, cpf }) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha, cpf }),
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ao editar usuário (status ${res.status})`);
  }
  return res.json();
}

export async function deletarUsuario(id) {
  const res = await fetch(buildUrl(`/usuarios/${id}`), {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Erro ao deletar usuário (status ${res.status})`);
  }
  return true;
}
