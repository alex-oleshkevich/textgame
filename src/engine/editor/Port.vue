<script>
export default {};
</script>

<template>
    <div class="port">
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
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
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
