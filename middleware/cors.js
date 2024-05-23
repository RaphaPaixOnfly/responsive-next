import Cors from 'cors';

// Inicializa o middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*',
});

// Helper para executar o middleware antes de continuar
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function corsMiddleware(req, res) {
  await runMiddleware(req, res, cors);
}
