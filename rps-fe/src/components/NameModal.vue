<template>
  <div
    class="modal-wrapper"
    @keyup.enter="submitUserName"
  >
    <h1>Welcome! Please enter your name:</h1>
    <input v-model="userName" type="text" />
    <p
      class="validation-message"
      v-if="!isValidInput"
    >
      {{ validationMessage }}
    </p>
    <button
      :class="{ 'validation-message-button': !isValidInput }"
      @click="submitUserName"
    >
      Submit
    </button>
  </div>
</template>

<script>
export default {
  name: 'NameModal',
  data() {
    return {
      userName: '',
      submitClicked: false,
    };
  },
  computed: {
    isValidInput({ userName, submitClicked }) {
      if (submitClicked && (userName === '' || userName.length > 20)) {
        return false;
      }

      return true;
    },
    validationMessage({ userName }) {
      if (userName === '') return 'Input cannot be blank';

      return 'Input cannot exceed 20 characters';
    },
  },
  methods: {
    submitUserName() {
      if (!this.submitClicked) this.submitClicked = true;

      if (this.isValidInput) {
        this.$emit('user-name-input', this.userName);
      }
    },
  },
};
</script>

<style scoped>
  h1 {
    font-size: 1.25rem;
    margin-bottom: 30px;
  }
  .modal-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
    height: 20vh;
    min-width: 375px;
    min-height: 200px;
    margin-top: 50px;
    border: 3px solid lightseagreen;
    border-radius: 5px;
    box-shadow: 4px 4px 4px darkgrey;
  }

  input {
    color: lightseagreen;
    width: 250px;
    height: 25px;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
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
    margin-top: 30px;
  }

  button:hover {
    border-color: #fa1bcd;
  }

  .validation-message {
    margin: 0;
    color: red;
  }

  button.validation-message-button {
    border-color: red;
    margin-top: 12px;
  }
</style>
