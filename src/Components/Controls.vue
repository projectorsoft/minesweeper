<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Controls',
});
</script>

<template>
	<div class="container mb-2">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold mb-2">Controls</label>
				<a
					class="btn btn-sm btn-outline-secondary me-2 float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#controlsContainer"
				>
					<img src="/images/unfold.svg" width="25" height="25" />
				</a>
			</div>
		</div>
	</div>
	<div class="container collapse mb-4" id="controlsContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="list-group">
									<p class="lead list-group-item list-group-item-light">On computers:</p>
									<p class="lead">Use left mouse button to uncover the field.</p>
									<p class="lead">Use right mouse button to set flag or question mark.</p>
									<p class="lead list-group-item list-group-item-light">On mobile devices:</p>
									<p class="lead">Use short tap to uncover the field.</p>
									<p class="lead">Use long tap to set flag or question mark.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
