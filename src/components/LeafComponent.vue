<script setup lang="ts">
import _ from 'lodash-es';
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { useNow } from '@vueuse/core';
import { ElButton } from 'element-plus';
import BigComponent from './BigComponent.vue';
import { someUtilFunction } from './big-utils';
import largeData from './large-data.json';

import { AgGridVue } from 'ag-grid-vue3';
import * as echarts from 'echarts';
import { gsap } from 'gsap';
import Quill from 'quill';

// 新增 PrimeVue 組件
import Button from 'primevue/button';

const props = defineProps({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const processedData = ref(null);
const now = useNow();

onMounted(async () => {
  const result = await someUtilFunction(largeData);
  processedData.value = _.chunk(result, 10);

  // 使用 echarts
  const chartDom = document.getElementById('echarts');
  const myChart = echarts.init(chartDom);
  const option = {
    // ... echarts 配置 ...
  };
  myChart.setOption(option);

  // 使用 gsap
  gsap.to("#animatedElement", { duration: 2, x: 100, y: 100 });

  // 使用 quill
  const quill = new Quill('#editor', {
    theme: 'snow'
  });
});
</script>

<template>
  <div>
    <div>Count: {{ props.count }}</div>
    <div>Current Time: {{ now }}</div>
    <BigComponent :data="processedData" />

    <ElButton type="primary">Element Plus Button</ElButton>
    <Button label="PrimeVue Button" />

    <AgGridVue style="height: 200px; width: 600px;" :columnDefs="[]" :rowData="[]" />

    <div id="echarts" style="width: 600px;height:400px;"></div>
    <div id="animatedElement">This element will be animated</div>
    <div id="editor">
      <p>Hello World!</p>
    </div>
  </div>
</template>
