<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AnimatedBackground from './components/AnimatedBackground.vue'
import EmergencyModal from './components/EmergencyModal.vue'
import { containsCrisis } from './data/artikel'

// Emergency Modal State
const showEmergency = ref(false)

const openEmergency = () => {
  showEmergency.value = true
  document.body.style.overflow = 'hidden'
}

const closeEmergency = () => {
  showEmergency.value = false
  document.body.style.overflow = ''
}

// Keyboard shortcut: Alt+N opens emergency, Escape closes it
const handleKeydown = (e) => {
  if (e.altKey && e.key.toLowerCase() === 'n') {
    e.preventDefault()
    openEmergency()
  }
  if (e.key === 'Escape' && showEmergency.value) {
    closeEmergency()
  }
}

// Crisis detection on text input fields
const handleInput = (e) => {
  const el = e.target
  if (!el) return
  const isText = el.tagName === 'TEXTAREA' ||
      (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'search'))
  if (isText && containsCrisis(el.value)) {
    openEmergency()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('input', handleInput)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('input', handleInput)
})

// Provide emergency function to child components
provide('openEmergency', openEmergency)
</script>

<template>
  <div class="app">
    <AnimatedBackground />
    <AppHeader />

    <button
        class="emergency-btn right-2.5 bottom-2.5 p-2.5 text-sm sm:right-3 sm:bottom-3 sm:px-3 sm:py-2.5 sm:text-[0.85rem] md:right-4 md:bottom-4 md:px-[14px] md:py-3 md:text-[0.9rem] lg:right-5 lg:bottom-5 lg:px-[18px] lg:py-3.5 lg:text-[0.95rem]"
        @click="openEmergency"
        aria-haspopup="dialog"
    >
      Notfall-Hilfe
    </button>

    <EmergencyModal
        :show="showEmergency"
        @close="closeEmergency"
    />

    <main>
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>