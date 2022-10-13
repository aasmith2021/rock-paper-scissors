<template>
  <div
    class="connection-square"
    :style="{ 'border-color': connection.color }"
  >
    <img src="person_icon.png" alt="person icon" />
    <p>{{ connectionName }}</p>
  </div>
</template>

<script>
export default {
  name: 'ConnectionSquare',
  props: {
    connection: Object,
  },
  computed: {
    connectionName({ connection }) {
      return connection.localConnection ? 'You' : connection.userName;
    },
  },
};
</script>

<style scoped>
.connection-square {
  width: 50px;
  height: 50px;
  margin: 7.5px;
  padding: 5px;
  border: 3px white solid;
  border-radius: 5px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  width: 30px;
  height: 30px;
}

p {
  display: block;
  width: 100%;
  margin: 0;
  color: white;
  font-size: .8rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
