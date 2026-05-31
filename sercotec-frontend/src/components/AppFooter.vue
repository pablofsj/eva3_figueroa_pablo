<template>
  <footer class="app-footer">
    <div class="container footer-container">
      <!-- Columna 1: Marca e Identidad -->
      <div class="footer-col brand-col">
        <div class="footer-logo">
          <span class="footer-brand-title">SERCOTEC</span>
          <span class="footer-brand-subtitle">Centro de Negocios Santiago</span>
        </div>
        <p class="brand-desc">
          Apoyamos a micro y pequeñas empresas y emprendedores de la comuna a fortalecer sus capacidades de gestión y asegurar la rentabilidad y sustentabilidad de sus negocios.
        </p>
        <div class="social-links" aria-label="Redes sociales del Centro">
          <a href="https://www.facebook.com/centrodnsantiago" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Visitar página de Facebook del Centro de Negocios Santiago">
            <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
          <a href="https://sitios.sercotec.cl/centros-de-negocios/centro-de-desarrollo-de-negocios-santiago/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Visitar Sitio Web Oficial de Sercotec Chile">
            <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Columna 2: Enlaces Rápidos -->
      <div class="footer-col links-col">
        <h4 class="col-title">Accesos Rápidos</h4>
        <ul class="footer-links" role="list">
          <li><a href="#inicio" @click.prevent="scrollTo('#inicio')">Inicio</a></li>
          <li><a href="#nosotros" @click.prevent="scrollTo('#nosotros')">Nosotros</a></li>
          <li><a href="#servicios" @click.prevent="scrollTo('#servicios')">Servicios del Centro</a></li>
          <li><a href="#testimonios" @click.prevent="scrollTo('#testimonios')">Casos de Éxito</a></li>
          <li><a href="#faq" @click.prevent="scrollTo('#faq')">Preguntas Frecuentes</a></li>
          <li><a href="#contacto" @click.prevent="scrollTo('#contacto')">Agendar Asesoría</a></li>
        </ul>
      </div>

      <!-- Columna 3: Información de Contacto -->
      <div class="footer-col contact-col">
        <h4 class="col-title">Contacto Oficial</h4>
        <ul class="contact-details" role="list">
          <li class="contact-detail-item">
            <svg class="detail-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <span>Manuel Rodríguez Sur 749, Santiago Centro (Metro Toesca).</span>
          </li>
          <li class="contact-detail-item">
            <svg class="detail-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <a href="mailto:centro.santiago@centrossercotec.cl">centro.santiago@centrossercotec.cl</a>
          </li>
          <li class="contact-detail-item">
            <svg class="detail-icon" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span>Consultas: +56 2 2481 8500</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Barra de Derechos e Inclusión -->
    <div class="footer-bottom">
      <div class="container footer-bottom-container">
        <p class="copyright">
          &copy; 2026 Servicio de Cooperación Técnica - SERCOTEC. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { scrollTo } from '../utils/scroll';
</script>
