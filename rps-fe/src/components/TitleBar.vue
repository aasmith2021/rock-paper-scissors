<template>
  <div class="title-bar-wrapper">
    <Score />
    <h1>Rock, Paper, Scissors!</h1>
    <div class="connections-wrapper">
      <ConnectionSquare
        v-for="connection in connections"
        :key="connection.id"
        :connection="connection"
      />
    </div>
  </div>
</template>

<script>
import ConnectionSquare from '@/components/ConnectionSquare.vue';
import Score from '@/components/Score.vue';

export default {
  name: 'TitleBar',
  components: {
    ConnectionSquare,
    Score,
  },
  props: {
    connections: Array,
  },
};
</script>

<style scoped>
.title-bar-wrapper {
  width: 100%;
  height: 85px;
  margin: none;
  background-color: lightseagreen;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-wrapper {
  width: 100%;
  height: 100%;
}

h1 {
  color: white;
  margin: 0;
}

.connections-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
