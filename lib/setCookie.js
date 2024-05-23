import { setCookie } from 'nookies';

export const setAuthCookie = (req, res, token) => {
  setCookie({ res }, 'auth-token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    sameSite: 'None', // Para permitir o envio do cookie entre diferentes domínios
    secure: true, // Certifique-se de que está usando HTTPS
  });
};
