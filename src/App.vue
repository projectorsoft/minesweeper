<script lang="ts">
import { defineComponent } from 'vue';
import About from './components/About.vue';
import Footer from './components/Footer.vue';
import Menu from './components/Menu.vue';
import NavigationBar from './components/NavigationBar.vue';

export default defineComponent({
	components: {
		About,
		Footer,
		Menu,
		NavigationBar,
	},
});
</script>

<template>
	<header data-bs-theme="dark" class="sticky-sm-top">
		<NavigationBar />
		<Menu />
		<About />
	</header>
	<main data-bs-theme="dark">
		<router-view></router-view>
	</main>
	<Footer />
</template>
