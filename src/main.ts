import VueSplide from '@splidejs/vue-splide';
import { createApp } from 'vue'
import routings from './routings';
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import '@splidejs/vue-splide/css';

createApp(App)
    .use(routings)
    .use(VueSplide)
    .mount('#app');

import "bootstrap/dist/js/bootstrap.js";
