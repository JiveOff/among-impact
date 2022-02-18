<template>
  <div>
    <div
      v-for="(result, index) in gameData.roomData.results"
      :key="result.id"
      class="ai-subbox"
    >
      <div class="ai-subtitle ai-subnegative">
        {{ index + 1 }}{{ index + 1 === 1 ? "ère" : "ème" }} place
      </div>
      <div class="player">
        <div class="avatar">
          <img
            :src="`/img/avatars/${result.player.profilePicture}.png`"
            alt="Profil"
            class="ai-avatar"
          />
        </div>
        <div class="details" style="flex: 1">
          <span class="player-name" :style="`color: ${result.role.color}`">{{
            result.player.name
          }}</span>
          <span class="player-role">{{ result.points }} points</span>
        </div>
        <img :src="`${result.role.image}`" class="ai-role-icon" alt="Profil" />
      </div>
    </div>
    <b-button
      v-if="gameData.playerData.id === gameData.roomData.host.id"
      class="ai-button ai-bg-green"
      @click="restartRoom"
      >Recommencer une partie</b-button
    >
    <b-button class="ai-button ai-bg-red" @click="leaveRoom"
      >Quitter la partie</b-button
    >
  </div>
</template>

<style scoped>
.ai-subbox {
  margin-top: 2rem !important;
}

.player .ai-role-icon {
  float: right;
  width: 64px;
  border-radius: 100%;
}
</style>

<script>
export default {
  props: ["gameData"],
  mounted() {
    let audio = new Audio("sounds/end.mp3");
    audio.volume = 0.45;
    audio.play();
  },
  methods: {
    leaveRoom() {
      this.$emit("leaveRoom");
    },
    restartRoom() {
      this.$emit("restartRoom");
    },
  },
};
</script>
