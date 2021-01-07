<script>
import Choice from './Choice.vue';
import Port from './Port.vue';

export default {
    components: { Choice, Port },
    props: {
        node: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            choices: [],
        };
    },
};
</script>

<template>
    <div class="rounded shadow bg-gray-600 border border-gray-700 absolute node flex" :data-id="node.id">
        <div class="flex items-center -ml-5">
            <port :node="node"></port>
        </div>
        <div>
            <div class="border-b border-gray-700 p-2 node-title">
                {{ node.id }}
            </div>
            <div class="border-b border-gray-700 p-2">
                Could this be made to also function on touch devices (detecting a swipe scroll attempt)?
            </div>
            <div>
                <choice :node="node" v-for="choice of node.choices" :key="choice.text">
                    {{ choice.text }}
                </choice>
            </div>
        </div>
    </div>
</template>

<style scoped>
.node {
    touch-action: none;
    width: 300px;
    cursor: default;
}

.node .node-title {
    cursor: move;
}
</style>
