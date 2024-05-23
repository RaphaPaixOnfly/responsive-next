import { setCookie, parseCookies } from 'nookies';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const { token } = req.body;
    if (token) {
      setCookie({ res }, 'auth-token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
      console.log('Token stored successfully:', token);
      res.status(200).json({ message: 'Token stored successfully' });
    } else {
      res.status(400).json({ error: 'Token not provided' });
    }
  } else if (req.method === 'GET') {
    const cookies = parseCookies({ req });
    console.log('All cookies:', cookies);
    const authToken = cookies['auth-token'];
    if (authToken) {
      res.status(200).json({ token: authToken });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
