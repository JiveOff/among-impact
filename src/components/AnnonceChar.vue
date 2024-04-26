<template>
  <div class="modal-card" style="width: auto">
    <transition name="fade" mode="out-in">
      <div v-if="transitionRole" class="ai-transition-role">
        <img :src="info.role.image" />
      </div>
      <Box v-if="!transitionRole">
        <div class="ai-title ai-negative ai-debut">Début de la partie!</div>
        <div class="infos">
          <div class="perso">
            <div class="ai-subtitle mt-0">Ton personnage</div>
            <div class="avatar">
              <img
                :src="`https://api.ambr.top/assets/UI/${
                  avatars[info.avatarId].icon
                }.png`"
                :alt="avatar"
              /><span class="name">
                {{ avatars[info.avatarId].name }}
              </span>
            </div>
          </div>
          <div class="role">
            <div class="ai-subtitle mt-0">Ton rôle</div>
            <div class="role">
              <Role :role="info.role" :showDesc="true" />
            </div>
          </div>
        </div>
      </Box>
    </transition>
  </div>
</template>

<style scoped>
.ai-transition-role {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.ai-transition-role img {
  width: 20em;
}

.modal-card {
  overflow: initial;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 300px;
}

.avatar .name {
  font-size: 3em;
  font-family: "Amatic SC", cursive;
  line-height: 1;
  margin-bottom: 1rem;
}

.avatar img {
  width: 92px;
  height: 92px;
}

.infos {
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
}

.perso {
  flex: 1 0 auto;
}

.role {
  flex: 5.2;
}
</style>

<script>
import { mapState } from "pinia";
import Box from "./Box.vue";
import Role from "./Role.vue";
import { useMiscStore } from "../stores/misc";

export default {
  components: {
    Box,
    Role,
  },
  props: ["info"],
  data() {
    return {
      transitionRole: true,
    };
  },
  computed: {
    ...mapState(useMiscStore, ["avatars"]),
  },
  mounted() {
    let audio = new Audio("sounds/start.mp3");
    audio.volume = 0.45;
    audio.play();

    setTimeout(() => {
      this.transitionRole = false;
    }, 1500);

    setTimeout(() => {
      this.$parent.close();
    }, 35e3);
  },
};
</script>
