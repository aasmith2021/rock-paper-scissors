<template>
  <div class="score-wrapper">
    <h2>Your Score:</h2>
    <div class="score-values">
      {{ numberOfWins }} - {{ numberOfLosses }} - {{ numberOfTies }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberOfWins: 0,
      numberOfLosses: 0,
      numberOfTies: 0,
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
  font-weight: 600;
  font-size: 1.75rem;
}
</style>
