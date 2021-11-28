<template>
  <div class="modal-card" style="width: auto">
    <Box>
      <div class="ai-subtitle mt-0">Changer d'avatar</div>
      <div class="avatars">
        <a
          class="avatar"
          v-for="avatar in avatars"
          :key="avatar.id"
          @click="changeAvatar(avatar)"
        >
          <img :src="`/img/avatars/${avatar}.png`" :alt="avatar" />
        </a>
      </div>
    </Box>
  </div>
</template>

<style>
.avatar img {
  border-radius: 100%;
  width: 64px;
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
  methods: {
    changeAvatar(avatar) {
      this.$parent.close();
      this.$emit("changeAvatar", avatar);
      console.log(avatar);
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
      ],
    };
  },
};
</script>
