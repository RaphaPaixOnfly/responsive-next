import { getSession } from 'next-auth/react';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method === 'GET') {
    const session = await getSession({ req });

    if (session) {
      const token = session.token; // ajuste aqui para pegar o token da sessão
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
