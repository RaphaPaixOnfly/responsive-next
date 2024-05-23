import { setCookie } from 'nookies';

export const setAuthCookie = (req, res, token) => {
  setCookie({ res }, 'auth-token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax', // Isso pode ajudar a permitir o envio do cookie em diferentes domínios
    secure: process.env.NODE_ENV === 'production', // Envia cookies apenas por HTTPS em produção
  });
};
