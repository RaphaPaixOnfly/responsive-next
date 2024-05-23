import { parseCookies } from 'nookies';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  console.log('Request Headers:', req.headers); // Log dos headers da requisição

  if (req.method === 'GET') {
    const cookies = parseCookies({ req });
    console.log('Parsed Cookies:', cookies); // Log dos cookies analisados

    const token = cookies['auth-token'];
    console.log('Token:', token); // Log do valor do token

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
