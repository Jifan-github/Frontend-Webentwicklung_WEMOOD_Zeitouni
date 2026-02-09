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

onMounted(() => {
  const searchParam = route.query.search
  if (searchParam) {
    searchTerm.value = searchParam
  }
})

watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchTerm.value = newSearch
  }
})
</script>

<template>
  <section class="artikel-section px-5 pt-[100px] pb-10 md:px-8 lg:px-12">
    <div class="artikel-header">
      <h1 class="section-title text-[1.8rem] sm:text-[2rem] lg:text-[2.5rem]">Alle Artikel</h1>
      <SearchBar
          placeholder="Suche nach Emotionen..."
          :navigate-on-submit="false"
          :show-suggestions="true"
          @search="handleSearch"
          @input="handleInput"
      />
    </div>

    <div class="artikel-grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
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