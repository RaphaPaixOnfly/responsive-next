import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChartComponent from '../components/ChartComponent';
import HorizontalBar from '../components/HorizontalBar';
import styles from '../styles/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { faCog, faLaptopCode, faDollarSign, faChartLine, faSmile, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

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
    if (value < 40) {
      criteriaCounts.critical++;
    } else if (value >= 40 && value < 70) {
      criteriaCounts.development++;
    } else if (value >= 70 && value < 100) {
      criteriaCounts.accelerating++;
    } else {
      criteriaCounts.excellent++;
    }
  });

  return criteriaCounts;
};

const getMessage = (nome, geral) => {
  if (geral < 40) {
    return `${nome}, a gestão de viagens da sua empresa está <span style="color: rgba(244, 67, 54, 0.2);">crítica!</span>`;
  } else if (geral >= 40 && geral <= 69) {
    return `${nome}, sua empresa está <span style="color: rgba(200, 187, 76, 1);">regular</span> na gestão de viagens...`;
  } else if (geral >= 70 && geral <= 99) {
    return `${nome}, sua empresa está <span style="color: rgba(76, 175, 80, 0.2);">indo bem!</span>`;
  } else if (geral === 100) {
    return `${nome}, sua empresa está <span style="color: rgba(0, 134, 209, 1);">indo muito bem!</span>`;
  } else {
    return nome;
  }
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [view, setView] = useState('overview');
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
    return <div>Carregando resultados...</div>;
  }

  const criteriaCounts = calculateCriteriaCounts(data);
  
   // Encontre o tópico com a menor nota e os outros tópicos
   const scores = [
    { topic: 'Atendimento', score: data.notaOperacional },
    { topic: 'Tecnologia e Automação', score: data.notaTecauto },
    { topic: 'Controle de Custos', score: data.notaControlecustos },
    { topic: 'Planejamento', score: data.notaPlanejamento },
    { topic: 'Satisfação do Viajante', score: data.notaSatisfacaodoviajante },
    { topic: 'Compliance e Políticas', score: data.notaCompliance }
  ];

  scores.sort((a, b) => a.score - b.score);

  const lowestTopic = scores[0].topic;
  const lowestScore = scores[0].score;
  const otherTopics = scores.slice(1).map(item => item.topic);
  
  const caseData = {
    'Atendimento': {
      title: 'Case Atendimento',
      description: 'Descrição do case de atendimento.',
      image: '/path/to/atendimento.jpg', // Substitua pelo caminho real da imagem
    },
    'Tecnologia e Automação': {
      title: 'Case Tecnologia e Automação',
      description: 'Descrição do case de tecnologia e automação.',
      image: '/path/to/tecauto.jpg',
    },
    'Controle de Custos': {
      title: 'Case Controle de Custos',
      description: 'Descrição do case de controle de custos.',
      image: '/path/to/controlecustos.jpg',
    },
    'Planejamento': {
      title: 'Case Planejamento',
      description: 'Descrição do case de planejamento.',
      image: '/path/to/planejamento.jpg',
    },
    'Satisfação do Viajante': {
      title: 'Case Satisfação do Viajante',
      description: 'Descrição do case de satisfação do viajante.',
      image: '/path/to/satisfacao.jpg',
    },
    'Compliance e Políticas': {
      title: 'Case Compliance e Políticas',
      description: 'Descrição do case de compliance e políticas.',
      image: '/path/to/compliance.jpg',
    },
  };
  
  const prioritizedCase = caseData[lowestTopic];


  return (
   <>
    <div className={styles.header}>
      <h1 className={styles.title}>Diagnóstico de Gestão de Viagens</h1>
      <a href="https://www.onfly.com.br" target="_blank" rel="noopener noreferrer" className={styles.imageLink}>
        <Image
          src="/Logo branca.png" // substitua pelo caminho da sua imagem
          alt="Descrição da imagem"
          width={100} // substitua pela largura desejada
          height={25} // substitua pela altura desejada
          className={styles.responsiveImage}
        />
      </a>
    </div>
      <div className={styles['sidebar']}>
         <h3>Fundamento priorizado: </h3>
         <p className={styles['prioritized']}>{lowestTopic}</p>
         <div className={styles['other-topics']}>
           <h4>Outros Tópicos:</h4>
           {otherTopics.map((topic, index) => (
             <div key={index} className={styles['topic-item']}>
               <p>{topic}</p>
             </div>
           ))}
         </div>
       </div>
    

    
    <div className={styles['dashboard-container']}>
      <div className={styles['text-result']}>
        <h3 dangerouslySetInnerHTML={{ __html: getMessage(data.nome, data.geral) }}></h3>
      </div>
      <div className={styles['mobile-controls']}>
        <button
          className={`${styles['control-button']} ${view === 'overview' ? styles.active : ''}`}
          onClick={() => setView('overview')}
        >
          Visão geral
        </button>
        <button
          className={`${styles['control-button']} ${view === 'details' ? styles.active : ''}`}
          onClick={() => setView('details')}
        >
          Todos os fundamentos
        </button>
      </div>
      <div className={styles['dashboard-content']}>
        <div className={styles['dashboard-ranking']} style={{ display: view === 'overview' || window.innerWidth >= 768 ? 'block' : 'none' }}>
          {window.innerWidth >= 768 && <h4 className={styles['desktop-title']}>Visão Geral</h4>}
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
        <div className={styles['dashboard-fundamentos']} style={{ display: view === 'details' || window.innerWidth >= 768 ? 'block' : 'none' }}>
          {window.innerWidth >= 768 && <h4 className={styles['desktop-title']}>Todos os Fundamentos</h4>}
          <div className={styles['dashboard-row2']}>
            <div className={styles['dashboard-column']}>
                <HorizontalBar percentage={data.notaOperacional} nota={data.operacional} topico={<><FontAwesomeIcon icon={faCog} className={styles.icon} /> Atendimento</>} />
                 <p>{data.respostaOperacional}</p>
            </div>
            <div className={styles['dashboard-column']}>
                <HorizontalBar percentage={data.notaCompliance} nota={data.compliance} topico={<><FontAwesomeIcon icon={faShieldAlt} className={styles.icon} /> Compliance e Políticas</>} />
                 <p>{data.respostaCompliance}</p>
            </div>
          </div>
          <div className={styles['dashboard-row2']}>
            <div className={styles['dashboard-column']}>
                <HorizontalBar percentage={data.notaControlecustos} nota={data.controlecustos} topico={<><FontAwesomeIcon icon={faDollarSign} className={styles.icon} /> Controle de Custos</>} />
                 <p>{data.respostaCusto}</p>
            </div>
            <div className={styles['dashboard-column']}>
                <HorizontalBar percentage={data.notaPlanejamento} nota={data.planejamento} topico={<><FontAwesomeIcon icon={faChartLine} className={styles.icon} /> Planejamento</>} />
                 <p>{data.respostaPlanejamento}</p>
            </div>
          </div>
          <div className={styles['dashboard-row2']}>
            <div className={styles['dashboard-column']}>
                <HorizontalBar percentage={data.notaSatisfacaodoviajante} nota={data.satisfacaodoviajante} topico={<><FontAwesomeIcon icon={faSmile} className={styles.icon} /> Satisfação do Viajante</>}/>
                 <p>{data.respostaSatisfacao}</p>
            </div>
            <div className={styles['dashboard-column']}>
                <HorizontalBar percentage={data.notaTecauto} nota={data.tecauto} topico={<><FontAwesomeIcon icon={faLaptopCode} className={styles.icon} /> Tecnologia e Automação</>} />
                 <p>{data.respostaTecauto}</p>
            </div>
          </div>
        </div>

      </div>
      

    </div>
    <div className={styles['cases']}>
        {prioritizedCase && (
          <div className={styles['case-item']}>
            <div className={styles['case-column']}>
              <h4>{prioritizedCase.title}</h4>
              <p>{prioritizedCase.description}</p>
            </div>
            <div className={styles['case-column']}>
              <Image
                src={prioritizedCase.image}
                alt={prioritizedCase.title}
                width={200} // substitua pela largura desejada
                height={200} // substitua pela altura desejada
                className={styles.responsiveImage}
              />
            </div>
          </div>
        )}
      </div>
    </> 
  );
}
