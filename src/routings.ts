import { createRouter, createWebHistory } from 'vue-router';
import Gallery from './components/Gallery.vue';
import Index from './components/Index.vue';
import PrivacyPolicy from './components/Privacy.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Index,
		},
		{
			path: '/gallery',
			component: Gallery,
		},
		{
			path: '/privacy',
			component: PrivacyPolicy,
		},
		{
			path: '/:catchAll(.*)',
			component: Index,
		},
	],
});
