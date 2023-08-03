<template>
  <div class="ai-box" :class="mode">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useMiscStore } from "../stores/misc";

export default {
  computed: {
    ...mapState(useMiscStore, ["mode"]),
  },
};
</script>

<style>
.mirror {
  background-color: #1f3a41 !important;
}

.chaos {
  background-color: #3f1e2e !important;
}
</style>
