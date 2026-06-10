import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/global.css';

import router from './router';

import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(router).mount('#app');
