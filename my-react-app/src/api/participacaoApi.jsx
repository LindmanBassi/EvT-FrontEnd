import { buildUrl } from './configApi';

async function handleResponse(res) {
  if (!res.ok) {
    throw res;
  }

  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    data = null;
  }

  return data;
}

export async function participarDoEvento(tituloEvento) {
  const res = await fetch(buildUrl('/participacoes'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ tituloEvento }),
  });

  return handleResponse(res);
}

export async function getMeusEventos() {
  const res = await fetch(buildUrl('/participacoes/meus-eventos'), {
    credentials: 'include',
  });

  return handleResponse(res);
}

export async function getUsuariosPorEvento(eventoId) {
  const res = await fetch(
    buildUrl(`/participacoes/evento/${eventoId}/usuarios`),
    {
      credentials: 'include',
    },
  );

  return handleResponse(res);
}
