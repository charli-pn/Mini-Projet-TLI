import { Edge } from "./Edge.js";
import { Vertice } from "./Vertice.js";
import { Position } from "./Position.js";

export class Graph {
  constructor(name, directed) {
    this.name = name;
    this.directed = directed;
    this.vertices = [];
    this.edges = [];
  }

  addVertice(x, y) {
    const verticeId = this.getNextVerticeId();
    const vertice = new Vertice(verticeId, verticeId, new Position(x, y));
    this.vertices.push(vertice);
  }

  removeVertice(id) {
    const indexVerticeToRemove = this.vertices.findIndex(element => {
      return element.id == id;
    });
    if (indexVerticeToRemove == undefined) return false; // No vertice with this id

    this.vertices.splice(indexVerticeToRemove, 1);
    this.edges = this.edges.filter(element => {
      return element.id1 != id && element.id2 != id;
    });
  }

  getNextVerticeId() {
    let maxId = 0;
    for (let vertice of this.vertices) {
      if (vertice.id > maxId) maxId = vertice.id;
    }
    return ++maxId;
  }

  addEdge(id1, id2, weight) {
    const alreadyExistingEdge = this.edges.find(edge => {
      if (edge.id1 == id1 && edge.id2 == id2) return true;
    });

    if (alreadyExistingEdge) return;

    if (!weight) weight = 1;

    const newEdge = new Edge(id1, id2, weight);

    this.edges.push(newEdge);
  }

  removeEdge(id1, id2) {
    const indexEdgeToRemove = this.edges.findIndex(element => {
      return element.id1 == id1 && element.id2 == id2;
    });
    console.log(indexEdgeToRemove);
    if (indexEdgeToRemove != undefined) this.edges.splice(indexEdgeToRemove, 1);
  }

  getVerticeById(id) {
    const vertice = this.vertices.find(element => {
      return element.id == id;
    });
    return vertice == undefined ? false : vertice;
  }
}
