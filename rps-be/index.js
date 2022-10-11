const { setupWebSocketServer } = require('./websocket/index.js');
const { serveWebsite } = require('./website/index.js');

setupWebSocketServer();
serveWebsite();