import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import './style.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ElementPlus)

app.mount('#app');
