<template>
  <div class="editor">
    <header class="editor__header">
      <h3>{{ plan.name }}</h3>
      <small>Autosave cada {{ plan.autosaveSeconds }}s</small>
    </header>
    <section class="editor__canvas">
      <div class="buffer" v-for="fiber in plan.fibers" :key="fiber.id" :class="fiber.status" @dblclick="addJoint(fiber.id)">
        <span class="fiber__label">{{ fiber.code }}</span>
        <button class="fiber__connect" @click="emit('connect', { fiberId: fiber.id, splitterId: plan.splitterLevels[0].id })">Conectar a splitter</button>
      </div>
      <div class="splitter" v-for="splitter in plan.splitterLevels" :key="splitter.id">
        <p>Splitter {{ splitter.code }} ({{ splitter.ratio }})</p>
        <ul>
          <li v-for="conn in splitter.connections" :key="conn.output">Salida {{ conn.output }} → Fibra {{ conn.fiberId }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ plan: any }>();
const emit = defineEmits<{ (e: 'connect', payload: { fiberId: string; splitterId: string }): void }>();

function addJoint(_fiberId: string) {
  // placeholder for Bézier joint creation
}
</script>

<style scoped>
.editor {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
}
.editor__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.editor__canvas {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.buffer {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  width: 120px;
}
.buffer.used {
  background: #e7f5ff;
}
.fiber__label {
  font-weight: 600;
}
.fiber__connect {
  margin-top: 0.5rem;
}
.splitter {
  border: 1px dashed #999;
  padding: 0.5rem;
}
</style>
