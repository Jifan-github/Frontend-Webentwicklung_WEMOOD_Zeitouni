<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '../components/SearchBar.vue'
import ArtikelCard from '../components/ArtikelCard.vue'
import ArtikelModal from '../components/ArtikelModal.vue'
import { artikelDatenbank } from '../data/artikel'

const route = useRoute()
const searchTerm = ref('')
const selectedArtikelId = ref(null)

// Filter articles by category
const filteredArtikel = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  if (!term) return artikelDatenbank

  return artikelDatenbank.filter(a =>
      a.kategorie.toLowerCase().includes(term)
  )
})

const handleSearch = (term) => {
  searchTerm.value = term
}

const handleInput = (term) => {
  searchTerm.value = term
}

const openArtikel = (id) => {
  selectedArtikelId.value = id
  document.body.style.overflow = 'hidden'
}

const closeArtikel = () => {
  selectedArtikelId.value = null
  document.body.style.overflow = ''
}

// Check URL params on mount
onMounted(() => {
  const searchParam = route.query.search
  if (searchParam) {
    searchTerm.value = searchParam
  }
})

// Watch for route changes
watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchTerm.value = newSearch
  }
})
</script>

<template>
  <section class="artikel-section">
    <div class="artikel-header">
      <h1 class="section-title">Alle Artikel</h1>
      <SearchBar
          placeholder="Suche nach Emotionen..."
          :navigate-on-submit="false"
          :show-suggestions="true"
          @search="handleSearch"
          @input="handleInput"
      />
    </div>

    <div class="artikel-grid">
      <ArtikelCard
          v-for="artikel in filteredArtikel"
          :key="artikel.id"
          :artikel="artikel"
          @click="openArtikel"
      />

      <p v-if="filteredArtikel.length === 0" class="no-results">
        Keine Artikel gefunden.
      </p>
    </div>

    <ArtikelModal
        :artikel-id="selectedArtikelId"
        @close="closeArtikel"
    />
  </section>
</template>