import React, { useState } from 'react';

export const handleShare = async (token, setClickedShare) => {
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

const SharePopup2 = ({ token }) => {
  const [clickedShare, setClickedShare] = useState(false);

  return null; // Não renderiza nenhum botão
};

export default SharePopup2;
