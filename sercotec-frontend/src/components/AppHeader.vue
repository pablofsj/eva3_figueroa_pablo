<template>
  <header class="app-header" :class="{ scrolled: isScrolled }">
    <!-- Barra superior de contacto rápido -->
    <div class="top-bar" aria-label="Información rápida del centro">
      <div class="container top-bar-container">
        <div class="contact-links">
          <a href="mailto:centro.santiago@centrossercotec.cl" class="top-link" aria-label="Enviar correo a centro.santiago@centrossercotec.cl">
            <svg class="top-icon" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>centro.santiago@centrossercotec.cl</span>
          </a>
          <a href="https://maps.google.com/?q=Manuel+Rodriguez+Sur+749,+Santiago" target="_blank" rel="noopener noreferrer" class="top-link" aria-label="Ver dirección en Google Maps: Manuel Rodríguez Sur 749, Santiago (Metro Toesca)">
            <svg class="top-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
            </svg>
            <span>Manuel Rodríguez Sur 749, Santiago (Metro Toesca)</span>
          </a>
        </div>
        
        <div class="top-bar-right">
          <!-- Control de Accesibilidad: Alto Contraste -->
          <button 
            type="button" 
            class="accessibility-toggle"
            :class="{ active: isHighContrast }"
            @click="toggleContrast"
            :aria-label="isHighContrast ? 'Desactivar modo de alto contraste' : 'Activar modo de alto contraste para baja visión'"
            title="Accesibilidad Visual: Alto Contraste"
          >
            <svg class="a11y-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a10 10 0 0 0 0 20v-20z" fill="currentColor"></path>
            </svg>
            <span class="a11y-text">{{ isHighContrast ? 'Contraste Normal' : 'Alto Contraste' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Navbar Principal -->
    <div class="main-navbar">
      <div class="container navbar-container">
        <!-- Logo Corporativo Sercotec Oficial -->
        <a href="#inicio" class="brand-logo" aria-label="Ir a inicio de Sercotec Centro de Negocios Santiago" @click="handleNavClick('#inicio')">
          <div class="logo-box">
            <img 
              src="https://sitios.sercotec.cl/centros-de-negocios/wp-content/uploads/sites/4/2024/08/13.-SANTIAGO-RGB_SF.png" 
              alt="Logo Oficial Sercotec Centro de Negocios Santiago" 
              class="sercotec-logo-img"
            />
          </div>
        </a>

        <!-- Botón Menú Hamburguesa (Mobile) -->
        <button 
          type="button" 
          class="menu-hamburger"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen ? 'true' : 'false'"
          aria-label="Abrir menú de navegación"
        >
          <span class="hamburger-line line-1" :class="{ open: isMobileMenuOpen }"></span>
          <span class="hamburger-line line-2" :class="{ open: isMobileMenuOpen }"></span>
          <span class="hamburger-line line-3" :class="{ open: isMobileMenuOpen }"></span>
        </button>

        <!-- Menú de Navegación -->
        <nav class="navigation-menu" :class="{ open: isMobileMenuOpen }">
          <ul class="nav-list" role="list">
            <li v-for="item in navItems" :key="item.target" class="nav-item">
              <a 
                :href="item.target" 
                class="nav-link"
                :class="{ active: activeSection === item.target }"
                @click="handleNavClick(item.target)"
              >
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { scrollTo } from '../utils/scroll';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isHighContrast = ref(false);
const activeSection = ref('#inicio');

const navItems = [
  { label: 'Inicio', target: '#inicio' },
  { label: 'Nosotros', target: '#nosotros' },
  { label: 'Servicios', target: '#servicios' },
  { label: 'Testimonios', target: '#testimonios' },
  { label: 'FAQ', target: '#faq' },
  { label: 'Contacto', target: '#contacto' },
  { label: 'Administrar Sitio', target: '#admin' }
];

const toggleContrast = () => {
  isHighContrast.value = !isHighContrast.value;
  const isHigh = isHighContrast.value;
  document.documentElement.classList.toggle('high-contrast', isHigh);
  localStorage.setItem('sercotec-a11y-contrast', isHigh ? 'high' : 'normal');
};

const handleNavClick = (target) => {
  isMobileMenuOpen.value = false;
  activeSection.value = target;
  scrollTo(target);
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40;
  const scrollPos = window.scrollY + 180;
  
  for (const item of navItems) {
    const el = document.querySelector(item.target);
    if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
      activeSection.value = item.target;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  if (localStorage.getItem('sercotec-a11y-contrast') === 'high') {
    isHighContrast.value = true;
    document.documentElement.classList.add('high-contrast');
  }
});

onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>
