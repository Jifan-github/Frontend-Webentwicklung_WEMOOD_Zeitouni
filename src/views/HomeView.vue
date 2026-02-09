<script setup>
import SearchBar from '../components/SearchBar.vue'
import RotatingText from '../components/RotatingText.vue'
</script>

<template>
  <section class="fullscreen-section snap-section home-section">
    <h1 class="main-title text-[2.5rem] sm:text-[3.5rem] lg:text-[5rem] xl:text-[7rem]">
      <span class="title-static">We</span>
      <RotatingText
          :texts="['Mood', 'Care', 'Help', 'Heal']"
          mainClassName="title-rotating"
          :staggerFrom="'first'"
          :initial="{ y: '100%' }"
          :animate="{ y: 0 }"
          :exit="{ y: '-120%' }"
          :staggerDuration="0.05"
          splitLevelClassName="overflow-hidden"
          :transition="{ type: 'spring', damping: 15, stiffness: 150 }"
          :rotationInterval="3000"
      />
    </h1>
    <SearchBar
        placeholder="Suche nach Artikeln, Themen oder Emotionen..."
        :navigate-on-submit="true"
        :show-suggestions="true"
    />
  </section>
</template>

<style scoped>
.main-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.title-static {
  display: inline-block;
}

.title-rotating {
  display: inline-flex;
  min-width: 100px;
  font-weight: 400;
}

@media (min-width: 768px) {
  .title-rotating {
    min-width: 140px;
  }
}

@media (min-width: 1024px) {
  .title-rotating {
    min-width: 200px;
  }
}
</style>