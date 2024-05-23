import { v4 as uuidv4 } from 'uuid';
import { setCookie } from 'nookies';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const token = uuidv4(); // Gera um token aleatório

    // Armazena o token em um cookie
    setCookie({ res }, 'auth-token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });

    res.status(200).json({ message: 'Token generated and stored', token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
