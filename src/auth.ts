// src/auth.ts
export async function auth() {
  const session = {
    user: {
      name: 'Usuário Teste',
      email: 'teste@leilaopro.com',
      role: 'gestor' as 'vendedor' | 'avaliador' | 'precificador' | 'gestor',
    },
  };
  return session;
}
