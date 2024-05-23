module.exports = {
    async headers() {
      return [
        {
          source: '/api/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: '*', // Permitir todas as origens (ou especifique seu domínio)
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,HEAD,POST,OPTIONS',
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Content-Type, Authorization',
            },
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true',
            },
          ],
        },
      ];
    },
  };
  