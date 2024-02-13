<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'GameContainer',
    });
</script>

<template>
    <div class="container-fluid text-center" style="margin-bottom: 33px;">
        <div class="row justify-content-xxl-center">
            <div class="col-xxl">
                <canvas id="canvas" width="370" height="440">
                    Your browser does not support canvas element.
                </canvas>
            </div>
        </div>
    </div>
</template>