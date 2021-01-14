<script>
import interact from 'interactjs';
const passiveSupported = false;

function passiveOption(passive) {
    return passiveSupported ? { passive } : passive;
}

export default {
    data() {
        return {
            positionX: 0,
            positionY: 0,
            scale: 1,
        };
    },
    mounted() {
        const passive = passiveOption(false);
        this.$el.addEventListener('wheel', this.handleMouseWheel, passive);
        this.$el.addEventListener('dblclick', this.handleDoubleClick, passive);


        this.bindPanning();
        // window.addEventListener('keydown', this.bindPanning, passive);
        // window.addEventListener('keyup', this.unbindPanning, passive);
    },
    beforeUnmount() {
        const passive = passiveOption(false);
        this.$el.removeEventListener('wheel', this.handleMouseWheel, passive);
        this.$el.removeEventListener('dblclick', this.handleDoubleClick, passive);

        window.removeEventListener('keydown', this.bindPanning, passive);
        window.removeEventListener('keyup', this.unbindPanning, passive);
    },
    computed: {
        styles() {
            return {
                transform: `translate(${this.positionX}px, ${this.positionY}px) scale(${this.scale})`,
            };
        },
    },
    methods: {
        bindPanning(e) {
            // if (e.code !== 'Space') {
            //     return;
            // }
            this.interact = interact(this.$el.querySelector('.fc-transform')).draggable({
                inertia: true,
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                        endOnly: true,
                    }),
                ],
                ignoreFrom: '.node',
                allowFrom: '.fc-transform',
                autoScroll: true,
                listeners: {
                    move: this.handleMove,
                },
            });
        },
        unbindPanning(e) {
            if (e.code !== 'Space') {
                return;
            }
            this.interact.unset();
        },

        handleMove(e) {
            this.positionX += e.delta.x;
            this.positionY += e.delta.y;
        },

        /**
         * @param {WheelEvent} e
         */
        handleMouseWheel(e) {
            if (this.isPanning) {
                return;
            }
            if (e.wheelDeltaY > 0) {
                this.scale += 0.05;
            } else {
                this.scale -= 0.05;
            }
        },

        /**
         * @param {MouseEvent} e
         */
        handleDoubleClick(e) {
            this.scale = 1;
        },
    },
};
</script>

<template>
    <div class="fc-canvas-outer">
        <div class="fc-transform-wrapper" :style="styles">
            <div class="fc-transform">
                <div class="fc-canvas-inner flex flex-auto">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --fc-grid-transparency: 0.2;
    --fc-grid-cell-size: 20px;
    --fc-grid-background: rgba(0, 0, 0, 0.08);
}

.fc-canvas-outer {
    position: relative;
    width: 100%;
    overflow: hidden;
    cursor: not-allowed;
}

.fc-canvas-inner {
    position: relative;
    outline: 1px dashed rgba(0, 0, 0, 0.01);
    width: 3000px;
    height: 1500px;
    cursor: default;
    background-size: var(--fc-grid-cell-size) var(--fc-grid-cell-size);
    background-color: var(--fc-grid-background);
    background-image: linear-gradient(90deg, rgba(255, 255, 255, var(--fc-grid-transparency)) 1px, transparent 0px),
        linear-gradient(rgba(255, 255, 255, var(--fc-grid-transparency)) 1px, transparent 0px);
}

.fc-transform-wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    user-select: none;
    margin: 0;
    padding: 0;
    touch-action: none;
}

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
