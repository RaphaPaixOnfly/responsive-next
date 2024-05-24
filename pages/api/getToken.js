import corsMiddleware from '../../middleware/corsMiddleware';

let storedToken = null;

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'GET') {
    const token = storedToken;
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
