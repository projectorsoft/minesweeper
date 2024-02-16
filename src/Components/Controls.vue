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
				<label class="fw-bold">Controls</label>
				<a
					class="btn btn-sm btn-outline-secondary float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#controlsContainer"
				>
					<img src="/images/unfold.svg" width="22" height="22" />
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
								<div class="list-group list-group-flush fw-light">
									<p class="list-group-item list-group-item-light">
										<img src="/images/mouse.svg" width="22" height="22" />
										On computers:
									</p>
									<p>Use left mouse button to uncover the field.</p>
									<p>Use right mouse button to set flag or question mark.</p>
									<p class="list-group-item list-group-item-light">
										<img src="/images/touch.svg" width="22" height="22" />
										On mobile devices:
									</p>
									<p>Use short tap to uncover the field.</p>
									<p>Use long tap to set flag or question mark.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
