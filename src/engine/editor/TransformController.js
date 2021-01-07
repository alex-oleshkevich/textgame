const passiveSupported = false;

function passiveOption(passive) {
    return passiveSupported ? { passive } : passive;
}

export default {
    props: {
        pan: Boolean,
        zoom: Boolean,
        wrapperSelector: {
            type: String,
            default: '.fc-transform-wrapper',
        },
    },
    data() {
        return {
            isPanning: false,
            positionX: 0,
            positionY: 0,
            startPosition: {
                x: 0,
                y: 0,
            },
            scale: 1,
        };
    },
    mounted() {
        const el = document.querySelector(this.wrapperSelector);
        const passive = passiveOption(false);
        if (this.pan) {
            el.addEventListener('mousedown', this.handleStartPanning, passive);
            el.addEventListener('mousemove', this.handlePanning, passive);
            el.addEventListener('mouseup', this.handleStopPanning, passive);
        }

        if (this.zoom) {
            el.addEventListener('wheel', this.handleMouseWheel, passive);
            el.addEventListener('dblclick', this.handleDoubleClick, passive);
        }
    },
    beforeUnmount() {
        const el = document.querySelector(this.wrapperSelector);
        const passive = passiveOption(false);
        if (this.pan) {
            el.removeEventListener('mousedown', this.handleStartPanning, passive);
            el.removeEventListener('mousemove', this.handlePanning, passive);
            el.removeEventListener('mouseup', this.handleStopPanning, passive);
        }
        if (this.zoom) {
            el.removeEventListener('wheel', this.handleMouseWheel, passive);
            el.removeEventListener('dblclick', this.handleDoubleClick, passive);
        }
    },
    methods: {
        /**
         * @param {MouseEvent} e
         */
        handleStartPanning(e) {
            if (!e.target.classList.contains('draggable')) {
                return;
            }
            this.isPanning = true;
            this.startPosition = {
                x: e.clientX,
                y: e.clientY,
            };
        },

        /**
         * @param {MouseEvent} e
         */
        handlePanning(e) {
            if (!this.isPanning) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();

            // distance travelled by mouse
            const distanceX = e.clientX - this.startPosition.x;
            const distanceY = e.clientY - this.startPosition.y;

            this.positionX = this.positionX + distanceX;
            this.positionY = this.positionY + distanceY;

            this.startPosition = {
                x: e.clientX,
                y: e.clientY,
            };
        },

        /**
         * @param {MouseEvent} e
         */
        handleStopPanning(e) {
            this.isPanning = false;
            this.startPosition = { x: 0, y: 0 };
            this.lastDistance = { x: 0, y: 0 };
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
         *
         * @param {MouseEvent} e
         */
        handleDoubleClick(e) {
            this.scale = 1;
        },
    },
    render() {
        return this.$slots.default({
            positionX: this.positionX,
            positionY: this.positionY,
            scale: this.scale,
            pan: this.pan,
            transform: `translate(${this.positionX}px, ${this.positionY}px) scale(${this.scale})`,
        });
    },
};
