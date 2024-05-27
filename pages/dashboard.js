import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      // Fazendo a requisição ao Xano usando o token como parâmetro
      axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:spr2iDvK/diagnostico_gestao_de_viagens?token=${token}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [token]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
