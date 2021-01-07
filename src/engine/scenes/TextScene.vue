<script>
import { computed } from 'vue';

export default {
    props: {
        game: Object,
        scene: Object,
        text: String,
        choices: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        onChoiceClicked(choice) {
            choice.handle(this.game);
        },
    },
};
</script>

<template>
    <div>
        <div v-html="text"></div>
        <br />
        <div v-for="choice of choices" :key="choice.text">
            <button @click="onChoiceClicked(choice)">
                {{ choice.text }}
            </button>
        </div>
    </div>
</template>
