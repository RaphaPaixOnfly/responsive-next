import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import corsMiddleware from '../../middleware/corsMiddleware';
import { setCookie } from 'nookies';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const token = uuidv4(); // Gera um token aleatório

    // Define um cookie para armazenar o token
    setCookie({ res }, 'auth-token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    try {
      // Envia o token para o endpoint storeToken
      await axios.post('https://responsive-next.vercel.app/api/storeToken', { token });

      res.status(200).json({ message: 'Token generated and sent to storeToken', token });
    } catch (error) {
      console.error('Error sending token to storeToken:', error.message);
      res.status(500).json({ error: 'Error sending token to storeToken' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
