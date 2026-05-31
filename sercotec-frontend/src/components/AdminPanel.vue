<template>
  <div class="admin-panel-wrapper" id="admin">
    <div class="admin-card">
      <div class="admin-header">
        <h3>Editor de Contenidos</h3>
        <p>Modifica los textos principales del sitio.</p>
      </div>

      <!-- Pestañas -->
      <div class="admin-tabs" role="tablist">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          type="button" 
          class="tab-btn" 
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="admin-body">
        <!-- NOSOTROS -->
        <div v-show="activeTab === 'about'" class="tab-panel">
          <div class="form-group">
            <label class="form-label">Título</label>
            <input type="text" v-model="localData.about.title" class="admin-input" />
          </div>
          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea v-model="localData.about.description" rows="3" class="admin-input"></textarea>
          </div>
        </div>

        <!-- SERVICIOS -->
        <div v-show="activeTab === 'services'" class="tab-panel">
          <div v-for="(service, idx) in localData.services" :key="'ser-' + idx" class="editable-item">
            <div class="form-group">
              <label class="form-label">Servicio {{ idx + 1 }} — Título</label>
              <input type="text" v-model="localData.services[idx].title" class="admin-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea v-model="localData.services[idx].description" rows="2" class="admin-input"></textarea>
            </div>
          </div>
        </div>


        <!-- FAQs -->
        <div v-show="activeTab === 'faqs'" class="tab-panel">
          <div v-for="(faq, idx) in localData.faqs" :key="'faq-' + idx" class="editable-item">
            <div class="form-group">
              <label class="form-label">Pregunta {{ idx + 1 }}</label>
              <input type="text" v-model="localData.faqs[idx].question" class="admin-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Respuesta</label>
              <textarea v-model="localData.faqs[idx].answer" rows="2" class="admin-input"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="admin-footer">
        <button type="button" class="btn btn-secondary" @click="resetToDefault">Restablecer</button>
        <button type="button" class="btn btn-accent" @click="saveChanges" :disabled="isSaving">
          {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  initialData: { type: Object, required: true }
});

const emit = defineEmits(['save-data', 'reset-data']);

const tabs = [
  { id: 'about', label: 'Nosotros' },
  { id: 'services', label: 'Servicios' },
  { id: 'faqs', label: 'FAQs' }
];

const activeTab = ref('about');
const isSaving = ref(false);
const localData = reactive({ about: { title: '', description: '' }, services: [], testimonials: [], faqs: [] });

watch(() => props.initialData, (newVal) => {
  if (newVal?.about) Object.assign(localData, JSON.parse(JSON.stringify(newVal)));
}, { immediate: true, deep: true });

const saveChanges = () => {
  isSaving.value = true;
  setTimeout(() => {
    isSaving.value = false;
    emit('save-data', JSON.parse(JSON.stringify(localData)));
  }, 500);
};

const resetToDefault = () => {
  if (confirm('¿Restablecer todo el contenido a los valores iniciales?')) emit('reset-data');
};
</script>
