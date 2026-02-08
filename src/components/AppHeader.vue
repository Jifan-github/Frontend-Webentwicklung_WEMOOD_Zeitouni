<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuActive = ref(false)

const toggleMenu = () => {
  menuActive.value = !menuActive.value
}

const closeMenu = () => {
  menuActive.value = false
}

// Close menu on click outside
const handleClickOutside = (e) => {
  const burger = document.querySelector('.burger-menu')
  const nav = document.querySelector('.nav-links')
  if (burger && nav && !burger.contains(e.target) && !nav.contains(e.target)) {
    closeMenu()
  }
}

// Close menu on resize
let resizeTimer
const handleResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    closeMenu()
  }, 250)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <header class="glass-header">
    <nav>
      <router-link to="/" class="logo">WeMood</router-link>

      <button
          class="burger-menu"
          :class="{ active: menuActive }"
          @click.stop="toggleMenu"
          aria-label="Menu"
      >
        <template v-if="!menuActive">
          <span class="burger-line"></span>
          <span class="burger-line"></span>
          <span class="burger-line"></span>
        </template>
        <svg v-else class="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <ul class="nav-links" :class="{ active: menuActive }">
        <li v-if="route.path !== '/'">
          <router-link to="/" class="nav-link" @click="closeMenu">
            Startseite
          </router-link>
        </li>
        <li v-if="route.path !== '/artikel'">
          <router-link to="/artikel" class="nav-link" @click="closeMenu">
            Alle Artikel
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>