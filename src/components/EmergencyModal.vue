<script setup>
import { EMERGENCY_CONFIG } from '../data/artikel'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="show">
      <div class="emergency-backdrop" @click="close"></div>
      <div
          class="emergency-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="emg-title"
          aria-describedby="emg-desc"
      >
        <div class="emg-shell">
          <div class="emg-header">
            <h2 id="emg-title">Sofortige Unterstützung</h2>
            <button class="emg-close" @click="close" aria-label="Schließen">×</button>
          </div>

          <p id="emg-desc" class="emg-text">
            Wenn du oder jemand in Gefahr ist: Verlasse die App, begib dich an einen sicheren Ort und kontaktiere Hilfe.
          </p>

          <div class="emg-actions">
            <a
                class="emg-cta"
                :href="EMERGENCY_CONFIG.primary.href"
                rel="noopener"
            >
              {{ EMERGENCY_CONFIG.primary.label }}
            </a>
            <a
                class="emg-cta-outline"
                :href="EMERGENCY_CONFIG.alt.href"
                rel="noopener"
            >
              {{ EMERGENCY_CONFIG.alt.label }}
            </a>
            <a
                class="emg-link"
                :href="EMERGENCY_CONFIG.chat.href"
                target="_blank"
                rel="noopener"
            >
              {{ EMERGENCY_CONFIG.chat.label }}
            </a>
            <a
                class="emg-link"
                :href="`mailto:${EMERGENCY_CONFIG.mail}`"
            >
              E-Mail Support
            </a>
          </div>

          <div class="emg-safety">
            <h3>Erdungsschritte</h3>
            <ul>
              <li>Atme 4–6 Sekunden ein, 6–8 Sekunden aus. 6x wiederholen.</li>
              <li>Benenne 5 Dinge die du siehst, 4 die du fühlst, 3 die du hörst, 2 die du riechst, 1 das du schmeckst.</li>
              <li>Kontaktiere eine vertraute Person.</li>
            </ul>
          </div>

          <div class="emg-footer" aria-live="polite">
            Du bist nicht allein. Hilfe ist verfügbar.
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Styles are in main.css */
</style>
