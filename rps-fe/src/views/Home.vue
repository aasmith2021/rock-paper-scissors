<template>
  <div class="home">
    <TitleBar
      :connections="allConnections"
    />
    <WaitingForOtherPlayers
      v-if="webSocketConnectionId !== null && allConnections.length < 2"
      class="modal"
    />
    <NameModal
      v-if="userName === ''"
      class="modal"
      @user-name-input="setupWebSocketConnectionAndSetUserName"
    />
    <ReadyToPlayModal
      v-else-if="showReadyToPlay"
      class="modal"
      :waiting="waitingForGameToStart"
      @ready="sendReadyToPlay"
    />
    <LostConnectionModal
      v-else-if="lostConnection"
      class="modal"
    />
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import NameModal from '@/components/NameModal.vue';
import LostConnectionModal from '@/components/LostConnectionModal.vue';
import ReadyToPlayModal from '@/components/ReadyToPlayModal.vue';
import WaitingForOtherPlayers from '@/components/WaitingForOtherPlayers.vue';

export default {
  name: 'Home',
  components: {
    TitleBar,
    NameModal,
    LostConnectionModal,
    ReadyToPlayModal,
    WaitingForOtherPlayers,
  },
  data() {
    return {
      allConnections: [],
      gameRunning: false,
      lostConnection: false,
      showReadyToPlay: false,
      userName: '',
      waitingForGameToStart: false,
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
        if (message.startGame) this.startGame();
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

      if (this.allConnections.length === 2) {
        this.showReadyToPlay = true;
      }
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
    sendReadyToPlay() {
      this.sendWSMessage({ ready: true });
      this.waitingForGameToStart = true;
    },
    startGame() {
      this.showReadyToPlay = false;
      this.waitingForGameToStart = false;
      this.gameRunning = true;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: white;
}

.modal {
  position: absolute;
  left: 33vw;
  top: 20vh;
}
</style>
