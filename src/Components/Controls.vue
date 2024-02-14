<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Controls',
});
</script>

<template>
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button
				class="accordion-button"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapseControls"
				aria-expanded="true"
				aria-controls="collapseControls"
			>
				<strong>Controls</strong>
			</button>
		</h2>
		<div id="collapseControls" class="accordion-collapse collapse show">
			<div class="accordion-body">
				<div class="row d-flex flex-wrap align-items-center">
					<div class="col-md-7 order-md-2">
						<div class="list-group">
							<p class="lead list-group-item list-group-item-light">On computers:</p>
							<p class="lead">Use left mouse button to uncover the field.</p>
							<p class="lead">Use right mouse button to set flag or question mark.</p>
							<p class="lead list-group-item list-group-item-light">On mobile devices:</p>
							<p class="lead">Use short tap to uncover the field.</p>
							<p class="lead">Use long tap to set flag or question mark.</p>
						</div>
					</div>
					<div class="col-md-5 order-md-1 text-center">
						<img
							src="/images/joystick.svg"
							class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
							width="380"
							height="380"
							role="img"
							aria-label="Controls"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
