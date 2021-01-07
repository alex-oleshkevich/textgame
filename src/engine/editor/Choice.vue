<script>
import Port from './Port.vue';

export default {
    components: { Port },
    props: {
        node: Object,
    },
};
</script>

<template>
    <div class="border-b border-gray-700 p-2 flex items-center justify-between">
        <div><slot></slot></div>
        <port class="-mr-5" :node="node"></port>
    </div>
</template>
