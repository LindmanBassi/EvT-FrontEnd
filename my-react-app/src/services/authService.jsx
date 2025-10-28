export async function loginUsuario(email, senha) {
  const res = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error('E-mail ou senha inválidos.');
  const data = await res.json();
  try {
    if (data?.token) localStorage.setItem('token', data.token);
  } catch {}
  return data;
}

export async function cadastrarUsuario({ nome, email, senha, cpf }) {
  const res = await fetch('http://localhost:8080/auth/cadastro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nome, email, senha, cpf }),
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(text || `Erro ao criar conta (status ${res.status})`);
    err.status = res.status;
    throw err;
  }
  try {
    return await res.json();
  } catch {
    return true;
  }
}

export async function cadastrarFuncionario({
  nome,
  email,
  cpf,
  senha,
  cargo,
  departamento,
}) {
  const res = await fetch('http://localhost:8080/auth/funcionarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nome, email, cpf, senha, cargo, departamento }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Erro ao cadastrar funcionário');
  }
  return true;
}

export async function logoutUsuario() {
  const res = await fetch('http://localhost:8080/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao fazer logout');
  return true;
}
