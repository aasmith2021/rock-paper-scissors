<template>
  <div class="websocket-frame">
    <h1>Testing</h1>
    <h2>{{ testMessage1 }}</h2>
  </div>
</template>

<script>
export default {
  name: 'WebSocketTest',
  data() {
    return {
      webSocket: {},
      webSocketId: '',
      testMessage1: 'HOWDY',
    };
  },
  methods: {
    async connectToWebSocketServer() {
      const ws = new WebSocket('ws://localhost:3000');
      return new Promise((resolve) => {
        const timer = setInterval(() => {
          if (ws.readyState === 1) {
            clearInterval(timer);
            this.webSocket = ws;
            this.createWebSocketEventListener();
            resolve(ws);
          }
        }, 10);
      });
    },
    createWebSocketEventListener() {
      this.webSocket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        if (message.idRequest) {
          this.webSocketId = message.id;
        } else if (message.text) {
          console.log('Message from WebSocket server:', `"${message.text}"`);
        }
      });
    },
    sendWSMessage(message) {
      this.webSocket.send(JSON.stringify(message));
    },
    requestWebSocketId() {
      this.sendWSMessage({ idRequest: true });
    },
  },
  async created() {
    await this.connectToWebSocketServer();
    this.requestWebSocketId();
  },
};
</script>

<style scoped>
  h1 {
    font-family:'Lucida Sans', 'Lucida Sans Regular', Geneva, Verdana, sans-serif;
  }

  .websocket-frame {
    width: 100%;
    height: 85vh;
    background-color: burlywood;
  }
</style>
