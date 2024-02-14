<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Rules',
});
</script>

<template>
	<div class="accordion-item">
		<h2 class="accordion-header">
			<button
				class="accordion-button"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#collapseRules"
				aria-expanded="true"
				aria-controls="collapseRules"
			>
				<strong>Rules and purpose of minesweeper</strong>
			</button>
		</h2>
		<div id="collapseRules" class="accordion-collapse collapse show">
			<div class="accordion-body">
				<div class="row d-flex flex-wrap align-items-center">
					<div class="col-md-7">
						<div class="list-group">
							<p class="lead list-group-item list-group-item-light">
								1. Minesweeper is classic logic game.
							</p>
							<p class="lead list-group-item list-group-item-light">
								2. Your purpose is to clear the mine field without detonating hidden mines.
							</p>
							<p class="lead list-group-item list-group-item-light">
								3. When You choose field with mine - game is over.
							</p>
							<p class="lead list-group-item list-group-item-light">
								4. If You uncover all fields without detonating any mine - game is won.
							</p>
							<p class="lead list-group-item list-group-item-light">
								5. Each game measures time. If You were able to win, Your score will be saved in
								statistics and You can compare time with other games.
							</p>
						</div>
					</div>
					<div class="col-md-5 text-center">
						<img
							src="/images/rule.svg"
							class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
							width="380"
							height="380"
							role="img"
							aria-label="Rules"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
