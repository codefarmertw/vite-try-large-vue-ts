const fs = require('fs');
const path = require('path');
require('dotenv').config();

const moduleCount = process.env.VITE_VUE_MODULE_COUNT;

const outputDir = path.resolve(__dirname, 'src/components/nested');

if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

function generateModules(count) {
  for (let i = 0; i < count; i++) {
    const moduleId = i - 1;

    let content;
    if (i === 0) {
      content = `
        <script setup lang="ts">
        import LeafComponent from '../LeafComponent.vue';
        </script>
        <template>
          <LeafComponent :count="count" />
        </template>
      `;
    } else {
      content = `
        <script setup lang="ts">
        import { ref } from 'vue';
        import Module${moduleId} from './Module${moduleId}.vue';

        const props = defineProps({
          count: {
            type: Number,
            required: true,
            default: 0
          }
        });

        const countData = ref(props.count + 1);
        </script>
        <template>
          <Module${moduleId} :count="countData" />
        </template>
      `;
    }
    fs.writeFileSync(path.join(outputDir, `Module${i}.vue`), content);
  }
}

function generateHash(input) {
  let hash = 0;
  const str = input.toString();

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  let hexHash = Math.abs(hash).toString(16);
  while (hexHash.length < 32) {
    hexHash = '0' + hexHash;
  }

  return hexHash.slice(-32);
}

function generateLargeData(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const id = generateHash(i);

    data.push({
      id: id,
      name: `Item ${id}`,
      value: Math.floor(Math.random() * 10000)
    });
  }
  return data;
}

function writeLargeDataToFile(data) {
  const filePath = path.resolve(__dirname, 'src/components/large-data.json');

  // 檢查文件是否存在
  if (!fs.existsSync(filePath)) {
    // 如果文件不存在，創建目錄（如果需要）
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  // 寫入數據到文件
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

generateModules(moduleCount);

// 生成大量數據並寫入文件
const largeData = generateLargeData(9999);
writeLargeDataToFile(largeData);
