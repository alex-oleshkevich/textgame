<script>
import EditorCanvas from './Canvas.vue';
import Node from './Node.vue';
import Link from './Link.vue';
import interact from 'interactjs';

export default {
    components: { EditorCanvas, Node, Link },
    data() {
        return {
            nodes: [],
        };
    },
    mounted() {
        interact('.node').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true,
                }),
            ],
            autoScroll: true,
            allowFrom: '.node .node-title',
            listeners: {
                move: this.moveNode,
            },
        });
    },
    methods: {
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
                node.position.x = node.position.x + e.delta.x;
                node.position.y = node.position.y + e.delta.y;
            });
        },
        updateNode(id, cb) {
            cb(this.nodes.find(n => n.id === id));
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
        <editor-canvas class="p-3 flex-auto flex">
            <node
                :node="node"
                v-for="node of nodes"
                :key="node"
                :style="{
                    transform: `translate(${node.position.x}px, ${node.position.y}px)`,
                }"
            ></node>
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
