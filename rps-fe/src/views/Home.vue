<template>
  <div>
    <WebSocketTest />
  </div>
</template>

<script>
// @ is an alias to /src
import WebSocketTest from '@/components/WebSocketTest.vue';

export default {
  name: 'Home',
  components: {
    WebSocketTest,
  },
};
</script>
