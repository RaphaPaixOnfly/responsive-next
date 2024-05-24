import corsMiddleware from '../../middleware/corsMiddleware';

// Importa a variável global do storeToken.js
import { storedToken } from './storeToken';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'GET') {
    console.log('Retrieving stored token:', storedToken);
    if (storedToken) {
      res.status(200).json({ token: storedToken });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
