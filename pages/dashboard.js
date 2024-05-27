import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChartComponent from '../components/ChartComponent';
import HorizontalBar from '../components/HorizontalBar';
import styles from '../styles/Dashboard.module.css';

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

  return (
    <div className={styles.dashboard}>
      <div className={styles.row}>
        <div className={styles.column1}>
          <div className={styles.chartContainer}>
            <ChartComponent
              type="doughnut"
              data={[data.geral, 100 - data.geral]}
              labels={['Desempenho Geral', '']}
            />
          </div>
        </div>
        <div className={styles.column2}>
          <div className={styles.textContainer}>
            <p>Desempenho Geral: {data.geral}%</p>
            <p>Texto sobre o resultado: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ipsum nec arcu varius pretium. Sed vel arcu sit amet nunc facilisis fermentum.</p>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>
          <HorizontalBar percentage={data.operacional} />
          <h2>Operacional</h2>
          <p>Desempenho: {data.operacional}%</p>
        </div>
        <div className={styles.column}>
          <HorizontalBar percentage={data.tecauto} />
          <h2>Automação e Tecnologia</h2>
          <p>Desempenho: {data.tecauto}%</p>
        </div>
        <div className={styles.column}>
          <HorizontalBar percentage={data.controlecustos} />
          <h2>Controle de Custos</h2>
          <p>Desempenho: {data.controlecustos}%</p>
        </div>
        <div className={styles.column}>
          <HorizontalBar percentage={data.planejamento} />
          <h2>Planejamento</h2>
          <p>Desempenho: {data.planejamento}%</p>
        </div>
      </div>
    </div>
  );
}
