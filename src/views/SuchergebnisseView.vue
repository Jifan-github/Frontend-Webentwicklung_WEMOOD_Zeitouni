<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArtikelCard from '../components/ArtikelCard.vue'
import ArtikelModal from '../components/ArtikelModal.vue'
import { artikelDatenbank, searchSuggestions } from '../data/artikel'

const route = useRoute()
const router = useRouter()
const searchTerm = ref('')
const selectedArtikelId = ref(null)

// Filter articles by category
const filteredArtikel = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  if (!term) return []

  return artikelDatenbank.filter(a =>
      a.kategorie.toLowerCase().includes(term)
  )
})

const openArtikel = (id) => {
  selectedArtikelId.value = id
  document.body.style.overflow = 'hidden'
}

const closeArtikel = () => {
  selectedArtikelId.value = null
  document.body.style.overflow = ''
}

// Redirect to /artikel if no search term
onMounted(() => {
  const term = route.query.search || ''
  if (!term) {
    router.push('/artikel')
    return
  }
  searchTerm.value = term
})

// Watch for route changes
watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchTerm.value = newSearch
  } else {
    router.push('/artikel')
  }
})
</script>

<template>
  <section class="artikel-section">
    <div class="artikel-header">
      <h1 class="section-title">Suchergebnisse</h1>
      <p class="search-query-display">Ergebnisse für: "{{ searchTerm }}"</p>
    </div>

    <div class="artikel-grid">
      <ArtikelCard
          v-for="artikel in filteredArtikel"
          :key="artikel.id"
          :artikel="artikel"
          @click="openArtikel"
      />

      <div v-if="filteredArtikel.length === 0" class="no-results-container">
        <p class="no-results">Keine Artikel zu "{{ searchTerm }}" gefunden.</p>
        <p class="no-results-hint">
          Versuche es mit anderen Begriffen wie:
          {{ searchSuggestions.slice(0, 4).join(', ') }} oder
          {{ searchSuggestions.slice(4).join(', ') }}.
        </p>
      </div>
    </div>

    <div class="weiterstoebern-container">
      <router-link to="/artikel" class="weiterstoebern-button">
        Weiter stöbern
      </router-link>
    </div>

    <ArtikelModal
        :artikel-id="selectedArtikelId"
        @close="closeArtikel"
    />
  </section>
</template>