export async function getUsuarios() {
  const res = await fetch('http://localhost:8080/usuarios', {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao buscar usuários');
  return res.json();
}
