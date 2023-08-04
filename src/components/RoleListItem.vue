<template>
  <div class="ai-role-box">
    <Box>
      <transition name="fade" mode="out-in">
        <div
          v-if="
            gameData.state == 'IN_ROOM' &&
            gameData.playerData.id !== gameData.roomData.host.id &&
            gameData.roomData.disabledRoles.includes(role.id)
          "
          class="ai-role-disabled"
        >
          Rôle désactivé
        </div>
      </transition>
      <div
        class="ai-role"
        :class="{
          'ai-role-opacity':
            gameData.state == 'IN_ROOM' &&
            gameData.roomData.disabledRoles.includes(role.id),
        }"
      >
        <div class="ai-role-name">
          <img :src="role.image" class="ai-role-image" />
          <span class="ai-role-title" :style="`color: ${role.color}`">{{
            role.title
          }}</span>
          <div class="ai-role-gap"></div>
          <div
            v-if="
              gameData.state == 'IN_ROOM' &&
              gameData.roomData.state == 'WAITING' &&
              gameData.roomData.roleGamemode == 'CHAOS' &&
              !gameData.roomData.disabledRoles.includes(role.id)
            "
          >
            <a v-if="chosen" class="tag is-success">Choisi</a>
            <a v-else class="tag is-warning" @click="$emit('chooseRole')"
              >Choisir</a
            >
          </div>
          <div
            v-if="
              gameData.state == 'IN_ROOM' &&
              gameData.roomData.state == 'WAITING' &&
              gameData.playerData.id === gameData.roomData.host.id
            "
          >
            <a
              v-if="gameData.roomData.disabledRoles.includes(role.id)"
              class="tag is-success"
              @click="$emit('toggleRole')"
            >
              Activer
            </a>
            <a v-else class="tag is-danger" @click="$emit('toggleRole')">
              Désactiver
            </a>
          </div>
        </div>
        <span class="role-description">{{ role.description }}</span>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from "./Box.vue";

export default {
  props: ["role", "gameData", "chosen"],
  components: {
    Box,
  },
};
</script>

<style lang="scss">
.ai-role-box {
  padding-top: 1.5rem;
}

.ai-role-gap {
  flex: 1;
}

.ai-role-name {
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;

  margin-top: -2.5rem;
  margin-bottom: 0.5rem;
}

.ai-role-title {
  font-size: 3em;
  font-family: "Amatic SC", cursive;
  line-height: 1;
}

.ai-role-disabled {
  position: absolute;
  font-size: 3em;
  font-family: "Amatic SC", cursive;
  line-height: 1;
  margin-top: 5px;
}

.ai-role-name img {
  width: 42px;
  border-radius: 100%;
}

.ai-role-image,
.ai-role-title,
.role-description {
  transition: filter 0.3s ease-in-out;
}

.ai-role-opacity {
  .ai-role-image {
    filter: opacity(0.3) blur(4px);
  }

  .ai-role-title {
    filter: opacity(0.3) blur(4px);
  }

  .role-description {
    filter: opacity(0.3) blur(4px);
  }
}
</style>
