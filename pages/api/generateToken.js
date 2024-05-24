import { v4 as uuidv4 } from 'uuid';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const token = uuidv4(); // Gera um token aleatório

    try {
      // Armazena o token no localStorage (lado do cliente)
      res.status(200).json({ message: 'Token generated successfully', token });
    } catch (error) {
      console.error('Error generating token:', error.message);
      res.status(500).json({ error: 'Error generating token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
