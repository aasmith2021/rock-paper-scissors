<template>
  <div class="score-wrapper">
    <h2>Your Score:</h2>
    <div class="score-values">
      {{ score.win }} - {{ score.lose }} - {{ score.tie }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    score: Object,
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
