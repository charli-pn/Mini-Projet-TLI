import { Graph } from './Models/Graph.js'
import { Vertice } from './Models/Vertice.js';
import { Position } from './Models/Position.js';
import { Canvas } from './Models/Canvas.js';
import { Edge } from './Models/Edge.js';

const graph = new Graph("graphe", false)
const canvas = new Canvas("canvas", graph)


canvas.element.onclick = ev => {

    const x = ev.clientX - canvas.element.offsetTop;
    const y = ev.clientY - canvas.element.offsetLeft;
    console.log("click x: " + x + " y: " + y);

    const target = graph.vertices.find(vertice => {
        if (vertice.position.x > (x - 6) && vertice.position.x < (x + 6)
            && vertice.position.y > (y - 6) && vertice.position.y < (y + 6)) return true;
    });

    // On clique dans le vide -> creation du sommet
    if (!target) {
        addVertice(x, y);
        canvas.refresh();
        return;
    }

    // On reclique sur le somet selectionné -> déselection
    if (target == canvas.selected) {
        canvas.selected = null
        canvas.refresh();
        return;
    }

    // On clique sur un sommet -> selection du sommet
    if (!canvas.selected) {
        canvas.selected = target;
        canvas.refresh();
        return;
    }

    const newEdge = new Edge(canvas.selected.id, target.id)
    graph.addEdge(newEdge)
    canvas.selected = null
    canvas.refresh();
    console.log(graph)
    return;

}


function addVertice(x, y) {

    const verticeId = graph.getNextVerticeId();
    const vertice = new Vertice(verticeId, verticeId, new Position(x, y))
    graph.addVertice(vertice);

}