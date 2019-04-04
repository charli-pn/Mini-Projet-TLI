import { Graph } from './Models/Graph.js'
import { Canvas } from './Models/Canvas.js';

const graph = new Graph("graphe", false)
const canvas = new Canvas("canvas", graph)

const reset = document.getElementById("reset");
const exportGraph = document.getElementById("exportGraph");
const improtGraph = document.getElementById("improtGraph");

const fileNameInput = document.getElementById("fileName");

const directed = document.getElementById("directed");

let isDragging = false;

canvas.element.onmousedown = ev => {

    const x = ev.clientX - canvas.element.offsetLeft ;
    const y = ev.clientY - canvas.element.offsetTop + window.scrollY;

    const target = graph.vertices.find(vertice => {
        if (vertice.position.x > (x - 15) && vertice.position.x < (x + 15)
            && vertice.position.y > (y - 15) && vertice.position.y < (y + 15)) return true;
    });

    // Clique dans le vide alors qu'on a selectioné un point -> déselection
    if (!target && canvas.selected) {
        canvas.selected = null
        canvas.refresh();
        return;
    }

    // On clique dans le vide -> creation du sommet
    if (!target) {
        graph.addVertice(x, y);
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
        isDragging = true;
        canvas.selected = target;
        canvas.refresh();
        return;
    }

    // Edge existe déjà => on le supprime
    const alreadyExistingEdge = graph.edges.find(edge => {
        if (edge.id1 == canvas.selected.id && edge.id2 == target.id) return true;
      });
    
    if (alreadyExistingEdge) {
        graph.removeEdge(canvas.selected.id, target.id)
        canvas.refresh()
        canvas.selected = null;
        return;
    }


    const weight = 1; //TODO: weight interface

    // On ajoute
    graph.addEdge(canvas.selected.id, target.id, weight)
    canvas.selected = null
    canvas.refresh();
    return;
}

canvas.element.onmouseup = ev => {
    isDragging = false;
}

canvas.element.onmousemove = ev => {
    if (!isDragging) return false;

    const x = ev.clientX - canvas.element.offsetLeft;
    const y = ev.clientY - canvas.element.offsetTop + window.scrollY;

    canvas.selected.position.x = x;
    canvas.selected.position.y = y;

    canvas.refresh();


}

document.onkeydown = (event) => {
    var key = event.key;

    if (canvas.selected && key == 'Delete') {
        graph.removeVertice(canvas.selected.id)
        canvas.selected = null;
        canvas.refresh();
    }

}

reset.onclick = () => {
    graph.edges = [];
    graph.vertices = [];
    canvas.refresh();
}

directed.onchange = ()=>{
    graph.directed = directed.checked;
    canvas.refresh();
}

exportGraph.onclick = () => {
    const fileName = fileNameInput.value;
    if(fileName==""){
        alert("Vous devez saisir un nom de fichier")
        return;
    }

    const blob = new Blob([JSON.stringify(graph)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, fileName);
}

importGraph.onchange = () => {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        try {
            const json = JSON.parse(dataURL)
            loadGraph(json)
        } catch (err){
            alert("Fichier incompatible");
            return;
        }
    };
    reader.readAsText(input.files[0])
}

function loadGraph(json){
    console.log(json);
    graph.edges = [];
    graph.vertices = [];

    graph.name = json.name
    graph.directed = json.directed

    json.vertices.forEach(vertice => {
        graph.addVertice(vertice.position.x, vertice.position.y)
    });

    json.edges.forEach(edge => {
        graph.addEdge(edge.id1, edge.id2, edge.weight);
    })

    console.log(graph)

    canvas.refresh();

}
