<template>
  <div class="connection-square">
    <img class="person-icon" src="person_icon.png" alt="person icon" />
    {{ connection.id }}
  </div>
</template>

<script>
export default {
  name: 'ConnectionSquare',
  props: {
    connection: Object,
  },
};
</script>

<style scoped>
.connection-square {
  width: 50px;
  height: 50px;
  margin: 7.5px;
  color: white;
  font-size: .8rem;
  border: 2px white solid;
  border-radius: 5px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.person-icon {
  width: 30px;
  height: 30px;
}
</style>
