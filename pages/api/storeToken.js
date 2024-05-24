import corsMiddleware from '../../middleware/corsMiddleware';

let storedToken = null; // Variável global para armazenar o token

export default async function handler(req, res) {
  await corsMiddleware(req, res);

  if (req.method === 'POST') {
    const { token } = req.body;
    if (token) {
      storedToken = token;
      console.log('Token stored successfully:', token);
      res.status(200).json({ message: 'Token stored successfully' });
    } else {
      res.status(400).json({ error: 'Token not provided' });
    }
  } else if (req.method === 'GET') {
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
