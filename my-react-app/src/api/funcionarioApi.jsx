import { buildUrl } from './configApi';

export async function getFuncionarios() {
  const res = await fetch(buildUrl('/funcionarios'), {
    credentials: 'include',
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function getFuncionario(id) {
  const res = await fetch(buildUrl(`/funcionarios/${id}`), {
    credentials: 'include',
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function criarFuncionario(funcionario) {
  const res = await fetch(buildUrl('/funcionarios'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(funcionario),
  });

  if (!res.ok) throw res;
  return res.json();
}

export async function editarFuncionario(id, funcionario) {
  const res = await fetch(buildUrl(`/funcionarios/${id}`), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(funcionario),
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function deletarFuncionario(id) {
  const res = await fetch(buildUrl(`/funcionarios/${id}`), {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw res;
  return true;
}
