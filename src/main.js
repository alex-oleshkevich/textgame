import { Choice, Game, Scene, TextScene } from './engine';

const game = new Game();
game.addMenuItem('Start', game => {
    game.goto('c1s1');
});
game.addMenuItem('Continue', () => {});
game.addScene(
    'c1s1',
    new TextScene(`<p>Hello, let's start our game!</p> <p>Are you ready?</p>`, [
        new Choice('Yes, sure!', 'c1s2'),
        new Choice('No, I am off', 'c1s3'),
    ]),
);
game.addScene('c1s2', new TextScene(`okay, you said YES`, [new Choice('Ok, go back', 'c1s1')]));
game.addScene('c1s3', new TextScene(`Sad...`, [new Choice('Ok, go back', 'menu')]));
// game.start();

import { createApp, h, defineComponent } from 'vue';
import Editor from './engine/editor/Editor.vue';

const app = createApp(Editor);
app.mount('#app');
