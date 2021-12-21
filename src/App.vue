<template>
  <div id="app">
    <div class="home section">
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
                @leaveRoom="leaveRoom"
                @kickPlayer="kickPlayer"
                @startRoom="startRoom"
                @avatarPoolChanged="avatarPoolChanged"
              />
              <PlayingRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'IN_GAME'
                "
                :gameData="gameData"
                @startVoting="startVoting"
                @changeAvatar="changeAvatar"
                @endRoom="endRoom"
              />
              <VotingRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'VOTING'
                "
                :gameData="gameData"
                :roles="roles"
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
          <div class="ai-title mb-5 mt-0">Un jeu, 6 rôles.</div>
          <div class="roles">
            <Role v-for="role in roles" :key="role.title" :role="role" />
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
import Role from "./components/Role.vue";

import { ToastProgrammatic as Toast } from "buefy";

export default {
  name: "Home",
  components: {
    Box,
    RoomBox,
    Role,
    Footer,
    WaitingRoom,
    PlayingRoom,
    VotingRoom,
    ResultsRoom,
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
  },
  sockets: {
    setPlayer: function (player) {
      this.gameData.playerData = player;
    },
    setRoles: function (roles) {
      this.roles = roles.sort((a, b) => a.id - b.id);
    },
    gameData: function ({ state, data }) {
      this.gameData.state = state;
      this.gameData.roomData = data;
    },
    error: function (error) {
      Toast.open({
        message: error,
        type: "is-danger",
      });
    },
    success: function (message) {
      Toast.open({
        message: message,
        type: "is-success",
      });
    },
    disconnect: function () {
      this.gameData.state = "DISCONNECTED";
      Toast.open({
        message: "Déconnecté du serveur.",
        type: "is-danger",
      });
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
</style>
