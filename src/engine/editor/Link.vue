<script>
export default {
    props: {
        from: { type: Object, required: true },
        to: { type: Object, required: true },
    },
    computed: {
        line() {
            return [`M${this.from.x} ${this.from.y}`, `L ${this.to.x} ${this.to.y}`].join(' ');
        },
    },
};
</script>

<template>
    <svg style="overflow: visible; position: absolute; cursor: pointer; left: 0px; right: 0px">
        <circle r="4" :cx="from.x" :cy="from.y" fill="cornflowerblue"></circle>
        <path :d="line" stroke="cornflowerblue" stroke-width="3" fill="none"></path>
        <!-- <path
            d="M215,377 C 215,451.3333333333333 200,525.6666666666666 200,600"
            stroke="cornflowerblue"
            stroke-width="20"
            fill="none"
            stroke-linecap="round"
            stroke-opacity="0.1"
        ></path> -->
        <circle r="4" :cx="to.x" :cy="to.y" fill="cornflowerblue"></circle>
    </svg>
</template>
