<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "./game/game";

export default defineComponent({
  data() {
    return {
      game: Game
    }
  },
  mounted() {
    this.game = new Game();
  },
  methods: {
  }
});
</script>

<template>
  <canvas id="canvas" width="960" height="610"></canvas>
  <!-- <canvas id="menu" width="840" height="840"></canvas> -->
</template>

<style scoped>
</style>