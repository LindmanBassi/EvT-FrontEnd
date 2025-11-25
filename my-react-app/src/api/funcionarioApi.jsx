import { buildUrl } from './configApi';

function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function getFuncionarios() {
  const res = await fetch(buildUrl('/funcionarios'), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function getFuncionario(id) {
  const res = await fetch(buildUrl(`/funcionarios/${id}`), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function criarFuncionario(funcionario) {
  const res = await fetch(buildUrl('/funcionarios'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(funcionario),
  });

  if (!res.ok) throw res;
  return res.json();
}

export async function editarFuncionario(id, funcionario) {
  const res = await fetch(buildUrl(`/funcionarios/${id}`), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(funcionario),
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function deletarFuncionario(id) {
  const res = await fetch(buildUrl(`/funcionarios/${id}`), {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });
  if (!res.ok) throw res;
  return true;
}
