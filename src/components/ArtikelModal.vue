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
      <div class="modal-content md:w-[95%] md:max-h-[95vh] md:rounded-[25px]">
        <button class="modal-close md:top-5 md:right-5 md:w-[45px] md:h-[45px] md:text-[2rem] sm:top-[15px] sm:right-[15px] sm:w-[40px] sm:h-[40px] sm:text-[1.8rem]" @click="close" aria-label="Schließen">×</button>
        <div class="modal-body p-[45px_22px] md:p-[55px_30px] lg:p-[60px_45px]">
          <div v-if="artikel" class="modal-article-wrapper md:p-[40px_30px] md:rounded-[25px] sm:p-[35px_22px] sm:rounded-[20px]" v-html="artikel.inhalt"></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>