<template>
  <div class="modal-wrapper">
    <h1>Uh oh!</h1>
    <h2>The connection to the server has been lost :(</h2>
    <p>Click the button below to refresh the page</p>
    <button
      @click="refreshPage"
    >
      Refresh Page
    </button>
  </div>
</template>

<script>
export default {
  name: 'LostConnectionModal',
  methods: {
    refreshPage() {
      window.location.reload();
    },
  },
};
</script>

<style scoped>
  h1 {
    color: purple;
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 0;
  }

  h2 {
    font-size: 1rem;
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
    border: 3px solid purple;
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
    width: 200px;
    height: 30px;
    margin: 20px 0 30px 0;
  }

  button:hover {
    border-color: purple;
  }
</style>
