<template>
  <div class="game-board-wrapper">
    <div class="game-board">
      <div class="half-board">
        <h1>You</h1>
        <div class="items">
          <Item
            v-if="itemSelected === null || itemSelected === 'rock'"
            :picture-source="'rps.png'"
            :alt-text="'rock'"
          />
          <Item
            v-if="itemSelected === null || itemSelected === 'paper'"
            :picture-source="'rps.png'"
            :alt-text="'paper'"
          />
          <Item
            v-if="itemSelected === null || itemSelected === 'scissors'"
            :picture-source="'rps.png'"
            :alt-text="'scissors'"
          />
        </div>
      </div>
      <div class="divider"></div>
      <div class="half-board">
        <h1>{{ opponentName }}</h1>
        <div class="items">
          <Item
            v-if="itemSelected === null || itemSelected === 'rock'"
            :picture-source="'rps.png'"
            :alt-text="'rock'"
          />
          <Item
            v-if="itemSelected === null || itemSelected === 'paper'"
            :picture-source="'rps.png'"
            :alt-text="'paper'"
          />
          <Item
            v-if="itemSelected === null || itemSelected === 'scissors'"
            :picture-source="'rps.png'"
            :alt-text="'scissors'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item.vue';

export default {
  name: 'GameBoard',
  components: {
    Item,
  },
  props: {
    opponentName: String,
  },
  data() {
    return {
      itemSelected: null,
    };
  },
};
</script>

<style scoped>
  .game-board-wrapper {
    width: 100%;
    height: 100%;
    background-color: #f2faf7;
  }

  .game-board {
    width: 80%;
    height: 80%;
    margin: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid lightseagreen;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .half-board {
    width: 50%;
    height: 100%;
  }

  .items {
    height: 70%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }

  .divider {
    width: 6px;
    height: 90%;
    background-color: darkgrey;
  }

  h1 {
    margin-top: 25px;
  }
</style>
