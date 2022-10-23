<template>
  <div
    :class="{ 'hover-enabled': hoverEnabled }"
    :style="{ '--non-hover-border-color': borderColor }"
  >
    <img
      :src="pictureSource"
      :alt="altText"
    />
  </div>
</template>

<script>
export default {
  props: {
    pictureSource: {
      type: String,
      required: true,
    },
    altText: {
      type: String,
      required: false,
      default: '',
    },
    borderColor: {
      type: String,
      required: false,
      default: 'purple',
    },
    hoverEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped>
  div {
    width: 100px;
    height: 150px;
    border-width: 5px;
    border-color: var(--non-hover-border-color);
    border-style: solid;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  div.hover-enabled:hover {
    border-color: lightseagreen;
    cursor: pointer;
  }

  img {
    width: 75px;
    height: auto;
  }
</style>
