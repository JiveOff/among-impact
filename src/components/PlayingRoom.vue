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
              :src="`https://api.ambr.top/assets/UI/${
                avatars[player.avatarId].icon
              }.png`"
              :key="player.avatarId"
              alt="Profil"
            />
          </div>
          <div>
            <span class="player-name">{{ player.name }}</span>
            <span class="player-role">{{ avatars[player.avatarId].name }}</span>
          </div>
        </div>
      </div>
    </div>
    <b-button
      v-if="gameData.playerData.id === gameData.roomData.host.id"
      class="ai-button ai-bg-green"
      @click="rerollAvatars"
      >Re-roll</b-button
    >
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
  line-height: 1rem;
}

.player .player-role {
  display: block;
  font-size: 0.8rem;
  line-height: 1rem;
}

.player img {
  width: 64px;
  border-radius: 100%;
}
</style>

<script>
import { mapState } from "pinia";
import AnnonceCharVue from "./AnnonceChar.vue";
import Role from "./Role.vue";
import { useMiscStore } from "../stores/misc";
export default {
  props: ["gameData"],
  components: {
    Role,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useMiscStore, ["avatars"]),
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
    rerollAvatars() {
      this.$emit("rerollAvatars");
    },
  },
};
</script>
