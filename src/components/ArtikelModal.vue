<script setup>
import { computed } from 'vue'
import { artikelDatenbank } from '../data/artikel'

const props = defineProps({
  artikelId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['close'])

const artikel = computed(() => {
  if (!props.artikelId) return null
  return artikelDatenbank.find(a => a.id === props.artikelId)
})

const close = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div class="artikel-modal" :class="{ active: artikelId !== null }">
      <div class="modal-overlay" @click="close"></div>
      <div class="modal-content">
        <button class="modal-close" @click="close" aria-label="Schließen">×</button>
        <div class="modal-body">
          <div v-if="artikel" class="modal-article-wrapper" v-html="artikel.inhalt"></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>