import { getSession } from 'next-auth/client';
import corsMiddleware from '../../middleware/corsMiddleware';

let storedToken = null; // Variável global para armazenar o token (para fins de demonstração)

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'GET') {
    if (storedToken) {
      res.status(200).json({ token: storedToken });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
