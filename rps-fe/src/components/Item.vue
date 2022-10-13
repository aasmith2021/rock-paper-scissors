<template>
  <div>
    <img :src="pictureSource" :alt="altText" />
  </div>
</template>

<script>
export default {
  props: {
    pictureSource: String,
    altText: String,
  },
};
</script>

<style scoped>
  div {
    width: 100px;
    height: 150px;
    border: 5px solid purple;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  div:hover {
    border-color: lightseagreen;
  }

  img {
    width: 75px;
    height: auto;
  }
</style>
