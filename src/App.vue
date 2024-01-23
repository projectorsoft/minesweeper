<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "./game/game";

export default defineComponent({
  data() {
    return {
      game: {}
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
  <canvas id="canvas" width="960" height="610">
    Your browser does not support canvas element.
  </canvas>
</template>

<style scoped>
</style>