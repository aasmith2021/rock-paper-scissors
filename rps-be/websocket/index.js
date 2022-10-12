const WebSocket = require('ws');

const setupWebSocketServer = () => {
  const PORT = 3000;
  let newId = 1;
  const wsClients = new Map();

  const wss = new WebSocket.Server({ port: PORT });

  const sendMessageToClient = (client, message) => {
    client.send(JSON.stringify(message));
  };

  const broadcastMessageToAllClients = (message) => {
    wsClients.forEach(({ ws: client }) => {
      client.send(JSON.stringify(message));
    })
  };

  wss.on('connection', (ws) => {
    if (!wsClients.has(ws)) {
      wsClients.set(ws, { ws, id: newId });
      newId++;
      
      broadcastMessageToAllClients({ text: `New connection established for clientId ${wsClients.get(ws).id}!` });
    } else {
      broadcastMessageToAllClients({ text: `Connect reestablished for clientId ${wsClients.get(ws).id}!` });
    }

    ws.on('message', (stringMessage) => {
      const message = JSON.parse(stringMessage);

      if (message.idRequest) {
        sendMessageToClient(ws, { idRequest: true, id: wsClients.get(ws).id });
      } else if (message.broadcastToAll) {
        broadcastMessageToAllClients(jsonMessage);
      }
    });

    ws.on('close', () => {
      broadcastMessageToAllClients({ text: `Connection with clientId ${wsClients.get(ws).id} closed.` });
    });
    
  });
};

module.exports = {
  setupWebSocketServer,
}