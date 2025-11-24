<template>
  <div class="map" @click="emitPoint($event)">
    <p>Mock GIS (Leaflet/Maplibre se reemplaza aquí). Click para crear nodos.</p>
    <ul>
      <li v-for="node in nodes" :key="node.id">{{ node.name }} ({{ node.lat.toFixed(4) }}, {{ node.lng.toFixed(4) }})</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{ nodes: { id: string; name: string; lat: number; lng: number }[] }>();
const emit = defineEmits<{ (e: 'create-node', payload: { lat: number; lng: number }): void }>();

function emitPoint(event: MouseEvent) {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  const lat = (event.clientY - rect.top) / 100;
  const lng = (event.clientX - rect.left) / 100;
  emit('create-node', { lat, lng });
}
</script>

<style scoped>
.map {
  background: #dfe9f3;
  border: 1px dashed #567;
  padding: 0.5rem;
  height: 300px;
  overflow: auto;
}
</style>
