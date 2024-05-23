import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { setAuthCookie } from '../../../lib/setCookie';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import corsMiddleware from '../../../middleware/corsMiddleware';

export default async function authHandler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  return NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        authorize: async (credentials) => {
          const user = { id: uuidv4(), name: 'J Smith', email: credentials.email };
          if (user) {
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt(token, user) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
      async session(session, token) {
        session.user.id = token.id;
        return session;
      },
    },
    events: {
      async signIn(message) {
        const token = uuidv4(); // Gera um token aleatório para cada usuário
        setAuthCookie(message.req, token);

        // Enviar token para Zapier
        try {
          await axios.post('https://hooks.zapier.com/hooks/catch/18679317/3jjolmp/', { token });
        } catch (error) {
          console.error('Error sending token to Zapier:', error.message);
        }
      },
    },
    secret: process.env.SECRET_KEY,
  });
}
