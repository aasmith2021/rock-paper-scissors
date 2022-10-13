<template>
  <div class="modal-wrapper">
    <h1>Waiting for other player to connect...</h1>
    <div
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
  name: 'WaitingForOtherPlayers',
};
</script>

<style scoped>
  h1 {
    font-size: 1.5rem;
    margin-bottom: 30px;
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
