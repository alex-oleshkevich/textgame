<script>
import { computed, ref } from 'vue';

export default {
    props: {
        game: Object,
        menu: Object,
    },
    setup(props) {
        const menuItems = props.menu.items;
        const onMenuItemClicked = menuItem => {
            menuItem.handle(props.game);
        };
        return { menuItems, onMenuItemClicked };
    },
};
</script>

<template>
    <ul>
        <li><b>Menu</b></li>
        <li v-for="menuItem of menuItems" :key="menuItem.label">
            <button @click="onMenuItemClicked(menuItem)">
                {{ menuItem.label }}
            </button>
        </li>
    </ul>
</template>
