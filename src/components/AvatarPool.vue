<template>
  <div class="modal-card" style="width: auto">
    <Box>
      <div class="ai-subtitle mt-0">Changer la poule de personnages</div>
      <div class="avatars">
        <a
          class="avatar"
          v-for="avatar in avatars"
          :key="avatar.id"
          :class="{ 'avatar-flou': !avatarPool.includes(avatar) }"
          @click="togglePool(avatar)"
        >
          <img :src="`/img/avatars/${avatar}.png`" :alt="avatar" />
        </a>
      </div>
    </Box>
  </div>
</template>

<style>
.avatar {
  transition: filter 0.2s ease-in-out;
}

.avatar img {
  border-radius: 100%;
  width: 64px;
}

.avatar-flou {
  filter: grayscale(100%);
}

.avatars {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.2rem;
}
</style>

<script>
import Box from "./Box.vue";
export default {
  components: {
    Box,
  },
  props: ["avatarPool"],
  methods: {
    togglePool(avatar) {
      this.avatarPool.includes(avatar)
        ? this.avatarPool.splice(this.avatarPool.indexOf(avatar), 1)
        : this.avatarPool.push(avatar);
      localStorage.setItem("avatarPool", this.avatarPool.join(","));
      this.$emit("avatarPoolChanged");
    },
  },
  data() {
    return {
      avatars: [
        "albedo",
        "aloy",
        "amber",
        "barbara",
        "beidou",
        "bennett",
        "chongyun",
        "diluc",
        "diona",
        "eula",
        "fischl",
        "ganyu",
        "hu_tao",
        "jean",
        "kaedehara_kazuha",
        "kaeya",
        "kamisato_ayaka",
        "keqing",
        "klee",
        "kujou_sara",
        "lisa",
        "mona",
        "ningguang",
        "noelle",
        "qiqi",
        "raiden_shogun",
        "razor",
        "rosaria",
        "sangonomiya_kokomi",
        "sayu",
        "sucrose",
        "tartaglia",
        "thoma",
        "traveler_anemo",
        "traveler_geo",
        "venti",
        "xiangling",
        "xiao",
        "xingqiu",
        "xinyan",
        "yanfei",
        "yoimiya",
        "zhongli",
        "arataki_itto",
        "gorou",
        "shenhe",
        "yun_jin",
        "yae_miko",
      ],
    };
  },
};
</script>
