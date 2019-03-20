export class Graph {

    constructor(name, directed) {

        this.name = name;
        this.directed = directed;
        this.vertices = [];
        this.edges = [];

    }

    addVertice(vertice) {
        if(this.getVerticeById(vertice.id) != undefined) return false; //Id already exist
        this.vertices.push(vertice);
    }

    removeVertice(id) {
        const indexVerticeToRemove = this.vertices.findIndex(element => {
            return (element.id == id)
        })
        if (indexVerticeToRemove != undefined) this.vertices.slice(indexVerticeToRemove, 1);
    }

    addEdge(edge) {
        this.edges.push(edge);
    }

    removeEdge(id1, id2) {
        const indexEdgeToRemove = this.edges.findIndex(element => {
            return (element.id1 == id1 && element.id2 == id2)
        })
        if (indexEdgeToRemove != undefined) this.edges.slice(indexEdgeToRemove, 1)
    }

    getVerticeById(id) {
        this.vertices.find(element => {
            return element.id == id;
        })
    }

}