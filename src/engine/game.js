import { createApp, ref, markRaw } from 'vue';
import Canvas from './components/Canvas.vue';
import { Menu, MenuItem } from './menu';
import { MenuScene } from './scenes';

export class Game {
    constructor() {
        this.menu = new Menu();
        this.scenes = {};
        this.currentScene = ref(null);
    }

    addMenuItem(label, fn) {
        this.menu.addItem(new MenuItem(label, fn));
    }

    addScene(id, scene) {
        this.scenes[id] = scene;
    }

    goto(sceneId) {
        this.currentScene.value = markRaw(this.scenes[sceneId]);
    }

    start(el = '#app') {
        this.addScene('menu', new MenuScene(this.menu));
        this.goto('menu');

        this.app = createApp(Canvas, { game: this, scene: this.currentScene });
        this.vm = this.app.mount(el);
    }
}
