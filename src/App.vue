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
        class="emergency-btn"
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