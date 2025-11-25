import { buildUrl } from './configApi';

function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}

export async function getLocais() {
  const res = await fetch(buildUrl('/locais'), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) throw new Error('Erro ao buscar locais');
  return res.json();
}

export async function getLocal(id) {
  const res = await fetch(buildUrl(`/locais/${id}`), {
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });

  if (!res.ok) throw new Error('Erro ao buscar local');
  return res.json();
}

export async function criarLocal(local) {
  const res = await fetch(buildUrl('/locais'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(local),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (data?.erros) {
      throw { type: 'validation', erros: data.erros };
    }
    throw new Error(data?.mensagem || 'Erro ao criar local');
  }

  return data;
}

export async function editarLocal(id, local) {
  const res = await fetch(buildUrl(`/locais/${id}`), {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(local),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (data?.erros) {
      throw { type: 'validation', erros: data.erros };
    }
    throw new Error(data?.mensagem || 'Erro ao editar local');
  }

  return data;
}

export async function deletarLocal(id) {
  const res = await fetch(buildUrl(`/locais/${id}`), {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      ...authHeader(),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.mensagem || 'Erro ao deletar local');
  }

  return true;
}
