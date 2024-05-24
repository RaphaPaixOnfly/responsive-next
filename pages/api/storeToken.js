import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const { token } = req.body;
    if (token) {
      localStorage.setItem('auth-token', token); // Armazena o token no localStorage
      console.log('Token stored successfully:', token);
      res.status(200).json({ message: 'Token stored successfully' });
    } else {
      res.status(400).json({ error: 'Token not provided' });
    }
  } else if (req.method === 'GET') {
    const token = localStorage.getItem('auth-token');
    console.log('Retrieving stored token:', token);
    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
