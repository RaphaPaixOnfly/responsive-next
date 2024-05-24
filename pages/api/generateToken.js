import { v4 as uuidv4 } from 'uuid';
import corsMiddleware from '../../middleware/corsMiddleware';

let storedToken = null;

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const token = uuidv4(); // Gera um token aleatório
    storedToken = token;
    res.status(200).json({ message: 'Token generated and stored', token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
