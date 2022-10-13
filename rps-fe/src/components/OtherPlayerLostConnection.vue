<template>
  <div class="modal-wrapper">
    <h1>Uh oh!</h1>
    <h2>The other player has lost their connection to the server :(</h2>
    <p>Please wait for them to reconnect</p>
  </div>
</template>

<script>
export default {
  name: 'OtherPlayerLostConnection',
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
    color: grey;
    font-style: italic;
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
</style>
