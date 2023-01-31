<template>
  <div class="role" :class="{ 'compact': !showDesc }">
    <div><img :src="role.image" /></div>
    <span class="role-title" :style="`color: ${role.color}`">{{
      role.title
    }}</span>
    <span v-if="showDesc" class="role-description">{{ role.description }}</span>
  </div>
</template>

<script>
export default {
  props: {
    role: Object,
    showDesc: Boolean,
  },
};
</script>

<style>
.role {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  color: white;
}

.role .compact {
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.role .compact .role-title {
  margin-bottom: 0;
  font-size: 3em;
}

.role .compact img {
  width: 48px;
}

.role-title {
  font-size: 3em;
  font-family: "Amatic SC", cursive;
  line-height: 1;
  margin-bottom: 1rem;
}

.role img {
  width: 96px;
  border-radius: 100%;
  margin-bottom: 5px;
  margin-top: 15px;
}
</style>
