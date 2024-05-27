import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const { token } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token) {
      // Fazer a requisição GET ao Xano usando o token
      axios.get(`https://xano-api-url/endpoint?token=${token}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data from Xano:', error.message);
        });
    }
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>
      {data ? (
        <div>
          <h2>Dados do Xano:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
