<template>
  <div>
    <div class="ai-center-mini">
      <div class="ai-subbox ai-mini">
        <div class="ai-subtitle">00:00</div>
      </div>
    </div>
    {{ playerVotes }}
    <div class="ai-subbox">
      <div class="ai-subtitle ai-subnegative">Phase de vote</div>
      <div class="players">
        <div
          v-for="player in gameData.roomData.players.filter(
            (p) => p.id !== gameData.playerData.id
          )"
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
          <a @click="voteJoueur(player)" class="tag is-danger"
            ><i class="fas fa-gavel"></i> <span class="ml-2">Voter</span></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.avatar {
  width: 64px;
  height: 64px;
  position: relative;
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
import VoteVue from "./Vote.vue";
export default {
  props: ["gameData", "roles"],
  components: {},
  data() {
    return {
      rolesVoting: [],
      playerVotes: [],
    };
  },
  mounted() {
    this.rolesVoting = this.roles.filter(
      (role) => role.title !== this.gameData.playerData.role.title
    );
  },
  methods: {
    voteJoueur(player) {
      this.$buefy.modal.open({
        parent: this,
        component: VoteVue,
        hasModalCard: true,
        trapFocus: true,
        props: {
          roles: this.rolesVoting,
          player,
        },
        events: {
          votePlayer: (role) => {
            this.playerVotes.push({
              player: player.id,
              role,
            });
          },
        },
      });
    },
  },
};
</script>
