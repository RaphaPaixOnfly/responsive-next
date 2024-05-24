import corsMiddleware from '../../middleware/corsMiddleware';

let storedToken = null; // Variável global para armazenar o token

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  if (req.method === 'POST') {
    const { token } = req.body;
    if (token) {
      storedToken = token; // Armazena o token na variável global
      localStorage.setItem('auth-token', token); // Armazena o token no localStorage
      console.log('Token stored successfully:', token);
      res.status(200).json({ message: 'Token stored successfully' });
    } else {
      res.status(400).json({ error: 'Token not provided' });
    }
  } else if (req.method === 'GET') {
    const token = storedToken || localStorage.getItem('auth-token'); // Recupera o token da variável global ou do localStorage
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
