import { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [iframeId, setIframeId] = useState('');

  const handleRedirect = async (id) => {
    setIframeId(id);
  
    try {
      const response = await axios.post('/api/generateToken');
      console.log('Token generated and sent to Zapier:', response.data);
  
      // Faz a solicitação ao endpoint do proxy
      await axios.post('/api/proxyToWebhook', { token: response.data.token });
    } catch (error) {
      console.error('Error generating and sending token:', error.message);
    }
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
            <h1 className={styles.title}>Diagnóstico de Viagens Corporativas</h1>
            <h2 className={styles.subtitle}>Subtítulo explicativo</h2>
            <p className={styles.item}>Item 1: Explicação sobre o diagnóstico.</p>
            <p className={styles.item}>Item 2: Explicação sobre o diagnóstico.</p>
            <p className={styles.item}>Item 3: Explicação sobre o diagnóstico.</p>
            <p className={styles.item}>Item 4: Explicação sobre o diagnóstico.</p>
          </div>
          <div className={styles.column2}>
            <div className={`${styles.card} ${styles['card-top']}`} onClick={() => handleRedirect('iframe1')}>
              <h2>Estratégia</h2>
            </div>
            <div className={`${styles.card} ${styles['card-top']}`} onClick={() => handleRedirect('iframe2')}>
              <h2>UX Design</h2>
            </div>
            <div className={`${styles.card} ${styles['card-bottom']}`} onClick={() => handleRedirect('iframe3')}>
              <h2>Desenvolvimento</h2>
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
