<template>
  <div class="app-wrapper">
    <!-- Componente Header con Navbar ScrollSpy y Accesibilidad -->
    <AppHeader />

    <!-- SECCIÓN 1: HERO (INICIO) -->
    <section id="inicio" class="hero-section">
      <div class="container hero-container">
        <div class="hero-content animate-fade-in">
          <span class="hero-badge">Sercotec Metropolitana</span>
          <h1 class="hero-title">
            Potenciamos y Acompañamos el <span class="highlight">Crecimiento de tu Pyme</span>
          </h1>
          <p class="hero-desc">
            Asesoría técnica individual, mentorías expertas y capacitaciones gratuitas y personalizadas para asegurar el éxito, sustentabilidad e innovación de tu negocio.
          </p>
          <div class="hero-ctas">
            <a href="#contacto" class="btn btn-accent btn-lg" @click.prevent="scrollTo('#contacto')">
              Solicitar Asesoría Gratuita
            </a>
            <a href="#servicios" class="btn btn-secondary btn-lg" @click.prevent="scrollTo('#servicios')">
              Conocer Servicios
            </a>
          </div>
        </div>
        
        <!-- Ilustración / Imagen Hero Premium optimizada con CSS -->
        <div class="hero-visual animate-fade-in">
          <div class="visual-card-wrapper">
            <div class="visual-deco-circle"></div>
            <div class="visual-image-card">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
                alt="Emprendedores trabajando en conjunto asesorados por Sercotec"
                class="hero-img"
              />
              <!-- Tarjeta flotante interactiva -->
              <div class="floating-badge">
                <span class="badge-number">100%</span>
                <span class="badge-txt">Gratuito y Financiado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Separador visual curvado -->
      <div class="hero-wave-divider">
        <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <path d="M0,64L120,74.7C240,85,480,107,720,106.7C960,107,1200,85,1320,74.7L1440,64L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z" fill="var(--color-bg-base)"></path>
        </svg>
      </div>
    </section>

    <!-- SECCIÓN 2: NOSOTROS -->
    <section id="nosotros" class="section about-section">
      <div class="container">
        <!-- Cargando en Nosotros -->
        <div v-if="isLoading.about" class="about-loading">
          <BaseSkeleton type="title" width="40%" />
          <div class="about-grid-loading">
            <BaseSkeleton type="text" v-for="n in 5" :key="n" />
          </div>
        </div>

        <div v-else class="about-grid">
          <!-- Textos de Nosotros -->
          <div class="about-text-content">
            <span class="section-tag">Sobre el Centro</span>
            <h2>{{ aboutInfo.title }}</h2>
            <p class="about-tagline">{{ aboutInfo.tagline }}</p>
            <p class="about-desc">{{ aboutInfo.description }}</p>
            <p class="about-history">{{ aboutInfo.history }}</p>
          </div>

          <!-- Métricas de Impacto Santiago -->
          <div class="about-metrics-panel">
            <div class="metrics-grid">
              <div 
                v-for="metric in aboutInfo.metrics" 
                :key="metric.id" 
                class="metric-card"
              >
                <span class="metric-value">{{ metric.value }}</span>
                <span class="metric-label">{{ metric.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 3: SERVICIOS -->
    <section id="servicios" class="section services-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Nuestros Servicios</span>
          <h2>Líneas de Apoyo</h2>
          <p>Acompañamiento técnico gratuito para fortalecer tu pyme.</p>
        </div>

        <!-- Cargando en Servicios -->
        <div v-if="isLoading.services" class="services-grid-loading">
          <BaseSkeleton type="card" v-for="n in 4" :key="'sk-service-' + n" />
        </div>

        <!-- Listado de Tarjetas de Servicio Reutilizables -->
        <div v-else class="services-grid">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :id="service.id"
            :title="service.title"
            :description="service.description"
            :image="service.image"
            :benefits="service.benefits"
            @contact-service="handleContactService"
          />
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4: TESTIMONIOS -->
    <section id="testimonios" class="section testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Casos de Éxito</span>
          <h2>Lo que dicen nuestros Emprendedores</h2>
          <p>Pymes de Santiago que crecieron con nuestro acompañamiento.</p>
        </div>

        <!-- Cargando en Testimonios -->
        <div v-if="isLoading.testimonials" class="testimonials-loading">
          <BaseSkeleton type="avatar" class="margin-center" />
          <BaseSkeleton type="text" width="80%" class="margin-center mt-4" />
          <BaseSkeleton type="text" width="40%" class="margin-center mt-2" />
        </div>

        <!-- Carrusel de Testimonios Accesible -->
        <TestimonialCarousel 
          v-else 
          :testimonials="testimonials" 
        />
      </div>
    </section>

    <!-- SECCIÓN 5: PREGUNTAS FRECUENTES (FAQ) -->
    <section id="faq" class="section faq-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Resuelve tus Dudas</span>
          <h2>Preguntas Frecuentes</h2>
          <p>Consultas habituales sobre asesorías, fondos y talleres.</p>
        </div>

        <!-- Cargando en FAQ -->
        <div v-if="isLoading.faqs" class="faqs-loading">
          <BaseSkeleton type="text" height="50px" v-for="n in 4" :key="'sk-faq-' + n" class="mb-4" />
        </div>

        <!-- Acordeón de FAQs Interactivo -->
        <FAQAccordion 
          v-else 
          :faqs="faqs" 
        />
      </div>
    </section>

    <!-- SECCIÓN 6: CONTACTO -->
    <section id="contacto" class="section contact-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Comienza Hoy</span>
          <h2>Agenda tu Asesoría</h2>
          <p>Completa el formulario y te asignaremos un mentor.</p>
        </div>

        <!-- Formulario de Contacto Seguro -->
        <ContactForm 
          :initialService="selectedService" 
        />
      </div>
    </section>

    <!-- SECCIÓN 7: ADMINISTRACIÓN (CMS ONLINE LOCAL) -->
    <section id="admin" class="section admin-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Gestión de Contenidos</span>
          <h2>Administrar Sitio</h2>
          <p>Edita el contenido del sitio en tiempo real.</p>
        </div>

        <AdminPanel 
          :initialData="cmsData" 
          @save-data="handleSaveCMSData" 
          @reset-data="handleResetCMSData" 
        />
      </div>
    </section>

    <!-- Componente de Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { api } from './services/api';
import { scrollTo } from './utils/scroll';

// Registro de Componentes locales
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import ServiceCard from './components/ServiceCard.vue';
import TestimonialCarousel from './components/TestimonialCarousel.vue';
import FAQAccordion from './components/FAQAccordion.vue';
import ContactForm from './components/ContactForm.vue';
import BaseSkeleton from './components/BaseSkeleton.vue';
import AdminPanel from './components/AdminPanel.vue';

// Reactividad de Datos Dinámicos
const aboutInfo = ref({});
const services = ref([]);
const testimonials = ref([]);
const faqs = ref([]);
const selectedService = ref('');

// Reactividad de Estados de Carga
const isLoading = reactive({
  about: true,
  services: true,
  testimonials: true,
  faqs: true
});

// Agrupar datos en un objeto computado para pasarlo al CMS
const cmsData = computed(() => ({
  about: aboutInfo.value,
  services: services.value,
  testimonials: testimonials.value,
  faqs: faqs.value
}));

// Carga Asíncrona Consumiendo API / LocalStorage
const loadData = async () => {
  try {
    const savedData = localStorage.getItem('sercotec-cms-data');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      aboutInfo.value = parsed.about;
      services.value = parsed.services;
      testimonials.value = parsed.testimonials;
      faqs.value = parsed.faqs;
    } else {
      [aboutInfo.value, services.value, testimonials.value, faqs.value] = await Promise.all([
        api.getAboutInfo(),
        api.getServices(),
        api.getTestimonials(),
        api.getFAQs()
      ]);
    }
  } catch (error) {
    console.error('Error cargando los datos del frontend de Sercotec:', error);
  } finally {
    isLoading.about = isLoading.services = isLoading.testimonials = isLoading.faqs = false;
  }
};

const handleSaveCMSData = (newData) => {
  aboutInfo.value = newData.about;
  services.value = newData.services;
  testimonials.value = newData.testimonials;
  faqs.value = newData.faqs;
  localStorage.setItem('sercotec-cms-data', JSON.stringify(newData));
  alert('¡Cambios guardados y publicados en vivo con éxito en tu CMS Online local!');
};

const handleResetCMSData = () => {
  localStorage.removeItem('sercotec-cms-data');
  loadData();
  alert('¡Los datos han sido restablecidos exitosamente a sus valores originales!');
};

const handleContactService = (serviceTitle) => {
  selectedService.value = serviceTitle;
  scrollTo('#contacto');
};

onMounted(loadData);
</script>
