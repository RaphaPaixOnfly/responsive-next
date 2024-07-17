import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Dashboard.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#__next'); // Necessário para acessibilidade

const SharePopup = ({ token }) => {
  const [showModal, setShowModal] = useState(false);
  const [clickedShare, setClickedShare] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareUrl = `${window.location.origin}/?token=${token}`;
        await navigator.share({
          title: 'Compartilhar Diagnóstico',
          text: 'Veja seu diagnóstico de gestão de viagens!',
          url: shareUrl,
        });

        // API request after successful sharing
        await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:spr2iDvK/diagnostico_gestao_de_viagensToken_shared?token=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        setClickedShare(true); // Marca como compartilhado com sucesso
      } catch (error) {
        console.error('Erro ao compartilhar', error);
      }
    } else {
      alert('O compartilhamento da Web não é suportado neste navegador.');
    }
  };

  useEffect(() => {
    let timeoutId;

    if (clickedShare) {
      timeoutId = setTimeout(() => {
        setShowModal(false);
      }, 10000); // Mostrar o modal após 10 segundos se clicou para compartilhar
    }

    return () => {
      clearTimeout(timeoutId); // Limpar timeout ao desmontar o componente
    };
  }, [clickedShare]);

  const closeModal = () => {
    setShowModal(false);
    setClickedShare(false); // Reseta o estado para permitir novo compartilhamento
  };

  return (
    <div>
      <button onClick={handleShare} className={styles['button-compartilhar']}>
        Compartilhar <FontAwesomeIcon icon={faGift} className={styles['icon']} />
      </button>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Modal de Compartilhamento"
        className={styles['modal']}
        overlayClassName={styles['overlay']}
      >
        <h3>Após compartilhar, recarregue a página.</h3>
        <button onClick={() => window.location.reload()} className={styles['button-reload']}>
          Recarregar
        </button>
        <button onClick={closeModal} className={styles['button-close']}>
          Fechar
        </button>
      </Modal>
    </div>
  );
};

export default SharePopup;
