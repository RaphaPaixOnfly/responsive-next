import { setCookie } from 'nookies';

export const setAuthCookie = (req, res, token) => {
  setCookie({ res }, 'auth-token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });
};
