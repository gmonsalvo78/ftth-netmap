<template>
  <main class="layout">
    <header class="topbar">
      <h1>FTTH-NETMAP</h1>
      <p>Documentación, GIS y empalmes 2D</p>
    </header>
    <section class="workspace">
      <aside class="sidebar">
        <h2>Capas GIS</h2>
        <ul>
          <li v-for="layer in layers" :key="layer.id">{{ layer.name }}</li>
        </ul>
        <button @click="createSplice">Crear empalme demo</button>
      </aside>
      <section class="content">
        <MapCanvas @create-node="createNode" :nodes="nodes" />
        <SpliceEditor :plan="splice" @connect="connect" />
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MapCanvas from './components/MapCanvas.vue';
import SpliceEditor from './components/SpliceEditor.vue';

const layers = ref([
  { id: 'poles', name: 'Postes' },
  { id: 'ducts', name: 'Ductos' },
  { id: 'splice-boxes', name: 'Cajas de empalme' }
]);

const nodes = ref<{ id: string; name: string; lat: number; lng: number }[]>([]);

const splice = ref({
  name: 'Empalme demo',
  cableId: 'cable-1',
  splitterLevels: [
    { id: 'sp1', code: '141', level: 1, ratio: '1:4', outputs: 4, connections: [] }
  ],
  fibers: [
    { id: 'f1', code: '1', buffer: 'azul', color: 'blue', status: 'free' },
    { id: 'f2', code: '2', buffer: 'naranja', color: 'orange', status: 'free' }
  ],
  autosaveSeconds: 15
});

function createNode(point: { lat: number; lng: number }) {
  nodes.value.push({ id: crypto.randomUUID(), name: 'Caja', ...point });
}

function connect(payload: { fiberId: string; splitterId: string }) {
  const target = splice.value.fibers.find((f) => f.id === payload.fiberId);
  const splitter = splice.value.splitterLevels.find((s) => s.id === payload.splitterId);
  if (target) {
    target.status = 'used';
    target.connectedTo = payload.splitterId;
  }
  if (splitter) {
    splitter.connections.push({ output: splitter.connections.length + 1, fiberId: payload.fiberId });
  }
}

function createSplice() {
  splice.value = {
    name: 'Nuevo empalme',
    cableId: crypto.randomUUID(),
    splitterLevels: [
      { id: crypto.randomUUID(), code: '241', level: 1, ratio: '1:8', outputs: 8, connections: [] }
    ],
    fibers: Array.from({ length: 8 }).map((_, idx) => ({
      id: crypto.randomUUID(),
      code: `${idx + 1}`,
      buffer: 'Buffer 1',
      color: `color-${idx + 1}`,
      status: 'free'
    })),
    autosaveSeconds: 10
  } as any;
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}
.topbar {
  background: #0b3d91;
  color: white;
  padding: 0.5rem 1rem;
}
.workspace {
  display: grid;
  grid-template-columns: 280px 1fr;
  flex: 1;
  min-height: 0;
}
.sidebar {
  border-right: 1px solid #ececec;
  padding: 1rem;
  overflow: auto;
}
.content {
  display: grid;
  grid-template-rows: 320px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f6f8fb;
}
</style>
