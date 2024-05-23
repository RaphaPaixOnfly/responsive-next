// pages/api/getToken.js
import { getCookie } from 'nookies';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const token = getCookie({ req }, 'auth-token');
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
