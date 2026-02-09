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

onMounted(() => {
  const term = route.query.search || ''
  if (!term) {
    router.push('/artikel')
    return
  }
  searchTerm.value = term
})

watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchTerm.value = newSearch
  } else {
    router.push('/artikel')
  }
})
</script>

<template>
  <section class="artikel-section px-5 pt-[100px] pb-10 md:px-8 lg:px-12">
    <div class="artikel-header">
      <h1 class="section-title text-[1.8rem] sm:text-[2rem] lg:text-[2.5rem]">Suchergebnisse</h1>
      <p class="search-query-display text-base md:text-[1.1rem] lg:text-[1.2rem]">Ergebnisse für: "{{ searchTerm }}"</p>
    </div>

    <div class="artikel-grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
      <ArtikelCard
          v-for="artikel in filteredArtikel"
          :key="artikel.id"
          :artikel="artikel"
          @click="openArtikel"
      />

      <div v-if="filteredArtikel.length === 0" class="no-results-container">
        <p class="no-results text-[1.2rem] md:text-[1.3rem]">Keine Artikel zu "{{ searchTerm }}" gefunden.</p>
        <p class="no-results-hint text-[0.95rem] md:text-base px-2.5 sm:px-0">
          Versuche es mit anderen Begriffen wie:
          {{ searchSuggestions.slice(0, 4).join(', ') }} oder
          {{ searchSuggestions.slice(4).join(', ') }}.
        </p>
      </div>
    </div>

    <div class="weiterstoebern-container mt-10 px-4 pb-8 md:mt-10 md:px-5 md:pb-10 text-center sm:text-left">
      <router-link to="/artikel" class="weiterstoebern-button py-3 px-7 text-base md:py-3.5 md:px-[30px] md:text-[1.05rem]">
        Weiter stöbern
      </router-link>
    </div>

    <ArtikelModal
        :artikel-id="selectedArtikelId"
        @close="closeArtikel"
    />
  </section>
</template>