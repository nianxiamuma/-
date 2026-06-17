const { createServer } = require('http');
const { readFile, stat } = require('fs');
const { extname } = require('path');

const PORT = process.env.PORT || 3000;
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

createServer((req, res) => {
  let file = req.url === '/' ? 'index.html' : req.url.slice(1);
  stat(file, (err, s) => {
    if (err || !s.isFile()) { res.writeHead(404); res.end(); return; }
    readFile(file, (e, data) => {
      if (e) { res.writeHead(500); res.end(); return; }
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'text/plain', 'Cache-Control': 'no-store' });
      res.end(data);
    });
  });
}).listen(PORT, () => console.log('Server ready on port', PORT));
