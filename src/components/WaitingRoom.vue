<template>
  <div>
    <div class="ai-subbox mb-5">
      <div class="ai-subtitle ai-subnegative">
        Joueurs ({{ gameData.roomData.player.length }}/4)
      </div>
      <div class="players">
        <div
          v-for="player in gameData.roomData.players"
          :key="player.id"
          class="player"
        >
          <div class="avatar">
            <transition name="fade" mode="out-in">
              <img
                :src="`/img/avatars/${player.profilePicture}.png`"
                :key="player.profilePicture"
                alt="Profil"
              />
            </transition>
            <a
              v-if="player.id == gameData.playerData.id"
              class="tag is-primary change-avatar"
              @click="changeAvatar"
              ><i class="fas fa-user"></i
            ></a>
          </div>
          <span class="player-name">{{ player.name }}</span>
          <span v-if="player.id == gameData.roomData.host.id" class="tag"
            >Hôte</span
          >
          <a
            v-if="
              gameData.playerData.id === gameData.roomData.host.id &&
              player.id !== gameData.playerData.id
            "
            href="javascript:void()"
            @click="kickPlayer(player.id)"
            class="kick-button"
            ><i class="fas fa-times"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="ai-subbox mb-4">
      <div class="ai-subtitle ai-subnegative">Code d'invitation</div>
      <div class="ai-invite-code">
        <span class="ai-invite-link">https://among-impact.jiveoff.fr/</span
        ><span>{{ gameData.roomData.inviteCode }}</span>
      </div>
    </div>
    <b-button
      v-if="gameData.playerData.id === gameData.roomData.host.id"
      :disabled="gameData.roomData.players.length < 4"
      class="ai-button ai-bg-green"
      @click="startRoom"
      >Démarrer la partie</b-button
    >
    <b-button class="ai-button ai-bg-red" @click="leaveRoom"
      >Quitter la partie</b-button
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
import ChangeAvatarVue from "./ChangeAvatar.vue";
export default {
  props: ["gameData"],
  data() {
    return {};
  },
  methods: {
    leaveRoom() {
      this.$emit("leaveRoom");
    },
    kickPlayer(id) {
      this.$emit("kickPlayer", { id });
    },
    startRoom() {
      this.$emit("startRoom");
    },
    changeAvatar() {
      this.$buefy.modal.open({
        parent: this,
        component: ChangeAvatarVue,
        hasModalCard: true,
        trapFocus: true,
        events: {
          changeAvatar: (avatar) => {
            this.$emit("changeAvatar", { avatar });
          },
        },
      });
    },
  },
};
</script>
