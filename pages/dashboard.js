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
      <div className={styles['dashboard-ranking']}>
        <div className={styles['dashboard-row']}>
          <div className={styles['dashboard-column1']}>
            <div className={styles['chart-container']}>
              <ChartComponent
                type="doughnut"
                data={[data.geral, 100 - data.geral]}
                labels={['Desempenho Geral', '']}
              />
              <div className={styles['geral']}>{data.geral}</div>
            </div>
            <div className={styles['dashboard-text-container']}>
              <h2>Desempenho Geral</h2>
              
            </div>
          </div>
        </div>
      </div>
      <div className={styles['dashboard-fundamentos']}>
        <div className={styles['dashboard-row2']}>
          <div className={styles['dashboard-column']}>
            <HorizontalBar percentage={data.notaOperacional} nota={data.operacional} topico="Operacional" />
            <p>{data.respostaOperacional}</p>
          </div>
          <div className={styles['dashboard-column']}>
            <HorizontalBar percentage={data.notaTecauto} nota={data.tecauto} topico="Tecnologia e Automação" />
            <p>{data.respostaTecauto}</p>
          </div>
        </div>
        <div className={styles['dashboard-row2']}>
          <div className={styles['dashboard-column']}>
            <HorizontalBar percentage={data.notaControlecustos} nota={data.controlecustos} topico="Controle de Custos" />
            <p>{data.respostaCusto}</p>
          </div>
          <div className={styles['dashboard-column']}>
            <HorizontalBar percentage={data.notaPlanejamento} nota={data.planejamento} topico="Planejamento" />
            <p>{data.respostaPlanejamento}</p>
          </div>
        </div>
        <div className={styles['dashboard-row2']}>
          <div className={styles['dashboard-column']}>
            <HorizontalBar percentage={data.notaSatisfacaodoviajante} nota={data.satisfacaodoviajante} topico="Satisfação do Viajante" />
            <p>{data.respostaSatisfacao}</p>
          </div>
          <div className={styles['dashboard-column']}>
            <HorizontalBar percentage={data.notaCompliance} nota={data.compliance} topico="Compliance e Políticas da Empresa" />
            <p>{data.respostaCompliance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
