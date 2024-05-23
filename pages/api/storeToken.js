import { setAuthCookie } from '../../lib/setCookie';
import runMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await runMiddleware(req, res); // Apply CORS middleware

  if (req.method === 'POST') {
    const { token } = req.body;

    if (token) {
      // Set the token as a cookie
      setAuthCookie({ req, res }, token);
      res.status(200).json({ message: 'Token stored successfully' });
    } else {
      res.status(400).json({ error: 'Token not provided' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
