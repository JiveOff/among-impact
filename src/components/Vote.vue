<template>
  <div class="modal-card" style="width: auto">
    <Box>
      <div class="ai-subtitle mt-0">Role de {{ player.name }}</div>
      {{ roles }}
      <div class="roles">
        <div
          v-for="role in roles"
          :key="role.title"
          class="role"
          @click="votePlayer(role)"
        >
          <div class="avatar">
            <img :src="role.image" alt="Profil" />
          </div>
          <span class="role-title">{{ role.title }}</span>
        </div>
      </div>
    </Box>
  </div>
</template>

<style scoped>
.roles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.role .role-title {
  font-family: "Amatic SC", cursive;
  font-size: 2rem;
}

.role {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

<script>
import Box from "./Box.vue";
export default {
  props: ["player", "roles"],
  components: {
    Box,
  },
  methods: {
    votePlayer(role) {
      this.$parent.close();
      this.$emit("votePlayer", { role, player: this.player });
    },
  },
};
</script>
