<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// Background is darker on subpages
const isDarker = computed(() => {
  return route.path !== '/'
})
</script>

<template>
  <div class="animated-background" :class="{ 'darker-bg': isDarker }">
    <!-- Floating Shapes -->
    <div class="floating-shape shape-1"></div>
    <div class="floating-shape shape-2"></div>
    <div class="floating-shape shape-3"></div>
    <div class="floating-shape shape-4"></div>
    <div class="floating-shape shape-5"></div>

    <!-- Visible Blobs -->
    <div class="visible-shape blob-1"></div>
    <div class="visible-shape blob-2"></div>
    <div class="visible-shape blob-3"></div>
    <div class="visible-shape blob-4"></div>
    <div class="visible-shape blob-5"></div>
    <div class="visible-shape blob-6"></div>
  </div>
</template>