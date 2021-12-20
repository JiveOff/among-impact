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
                @changeAvatar="changeAvatar"
                @startRoom="startRoom"
              />
              <PlayingRoom
                v-if="
                  gameData.state == 'IN_ROOM' &&
                  gameData.roomData.state == 'IN_GAME'
                "
                :gameData="gameData"
                @startVoting="startVoting"
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
            </transition>
          </Box>
          <!-- <div style="margin-top: 2.5rem">
              <Box>
                <div class="ai-subtitle ai-subnegative">Streaming</div>
                Tu souhaite afficher les joueurs et leur rôle pendant la partie
                sur ton overlay OBS? Clique <b>ici</b>.<br />
                <div class="ai-subbox mt-5">
                  <div class="group">
                    <input
                      v-model="overlay_link"
                      class="ai-input-green"
                      type="text"
                      minlength="5"
                      required
                      ref="overlay_link"
                      @keydown.enter="overlayLink"
                    />
                    <span class="bar ai-input-green"></span>
                    <label class="ai-input-green">Code Overlay</label>
                  </div>
                </div>
              </Box>
            </div> -->
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
      this.$socket.emit("createRoom", obj);
    },
    joinRoom(obj) {
      this.$socket.emit("joinRoom", obj);
    },
    leaveRoom() {
      this.$socket.emit("leaveRoom");
    },
    kickPlayer(obj) {
      this.$socket.emit("kickPlayer", obj);
    },
    changeAvatar(obj) {
      this.$socket.emit("changeAvatar", obj);
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
