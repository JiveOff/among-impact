<template>
  <div>
    <div class="ai-subbox">
      <div class="ai-subtitle ai-subnegative">Rejoindre une partie</div>
      <div class="group">
        <input
          v-model="join_pseudo"
          class="ai-input-yellow"
          type="text"
          minlength="5"
          required
          ref="join_pseudo"
          @keydown.enter="joinRoom"
        />
        <span class="bar ai-input-yellow"></span>
        <label class="ai-input-yellow">Pseudo</label>
      </div>
      <div class="group mt-5">
        <input
          v-model="join_code"
          type="text"
          class="ai-input-yellow"
          minlength="5"
          required
          @keydown.enter="joinRoom"
        />
        <span class="bar ai-input-yellow"></span>
        <label class="ai-input-yellow">Code d'invitation (ex: C4269)</label>
      </div>
    </div>
    <b-button class="ai-button ai-bg-yellow" @click="joinRoom"
      >Rejoindre une partie</b-button
    >
    <div class="ai-strike pt-4 pb-4">
      <span>ou</span>
    </div>
    <div class="ai-subbox">
      <div class="ai-subtitle ai-subnegative">Créer une partie</div>
      <div class="group">
        <input
          v-model="create_pseudo"
          type="text"
          class="ai-input-green"
          minlength="5"
          @keydown.enter="createRoom"
          required
        />
        <span class="bar ai-input-green"></span>
        <label class="ai-input-green">Pseudo</label>
      </div>
    </div>
    <b-button class="ai-button ai-bg-green" @click="createRoom"
      >Créer une partie</b-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      join_pseudo: "",
      join_code: "",
      create_pseudo: "",
    };
  },
  methods: {
    createRoom() {
      this.$emit("createRoom", { name: this.create_pseudo });
    },
    joinRoom() {
      this.$emit("joinRoom", {
        name: this.join_pseudo,
        code: this.join_code,
      });
    },
  },
  mounted() {
    let join_code = window.location.hash.slice(1);
    if (join_code) {
      this.$refs.join_pseudo.focus();
      this.join_code = join_code;
    }
  },
};
</script>

<style></style>
