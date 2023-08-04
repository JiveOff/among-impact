<template>
  <div id="app">
    <div
      v-if="
        gameData.state !== 'WAITING' &&
        gameData.roomData.roleGamemode == 'MIRROR'
      "
      class="ai-bar ai-subbox-green"
    >
      <b>Attention !</b> Le mode de jeu Miroir est activé. Il peut donc y avoir
      des rôles en double lors de la partie, soyez attentifs !
    </div>
    <div
      v-else-if="
        gameData.state !== 'WAITING' &&
        gameData.roomData.roleGamemode == 'CHAOS'
      "
      class="ai-bar ai-subbox-red"
    >
      <b>Il est l'heure du chaos...</b> Le mode de jeu Chaos est activé. Il est
      donc possible de choisir son rôle !
    </div>
    <div v-else class="ai-bar">
      Version 0.4 - Ajout des modes de jeu <b>Miroir</b> et <b>Chaos</b> et
      reconnexions automatiques.
    </div>
    <div class="home section">
      <div class="help-btn" @click="openHelp">
        <div class="icon">?</div>
        <span class="text">Règles</span>
      </div>
      <div class="columns is-desktop is-centered">
        <div class="column ai-center">
          <Box>
            <div class="ai-title ai-negative">Among Impact</div>
            <transition name="fade" mode="out-in">
              <RoomBox
                v-if="gameData.state == 'WAITING'"
                @createRoom="createRoom"
                @joinRoom="joinRoom"
              />
              <WaitingRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'WAITING'
                "
                :gameData="gameData"
                :avatars="avatars"
                :hideCode="hideCode"
                @toggleCode="toggleCode"
                @leaveRoom="leaveRoom"
                @kickPlayer="kickPlayer"
                @startRoom="startRoom"
                @avatarPoolChanged="avatarPoolChanged"
                @changeMode="changeMode"
              />
              <PlayingRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'IN_GAME'
                "
                :gameData="gameData"
                @startVoting="startVoting"
                @rerollAvatars="rerollAvatars"
                @changeAvatar="changeAvatar"
                @endRoom="endRoom"
              />
              <VotingRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'VOTING'
                "
                :gameData="gameData"
                :roles="
                  roles.filter(
                    (role) => !gameData.roomData.disabledRoles.includes(role.id)
                  )
                "
                @endVoting="endVoting"
              />
              <ResultsRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'ENDED'
                "
                :gameData="gameData"
                @leaveRoom="leaveRoom"
                @restartRoom="restartRoom"
              />
              <div v-if="gameData.state == 'LOADING'" class="ai-subbox">
                <div class="ai-subtitle ai-subnegative">Chargement...</div>
                Connexion au serveur...<br /><br />
                Si rien ne se passe, actualisez ou contactez
                <b>JiveOff#0727</b> sur Discord.
              </div>
              <div v-if="gameData.state == 'DISCONNECTED'" class="ai-subbox">
                <div class="ai-subtitle ai-subnegative">
                  Déconnecté du serveur
                </div>
                Vous avez été déconnecté du serveur Among Impact.
              </div>
            </transition>
          </Box>
        </div>
        <div class="column roles-col">
          <div class="ai-title mb-5 margin-mobile">
            Jouez votre rôle et gagnez la partie !
          </div>
          <div class="roles">
            <role-list-item
              v-for="role in roles"
              :key="role.title"
              :role="role"
              :gameData="gameData"
              @toggleRole="toggleRole(role)"
              @chooseRole="chooseRole(role)"
              :chosen="chosenRole === role.id"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Box from "./components/Box.vue";
import RoomBox from "./components/RoomBox.vue";
import WaitingRoom from "./components/WaitingRoom.vue";
import PlayingRoom from "./components/PlayingRoom.vue";
import VotingRoom from "./components/VotingRoom.vue";
import ResultsRoom from "./components/ResultsRoom.vue";
import RoleListItem from "./components/RoleListItem.vue";
import HelpModalVue from "./components/HelpModal.vue";

import { useMiscStore } from "./stores/misc";

export default {
  name: "Home",
  components: {
    Box,
    RoomBox,
    Footer,
    WaitingRoom,
    PlayingRoom,
    VotingRoom,
    ResultsRoom,
    RoleListItem,
  },
  methods: {
    createRoom(obj) {
      this.$socket.emit("createRoom", obj.name);
    },
    joinRoom(obj) {
      this.$socket.emit("joinRoom", obj.name, obj.code);
    },
    leaveRoom() {
      this.$socket.emit("leaveRoom");
    },
    kickPlayer(obj) {
      this.$socket.emit("kickPlayer", obj.id);
    },
    changeAvatar(obj) {
      this.$socket.emit("changeAvatar", obj.avatar);
    },
    startRoom() {
      this.$socket.emit("startRoom");
    },
    startVoting() {
      this.$socket.emit("startVoting");
    },
    rerollAvatars() {
      this.$socket.emit("rerollAvatars");
    },
    endRoom() {
      this.$socket.emit("endRoom");
    },
    endVoting() {
      this.$socket.emit("endVoting");
    },
    restartRoom() {
      this.$socket.emit("restartRoom");
    },
    avatarPoolChanged(obj) {
      this.$socket.emit("avatarPoolChanged", obj.pool);
    },
    changeMode(mode) {
      this.$socket.emit("changeMode", mode);
    },
    chooseRole(role) {
      this.$socket.emit("chooseRole", role.id);
      this.chosenRole = role.id;
    },
    toggleRole(role) {
      if (this.disabledRoles.includes(role.id)) {
        this.disabledRoles = this.disabledRoles.filter((r) => r !== role.id);
      } else {
        this.disabledRoles.push(role.id);
      }
      this.$socket.emit("setDisabledRoles", this.disabledRoles);
    },
    toggleCode() {
      this.hideCode = !this.hideCode;
    },
    openHelp: function () {
      this.$buefy.modal.open({
        parent: this,
        component: HelpModalVue,
        hasModalCard: true,
        trapFocus: true,
      });
    },
  },
  sockets: {
    setPlayer: function (player) {
      this.gameData.playerData = player;
      localStorage.setItem("playerId", player.id);
    },
    setRoles: function (roles) {
      this.roles = roles.sort((a, b) => a.id - b.id);
    },
    setAvatars: function (avatars) {
      this.avatars = avatars;
    },
    gameData: function ({ state, data }) {
      this.gameData.state = state;
      this.gameData.roomData = data;

      if (this.gameData.roomData) {
        if (this.gameData.roomData.roleGamemode === "MIRROR") {
          useMiscStore().setMode("mirror");
        } else if (this.gameData.roomData.roleGamemode === "CHAOS") {
          useMiscStore().setMode("chaos");
        } else {
          useMiscStore().setMode("normal");
        }
      } else {
        useMiscStore().setMode("normal");
        setTimeout(() => {
          if (this.gameData.state === "WAITING") {
            localStorage.removeItem("playerId");
          }
        }, 1000);
      }
    },
    error: function (error) {
      this.$toast.error(error);
    },
    success: function (message) {
      this.$toast.success(message);
    },
    disconnect: function () {
      this.gameData.state = "DISCONNECTED";
      this.$toast.error("Déconnecté du serveur.");
    },
  },
  data() {
    return {
      gameData: {
        state: "LOADING",
        playerData: {},
        roomData: {},
      },

      roles: [],
      avatars: [],
      disabledRoles: [],

      chosenRole: null,

      hideCode: false,
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .margin-mobile {
    margin-top: 2rem;
  }
}
</style>
