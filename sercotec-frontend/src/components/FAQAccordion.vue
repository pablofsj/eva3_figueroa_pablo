<template>
  <div class="faq-accordion" role="presentation">
    <div 
      v-for="(faq, index) in faqs" 
      :key="faq.id" 
      class="accordion-item"
      :class="{ open: activeIndex === index }"
    >
      <!-- Cabecera del Acordeón -->
      <h3 class="accordion-header">
        <button
          type="button"
          :id="'accordion-header-' + faq.id"
          class="accordion-trigger"
          :aria-expanded="activeIndex === index ? 'true' : 'false'"
          :aria-controls="'accordion-panel-' + faq.id"
          @click="toggleItem(index)"
        >
          <span class="faq-question">{{ faq.question }}</span>
          <span class="faq-icon-wrapper" aria-hidden="true">
            <svg class="faq-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
      </h3>

      <!-- Panel de Contenido con Transición Fluida -->
      <div
        :id="'accordion-panel-' + faq.id"
        class="accordion-panel"
        role="region"
        :aria-labelledby="'accordion-header-' + faq.id"
        :style="getPanelStyle(index)"
      >
        <div class="panel-content">
          <p class="faq-answer">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  faqs: { type: Array, required: true }
});

const activeIndex = ref(-1);

const toggleItem = (index) => {
  activeIndex.value = activeIndex.value === index ? -1 : index;
};

const getPanelStyle = (index) => ({
  gridTemplateRows: activeIndex.value === index ? '1fr' : '0fr',
  opacity: activeIndex.value === index ? 1 : 0
});
</script>
