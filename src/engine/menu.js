export class MenuItem {
    constructor(label, fn) {
        this.label = label;
        this.fn = fn;
    }

    handle(game) {
        this.fn(game);
    }
}

export class Menu {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
}
