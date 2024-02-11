<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'HowToPlay',
    });
</script>

<template>
	<div class="row d-flex flex-wrap align-items-center">
		<div class="col-md-7 order-md-2">
			<h2 class="fw-normal lh-1 mb-4">How to play minesweeper</h2>
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
					3. If there is at lest one mine in the neighbourhood - number of mines is shown. Number '1' means
					field has only one neighbour with hidden mine.
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
		<div class="col-md-5 order-md-1 text-center">
			<img
				src="/images/question_mark.svg"
				class="bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
				width="380"
				height="380"
				role="img"
				aria-label="Question mark"
			/>
		</div>
	</div>
	<hr />
</template>
