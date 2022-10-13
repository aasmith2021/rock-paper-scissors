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
      lostConnection: false,
      userName: '',
      webSocketConnection: null,
      webSocketConnectionId: null,
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

      this.webSocketConnection.addEventListener('close', () => {
        this.lostConnection = true;
      });
    },
    createWebSocketMessageEventListener() {
      this.webSocketConnection.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);

        if (message.yourConnectionId) this.setConnectionId(message.yourConnectionId);
        if (message.allConnections) this.setAllConnections(message.allConnections);
      });
    },
    setConnectionId(connectionId) {
      this.webSocketConnectionId = connectionId;
    },
    setAllConnections(allConnections) {
      this.allConnections = allConnections
        .map((connection) => ({
          ...connection,
          localConnection: connection.id === this.webSocketConnectionId,
        }))
        .sort((connection) => {
          if (connection.localConnection) return -1;
          return 1;
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
