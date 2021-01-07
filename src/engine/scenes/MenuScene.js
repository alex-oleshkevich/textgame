import MenuComponent from './Menu.vue';
import { Scene } from './Scene';

export class MenuScene extends Scene {
    constructor(menu) {
        super();
        this.menu = menu;
    }

    get component() {
        return MenuComponent;
    }

    getProps() {
        return {
            menu: this.menu,
        };
    }
}
