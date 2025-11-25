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

export async function participarDoEvento(tituloEvento) {
  const res = await fetch(buildUrl('/participacoes'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify({ tituloEvento }),
  });

  return handleResponse(res);
}

export async function getMeusEventos() {
  const res = await fetch(buildUrl('/participacoes/meus-eventos'), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });

  return handleResponse(res);
}

export async function getUsuariosPorEvento(eventoId) {
  const res = await fetch(
    buildUrl(`/participacoes/evento/${eventoId}/usuarios`),
    {
      credentials: 'include',
      headers: {
        ...authHeader(),
      },
    },
  );

  return handleResponse(res);
}
