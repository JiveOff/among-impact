<template>
  <div
    class="modal-card"
    style="width: auto; height: auto; display: flex; align-items: center"
  >
    <div
      class="ai-subbox ai-subbox-green mb-5"
      style="width: 100%; max-width: 100%"
    >
      <div class="ai-subtitle ai-subnegative">Attention!</div>
      Sélectionnez des personnages un minimum montés pour éviter les mauvaises surprises ! Jouez le jeu et soyez fair play !
    </div>
    <Box style="max-width: 80vw">
      <div class="ai-subtitle mt-0">
        <div style="font-size: 1.5rem; line-height: 10px; margin-top: 10px">
          {{ avatarPool.length }} personnages
        </div>
        Poule de personnages
      </div>
      <div class="avatars">
        <div
          class="avatar-box"
          v-for="avatar in avatars"
          :key="avatar.id"
          :class="{ 'avatar-flou': !avatarPool.includes(avatar) }"
          @click="togglePool(avatar)"
        >
          <img :src="`/img/avatars/${avatar}.png`" :alt="avatar" />
          <div class="avatar-name">
            {{ humanizeName(avatar) }}
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<style>
.avatar {
  transition: filter 0.2s ease-in-out;
}

.avatar-box {
  padding: 0.3rem 0.5rem;
  background-color: #00000056;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  cursor: pointer;

  max-width: 100px;
  text-align: center;

  border: 2px solid var(--ai-green);
}

.avatar-box img {
  width: 73px;
  margin-top: 0.5rem;

  padding: 5px;
  background-color: #00000056;
  border-radius: 100%;
}

.avatar-box img {
  transition: filter 0.2s ease-in-out;
}

.avatar-flou img {
  filter: grayscale(100%);
}

.avatar-flou {
  border: 2px solid #00000056;
}

.avatars {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;

  margin-top: 1rem;
  gap: 0.3rem;

  overflow-y: scroll;
  height: 60vh;
}

@media (max-width: 768px) {
  .avatars {
    height: 45vh;
  }
}
</style>

<script>
import Box from "./Box.vue";
export default {
  components: {
    Box,
  },
  props: ["avatarPool", "avatars"],
  methods: {
    togglePool(avatar) {
      this.avatarPool.includes(avatar)
        ? this.avatarPool.splice(this.avatarPool.indexOf(avatar), 1)
        : this.avatarPool.push(avatar);
      localStorage.setItem("avatarPool", this.avatarPool.join(","));
      this.$emit("avatarPoolChanged");
    },
    humanizeName(name) {
      return name
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
    },
  },
};
</script>
