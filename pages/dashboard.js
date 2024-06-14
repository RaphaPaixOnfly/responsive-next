import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChartComponent from '../components/ChartComponent';
import HorizontalBar from '../components/HorizontalBar';
import styles from '../styles/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';
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
            type="radar"
            data={[data.notaOperacional, data.notaTecauto, data.notaControlecustos, data.notaPlanejamento, data.notaSatisfacaodoviajante, data.notaCompliance]}
            labels={['Operacional', 'Tecnologia e Automação', 'Controle de Custos', 'Planejamento', 'Satisfação do Viajante', 'Compliance e Políticas']}
            geral={data.geral} // Passando a nota geral
          />
          <div className={styles['geral']}>{data.geral}</div>
          </div>
          <div className={styles['dashboard-text-container']}>
      <h4>Distribuição dos critérios</h4>
      <div className={styles['text-with-icon']}>
        <FontAwesomeIcon icon={faCircle} className={styles.criticalIcon} />
        <p className={styles.critical}>CRÍTICO</p>
      </div>
      <div className={styles['text-with-icon']}>
        <FontAwesomeIcon icon={faCircle} className={styles.developmentIcon} />
        <p className={styles.development}>DESENVOLVIMENTO</p>
      </div>
      <div className={styles['text-with-icon']}>
        <FontAwesomeIcon icon={faCircle} className={styles.acceleratingIcon} />
        <p className={styles.accelerating}>ACELERANDO</p>
      </div>
      <div className={styles['text-with-icon']}>
        <FontAwesomeIcon icon={faCircle} className={styles.excellentIcon} />
        <p className={styles.excellent}>ÓTIMO</p>
      </div>
      <h4>Ranking</h4>
      <div className={styles['text-with-lock']}>
        <p>Geral</p>
        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
      </div>
      <div className={styles['text-with-lock']}>
        <p>Mesma indústria</p>
        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
      </div>
      <div className={styles['text-with-lock']}>
        <p>Mesmo porte</p>
        <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
      </div>
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
