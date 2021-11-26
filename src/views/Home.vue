<template>
  <div class="home section columns is-desktop is-centered">
    <div class="column ai-center">
      <Box><Homepage /></Box>
    </div>
    <div class="column">poggers</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Box from "../components/Box.vue";
import Homepage from "../components/Homepage.vue";

export default {
  name: "Home",
  components: {
    Box,
    Homepage,
  },
};
</script>
