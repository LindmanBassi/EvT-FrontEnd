import { buildUrl } from './configApi';

function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function getEventos() {
  const res = await fetch(buildUrl('/eventos'), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function getEvento(id) {
  const res = await fetch(buildUrl(`/eventos/${id}`), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function editarEvento(id, evento) {
  const res = await fetch(buildUrl(`/eventos/${id}`), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(evento),
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function criarEvento(evento) {
  const res = await fetch(buildUrl('/eventos'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(evento),
  });
  if (!res.ok) throw res;
  return res.json();
}

export async function deletarEvento(id) {
  const res = await fetch(buildUrl(`/eventos/${id}`), {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });
  if (!res.ok) throw res;
  return true;
}
