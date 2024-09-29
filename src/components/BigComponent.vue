<script setup lang="ts">
import { computed } from 'vue';

interface DataItem {
  id: number;
  name: string;
  value: number;
}

const props = defineProps<{
  data: DataItem[][] | null;
}>();

const flattenedData = computed(() => {
  return props.data ? props.data.flat() : [];
});

const totalValue = computed(() => {
  return flattenedData.value.reduce((sum, item) => sum + item.value, 0);
});

const averageValue = computed(() => {
  return flattenedData.value.length > 0 ? totalValue.value / flattenedData.value.length : 0;
});
</script>

<template>
  <div class="data-display">
    <h2>處理後的數據</h2>
    <div v-if="data">
      <div class="summary">
        <p>總項目數：{{ flattenedData.length }}</p>
        <p>總值：{{ totalValue.toFixed(2) }}</p>
        <p>平均值：{{ averageValue.toFixed(2) }}</p>
      </div>
      <ul class="data-list">
        <li
          v-for="item in flattenedData.slice(0, 10)"
          :key="item.id"
          class="data-item"
        >
          <span class="item-name">{{ item.name }}</span>
          <span class="item-value">{{ item.value.toFixed(2) }}</span>
        </li>
      </ul>
      <p
        v-if="flattenedData.length > 10"
        class="more-items"
      >
        還有 {{ flattenedData.length - 10 }} 個項目未顯示...
      </p>
    </div>
    <div
      v-else
      class="loading"
    >
      正在加載數據...
    </div>
  </div>
</template>

<style scoped>
.data-display {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

h2 {
  color: #333;
  text-align: center;
}

.summary {
  background-color: #e0e0e0;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.data-list {
  list-style-type: none;
  padding: 0;
}

.data-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 4px;
}

.item-name {
  font-weight: bold;
}

.item-value {
  color: #007bff;
}

.more-items {
  text-align: center;
  color: #666;
  font-style: italic;
}

.loading {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
