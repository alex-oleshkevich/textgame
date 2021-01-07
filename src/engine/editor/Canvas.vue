<script>
import TransformWrapper from './TransformWrapper.vue';
import Transform from './Transform.vue';

export default {
    components: { TransformWrapper, Transform },
};
</script>

<template>
    <div class="fc-canvas-outer">
        <transform-wrapper v-slot="{ pan }" pan zoom>
            <div class="fc-canvas-inner draggable" :class="pan ? 'pan' : ''">
                <slot></slot>
            </div>
        </transform-wrapper>
    </div>
</template>

<style>
:root {
    --fc-grid-transparency: 0.2;
    --fc-grid-cell-size: 20px;
    --fc-grid-background: rgba(0, 0, 0, 0.08);
}

.fc-canvas-outer {
    position: relative;
    width: 100%;
    overflow: hidden;
    cursor: not-allowed;
}

.fc-canvas-inner {
    position: relative;
    outline: 1px dashed rgba(0, 0, 0, 0.01);
    width: 3000px;
    height: 1500px;
    cursor: default;
    background-size: var(--fc-grid-cell-size) var(--fc-grid-cell-size);
    background-color: var(--fc-grid-background);
    background-image: linear-gradient(90deg, rgba(255, 255, 255, var(--fc-grid-transparency)) 1px, transparent 0px),
        linear-gradient(rgba(255, 255, 255, var(--fc-grid-transparency)) 1px, transparent 0px);
}
</style>
