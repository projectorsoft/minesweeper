import { createRouter, createWebHistory } from 'vue-router';
import DevNotes from './components/DevNotes.vue';
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
			path: '/devNotes',
			component: DevNotes,
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
