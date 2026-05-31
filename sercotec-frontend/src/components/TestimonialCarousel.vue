<template>
  <div 
    class="carousel-container"
    role="region" 
    aria-roledescription="carousel" 
    aria-label="Testimonios de emprendedores apoyados por Sercotec"
    @mouseenter="pauseAutoplay"
    @mouseleave="startAutoplay"
    @focusin="pauseAutoplay"
    @focusout="startAutoplay"
    @keydown="handleKeyDown"
    tabindex="0"
  >
    <!-- Contenedor de Slides -->
    <div 
      class="carousel-track-wrapper"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div 
        class="carousel-track" 
        :style="{ transform: `translateX(-${activeIndex * 100}%)` }"
      >
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="testimonial.id"
          class="carousel-slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} de ${testimonials.length}`"
          :aria-hidden="activeIndex !== index"
        >
          <div class="testimonial-card">
            <div class="testimonial-quote-icon">“</div>
            
            <blockquote class="testimonial-blockquote">
              <p class="testimonial-text">{{ testimonial.quote }}</p>
            </blockquote>

            <div class="testimonial-profile">
              <img 
                :src="testimonial.image" 
                :alt="'Retrato de ' + testimonial.author" 
                class="profile-img"
                loading="lazy"
              />
              <div class="profile-info">
                <cite class="profile-author">{{ testimonial.author }}</cite>
                <span class="profile-role">{{ testimonial.role }}</span>
                <span class="profile-business">{{ testimonial.business }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles de Navegación -->
    <button 
      class="carousel-btn btn-prev"
      @click="prevSlide"
      aria-label="Testimonio anterior"
    >
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button 
      class="carousel-btn btn-next"
      @click="nextSlide"
      aria-label="Testimonio siguiente"
    >
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- Indicadores de Puntos (Dots) -->
    <div class="carousel-dots" role="tablist" aria-label="Seleccionar testimonio">
      <button
        v-for="(t, idx) in testimonials"
        :key="'dot-' + t.id"
        class="carousel-dot"
        :class="{ active: activeIndex === idx }"
        role="tab"
        :aria-selected="activeIndex === idx"
        :aria-label="'Ver testimonio ' + (idx + 1) + ' de ' + testimonials.length"
        @click="activeIndex = idx"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  testimonials: { type: Array, required: true }
});

const activeIndex = ref(0);
const autoplayInterval = ref(null);
const touchStartX = ref(0);

const nextSlide = () => {
  if (props.testimonials.length) activeIndex.value = (activeIndex.value + 1) % props.testimonials.length;
};

const prevSlide = () => {
  if (props.testimonials.length) {
    activeIndex.value = (activeIndex.value - 1 + props.testimonials.length) % props.testimonials.length;
  }
};

const startAutoplay = () => {
  if (!autoplayInterval.value) autoplayInterval.value = setInterval(nextSlide, 6000);
};

const pauseAutoplay = () => {
  clearInterval(autoplayInterval.value);
  autoplayInterval.value = null;
};

const handleKeyDown = (e) => {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
};

const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
  const diff = touchStartX.value - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
};

onMounted(startAutoplay);
onUnmounted(pauseAutoplay);
</script>
