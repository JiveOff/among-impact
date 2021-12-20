<template>
  <div class="modal-card" style="width: auto">
    <Box>
      <div class="ai-subtitle mt-0">Role de {{ player.name }}</div>
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.2rem;
}

.role .role-title {
  font-family: "Amatic SC", cursive;
  font-size: 2rem;
}

.role {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  width: 150px;
  cursor: pointer;
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
      this.$emit("votePlayer", { role, player: this.player });
      this.$parent.close();
    },
  },
};
</script>
