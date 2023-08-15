<template>
  <footer>
    <div class="ai-center">
      <a href="https://discord.gg/mEerzctbEg" class="ai-subbox">
        <img src="/img/discord.svg" />
        <div>
          <span class="ai-discord">Discord d'Akenouille</span><br />
          Trouve des coéquippiers, poste tes suggestions et rapporte les bugs !
        </div>
      </a>
    </div>
    <b>Among Impact</b> 0.5<br />Concept de
    <a href="https://twitch.tv/Akenouille">Akenouille</a>, développé par
    <a href="https://github.com/JiveOff">JiveOff</a>, icônes de rôle par
    Belidya.<br /><br />Une partie des dessins & effets sonores sont des marques
    commerciales<br />et/ou déposées de <b>miHoYo</b> et de leurs associés.<br />
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.ai-discord {
  font-weight: 600;
  letter-spacing: 1.3px;
}

.ai-center {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.ai-subbox {
  text-align: left;
  display: flex;
  gap: 1rem;
  font-weight: 100;
  color: #fff !important;
}

.ai-subbox img {
  width: 32px;
  height: 32px;
}

footer {
  text-align: center;
  color: var(--primary-light);
  padding: 10px;
  margin-bottom: 15px;
}

a {
  font-weight: 500;
  color: var(--primary-lighter) !important;
}

b {
  font-weight: 500;
  color: var(--primary-lighter) !important;
}
</style>
