import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChartComponent from '../components/ChartComponent';
import styles from '../styles/Dashboard.module.css'; // Crie um arquivo CSS para estilizar a página

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
          setData(response.data[0]);
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

  const performanceData = [
    data.operacional,
    data.tecauto,
    data.controlecustos,
    data.planejamento,
  ];

  const performanceLabels = [
    'Operacional',
    'Automação e Tecnologia',
    'Controle de Custos',
    'Planejamento',
  ];

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.row}>
        <div className={styles.column}>
          <h2>Desempenho Geral</h2>
          <ChartComponent
            type="doughnut"
            data={[data.geral, 100 - data.geral]}
            labels={['Desempenho', 'Restante']}
          />
        </div>
        <div className={styles.column}>
          <h2>Resumo</h2>
          <p>Desempenho Geral: {data.geral}%</p>
          <p>{data.nome}, {data.empresa}</p>
        </div>
      </div>
      <div className={styles.row}>
        {performanceData.map((score, index) => (
          <div key={index} className={styles.column}>
            <h2>{performanceLabels[index]}</h2>
            <ChartComponent
              type="bar"
              data={[score, 100 - score]}
              labels={[performanceLabels[index], 'Restante']}
            />
            <p>Nota: {score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
