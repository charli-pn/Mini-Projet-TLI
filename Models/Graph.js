export class Graph {

    constructor(name, directed) {

        this.name = name;
        this.directed = directed;
        this.vertices = [];
        this.edges = [];

    }

    addVertice(vertice) {
        if(this.getVerticeById(vertice.id)) return false; //Id already exist
        this.vertices.push(vertice);
    }

    removeVertice(id) {
        const indexVerticeToRemove = this.vertices.findIndex(element => {
            return (element.id == id)
        })
        if (indexVerticeToRemove == undefined) return false; // No vertice with this id
        
        this.vertices.slice(indexVerticeToRemove, 1);

        this.vertices = this.vertices.filter(element => {
            return (element.id1 != id && element.id2 != id)
        })
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
        const vertice = this.vertices.find(element => {
            return element.id == id;
        })
        return (vertice==undefined) ? false : vertice;
    }

}