import { setCookie } from 'nookies';

export const setAuthCookie = (ctx, token) => {
  setCookie(ctx, 'auth-token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 dias
    path: '/', // Disponível em todo o domínio
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // Apenas em HTTPS em produção
  });
};
