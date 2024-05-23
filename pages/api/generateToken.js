import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = uuidv4();
    // Enviar token para Zapier
    await axios.post('https://hooks.zapier.com/hooks/catch/18679317/3jjolmp/', { token });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating and sending token:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
