<script>
export default {};
</script>

<template>
    <div class="fc-transform">
        <slot></slot>
    </div>
</template>

<style>
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
