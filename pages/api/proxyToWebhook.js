import axios from 'axios';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method === 'POST') {
    try {
      const response = await axios.post('https://webhooks.gomerlin.com.br/api/v1/send', req.body);
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error proxying request:', error.message);
      res.status(error.response ? error.response.status : 500).json({
        error: 'Error proxying request',
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
