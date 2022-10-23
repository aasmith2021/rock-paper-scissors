<template>
  <div class="game-board-wrapper">
    <div class="game-board">
      <div class="half-board">
        <h1>You</h1>
        <div class="items">
          <Item
            v-if="itemSelected === null || itemSelected === 'rock'"
            :picture-source="'rock.png'"
            :alt-text="'rock'"
            :hover-enabled="!itemLockedIn"
            :border-color="playerItemBorderColor"
            @click="toggleSelectItem('rock')"
          />
          <Item
            v-if="itemSelected === null || itemSelected === 'paper'"
            :picture-source="'paper.png'"
            :alt-text="'paper'"
            :hover-enabled="!itemLockedIn"
            :border-color="playerItemBorderColor"
            @click="toggleSelectItem('paper')"
          />
          <Item
            v-if="itemSelected === null || itemSelected === 'scissors'"
            :picture-source="'scissors.png'"
            :alt-text="'scissors'"
            :hover-enabled="!itemLockedIn"
            :border-color="playerItemBorderColor"
            @click="toggleSelectItem('scissors')"
          />
        </div>
        <div
          v-if="itemSelected && !itemLockedIn"
          class="submit-section"
        >
          <p class="undo-message">
            Click item to undo your selection
          </p>
          <button @click="lockInItem">
            Submit
          </button>
        </div>
        <div
          v-if="itemSelected && itemLockedIn"
          class="submit-section"
        >
          <p class="item-locked-in-message">
            Your Selection Has Been Locked In!
          </p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="half-board">
        <h1>{{ opponentName }}</h1>
        <div class="items">
          <Item
            :picture-source="'question_mark.png'"
            :alt-text="'question mark'"
            :hover-enabled="false"
            :border-color="opponentItemSelected ? itemSelectedColor : opponentColor"
          />
          <Item
            v-if="!opponentItemSelected"
            :picture-source="'question_mark.png'"
            :alt-text="'question mark'"
            :hover-enabled="false"
            :border-color="opponentColor"
          />
          <Item
            v-if="!opponentItemSelected"
            :picture-source="'question_mark.png'"
            :alt-text="'question mark'"
            :hover-enabled="false"
            :border-color="opponentColor"
          />
        </div>
        <div
          v-if="opponentItemSelected"
          class="opponent-item-selected-section"
        >
          <p class="item-locked-in-message">
            Opponent Selection Locked In!
          </p>
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
    opponentColor: String,
    opponentItemSelected: Boolean,
    localPlayerColor: String,
  },
  data() {
    return {
      itemLockedIn: false,
      itemSelected: null,
      itemSelectedColor: '#fa1bcd',
    };
  },
  computed: {
    playerItemBorderColor({ itemLockedIn, itemSelectedColor, localPlayerColor }) {
      if (itemLockedIn) {
        return itemSelectedColor;
      }
      return localPlayerColor;
    },
  },
  methods: {
    toggleSelectItem(itemName) {
      if (!this.itemSelected) {
        this.itemSelected = itemName;
      } else {
        this.itemSelected = null;
      }
    },
    lockInItem() {
      this.itemLockedIn = true;
    },
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
    height: 60%;
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
    margin-bottom: 0;
  }

  .undo-message {
    color: darkslategray;
    font-style: italic;
    margin: 0;
    position: relative;
    bottom: 15px;
  }

  button {
    color: white;
    background-color: lightseagreen;
    border: 3px solid lightseagreen;
    border-radius: 8px;
    font-size: 1.15rem;
    font-weight: 600;
    width: 100px;
    height: 30px;
    margin-top: 5px;
  }

  button:hover {
    border-color: #fa1bcd;
  }

  .submit-section, .opponent-item-selected-section {
    margin-top: 10px;
  }

  .item-locked-in-message {
    color: #fa1bcd;
    text-transform: uppercase;
    font-weight: bolder;
    margin: 0;
    position: relative;
    bottom: 15px;
  }
</style>
