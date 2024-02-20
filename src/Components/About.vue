<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'About',
});
</script>

<template>
	<div
		class="modal"
		id="aboutModal"
		tabindex="-1"
		aria-labelledby="aboutModalLabel"
		aria-hidden="true"
		data-bs-backdrop="false"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<img src="/images/flag.svg" width="20" height="20" style="margin-right: 10px" />
					<h1 class="modal-title fs-5" id="aboutModalLabel">About</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<p class="text-body-secondary">This game is online version of classic retro game Minesweeper.</p>
					<p class="text-body-secondary">
						It has been created to allow playing minesweeper in browser and mobile devices.
					</p>
					<p class="text-body-secondary">No special requirements are expected.</p>
					<p class="text-body-secondary">
						Any kind of device with access to the internet and simple input (mouse or touch screen) is
						enough.
					</p>
					<hr />
					<p class="text-body-secondary">
						If You want to share Your opinion, request a bug or write in any other case:
					</p>
					<a href="mailto:contact@minesweeper-free.com" class="link-secondary link-offset-2"
						>contact@minesweeper-free.com</a
					>
					<hr />
					<p class="text-body-secondary mb-0">Author:</p>
					<p class="text-body-secondary mb-0">Konrad Łowczak Solutions</p>
					<p class="text-body-secondary mb-0">Jana Kazimierza 47A/46</p>
					<p class="text-body-secondary mb-0">01-267 Warszawa</p>
					<p class="text-body-secondary mb-0">Poland</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
</template>
