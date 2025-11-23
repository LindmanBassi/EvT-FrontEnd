import { buildUrl } from './configApi';

export async function getLocais() {
  const res = await fetch(buildUrl('/locais'), {});
  if (!res.ok) throw new Error('Erro ao buscar locais');
  return res.json();
}

export async function getLocal(id) {
  const res = await fetch(buildUrl(`/locais/${id}`), {});
  if (!res.ok) throw new Error('Erro ao buscar local');
  return res.json();
}

export async function criarLocal(local) {
  const res = await fetch(buildUrl('/locais'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify(local),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Se vier erros de validação do backend
    if (data?.erros) {
      throw {
        type: 'validation',
        erros: data.erros,
      };
    }

    throw new Error(data?.mensagem || 'Erro ao criar local');
  }

  return data;
}

export async function editarLocal(id, local) {
  const res = await fetch(buildUrl(`/locais/${id}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
    body: JSON.stringify(local),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    if (data?.erros) {
      throw {
        type: 'validation',
        erros: data.erros,
      };
    }

    throw new Error(data?.mensagem || 'Erro ao editar local');
  }

  return data;
}

export async function deletarLocal(id) {
  const res = await fetch(buildUrl(`/locais/${id}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.mensagem || 'Erro ao deletar local');
  }

  return true;
}
