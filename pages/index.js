import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faLaptopCode, faDollarSign, faChartLine } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const [iframeId, setIframeId] = useState('');

  const handleRedirect = (id) => {
    setIframeId(id);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Diagnóstico de Viagens Corporativas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script src="https://scripts.gomerlin.com.br/merlin.js" strategy="beforeInteractive" />

      {!iframeId ? (
        <main className={styles.main}>
          <div className={styles.column1}>
            <h1 className={styles.title}>Diagnóstico de Gestão de Viagens Corporativas</h1>
            <p className={styles.item}>Obtenha um diagnóstico personalizado da gestão de viagens da sua empresa de forma rápida e gratuita. Prepare-se para em apenas alguns minutinhos receber um feedback completo. Comece já, gratuitamente.</p>
            <h3 className={styles.subtitle}>AVALIAMOS AS SEGUINTES MÉTRICAS</h3>
            <div className={styles.iconItem}>
              <FontAwesomeIcon icon={faCog} className={styles.icon}/>
              <p>Operacional</p>
            </div>
            <div className={styles.iconItem}>
              <FontAwesomeIcon icon={faLaptopCode} className={styles.icon}/>
              <p>Tecnologia e Automação</p>
            </div>
            <div className={styles.iconItem}>
              <FontAwesomeIcon icon={faDollarSign} className={styles.icon}/>
              <p>Controle de Custos</p>
            </div>
            <div className={styles.iconItem}>
              <FontAwesomeIcon icon={faChartLine} className={styles.icon}/>
              <p>Planejamento</p>
            </div>

          </div>
          <div className={styles.column2}>
            <div className={`${styles.card} ${styles['card-top']}`} onClick={() => handleRedirect('iframe1')}>
              <h2>Diagnóstico do Viajante</h2>
            </div>
            <div className={`${styles.card} ${styles['card-top']}`} onClick={() => handleRedirect('iframe2')}>
              <h2>Diagnóstico do Gestor</h2>
            </div>
            <div className={`${styles.card} ${styles['card-bottom']}`} onClick={() => handleRedirect('iframe3')}>
              <h2>Disgnóstico do Financeiro</h2>
            </div>
          </div>
        </main>
      ) : (
        <div id="merlin-container" className={styles.iframeContainer}></div>
      )}

      {iframeId && (
        <Script id="merlin-init" strategy="lazyOnload">
          {`Merlin.Container.initFromSource("https://tools.gomerlin.com.br/chat/edadb8d8-afb6-42a7-88b2-f2acd2678999", '#merlin-container');`}
        </Script>
      )}
    </div>
  );
}
