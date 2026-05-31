<template>
  <div 
    class="skeleton-item" 
    :class="[type, animation]"
    :style="customStyle"
  ></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, default: 'text' },
  animation: { type: String, default: 'shimmer' },
  width: { type: String, default: '' },
  height: { type: String, default: '' },
  borderRadius: { type: String, default: '' }
});

const customStyle = computed(() => ({
  ...(props.width && { width: props.width }),
  ...(props.height && { height: props.height }),
  ...(props.borderRadius && { borderRadius: props.borderRadius })
}));
</script>
