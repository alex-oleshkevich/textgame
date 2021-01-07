<script>
import { defineProps, computed, ref, watch } from 'vue';

export default {
    props: {
        game: Object,
        scene: Object,
    },
    computed: {
        component() {
            return this.scene.value.component;
        },
        componentProps() {
            return this.scene.value.getProps();
        },
    },
};
</script>

<template>
    <div>
        <component :is="component" :game="game" v-bind="componentProps" />
    </div>
</template>
