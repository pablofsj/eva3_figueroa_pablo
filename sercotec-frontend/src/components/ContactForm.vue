<template>
  <div class="contact-form-wrapper">
    <!-- Mensaje de Éxito / Feedback -->
    <transition name="fade-slide">
      <div 
        v-if="submitSuccess" 
        class="form-alert alert-success" 
        role="alert" 
        aria-live="assertive"
      >
        <div class="alert-icon-wrapper">
          <svg class="alert-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="alert-content">
          <h4 class="alert-title">¡Mensaje Enviado con Éxito!</h4>
          <p class="alert-desc">Hemos recibido tu solicitud para el servicio **"{{ form.service }}"**. Un asesor del Centro de Negocios Santiago se contactará contigo a la brevedad.</p>
          <button 
            type="button" 
            class="btn btn-primary alert-btn"
            @click="resetFormState"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    </transition>

    <form 
      v-if="!submitSuccess" 
      @submit.prevent="handleSubmit" 
      class="contact-form" 
      novalidate
    >
      <h3 class="form-heading">Formulario de Asesoría Técnica</h3>
      <p class="form-subheading">Inicia tu proceso de acompañamiento sin costo. Rellena los datos para asignarte un mentor experto.</p>

      <!-- Fila: Nombre y RUT -->
      <div class="form-row">
        <!-- Campo: Nombre -->
        <div class="form-group" :class="{ error: errors.name }">
          <label for="name" class="form-label">Nombre Completo <span class="required">*</span></label>
          <div class="input-wrapper">
            <input 
              type="text" 
              id="name" 
              v-model="form.name"
              @blur="validateField('name')"
              :aria-invalid="errors.name ? 'true' : 'false'"
              aria-describedby="error-name"
              placeholder="Ej: Juan Pérez"
              maxlength="80"
              required
            />
          </div>
          <span v-if="errors.name" id="error-name" class="error-msg" role="alert">{{ errors.name }}</span>
        </div>

        <!-- Campo: RUT (Validación de formato Chileno) -->
        <div class="form-group" :class="{ error: errors.rut }">
          <label for="rut" class="form-label">RUT Empresa / Personal <span class="required">*</span></label>
          <div class="input-wrapper">
            <input 
              type="text" 
              id="rut" 
              v-model="form.rut"
              @blur="validateField('rut')"
              @input="formatRUTInput"
              :aria-invalid="errors.rut ? 'true' : 'false'"
              aria-describedby="error-rut"
              placeholder="Ej: 12.345.678-9"
              maxlength="12"
              required
            />
          </div>
          <span v-if="errors.rut" id="error-rut" class="error-msg" role="alert">{{ errors.rut }}</span>
        </div>
      </div>

      <!-- Fila: Email y Teléfono -->
      <div class="form-row">
        <!-- Campo: Email -->
        <div class="form-group" :class="{ error: errors.email }">
          <label for="email" class="form-label">Correo Electrónico <span class="required">*</span></label>
          <div class="input-wrapper">
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              @blur="validateField('email')"
              :aria-invalid="errors.email ? 'true' : 'false'"
              aria-describedby="error-email"
              placeholder="Ej: juan.perez@empresa.cl"
              maxlength="100"
              required
            />
          </div>
          <span v-if="errors.email" id="error-email" class="error-msg" role="alert">{{ errors.email }}</span>
        </div>

        <!-- Campo: Teléfono -->
        <div class="form-group" :class="{ error: errors.phone }">
          <label for="phone" class="form-label">Teléfono de Contacto <span class="required">*</span></label>
          <div class="input-wrapper">
            <input 
              type="tel" 
              id="phone" 
              v-model="form.phone"
              @blur="validateField('phone')"
              :aria-invalid="errors.phone ? 'true' : 'false'"
              aria-describedby="error-phone"
              placeholder="Ej: +56 9 1234 5678"
              maxlength="15"
              required
            />
          </div>
          <span v-if="errors.phone" id="error-phone" class="error-msg" role="alert">{{ errors.phone }}</span>
        </div>
      </div>

      <!-- Campo: Servicio (Dropdown) -->
      <div class="form-group" :class="{ error: errors.service }">
        <label for="service" class="form-label">Servicio de Interés <span class="required">*</span></label>
        <div class="input-wrapper">
          <select 
            id="service" 
            v-model="form.service"
            @change="validateField('service')"
            :aria-invalid="errors.service ? 'true' : 'false'"
            aria-describedby="error-service"
            required
          >
            <option value="" disabled>-- Selecciona un servicio --</option>
            <option value="Acompañamiento Preventivo">Acompañamiento Preventivo</option>
            <option value="Acompañamiento Correctivo">Acompañamiento Correctivo</option>
            <option value="Gestión y Capacitación de Negocios">Gestión y Capacitación de Negocios</option>
            <option value="Vinculación Empresarial">Vinculación Empresarial</option>
          </select>
        </div>
        <span v-if="errors.service" id="error-service" class="error-msg" role="alert">{{ errors.service }}</span>
      </div>

      <!-- Campo: Mensaje -->
      <div class="form-group" :class="{ error: errors.message }">
        <label for="message" class="form-label">Detalla las necesidades de tu Negocio <span class="required">*</span></label>
        <div class="input-wrapper">
          <textarea 
            id="message" 
            v-model="form.message"
            @blur="validateField('message')"
            :aria-invalid="errors.message ? 'true' : 'false'"
            aria-describedby="error-message"
            placeholder="Cuéntanos brevemente de tu empresa y qué desafío operativo o estratégico necesitas resolver..."
            rows="5"
            maxlength="1000"
            required
          ></textarea>
        </div>
        <div class="textarea-footer">
          <span v-if="errors.message" id="error-message" class="error-msg" role="alert">{{ errors.message }}</span>
          <span class="char-counter" :class="{ limit: form.message.length > 950 }">
            {{ form.message.length }} / 1000
          </span>
        </div>
      </div>

      <!-- ====================================================================
           PROTECCIÓN HONEYPOT ANTI-BOTS (SEGURIDAD AVANZADA REQ 10)
           Este campo es ocultado por CSS. Si un Bot automatizado intenta rellenar
           la página, completará este input. Al enviarse con algún valor, el
           servidor o el cliente bloquean el spam de forma silenciosa.
           ==================================================================== -->
      <div class="honeypot-container" aria-hidden="true">
        <label for="bot_website_url">No rellenar este campo si eres humano:</label>
        <input 
          type="text" 
          id="bot_website_url" 
          v-model="honeypot" 
          autocomplete="off" 
          tabindex="-1"
        />
      </div>

      <!-- Botón de Envío interactivo -->
      <button 
        type="submit" 
        class="btn btn-accent form-submit-btn" 
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Solicitar Acompañamiento Técnico</span>
        <span v-else class="spinner-wrapper">
          <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle class="spinner-circle" cx="12" cy="12" r="10" stroke-width="4"></circle>
            <path class="spinner-path" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor"></path>
          </svg>
          Procesando Solicitud Segura...
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { api } from '../services/api';

