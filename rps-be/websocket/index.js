const WebSocket = require('ws');

const setupWebSocketServer = () => {
  const PORT = 3000;
  const NUMBER_OF_PLAYERS = 2;
  let newId = 1;
  const colors = ['#fa1bcd', '#1bfae0'];
  const wsClients = new Map();
  const clientsReady = [];
  const itemsSelected = [];

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

  const isPlayerATheWinner = (playerAItem, playerBItem) => (
    (playerAItem === 'rock' && playerBItem === 'scissors')
    || (playerAItem === 'scissors' && playerBItem === 'paper')
    || (playerAItem === 'paper' && playerBItem === 'rock')
  );

  const getWinner = () => {
    const player1Item = itemsSelected[0].item;
    const player2Item = itemsSelected[1].item;

    if (player1Item === player2Item) {
      return 'tie';
    } else if (isPlayerATheWinner(player1Item, player2Item)) {
      return itemsSelected[0];
    }

    return itemsSelected[1];
  };

  const checkGameResults = (ws) => {
    if (itemsSelected.length === NUMBER_OF_PLAYERS) {
      const winner = getWinner();

      broadcastMessageToAllClients({ winner });
    }
  };

  wss.on('connection', (ws) => {
    if (wsClients.size < NUMBER_OF_PLAYERS) {
      wsClients.set(
        ws,
        {
          ws,
          id: newId,
          color: colors.pop(),
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
        if(message.ready) {
          const currentClientId = wsClients.get(ws).id;
          if (!clientsReady.includes(currentClientId)) clientsReady.push(currentClientId);

          if (clientsReady.length === wsClients.size) {
            broadcastMessageToAllClients({ startGame: true });
            clientsReady.splice(0, clientsReady.length);
          }
        }
        if (message.itemSelected) {
          const currentClientId = wsClients.get(ws).id;
          itemsSelected.push({ id: currentClientId, item: message.itemSelected });
          checkGameResults();
        }
      });
  
      ws.on('close', () => {
        const closedClientColor = wsClients.get(ws).color;
        colors.push(closedClientColor);
        wsClients.delete(ws);
        broadcastMessageToAllClients({ lostConnection: true });
      });
    }
  });
};

module.exports = {
  setupWebSocketServer,
}