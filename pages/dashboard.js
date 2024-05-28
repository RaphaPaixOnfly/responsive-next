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
    <div className={styles['dashboard-container']}>
      <div className={styles['dashboard-row']}>
        <div className={styles['dashboard-column1']}>
          <ChartComponent
            type="doughnut"
            data={[data.geral, 100 - data.geral]}
            labels={['Desempenho Geral', '']}
          />
          <div className={styles['dashboard-percentage-label']}>{data.geral}</div>
        </div>
        <div className={styles['dashboard-column2']}>
          <div className={styles['dashboard-text-container']}>
            <h2>Geral</h2>
            <p>Texto sobre o resultado: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ipsum nec arcu varius pretium. Sed vel arcu sit amet nunc facilisis fermentum.</p>
          </div>
        </div>
      </div>
      <div className={styles['dashboard-row']}>
        <div className={styles['dashboard-column']}>
          <HorizontalBar percentage={data.operacional} />
          <h2>Operacional</h2>
          <p className={styles['dashboard-text']}>Texto aleatório sobre o tópico Operacional.</p>
        </div>
        <div className={styles['dashboard-column']}>
          <HorizontalBar percentage={data.tecauto} />
          <h2>Automação e Tecnologia</h2>
          <p className={styles['dashboard-text']}>Texto aleatório sobre o tópico Automação e Tecnologia.</p>
        </div>
        <div className={styles['dashboard-column']}>
          <HorizontalBar percentage={data.controlecustos} />
          <h2>Controle de Custos</h2>
          <p className={styles['dashboard-text']}>Texto aleatório sobre o tópico Controle de Custos.</p>
        </div>
        <div className={styles['dashboard-column']}>
          <HorizontalBar percentage={data.planejamento} />
          <h2>Planejamento</h2>
          <p className={styles['dashboard-text']}>Texto aleatório sobre o tópico Planejamento.</p>
        </div>
      </div>
    </div>
  );
}
