const WebSocket = require('ws');

const setupWebSocketServer = () => {
  const PORT = 3000;
  let newId = 0;
  const colors = ['#1bfae0', '#fa1bcd'];
  const wsClients = new Map();

  const wss = new WebSocket.Server({ port: PORT });

  const generateAllConnectionsMessage = () => {
    const allConnections = [];
    wsClients.forEach(({ id, color, userName }) => allConnections.push({ id, color, userName }));

    return { allConnections };
  };

  const sendMessageToClient = async (client, message) => {
    client.send(JSON.stringify(message));
  };

  const broadcastMessageToAllClients = (message) => {
    wsClients.forEach(({ ws: client }) => {
      sendMessageToClient(client, message);
    })
  };

  wss.on('connection', (ws) => {
    if (wsClients.size < 2) {
      wsClients.set(
        ws,
        {
          ws,
          id: newId,
          color: colors[newId % 2],
          userName: '',
        }
      );
      newId++;
  
      ws.on('message', (stringMessage) => {
        const message = JSON.parse(stringMessage);
  
        if (message.getConnectionId) sendMessageToClient(ws, { yourConnectionId: wsClients.get(ws).id });
        if (message.getAllConnections) sendMessageToClient(ws, generateAllConnectionsMessage());
        if (message.setUserName) {
          const currentClient = wsClients.get(ws);
          wsClients.set(ws, { ...currentClient, userName: message.userName });
          broadcastMessageToAllClients(generateAllConnectionsMessage());
        }
      });
  
      ws.on('close', () => {
        const closedClientId = wsClients.get(ws).id;
        wsClients.delete(ws);
        broadcastMessageToAllClients({ text: `Connection with clientId ${closedClientId} closed.` });
      });
    }
  });
};

module.exports = {
  setupWebSocketServer,
}