<script>
import TransformController from './TransformController.js';

export default {
    props: {
        pan: Boolean,
        zoom: Boolean,
    },
    components: { TransformController },
};
</script>

<template>
    <transform-controller v-slot="props" :pan="pan" :zoom="zoom">
        <div class="fc-transform-wrapper" :style="{ transform: props.transform }">
            <div class="fc-transform">
                <slot v-bind="props"></slot>
            </div>
        </div>
    </transform-controller>
</template>

<style>
.fc-transform-wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    touch-callout: none;
    user-select: none;
    margin: 0;
    padding: 0;
}

.fc-transform {
    display: flex;
    flex-wrap: wrap;
    width: fit-content;
    height: fit-content;
    margin: 0;
    padding: 0;
    transform-origin: 0% 0%;
}
</style>
