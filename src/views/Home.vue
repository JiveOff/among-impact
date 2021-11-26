<template>
  <div class="home section">
    <div class="columns is-desktop is-centered">
      <div class="column ai-center">
        <Box><Homepage /></Box>
      </div>
      <div class="column roles-col">
        <div class="ai-title mb-5 mt-0">Un jeu, 6 rôles.</div>
        <div class="roles">
          <Role v-for="role in roles" :key="role.title" :role="role" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roles-col {
  flex: 1.5;
  padding: 5rem;
}

.roles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}

@media screen and (max-width: 768px) {
  .roles {
    grid-template-columns: 1fr;
  }
}
</style>

<script>
import Box from "../components/Box.vue";
import Homepage from "../components/Homepage.vue";
import Role from "../components/Role.vue";

export default {
  name: "Home",
  components: {
    Box,
    Homepage,
    Role,
  },
  data() {
    return {
      roles: [
        {
          title: "L'imposteur",
          description:
            "Il a pour but de ruiner la partie et faire en sorte que tout le monde meurs, il devra cependant être discret.",
          image: "https://place-hold.it/64x64",
        },
        {
          title: "L'imposteur",
          description:
            "Il a pour but de ruiner la partie et faire en sorte que tout le monde meurs, il devra cependant être discret.",
          image: "https://place-hold.it/64x64",
        },
        {
          title: "L'imposteur",
          description:
            "Il a pour but de ruiner la partie et faire en sorte que tout le monde meurs, il devra cependant être discret.",
          image: "https://place-hold.it/64x64",
        },
        {
          title: "L'imposteur",
          description:
            "Il a pour but de ruiner la partie et faire en sorte que tout le monde meurs, il devra cependant être discret.",
          image: "https://place-hold.it/64x64",
        },
        {
          title: "L'imposteur",
          description:
            "Il a pour but de ruiner la partie et faire en sorte que tout le monde meurs, il devra cependant être discret.",
          image: "https://place-hold.it/64x64",
        },
        {
          title: "L'imposteur",
          description:
            "Il a pour but de ruiner la partie et faire en sorte que tout le monde meurs, il devra cependant être discret.",
          image: "https://place-hold.it/64x64",
        },
      ],
    };
  },
};
</script>
