<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { searchSuggestions, containsCrisis } from '../data/artikel'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Suche nach Artikeln, Themen oder Emotionen...'
  },
  navigateOnSubmit: {
    type: Boolean,
    default: true
  },
  showSuggestions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['search', 'input'])

const router = useRouter()
const searchTerm = ref('')
const openEmergency = inject('openEmergency', () => {})

const handleSubmit = () => {
  const term = searchTerm.value.trim()

  // Check for crisis keywords
  if (containsCrisis(term)) {
    openEmergency()
    return
  }

  if (props.navigateOnSubmit && term) {
    router.push({ path: '/suchergebnisse', query: { search: term } })
  } else {
    emit('search', term)
  }
}

const handleInput = () => {
  emit('input', searchTerm.value)
}

const selectSuggestion = (suggestion) => {
  searchTerm.value = suggestion
  if (!props.navigateOnSubmit) {
    emit('search', suggestion)
  }
}

defineExpose({
  searchTerm
})
</script>

<template>
  <div class="search-container">
    <form class="search-bar" @submit.prevent="handleSubmit">
      <input
          type="text"
          v-model="searchTerm"
          :placeholder="placeholder"
          autocomplete="off"
          @input="handleInput"
      />
      <button v-if="navigateOnSubmit" type="submit">Suchen</button>
    </form>

    <div v-if="showSuggestions" class="search-suggestions">
      <div
          v-for="suggestion in searchSuggestions"
          :key="suggestion"
          class="suggestion-chip"
          @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>