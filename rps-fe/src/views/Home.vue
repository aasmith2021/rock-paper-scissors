<template>
  <div class="home">
    <TitleBar
      :connections="allConnections"
      :score="score"
    />
    <div class="body">
      <NameModal
        v-if="userName === ''"
        class="modal"
        @user-name-input="setupWebSocketConnectionAndSetUserName"
      />
      <WaitingForOtherPlayers
        v-else-if="webSocketConnectionId !== null && allConnections.length < 2"
        class="modal"
      />
      <OtherPlayerLostConnection
        v-else-if="otherPlayerLostConnection"
        class="modal"
      />
      <LostConnectionModal
        v-else-if="lostConnection"
        class="modal"
      />
      <ReadyToPlayModal
        v-else-if="showReadyToPlay"
        class="modal"
        :waiting="waitingForGameToStart"
        @ready="sendReadyToPlay"
      />
      <GameBoard
        v-else-if="gameRunning"
        :local-player-color="localPlayerColor"
        :opponent-color="opponentColor"
        :opponent-name="opponentName"
        :opponent-item-selected="opponentItemSelected"
        @item-selected="sendPlayerSelection"
      />
      <WinnerModal
        v-if="winner"
        :all-connections="allConnections"
        :winner="winner"
        @reset-game="resetGame"
      />
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/TitleBar.vue';
import NameModal from '@/components/NameModal.vue';
import LostConnectionModal from '@/components/LostConnectionModal.vue';
import ReadyToPlayModal from '@/components/ReadyToPlayModal.vue';
import WaitingForOtherPlayers from '@/components/WaitingForOtherPlayers.vue';
import OtherPlayerLostConnection from '@/components/OtherPlayerLostConnection.vue';
import GameBoard from '@/components/GameBoard.vue';
import WinnerModal from '@/components/WinnerModal.vue';

export default {
  name: 'Home',
  components: {
    TitleBar,
    NameModal,
    LostConnectionModal,
    ReadyToPlayModal,
    WaitingForOtherPlayers,
    OtherPlayerLostConnection,
    GameBoard,
    WinnerModal,
  },
  data() {
    return {
      allConnections: [],
      gameRunning: false,
      lostConnection: false,
      opponentItemSelected: false,
      otherPlayerLostConnection: false,
      score: {
        win: 0,
        lose: 0,
        tie: 0,
      },
      showReadyToPlay: false,
      userName: '',
      waitingForGameToStart: false,
      webSocketConnection: null,
      webSocketConnectionId: null,
      winner: null,
    };
  },
  computed: {
    opponentName({ allConnections }) {
      if (allConnections.length === 2) {
        return allConnections.find(({ localConnection }) => !localConnection).userName;
      }
      return 'Opponent';
    },
    localPlayerColor({ allConnections }) {
      if (allConnections.length === 2) {
        return allConnections.find(({ localConnection }) => localConnection).color;
      }
      return 'purple';
    },
    opponentColor({ allConnections }) {
      if (allConnections.length === 2) {
        return allConnections.find(({ localConnection }) => !localConnection).color;
      }
      return 'black';
    },
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
        if (message.lostConnection) {
          this.otherPlayerLostConnection = true;
        }
        if (message.startGame) this.startGame();
        if (message.opponentItemSelected) this.setOpponentItemSelected();
        if (message.winner) this.setWinner(message.winner);
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
        this.otherPlayerLostConnection = false;
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
    sendPlayerSelection(itemSelected) {
      this.sendWSMessage({ itemSelected });
    },
    setOpponentItemSelected() {
      this.opponentItemSelected = true;
    },
    setWinner(winner) {
      this.winner = winner;
    },
    resetGame(isOutcomeTie, didLocalUserWin) {
      if (isOutcomeTie) {
        this.score.tie += 1;
      } else if (didLocalUserWin) {
        this.score.win += 1;
      } else {
        this.score.lose += 1;
      }
      this.opponentItemSelected = false;
      this.winner = null;
    },
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: white;
}

.body {
  height: 90vh;
  width: 100%;
}

.modal {
  position: absolute;
  left: 33vw;
  top: 20vh;
}
</style>
