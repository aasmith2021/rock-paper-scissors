<template>
  <div
    class="modal-wrapper"
  >
    <h1>{{ winnerHeaderMessage }}</h1>
    <p>{{ winnerParagraphMessage }}</p>
    <button
      @click="closeModal"
    >
      Ok
    </button>
  </div>
</template>

<script>
export default {
  name: 'WinnerModal',
  props: {
    allConnections: Array,
    winner: Object,
  },
  computed: {
    isOutcomeTie({ winner }) {
      return winner.tie;
    },
    didLocalUserWin({ allConnections, winner }) {
      if (!this.isOutcomeTie) {
        const localConnectionId = allConnections.find(({ localConnection }) => localConnection).id;
        return localConnectionId === winner.id;
      }

      return false;
    },
    winnerHeaderMessage({ isOutcomeTie, didLocalUserWin }) {
      if (isOutcomeTie) return 'Tie Game!';
      if (didLocalUserWin) return 'You Won!';
      return 'You Lost!';
    },
    winnerParagraphMessage({ isOutcomeTie, didLocalUserWin, winner }) {
      if (isOutcomeTie) return `You both played ${winner.item}.`;

      switch (winner.item) {
        case 'rock':
          return `Your ${didLocalUserWin ? 'rock smashed' : ' scissors were smashed by'} your opponent's ${didLocalUserWin ? 'scissors' : 'rock'}.`;
        case 'paper':
          return `Your ${didLocalUserWin ? 'paper covered' : 'rock was covered by'} your opponent's ${didLocalUserWin ? 'rock' : 'paper'}.`;
        case 'scissors':
          return `Your ${didLocalUserWin ? 'scissors cut' : 'paper was cut by'} your opponent's ${didLocalUserWin ? 'paper' : 'scissors'}.`;
        default:
          return '';
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit('reset-game', this.isOutcomeTie, this.didLocalUserWin);
    },
  },
};
</script>

<style scoped>
  .modal-wrapper {
    position: absolute;
    top: 25vh;
    left: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40vw;
    height: 30vh;
    min-width: 375px;
    min-height: 200px;
    border: 3px solid purple;
    border-radius: 5px;
    box-shadow: 4px 4px 4px darkgrey;
    background-color: white;
  }

  h1 {
    font-size: 1.5rem;
    color: purple;
    margin-top: 0;
    margin-bottom: 30px;
  }

  p {
    font-size: 1rem;
    font-style: italic;
    color: grey;
    margin: 0;
  }

  button {
    color: white;
    background-color: lightseagreen;
    border: 3px solid lightseagreen;
    border-radius: 8px;
    font-size: 1.15rem;
    font-weight: 600;
    width: 100px;
    height: 30px;
    margin-top: 30px;
    cursor: pointer;
  }

  button:hover {
    border-color: #fa1bcd;
  }
</style>
