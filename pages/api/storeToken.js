import corsMiddleware from '../../middleware/corsMiddleware';
import { setCookie, parseCookies } from 'nookies';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const { token } = req.body;
    if (token) {
      // Define um cookie para armazenar o token
      setCookie({ res }, 'auth-token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      console.log('Token stored successfully:', token);
      res.status(200).json({ message: 'Token stored successfully' });
    } else {
      res.status(400).json({ error: 'Token not provided' });
    }
  } else if (req.method === 'GET') {
    const cookies = parseCookies({ req });
    const token = cookies['auth-token'];
    console.log('Retrieving stored token:', token);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
