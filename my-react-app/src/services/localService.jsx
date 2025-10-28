export async function getLocais() {
  const res = await fetch('http://localhost:8080/locais', {});
  if (!res.ok) throw new Error('Erro ao buscar locais');
  return res.json();
}

export async function criarLocal(local) {
  const res = await fetch('http://localhost:8080/locais', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZXJlbnRlQGdtYWlsLmNvbSIsInJvbGUiOiJHRVJFTlRFIiwiZXhwIjoxNzU4ODA2NzY5fQ.6Y2FBAnKs461xlCex-QvDRs34Yg26PtWMWIulHVvxFs`,
    },
    body: JSON.stringify(local),
  });
  if (!res.ok) throw new Error('Erro ao criar local');
  return res.json();
}

export async function editarLocal(id, local) {
  const res = await fetch(`http://localhost:8080/locais/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnZXJlbnRlQGdtYWlsLmNvbSIsInJvbGUiOiJHRVJFTlQiLCJleHAiOjE3NTg4MDUyMTh9.Gc69wY1hxMlx9XZeqfqsIs9XV8hDzvcUVSfmKkIXV9s',
    },
    body: JSON.stringify(local),
  });
  if (!res.ok) throw new Error('Erro ao editar local');
  return res.json();
}

export async function deletarLocal(id) {
  const res = await fetch(`http://localhost:8080/locais/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar local');
  return true;
}