const props = defineProps({
  initialService: { type: String, default: '' }
});

const form = reactive({ name: '', rut: '', email: '', phone: '', service: '', message: '' });
const honeypot = ref('');
const errors = reactive({ name: null, rut: null, email: null, phone: null, service: null, message: null });
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const validateRUT = (rut) => {
  if (!rut) return false;
  const clean = rut.replace(/[^0-9kK]/g, '');
  if (clean.length < 8) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1).toLowerCase();
  const suma = [...body].reverse().reduce((acc, digit, i) => acc + parseInt(digit) * (i % 6 + 2), 0);
  const expectedDv = 11 - (suma % 11);
  const expectedDvChar = expectedDv === 11 ? '0' : expectedDv === 10 ? 'k' : expectedDv.toString();
  return expectedDvChar === dv;
};

const validationRules = {
  name: (val) => !val.trim() ? 'El nombre completo es obligatorio.' : val.trim().length < 5 ? 'Por favor ingresa un nombre y apellido válido.' : null,
  rut: (val) => !val.trim() ? 'El RUT es obligatorio para validar tu registro.' : !validateRUT(val) ? 'RUT inválido. Formato correcto: 12.345.678-9' : null,
  email: (val) => !val.trim() ? 'El correo electrónico es obligatorio.' : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.trim()) ? 'Ingresa un correo electrónico con formato válido (ejemplo@empresa.cl).' : null,
  phone: (val) => !val.trim() ? 'El teléfono de contacto es obligatorio.' : !/^\+?[0-9\s-]{8,15}$/.test(val.trim()) ? 'Teléfono inválido. Ej: +56 9 1234 5678 o 223456789' : null,
  service: (val) => !val ? 'Debes seleccionar un servicio de interés.' : null,
  message: (val) => !val.trim() ? 'Detalla brevemente las necesidades de tu empresa.' : val.trim().length < 15 ? 'Describe al menos 15 caracteres para que podamos entender tu caso.' : null
};

const validateField = (field) => {
  if (validationRules[field]) errors[field] = validationRules[field](form[field]);
};

const isFormValid = () => {
  Object.keys(validationRules).forEach(validateField);
  return !Object.values(errors).some(Boolean);
};

watch(() => props.initialService, (newVal) => {
  if (newVal) {
    form.service = newVal;
    validateField('service');
  }
}, { immediate: true });

const formatRUTInput = () => {
  let value = form.rut.replace(/[^0-9kK]/g, '');
  if (!value) return form.rut = '';
  let dv = value.slice(-1);
  let cuerpo = value.slice(0, -1);
  form.rut = cuerpo.length > 0 ? `${cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}` : dv;
};

const escapeHTML = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));

const handleSubmit = async () => {
  if (!isFormValid()) return;
  isSubmitting.value = true;
  
  if (honeypot.value) {
    console.warn('Bot de spam detectado y bloqueado mediante técnica Honeypot.');
    setTimeout(() => {
      isSubmitting.value = false;
      submitSuccess.value = true;
    }, 1000);
    return;
  }

  try {
    const sanitizedData = {
      name: escapeHTML(form.name.trim()),
      rut: form.rut.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      service: form.service,
      message: escapeHTML(form.message.trim())
    };

    const response = await api.sendContactMessage(sanitizedData);
    if (response.success) submitSuccess.value = true;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetFormState = () => {
  Object.keys(form).forEach(key => form[key] = '');
  submitSuccess.value = false;
};
</script>
