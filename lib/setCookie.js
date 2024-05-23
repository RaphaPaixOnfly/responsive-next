import { setCookie } from 'nookies';

export const setAuthCookie = (ctx, token) => {
  setCookie(ctx, 'auth-token', token, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};
