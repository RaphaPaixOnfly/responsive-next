import { v4 as uuidv4 } from 'uuid';
import { setAuthCookie } from '../../lib/setCookie';
import axios from 'axios';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const token = uuidv4(); // Gera um token aleatório

    // Armazena o token como um cookie
    setAuthCookie({ req, res }, token);

    // Envia o token para Zapier
    try {
      await axios.post('https://hooks.zapier.com/hooks/catch/18679317/3jjolmp/', { token });
      res.status(200).json({ message: 'Token generated and sent to Zapier', token });
    } catch (error) {
      console.error('Error sending token to Zapier:', error.message);
      res.status(500).json({ error: 'Error sending token to Zapier' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
