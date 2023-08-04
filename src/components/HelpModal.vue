<template>
  <div
    class="modal-card"
    style="width: auto; height: auto; display: flex; align-items: center"
  >
    <Box style="max-width: 80vw">
      <div class="ai-subtitle mt-0">Règles du jeu</div>
      <div class="mt-5">
        Among Impact est un mode de jeu Genshin créé par
        <a href="https://twitch.tv/akenouille">Akenouille</a>. <br /><br />
        Le but du jeu est de combattre des boss hebdomadaires à 4, en
        multijoueur.<br />Avant de commencer la partie, tous les joueurs se font
        distribuer un rôle aléatoire ainsi qu'un personnage aléatoire de leur
        box (qu'ils auront fournie au prélable, en indiquant de préférence
        uniquement les personnages montés).<br />Pendant la partie, chaque
        joueur doit jouer son rôle comme il lui est indiqué, tout en essayant de
        déceler le rôle de ses coéquipiers. <br />À la fin de la partie, un vote
        est mis en place au sein des joueurs pour désigner le rôle de chacun.
        Celui qui a le mieux deviné remporte le plus de points !
      </div>
    </Box>
  </div>
</template>

<script>
import Box from "./Box.vue";

export default {
  components: {
    Box,
  },
};
</script>

<style scoped>
a {
  font-weight: 500;
  color: var(--primary-lighter) !important;
}
</style>
