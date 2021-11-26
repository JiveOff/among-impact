<template>
  <div class="role">
    <div><img :src="role.image" /></div>
    <span class="role-title">{{ role.title }}</span>
    <span class="role-description">{{ role.description }}</span>
  </div>
</template>

<script>
export default {
  props: ["role"],
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

.role-title {
  font-size: 3em;
  font-family: "Amatic SC", cursive;
  line-height: 1;
}

.role img {
  width: 64px;
  border-radius: 100%;
}
</style>
