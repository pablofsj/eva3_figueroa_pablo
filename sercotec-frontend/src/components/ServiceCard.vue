<template>
  <article 
    class="service-card" 
    :aria-describedby="'desc-' + id"
    data-aos="fade-up"
  >
    <div class="card-image-wrapper">
      <img 
        :src="image" 
        :alt="'Ilustración del servicio de ' + title" 
        class="card-image"
        loading="lazy"
      />
      <div class="card-badge">SERCOTEC</div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      
      <p :id="'desc-' + id" class="card-description">
        {{ description }}
      </p>

      <ul v-if="benefits && benefits.length" class="card-benefits" role="list">
        <li v-for="(benefit, idx) in benefits" :key="idx" class="benefit-item">
          <svg class="benefit-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span>{{ benefit }}</span>
        </li>
      </ul>
      
      <button 
        class="btn btn-secondary card-btn"
        @click="$emit('contact-service', title)"
        :aria-label="'Contactar para el servicio de ' + title"
      >
        <span>Contáctanos</span>
        <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  </article>
</template>

<script setup>
defineProps({
  id: { type: [Number, String], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
  benefits: { type: Array, default: () => [] }
});

defineEmits(['contact-service']);
</script>
