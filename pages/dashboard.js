import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChartComponent from '../components/ChartComponent';
import HorizontalBar from '../components/HorizontalBar';
import styles from '../styles/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';

const calculateCriteriaCounts = (data) => {
  const criteriaCounts = {
    critical: 0,
    development: 0,
    accelerating: 0,
    excellent: 0,
  };

  const criteriaValues = [
    data.notaOperacional,
    data.notaTecauto,
    data.notaControlecustos,
    data.notaPlanejamento,
    data.notaSatisfacaodoviajante,
    data.notaCompliance,
  ];

  criteriaValues.forEach(value => {
    if (value < 39) {
      criteriaCounts.critical++;
    } else if (value >= 40 && value < 69) {
      criteriaCounts.development++;
    } else if (value >= 70 && value < 99) {
      criteriaCounts.accelerating++;
    } else {
      criteriaCounts.excellent++;
    }
  });

  return criteriaCounts;
};

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

  const criteriaCounts = calculateCriteriaCounts(data);

  return (
    <div className={styles['dashboard-container']}>
      <div className={styles['dashboard-ranking']}>
        <div className={styles['dashboard-row']}>
          <div className={styles['dashboard-column1']}>
            <div className={styles['chart-container']}>
              <ChartComponent
                type="radar"
                data={[
                  data.notaOperacional,
                  data.notaTecauto,
                  data.notaControlecustos,
                  data.notaPlanejamento,
                  data.notaSatisfacaodoviajante,
                  data.notaCompliance
                ]}
                labels={[
                  'Operacional',
                  'Tecnologia e Automação',
                  'Controle de Custos',
                  'Planejamento',
                  'Satisfação do Viajante',
                  'Compliance e Políticas'
                ]}
                geral={data.geral}
              />
              <div className={styles['geral']}>{data.geral}</div>
            </div>
            <div className={styles['dashboard-text-container']}>
              <h4>Distribuição dos critérios</h4>
              <div className={styles['text-with-icon']}>
                <FontAwesomeIcon icon={faCircle} className={styles.criticalIcon} />
                <p className={styles.critical}>CRÍTICO</p>
                <span className={`${styles['text-count']} ${styles.critical}`}>{criteriaCounts.critical}</span>
              </div>
              <div className={styles['text-with-icon']}>
                <FontAwesomeIcon icon={faCircle} className={styles.developmentIcon} />
                <p className={styles.development}>DESENVOLVIMENTO</p>
                <span className={`${styles['text-count']} ${styles.development}`}>{criteriaCounts.development}</span>
              </div>
              <div className={styles['text-with-icon']}>
                <FontAwesomeIcon icon={faCircle} className={styles.acceleratingIcon} />
                <p className={styles.accelerating}>ACELERANDO</p>
                <span className={`${styles['text-count']} ${styles.accelerating}`}>{criteriaCounts.accelerating}</span>
              </div>
              <div className={styles['text-with-icon']}>
                <FontAwesomeIcon icon={faCircle} className={styles.excellentIcon} />
                <p className={styles.excellent}>ÓTIMO</p>
                <span className={`${styles['text-count']} ${styles.excellent}`}>{criteriaCounts.excellent}</span>
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
            <HorizontalBar percentage={data.notaOperacional} nota={data.operacional} topico="Operação" />
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
