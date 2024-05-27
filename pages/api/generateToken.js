import { v4 as uuidv4 } from 'uuid';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method === 'POST') {
    const token = uuidv4();
    res.status(200).json({ message: 'Token generated and stored', token });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
