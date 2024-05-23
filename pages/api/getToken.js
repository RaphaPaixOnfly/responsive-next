import { parseCookies } from 'nookies';
import corsMiddleware from '../../middleware/corsMiddleware';

export default async function handler(req, res) {
  await corsMiddleware(req, res); // Aplica o middleware CORS

  console.log('Request Method:', req.method); // Log para verificar o método da requisição
  console.log('Request Headers:', req.headers); // Log para verificar os cabeçalhos da requisição

  if (req.method === 'GET') {
    const cookies = parseCookies({ req });
    const token = cookies['auth-token'];
    console.log('Cookies:', cookies); // Log para verificar todos os cookies
    console.log('Token:', token); // Log para verificar o token

    if (token) {
      console.log('Token found, sending response:', token); // Log quando o token é encontrado
      res.status(200).json({ token });
    } else {
      console.log('Token not found, sending 404 response'); // Log quando o token não é encontrado
      res.status(404).json({ error: 'Token not found' });
    }
  } else {
    console.log('Invalid method, sending 405 response'); // Log quando o método é inválido
    res.status(405).json({ error: 'Method not allowed' });
  }
}
