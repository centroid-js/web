const { createServer } = require('http');
const { container } = require('../app');

const server = createServer(container);
server.listen(8080, '0.0.0.0');