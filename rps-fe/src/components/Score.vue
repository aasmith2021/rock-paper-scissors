<template>
  <div class="score-wrapper">
    <h2>Score:</h2>
    <div class="score-values">{{ numberOfWins }} / {{ totalNumberOfGames }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberOfWins: 0,
      totalNumberOfGames: 0,
    };
  },
};
</script>

<style scoped>
.score-wrapper {
  margin: 20px;
  color: white;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0;
}

.score-values {
  font: 600;
  font-size: 1.5rem;
}
</style>
