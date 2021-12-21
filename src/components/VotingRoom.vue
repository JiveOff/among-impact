<template>
  <div>
    <div class="ai-center-mini">
      <div class="ai-subbox ai-mini">
        <div class="ai-subtitle">
          0{{ Math.floor(timer / 60) }}:{{ timerFormatted }}
        </div>
      </div>
    </div>
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
              class="ai-avatar"
            />
            <img
              v-if="playerVotes.findIndex((p) => p.player === player.id) > -1"
              :src="`${
                playerVotes.filter((p) => p.player === player.id)[0].role.image
              }`"
              :key="player.profilePicture"
              class="ai-avatar-vote"
              alt="Profil"
            />
          </div>
          <div class="details">
            <span
              class="player-name"
              :style="`color: ${
                playerVotes.findIndex((p) => p.player === player.id) > -1
                  ? playerVotes.filter((p) => p.player === player.id)[0].role
                      .color
                  : ''
              }`"
              >{{ player.name }}</span
            >
            <span
              v-if="playerVotes.findIndex((p) => p.player === player.id) > -1"
              class="player-role"
              >Ton vote:
              {{
                playerVotes.filter((p) => p.player === player.id)[0].role.title
              }}</span
            >
          </div>
          <a @click="voteJoueur(player)" class="tag is-danger"
            ><font-awesome-icon icon="gavel" />
            <span class="ml-2">Voter</span></a
          >
        </div>
      </div>
    </div>
    <b-button
      v-if="gameData.playerData.id === gameData.roomData.host.id"
      class="ai-button ai-bg-red"
      @click="endVoting"
      >Arrêter le vote</b-button
    >
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

.details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
}

.player .player-name {
  font-family: "Amatic SC", cursive;
  font-size: 2rem;
}

.player .player-role {
  display: block;
}

.player .ai-avatar {
  width: 64px;
  border-radius: 100%;
}

.player .ai-avatar-vote {
  position: absolute;
  left: 0;
  opacity: 0.4;
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
      timer: 5 * 60,
    };
  },
  mounted() {
    this.loadRolesVoting();
    let timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  },
  computed: {
    timerFormatted: function () {
      return this.timer % 60 < 10 ? "0" + (this.timer % 60) : this.timer % 60;
    },
  },
  methods: {
    endVoting() {
      this.$emit("endVoting");
    },
    loadRolesVoting() {
      this.rolesVoting = this.roles.filter(
        (role) =>
          role.title !== this.gameData.playerData.role.title &&
          this.playerVotes.findIndex((p) => p.role.title === role.title) === -1
      );
    },
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
          votePlayer: (vote) => {
            let v = this.playerVotes.findIndex(
              (p) => p.player === vote.player.id
            );
            if (v > -1) {
              this.playerVotes[v].role = vote.role;
            } else {
              this.playerVotes.push({
                player: vote.player.id,
                role: vote.role,
              });
            }
            this.$socket.emit("sendVotes", this.playerVotes);
            this.loadRolesVoting();
          },
        },
      });
    },
  },
};
</script>
