import Cors from 'cors';

// Inicializa o middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*', // Permitir todas as origens, para desenvolvimento
  credentials: true,
});

// Helper para rodar middleware
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

export default async function corsMiddleware(req, res, next) {
  await runMiddleware(req, res, cors);
  next();
}
