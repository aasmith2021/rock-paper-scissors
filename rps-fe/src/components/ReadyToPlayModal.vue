<template>
  <div class="modal-wrapper">
    <h1>Ready to play?</h1>
    <p v-if="!readyToPlaySent">Click the button below to indicate you are ready to play</p>
    <button
      v-if="!readyToPlaySent"
      @click="sendReadyToPlay"
    >
      I'm Ready!
    </button>
    <p
      v-if="readyToPlaySent && waiting"
      class="loading-text"
    >
      Waiting for other player to be ready...
    </p>
    <div
      v-if="readyToPlaySent && waiting"
      class="loading-spinner-wrapper"
    >
      <img
        class="loading-spinner"
        src="rps.png"
        alt="loading spinner"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReadyToPlayModal',
  data() {
    return {
      readyToPlaySent: false,
    };
  },
  props: {
    waiting: Boolean,
  },
  methods: {
    sendReadyToPlay() {
      this.$emit('ready');
      this.readyToPlaySent = true;
    },
  },
};
</script>

<style scoped>
  h1 {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  p {
    margin: 0;
  }

  .modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 20vh;
    min-width: 375px;
    min-height: 200px;
    margin-top: 50px;
    border: 3px solid lightseagreen;
    border-radius: 5px;
    box-shadow: 4px 4px 4px darkgrey;
  }

  button {
    color: white;
    background-color: lightseagreen;
    border: 3px solid lightseagreen;
    border-radius: 8px;
    font-size: 1.15rem;
    font-weight: 600;
    width: 150px;
    height: 30px;
    margin-top: 30px;
  }

  button:hover {
    border-color: #fa1bcd;
  }

  .loading-text {
    margin: 0;
    font-size: 1rem;
    font-style: italic;
    color: grey;
  }

  .loading-spinner-wrapper {
    position: relative;
    top: 15px;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
