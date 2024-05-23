import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: '*',
});

export default function runMiddleware(req, res) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
