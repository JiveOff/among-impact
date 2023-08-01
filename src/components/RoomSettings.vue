<template>
  <div
    class="modal-card"
    style="width: auto; height: auto; display: flex; align-items: center"
  >
    <Box style="max-width: 80vw">
      <div class="ai-subtitle mt-0">Personnalisation de la partie</div>
      <div class="settings mt-5">
        <div class="ai-subbox">
          <div class="ai-subtitle ai-subnegative">Mode de jeu</div>
          <div class="ai-gamemodes">
            <div
              class="ai-gamemode"
              :class="{ active: gameData.roomData.roleGamemode === 'CLASSIC' }"
              @click="changeMode('CLASSIC')"
            >
              Classique
            </div>
            <div
              class="ai-gamemode"
              :class="{ active: gameData.roomData.roleGamemode === 'MIRROR' }"
              @click="changeMode('MIRROR')"
            >
              Miroir
            </div>
            <div
              class="ai-gamemode"
              :class="{ active: gameData.roomData.roleGamemode === 'CHAOS' }"
              @click="changeMode('CHAOS')"
            >
              Chaos
            </div>
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from "./Box.vue";

export default {
  props: ["gameData"],
  components: {
    Box,
  },
  methods: {
    changeMode(mode) {
      this.$emit("changeMode", mode);
    },
  },
};
</script>

<style lang="scss" scoped>
.ai-gamemodes {
  display: flex;
  gap: 1rem;

  width: 100%;

  .ai-gamemode {
    flex: 1;
    width: 100%;

    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: var(--ai-dark);
    font-family: "Amatic SC", cursive;
    font-size: 2rem;
    text-align: center;

    cursor: pointer;

    transition: background-color 0.2s ease-in-out;

    &.active {
      background-color: var(--ai-green);
      color: rgb(0, 0, 0);
    }
  }
}
</style>
