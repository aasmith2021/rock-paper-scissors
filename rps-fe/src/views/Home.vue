<template>
  <div class="home">
    <TitleBar
      :connections="allConnections"
    />
    <NameModal
      v-if="userName === ''"
      class="name-modal"
      @user-name-input="setupWebSocketConnectionAndSetUserName"
    />
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import NameModal from '@/components/NameModal.vue';

export default {
  name: 'Home',
  components: {
    TitleBar,
    NameModal,
  },
  data() {
    return {
      allConnections: [],
      webSocketConnection: null,
      webSocketConnectionId: null,
      userName: '',
    };
  },
  methods: {
    async connectToWebSocketServer() {
      this.webSocketConnection = new WebSocket('ws://localhost:3000');
      this.webSocketConnection.addEventListener('open', () => {
        this.createWebSocketMessageEventListener();
        this.getWebSocketConnectionIdFromServer();
        this.sendUserNameToWebSocketServer(this.userName);
      });
    },
    createWebSocketMessageEventListener() {
      this.webSocketConnection.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);

        if (message.yourConnectionId) this.webSocketConnectionId = message.yourConnectionId;

        if (message.allConnections) {
          this.allConnections = message.allConnections
            .map((connection) => ({
              ...connection,
              localConnection: connection.id === this.webSocketConnectionId,
            }))
            .sort((connection) => {
              if (connection.localConnection) return -1;
              return 1;
            });
        }
      });
    },
    sendWSMessage(message) {
      this.webSocketConnection.send(JSON.stringify(message));
    },
    getWebSocketConnectionIdFromServer() {
      this.sendWSMessage({ getConnectionId: true });
    },
    sendUserNameToWebSocketServer() {
      this.sendWSMessage({ setUserName: true, userName: this.userName });
    },
    async setupWebSocketConnectionAndSetUserName(userName) {
      this.userName = userName;
      this.connectToWebSocketServer();
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: white;
}

.name-modal {
  position: absolute;
  left: 33vw;
  top: 20vh;
}
</style>
