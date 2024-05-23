import axios from 'axios';
import { parseCookies } from 'nookies';

export default async function handler(req, res) {
  const cookies = parseCookies({ req });
  const token = cookies['auth-token'];

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    await axios.post('https://hooks.zapier.com/hooks/catch/18679317/3jjolmp/', { token });
    res.status(200).json({ message: 'Data sent to Zapier' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending data to Zapier', error: error.message });
  }
}
