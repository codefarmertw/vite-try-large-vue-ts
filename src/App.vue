<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'

const moduleCount = import.meta.env.VITE_VUE_MODULE_COUNT;
const modules = import.meta.glob('./components/nested/Module*.vue')
const modulePath = `./components/nested/Module${moduleCount - 1}.vue`

const ModuleComponent = defineAsyncComponent(() => modules[modulePath]())
</script>

<template>
  <Suspense>
    <template #default>
      <ModuleComponent :count="10" />
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
