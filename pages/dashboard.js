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
    return `${nome}, a gestão de viagens da sua empresa está <span style="color: rgb(244, 67, 54);">crítica!</span>`;
  } else if (geral >= 40 && geral <= 69) {
    return `${nome}, sua empresa está <span style="color: #ffaa00;">regular</span> na gestão de viagens...`;
  } else if (geral >= 70 && geral <= 99) {
    return `${nome}, sua empresa está <span style="color: rgb(76, 175, 80);">indo bem!</span>`;
  } else if (geral === 100) {
    return `${nome}, sua empresa está <span style="color: rgb(0, 134, 209);">indo muito bem!</span>`;
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
      title: `${data.nome}, você deve priorizar Atendimento`,
      description: 'Descubra como a Azos melhorou a experiência dos colaboradores com a Onfly, proporcionando um atendimento ao cliente excepcional e personalizado.',
      image: '/imagematendimento.png', // Substitua pelo caminho real da imagem
      link: 'https://www.onfly.com.br/case-de-sucesso-onfly-azos-seguros/',
    },
    'Tecnologia e Automação': {
      title: `${data.nome}, você deve priorizar Tecnologia e Automação`,
      description: 'Veja como a Cartão de Todos implementou soluções de tecnologia e automação com a Onfly para otimizar processos e reduzir custos.',
      image: '/path/to/tecauto.jpg',
      link: 'https://www.onfly.com.br/case-cartao-de-todos/',
    },
    'Controle de Custos': {
      title: `${data.nome}, você deve priorizar Controle de Custos`,
      description: 'Saiba como a Cartão de Todos utilizou as ferramentas da Onfly para monitorar e controlar despesas de forma eficiente.',
      image: '/path/to/controlecustos.jpg',
      link: 'https://www.onfly.com.br/case-cartao-de-todos/',
    },
    'Planejamento': {
      title: `${data.nome}, você deve priorizar Planejamento`,
      description: 'Descubra como a Rofe Distribuidora melhorou seu planejamento estratégico com as soluções da Onfly, garantindo viagens corporativas mais organizadas e econômicas.',
      image: '/path/to/planejamento.jpg',
      link: 'https://www.onfly.com.br/case-rofe-distribuidora/',
    },
    'Satisfação do Viajante': {
      title: `${data.nome}, você deve priorizar Satisfação do Viajante`,
      description: 'Descubra como a Azos Seguros melhorou a satisfação de seus viajantes corporativos utilizando os serviços da Onfly.',
      image: '/imagematendimento.png',
      link: 'https://www.onfly.com.br/case-de-sucesso-onfly-azos-seguros/',
    },
    'Compliance e Políticas': {
      title: `${data.nome}, você deve priorizar Compliance e Políticas`,
      description: 'Conheça o guia de política de viagens corporativas da Onfly, onde você obterá um passo a passo para começar a estruturar a política de viagens da sua empresa.',
      image: '/imagemcompliance.png',
      link: 'https://www.onfly.com.br/blog/criar-a-politica-de-viagens-guia-definitivo/',
    },
  };
  
  
  
  const prioritizedCase = caseData[lowestTopic];

  const topicIcons = {
    'Atendimento': faCog,
    'Tecnologia e Automação': faLaptopCode,
    'Controle de Custos': faDollarSign,
    'Planejamento': faChartLine,
    'Satisfação do Viajante': faSmile,
    'Compliance e Políticas': faShieldAlt
  };
  

  return (
   <>
   <div className={styles.corpo}>
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
    <div className={styles.sidebar}>
        <h3>Fundamento priorizado: </h3>
        <p className={styles.prioritized}>
          <FontAwesomeIcon icon={topicIcons[lowestTopic]} className={styles.icon} /> {lowestTopic}
        </p>
        <div className={styles.otherTopics}>
          <h4>Outros Tópicos:</h4>
          {otherTopics.map((topic, index) => (
            <div key={index} className={styles.topicItem}>
              <FontAwesomeIcon icon={topicIcons[topic]} className={styles.icon} />
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
              <h2>{prioritizedCase.title}</h2>
              <p>{prioritizedCase.description}</p>
              <a href={prioritizedCase.link} target="_blank" rel="noopener noreferrer">
                <button className={styles['case-button']}>Acessar</button>
              </a>
            </div>
            <div className={styles['case-column2']}>
                <Image
                  src={prioritizedCase.image}
                  alt="Descrição da imagem"
                  width={300} // substitua pela largura desejada
                  height={300} // substitua pela altura desejada
                  className={styles.responsiveImage}
                />
            </div>
          </div>
        )}
      </div>
      
      <div className={styles['rankingmercado']}>

      </div>

      <div className={styles['oqueeonfly']}>
  <div className={styles['oqueeonfly-parte1']}>
    <h2>O que é a <span className={styles['highlight']}>Onfly?</span></h2>
    <p>A plataforma nº1 da América Latina na gestão de viagens a trabalho, com foco em transparência, economia e na experiência descomplicada do viajante.</p>
  </div>
  <div className={styles['oqueeonfly-parte2']}>
    <div className={styles['oqueeonfly-column']}>
      <Image
        src="/viagemtrabalho.png"
        alt="Descrição da imagem"
        width={300} // substitua pela largura desejada
        height={300} // substitua pela altura desejada
        className={styles.responsiveImage}
      />
      <h4>Suas viagens a trabalho podem ser mais simples</h4>
      <p>Reserve tudo em poucos cliques, sem precisar fazer nenhuma solicitação externa: é você quem decide o melhor horário para as suas viagens.</p>
    </div>
    <div className={styles['oqueeonfly-column']}>
      <Image
        src="/eficienciaqualidade.png"
        alt="Descrição da imagem"
        width={300} // substitua pela largura desejada
        height={300} // substitua pela altura desejada
        className={styles.responsiveImage}
      />
      <h4>Eficiência e qualidade em viagens corporativas</h4>
      <p>Otimize o gerenciamento de viagens com a Onfly: acompanhe em tempo real, controle créditos e gerencie políticas e bilhetes não voados. Diminua a quantidade de processos e foque no essencial.</p>
    </div>
    <div className={styles['oqueeonfly-column']}>
      <Image
        src="/transparencia.png"
        alt="Descrição da imagem"
        width={300} // substitua pela largura desejada
        height={300} // substitua pela altura desejada
        className={styles.responsiveImage}
      />
      <h4>Transparência Financeira é com a líder da América Latina</h4>
      <p>Aprimore a gestão financeira, visualizando relatórios em tempo real, análises precisas e integrações com ERPs. Na Onfly, sua gestão aumenta o ROI e toma decisões mais estratégicas.</p>
    </div>
  </div>
</div>





      </div>
    </> 
  );
}
