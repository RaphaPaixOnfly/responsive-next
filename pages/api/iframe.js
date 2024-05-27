import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function IframePage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Aqui deve ser a lógica para carregar o iframe do Merlin
    }
  }, [id]);

  return (
    <div>
      <h1>Iframe Page</h1>
      <div id="merlin-container"></div>
    </div>
  );
}
