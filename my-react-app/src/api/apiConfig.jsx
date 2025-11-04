// Centraliza a URL base da API para facilitar troca em um único lugar
export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

export function buildUrl(path) {
  // remove barra duplicada se necessário
  if (!path) return BASE_URL;
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
