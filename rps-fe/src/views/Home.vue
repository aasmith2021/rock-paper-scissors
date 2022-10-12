<template>
  <div class="home">
    <TitleBar
      :connections="connections"
    />
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';

export default {
  name: 'Home',
  components: {
    TitleBar,
  },
  data() {
    return {
      connections: [
        { id: 1, color: '#1bfae0' },
        { id: 2, color: '#fa1bcd' },
      ],
      webSocket: {},
      webSocketId: '',
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
.home {
  height: 100vh;
  background-color: white;
}
</style>
