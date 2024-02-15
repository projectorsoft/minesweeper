<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'HowToPlay',
});
</script>

<template>
	<div class="container mb-2">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<label class="fw-bold mb-2">How to play minesweeper</label>
				<a
					class="btn btn-sm btn-outline-secondary me-2 float-end"
					type="button"
					data-bs-toggle="collapse"
					href="#howToPlayContainer"
				>
					<img src="/images/unfold.svg" width="25" height="25" />
				</a>
			</div>
		</div>
	</div>
	<div class="container collapse mb-4" id="howToPlayContainer">
		<div class="row d-flex flex-wrap align-items-center">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="list-group">
									<p class="lead list-group-item list-group-item-light">
										1. Click on the covered field.
										<img src="/images/uncovered_field.png" alt="Uncovered field" />
									</p>
									<p class="lead list-group-item list-group-item-light">
										2. If there are no mines in the neighbourhood - filed is empty.
										<img src="/images/empty_fields.png" alt="Empty field" />
									</p>
									<p class="lead list-group-item list-group-item-light">
										3. If there is at lest one mine in the neighbourhood - number of mines is shown. Number
										'1' means field has only one neighbour with hidden mine.
										<img src="/images/numbers.png" alt="Numbers" />
									</p>
									<p class="lead list-group-item list-group-item-light">
										4. You can mark field by flag if You think thre is a mine.
										<img src="/images/flagged_field.png" alt="Flagged field" />
									</p>
									<p class="lead list-group-item list-group-item-light">
										5. If You are uncertain filed could be marked by '?'.
										<img src="/images/uncertained_field.png" alt="Uncertain field" />
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
