import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import ChartComponent from '../components/ChartComponent';
import HorizontalBar from '../components/HorizontalBar';
import InputCompartilhar from '../components/InputCompartilhar'; // Certifique-se de ajustar o caminho do arquivo se necessário
import styles from '../styles/Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { faFacebook, faInstagram, faYoutube, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faCog, faGift, faLaptopCode, faDollarSign, faChartLine, faSmile, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import SharePopup from '../components/SharePopup';


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
      axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:spr2iDvK/diagnostico_gestao_de_viagens_shared?token=${token}`)
        .then(response => {
          const isShared = response.data.shared;
          if (isShared) {
            fetchRankingData();
          }
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [token]);
  
  
  const fetchRankingData = () => {
    axios.get(`https://x8ki-letl-twmt.n7.xano.io/api:spr2iDvK/diagnostico_gestao_de_viagens_tudo`)
      .then(response => {
        setRankingData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  };
  

  const [rankingData, setRankingData] = useState(null);

  const calculateRanking = (rankingData, currentToken, key = null) => {
    // Encontrar os dados da empresa atual usando o token
    const currentData = rankingData.find(item => item.token === currentToken);
    if (!currentData) {
      console.log('Empresa com o token não encontrada');
      return "Empresa não encontrada";
    }
  
    console.log('Current Data:', currentData);
  
    let filteredData = rankingData;
  
    // Filtrar por key se fornecido (segmento ou size)
    if (key) {
      filteredData = filteredData.filter(item => item[key] === currentData[key]);
      console.log(`Filtered Data by ${key}:`, filteredData);
    }
  
    // Remover empresas duplicadas, mantendo a de maior nota
    const uniqueCompanies = Array.from(new Set(filteredData.map(item => item.empresa)))
      .map(empresa => {
        return filteredData
          .filter(item => item.empresa === empresa)
          .reduce((prev, curr) => (prev.geral > curr.geral ? prev : curr));
      });
  
    console.log('Unique Companies before adding current:', uniqueCompanies);
  
    // Adicionar a empresa do nosso token ao array de empresas únicas
    uniqueCompanies.push(currentData);
  
    // Ordenar por nota geral em ordem decrescente
    uniqueCompanies.sort((a, b) => b.geral - a.geral);
  
    console.log('Unique Companies after adding current:', uniqueCompanies);
  
    // Encontrar a posição da empresa atual
    const position = uniqueCompanies.findIndex(item => item.token === currentToken) + 1;
  
    console.log('Position:', position);
  
    return `${position}° de ${uniqueCompanies.length}`;
  };
  
  
  
  
  

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

  const scrollToCompartilhar = () => {
    const element = document.getElementById('card-compartilhamento');
    if (element) {
      const offset = -80; // ajuste para rolar um pouco mais alto
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  

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
      description: 'Descubra como a Azos melhorou a experiência dos colaboradores com a Onfly, proporcionando um atendimento excepcional e personalizado. Com um suporte dedicado e soluções rápidas, a empresa conseguiu aumentar a satisfação e eficiência dos seus viajantes corporativos, garantindo um serviço de alta qualidade.',
      image: '/imagematendimento.png', // Substitua pelo caminho real da imagem
      link: 'https://www.onfly.com.br/case-de-sucesso-onfly-azos-seguros/',
    },
    'Tecnologia e Automação': {
      title: `${data.nome}, você deve priorizar Tecnologia e Automação`,
      description: 'Veja como a Cartão de Todos otimizou processos com a Onfly, implementando soluções de tecnologia e automação na gestão de viagens. A integração de sistemas e a automação de tarefas reduziram o tempo de administração e os erros, permitindo um foco maior em estratégias e melhorias contínuas.',
      image: '/onfly-integracoes.png',
      link: 'https://www.onfly.com.br/case-cartao-de-todos/',
    },
    'Controle de Custos': {
      title: `${data.nome}, você deve priorizar Controle de Custos`,
      description: 'Saiba como a Cartão de Todos utilizou ferramentas da Onfly para monitorar e controlar despesas de forma eficiente. Através de relatórios detalhados e análise contínua de gastos, a empresa conseguiu implementar políticas de economia que resultaram em uma significativa redução nos custos operacionais das viagens corporativas.',
      image: '/imagemscustos2.png',
      link: 'https://www.onfly.com.br/case-cartao-de-todos/',
    },
    'Planejamento': {
      title: `${data.nome}, você deve priorizar Planejamento`,
      description: 'Descubra como a Rofe Distribuidora melhorou seu planejamento estratégico com a Onfly, garantindo viagens mais organizadas e econômicas. A empresa implementou um sistema de planejamento que permitiu uma melhor alocação de recursos e um acompanhamento detalhado de cada etapa, resultando em maior eficiência e controle.',
      image: '/imagemscustos2.png',
      link: 'https://www.onfly.com.br/case-rofe-distribuidora/',
    },
    'Satisfação do Viajante': {
      title: `${data.nome}, você deve priorizar Satisfação do Viajante`,
      description: 'Descubra como a Azos Seguros aumentou a satisfação dos viajantes corporativos com os serviços da Onfly. Com um enfoque na experiência do usuário, a empresa conseguiu adaptar suas políticas e serviços para atender melhor às necessidades dos viajantes, proporcionando uma experiência mais agradável e sem complicações.',
      image: '/imagematendimento.png',
      link: 'https://www.onfly.com.br/case-de-sucesso-onfly-azos-seguros/',
    },
    'Compliance e Políticas': {
      title: `${data.nome}, você deve priorizar Compliance e Políticas`,
      description: 'Conheça o guia da Onfly para criar uma política de viagens corporativas estruturada e eficaz. A empresa desenvolveu um conjunto de diretrizes e práticas recomendadas que ajudaram a assegurar conformidade e a reduzir riscos, mantendo ao mesmo tempo a flexibilidade necessária para operações eficientes.',
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
          height={40} // substitua pela altura desejada
          className={styles.responsiveImage}
        />
      </a>
        <a href="https://www.onfly.com.br/viagens-corporativas-form/" className={styles['sidebar-button-header']} target="_blank" rel="noopener noreferrer">
          Fale com Especialista
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
        <a href="https://www.onfly.com.br/viagens-corporativas-form/" className={styles['sidebar-button']} target="_blank" rel="noopener noreferrer">
          Fale com Especialista
        </a>
        {rankingData ? (
          <button onClick={scrollToCompartilhar} className={styles['sidebar-button-ranking']} target="_blank" rel="noopener noreferrer">
            Ver Ranking<FontAwesomeIcon className={styles.lockIcon2} />
          </button>
        ) : (
          <button onClick={scrollToCompartilhar} className={styles['sidebar-button-ranking']} target="_blank" rel="noopener noreferrer">
            Liberar Ranking<FontAwesomeIcon icon={faLock} className={styles.lockIcon2} />
          </button>
        )}


      </div>
    

    
    <div className={styles['dashboard-container']}>
      <div className={styles['acima-dashboard']}>
        <div className={styles['text-result']}>
          <h3 dangerouslySetInnerHTML={{ __html: getMessage(data.nome, data.geral) }}></h3>
        </div>
        <div className={styles['button-compartilhar-div']}>
              <SharePopup token={token} />
        </div>
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
                  {rankingData ? (
                    <>
                      <div className={styles['text-with-rank']}>
                        <p>Geral</p>
                        <span className={styles.spanRank}>{calculateRanking(rankingData, token)}</span>
                      </div>
                      <div className={styles['text-with-rank']}>
                        <p>Mesma indústria</p>
                        <span className={styles.spanRank}>{calculateRanking(rankingData, token, 'segmento')}</span>
                      </div>
                      <div className={styles['text-with-rank']}>
                        <p>Mesmo porte</p>
                        <span className={styles.spanRank}>{calculateRanking(rankingData, token, 'size')}</span>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
              </div>
              <div className={styles['button-card-div']}>
              {rankingData ? (
                  <button onClick={scrollToCompartilhar} className={styles['button-card2']} target="_blank" rel="noopener noreferrer">
                    Ver Ranking<FontAwesomeIcon className={styles.lockIcon3} />
                  </button>
                ) : (
                  <button onClick={scrollToCompartilhar} className={styles['button-card']} target="_blank" rel="noopener noreferrer">
                    Liberar Ranking<FontAwesomeIcon icon={faLock} className={styles.lockIcon2} />
                  </button>
                )}

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
                  <button className={styles['case-button']}>Leia Mais</button>
                </a>
              
            </div>
            <div className={styles['case-column2']}>
                <div className={styles['case-column2-borda-imagem']}>
                <Image
                  src={prioritizedCase.image}
                  alt="Descrição da imagem"
                  width={300} // substitua pela largura desejada
                  height={300} // substitua pela altura desejada
                  className={styles.responsiveImage2}
                />
                </div>
            </div>
          </div>
        )}
      </div>
      <div id="card-compartilhamento" className={styles['card-compartilhamento']}>
        <div className={styles['card-compartilhamento-div-extra']}>
          <div className={styles['card-compartilhamento-laranja']}>
              <div className={styles['card-compartilhamento-laranja-COLUMN1']}>
                
                <h4>Indique o diagnóstico de gestão de viagens da Onfly para os seus amigos descobrirem qual fundamento precisa ser priorizado. Seu ranking será liberado após a pessoa acessar o link ao lado.</h4>
              </div>
              <div className={styles['card-compartilhamento-laranja-COLUMN2']}>
                <h4>Compartilhe seu link único para liberar o ranking:</h4>
                <InputCompartilhar token={token} />
              </div>
          </div>
        </div>
      </div>
      
      <div className={styles['rankingmercado']}>
          <div className={styles['rankingmercado-parte0']}>
            <h2>Como você está em relação<span className={styles['highlight']}> ao mercado?</span></h2>
            <p>Aqui você poderá ver uma comparação da sua empresa com o mercado de uma forma geral. Assim é possível fazer uma análise se a sua operação está acima ou abaixo da média em relação a outras empresas que também preencheram o diagnóstico de gestão de viagens.</p>
          </div>
        
          <div className={styles['rankingmercado-parte1']}>
            <div className={styles['rankingmercado-row']}>
              <a className={styles['button-ranking-slide']} target="_blank" rel="noopener noreferrer">
                Ranking Geral
                {rankingData ? (
                  <span>{calculateRanking(rankingData, token)}</span>
                ) : (
                  <FontAwesomeIcon icon={faLock} className={styles['icon']} />
                )}
              </a>
            </div>
            <div className={styles['rankingmercado-row']}>
              <a className={styles['button-ranking-slide']} target="_blank" rel="noopener noreferrer">
                Mesmo Porte
                {rankingData ? (
                  <span>{calculateRanking(rankingData, token, 'size')}</span>
                ) : (
                  <FontAwesomeIcon icon={faLock} className={styles['icon']} />
                )}
              </a>
            </div>
            <div className={styles['rankingmercado-row']}>
              <a className={styles['button-ranking-slide']} target="_blank" rel="noopener noreferrer">
                Mesma Indústria
                {rankingData ? (
                  <span>{calculateRanking(rankingData, token, 'segmento')}</span>
                ) : (
                  <FontAwesomeIcon icon={faLock} className={styles['icon']} />
                )}
              </a>
            </div>
          </div>

          <div className={styles['rankingmercado-parte2']}>
            <h2>Como você está em relação<span className={styles['highlight']}> ao mercado?</span></h2>
            <p>Aqui você poderá ver uma comparação da sua empresa com o mercado de uma forma geral. Assim é possível fazer uma análise se a sua operação está acima ou abaixo da média em relação a outras empresas que também preencheram o diagnóstico de gestão de viagens.</p>
          </div>
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

      <div className={styles.footer}>
          <a href="https://www.facebook.com/onfly.travel" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.instagram.com/onfly.travel/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.youtube.com/channel/UCyWqxiLUQrAhdZ6181NdYNQ" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://www.linkedin.com/company/onfly/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://www.tiktok.com/@onfly.travel" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <FontAwesomeIcon icon={faTiktok} />
          </a>
      </div>






      </div>
    </> 
  );
}
