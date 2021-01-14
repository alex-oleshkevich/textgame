<script>
import EditorCanvas from './Canvas.vue';
import Node from './Node.vue';
import Connection from './Link.vue';
import interact from 'interactjs';

export default {
    components: { EditorCanvas, Node, Connection },
    data() {
        return {
            nodes: [
                {
                    id: 'node-0',
                    type: 'text',
                    position: { x: 20, y: 20 },
                    choices: [
                        { id: 'choice-0', text: 'Choice 1' },
                        { id: 'choice-1', text: 'Choice 2' },
                        { id: 'choice-2', text: 'Choice 3' },
                    ],
                },
                {
                    id: 'node-1',
                    type: 'text',
                    position: { x: 500, y: 20 },
                    choices: [
                        { id: 'choice-3', text: 'Choice 1' },
                        { id: 'choice-4', text: 'Choice 2' },
                        { id: 'choice-5', text: 'Choice 3' },
                    ],
                },
            ],
            connections: [{ fromChoice: 'node-1', toNode: 'choice-1' }],
            links: [],
        };
    },
    mounted() {
        interact('.node').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                }),
            ],
            autoScroll: true,
            allowFrom: '.node .node-title',
            listeners: {
                move: this.moveNode,
            },
        });
        this.$nextTick(this.computeConnections);  
    },
    methods: {
        computeConnections() {
            this.links = this.connections.map(c => {
                const inputCoordinates = this.findPortCoordinates(c.fromChoice);
                const outputCoordinates = this.findPortCoordinates(c.toNode);
                return {
                    from: outputCoordinates,
                    to: inputCoordinates,
                };
            });
        },
        addNode() {
            this.nodes.push({
                id: 'node-' + this.nodes.length,
                type: 'text',
                position: { x: 20, y: 20 },
                choices: [{ text: 'Choice 1' }, { text: 'Choice 2' }, { text: 'Choice 3' }],
            });
        },
        findNewNodePosition() {
            let x = 0;
            let y = 0;
            this.node.forEach(node => {});
        },
        moveNode(e) {
            const target = e.target;
            const nodeId = target.dataset.id;
            this.updateNode(nodeId, node => {
                node.position.x = Math.max(20, node.position.x + e.delta.x);
                node.position.y = Math.max(0, node.position.y + e.delta.y);
            });
        },
        updateNode(id, cb) {
            cb(this.nodes.find(n => n.id === id));
        },
        findPortCoordinates(portId) {
            let editor = this.$el.querySelector('#editor');
            let editorBox = editor.getBoundingClientRect();

            let el = document.querySelector(`[data-port-id="${portId}"]`);
            let box = el.getBoundingClientRect();
            let x = box.left - editorBox.left; 
            let y = box.top - editorBox.top;

            console.log(`port ${portId}: x=${x}, y=${y}`);
            return { x, y };
        },
    },
};
</script>

<template>
    <div class="bg-gray-800 text-gray-100 editor flex flex-col">
        <div class="p-3 bg-gray-900 shadow flex items-center">
            <div class="font-bold">Quest Editor</div>
            <button @click="addNode" class="py-1 px-2 bg-blue-800 text-white ml-5">Add node</button>
        </div>
        <!-- "{{ links }}" -->
        <editor-canvas class="p-3 flex-auto flex">
            <div class="flex flex-auto" id="editor">
                <connection
                    :from="link.from"
                    :to="link.to"
                    v-for="link of links"
                    :key="`${link.from.x}:${link.from.y}`"
                />
                <node
                    :node="node"
                    v-for="node of nodes"
                    :key="node"
                    :style="{
                        transform: `translate(${node.position.x}px, ${node.position.y}px)`,
                    }"
                ></node>
            </div>
        </editor-canvas>
    </div>
</template>

<style scoped>
.editor {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
</style>
