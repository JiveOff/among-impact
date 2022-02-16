<template>
  <div>
    <div class="ai-subbox mb-5">
      <div class="ai-subtitle ai-subnegative">Ton rôle</div>
      <div class="role">
        <Role :role="gameData.playerData.role" />
      </div>
    </div>
    <div class="ai-subbox">
      <div class="ai-subtitle ai-subnegative">Joueurs</div>
      <div class="players">
        <div
          v-for="player in gameData.roomData.players"
          :key="player.id"
          class="player"
        >
          <div class="avatar">
            <img
              :src="`/img/avatars/${player.profilePicture}.png`"
              :key="player.profilePicture"
              alt="Profil"
            />
          </div>
          <span class="player-name">{{ player.name }}</span>
        </div>
      </div>
    </div>
    <b-button
      v-if="gameData.playerData.id === gameData.roomData.host.id"
      class="ai-button ai-bg-yellow"
      @click="startVoting"
      >Démarrer le vote</b-button
    >
    <b-button
      v-if="gameData.playerData.id === gameData.roomData.host.id"
      class="ai-button ai-bg-red"
      @click="endRoom"
      >Arrêter la partie</b-button
    >
  </div>
</template>

<style>
.avatar {
  width: 64px;
  height: 64px;
  position: relative;
}

.change-avatar {
  border-radius: 100% !important;
  width: 24px;
  position: absolute;
  right: 0;
  bottom: 0;
}

.kick-button {
  color: var(--ai-red);
}

.players {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.player {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.player .player-name {
  font-family: "Amatic SC", cursive;
  font-size: 2rem;
}

.player img {
  width: 64px;
  border-radius: 100%;
}
</style>

<script>
import AnnonceCharVue from "./AnnonceChar.vue";
import Role from "./Role.vue";
export default {
  props: ["gameData"],
  components: {
    Role,
  },
  data() {
    return {};
  },
  mounted() {
    this.$buefy.modal.open({
      parent: this,
      component: AnnonceCharVue,
      hasModalCard: true,
      trapFocus: true,
      props: {
        info: this.gameData.playerData,
      },
    });
  },
  methods: {
    startVoting() {
      this.$emit("startVoting");
    },
    endRoom() {
      this.$emit("endRoom");
    },
  },
};
</script>
