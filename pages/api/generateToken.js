import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import corsMiddleware from '../../middleware/corsMiddleware';

let storedToken = null; // Variável global para armazenar o token

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const token = uuidv4(); // Gera um token aleatório

    try {
      // Armazena o token na variável global
      storedToken = token;

      res.status(200).json({ message: 'Token generated and stored', token });
    } catch (error) {
      console.error('Error storing token:', error.message);
      res.status(500).json({ error: 'Error storing token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
