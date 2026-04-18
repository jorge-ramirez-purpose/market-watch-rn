const http = require('http');
const https = require('https');

const PORT = 3001;
const TARGET = 'api.coingecko.com';

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-cg-demo-api-key');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const options = {
    hostname: TARGET,
    path: req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: TARGET,
    },
  };

  const proxy = https.request(options, (proxyRes) => {
    const headers = { ...proxyRes.headers, 'access-control-allow-origin': '*' };
    res.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxy);

  proxy.on('error', () => {
    res.writeHead(502);
    res.end('Proxy error');
  });
});

server.listen(PORT, () => {
  console.log(`CORS proxy running on http://localhost:${PORT}`);
});
