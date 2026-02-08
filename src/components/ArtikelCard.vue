<script setup>
const props = defineProps({
  artikel: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.artikel.id)
}
</script>

<template>
  <div class="artikel-card" @click="handleClick">
    <p class="artikel-kategorie">{{ artikel.kategorie }}</p>
    <h3 class="artikel-titel">{{ artikel.titel }}</h3>
    <div class="artikel-emoji">{{ artikel.emoji }}</div>
    <p class="artikel-beschreibung">{{ artikel.beschreibung }}</p>
  </div>
</template>