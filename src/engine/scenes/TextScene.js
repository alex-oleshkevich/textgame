import TextSceneComponent from './TextScene.vue';
import { Scene } from './Scene';

export class Choice {
    constructor(text, nextScene) {
        this.text = text;
        this.nextScene = nextScene;
    }

    handle(game) {
        if (this.nextScene) {
            game.goto(this.nextScene);
        } else {
            console.warn(`Choice "${this.text}" does not contain transition to another scene.`);
        }
    }
}

export class TextScene extends Scene {
    constructor(text, choices = null) {
        super();
        this.text = text;
        this.choices = choices;
    }

    get component() {
        return TextSceneComponent;
    }

    getProps() {
        return {
            text: this.text,
            choices: this.choices,
        };
    }
}
