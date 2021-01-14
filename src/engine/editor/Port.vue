<script>
export default {
    props: {
        portId: { type: String, required: true },
    },
    methods: {
        onClicked(e) {
            this.$emit('port-click');
        },
    },
};
</script>

<template>
    <div class="port" @click="onClicked" :data-port-id="portId" :title="portId">
        <div></div>
    </div>
</template>

<style scoped>
.port {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.port > div {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: grey;
    cursor: pointer;
}
</style>
