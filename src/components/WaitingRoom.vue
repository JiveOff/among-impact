<template>
  <div>
    <div v-if="avatarPool.length === 0" class="ai-subbox ai-subbox-red mb-5">
      <div class="ai-subtitle ai-subnegative">Attention!</div>
      Vous n'avez aucun personnage dans votre poule. Cliquez
      <span class="ai-link" @click="changePool">ici</span> pour en ajouter.
    </div>
    <div class="ai-subbox mb-5">
      <div class="ai-subtitle ai-subnegative">
        Joueurs ({{ gameData.roomData.players.length }}/4)
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
              @click="changePool"
              ><font-awesome-icon icon="user"
            /></a>
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
            ><font-awesome-icon icon="times"
          /></a>
        </div>
      </div>
    </div>
    <div class="ai-subbox mb-4">
      <div class="ai-subtitle ai-subnegative">Code d'invitation</div>
      <div class="ai-invite-code">
        <span class="ai-invite-link">https://among-impact.jiveoff.fr/#</span
        ><span class="ai-room-code" :class="{ 'ai-blur': hideCode }">{{
          gameData.roomData.inviteCode
        }}</span>
        <span class="ai-eye-code" @click="$emit('toggleCode')">
          <font-awesome-icon :icon="hideCode ? 'eye-slash' : 'eye'" />
        </span>
      </div>
    </div>

    <div style="display: flex; gap: 10px">
      <b-button
        v-if="gameData.playerData.id === gameData.roomData.host.id"
        class="ai-button"
        style="flex: 0.5; background-color: #d984f9"
        @click="personalizeRoom"
      >
        Custom
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="1280.000000pt"
          height="1280.000000pt"
          viewBox="0 0 1280.000000 1280.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M10010 12786 c-62 -16 -115 -50 -148 -94 -15 -21 -1981 -1990 -4370
-4377 l-4343 -4340 -114 -395 c-153 -533 -524 -1813 -636 -2200 -33 -113 -119
-407 -191 -655 -71 -247 -147 -510 -169 -584 -21 -74 -37 -136 -36 -138 2 -2
98 24 213 58 115 33 425 123 689 199 264 76 674 195 910 263 237 69 729 212
1095 317 366 105 757 218 870 251 l205 59 1495 1493 c4550 4542 7250 7243
7250 7250 0 5 9 21 20 37 11 15 26 54 35 86 74 283 -163 798 -634 1376 -136
168 -545 582 -711 720 -591 491 -1144 752 -1430 674z"
              fill="#1e273a"
            />
          </g>
        </svg>
      </b-button>
      <b-button
        style="flex: 1"
        v-if="gameData.playerData.id === gameData.roomData.host.id"
        :disabled="gameData.roomData.players.length < 3"
        class="ai-button ai-bg-green"
        @click="startRoom"
        >Démarrer la partie</b-button
      >
    </div>
    <b-button class="ai-button ai-bg-red" @click="leaveRoom"
      >Quitter la partie</b-button
    >
  </div>
</template>

<style lang="scss">
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
import AvatarPoolVue from "./AvatarPool.vue";
import RoomSettingsVue from "./RoomSettings.vue";

export default {
  props: ["gameData", "hideCode", "avatars"],
  data() {
    return {
      avatarPool: [],
    };
  },
  mounted() {
    let pool = localStorage.getItem("avatarPool");
    if (pool.length > 0) this.avatarPool = pool.split(",");

    this.avatarPool = this.avatarPool.filter((avatar) =>
      this.avatars.includes(avatar)
    );

    this.$emit("avatarPoolChanged", { pool: this.avatarPool });
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
    changePool() {
      this.$buefy.modal.open({
        parent: this,
        component: AvatarPoolVue,
        hasModalCard: true,
        trapFocus: true,
        props: {
          avatarPool: this.avatarPool,
          avatars: this.avatars,
        },
        events: {
          avatarPoolChanged: () => {
            this.$emit("avatarPoolChanged", { pool: this.avatarPool });
          },
        },
      });
    },
    personalizeRoom() {
      this.$buefy.modal.open({
        parent: this,
        component: RoomSettingsVue,
        hasModalCard: true,
        trapFocus: true,
        props: {
          gameData: this.gameData,
        },
        events: {
          changeMode: (mode) => {
            this.$emit("changeMode", { mode });
          },
        },
      });
    },
  },
};
</script>
