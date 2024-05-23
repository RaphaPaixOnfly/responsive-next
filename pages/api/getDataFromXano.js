import axios from 'axios';
import { parseCookies } from 'nookies';
import runMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await runMiddleware(req, res); // Apply CORS middleware

  if (req.method === 'GET') {
    const cookies = parseCookies({ req });
    const token = cookies['auth-token'];

    if (token) {
      try {
        // Fetch data from Xano using the stored token
        const response = await axios.get('https://xano-api-endpoint', {
          headers: { Authorization: `Bearer ${token}` },
        });
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Xano' });
      }
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
