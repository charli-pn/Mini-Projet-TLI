export class Canvas {

    constructor(id, graph) {
        this.element = document.getElementById(id);
        this.context = this.element.getContext("2d")
        this.graph = graph;
        this.selected;
    }

    refresh() {
        this.clear();
        this.printEdges();
        this.printVertice();
    }

    clear() {
        const context = this.element.getContext('2d');
        context.clearRect(0, 0, this.element.width, this.element.height);
    }

    printVertice() {
        this.graph.vertices.forEach(vertice => {

            const x = vertice.position.x;
            const y = vertice.position.y

            this.context.beginPath();


            this.context.fillStyle = (this.selected == vertice) ? "#ff0000" : "#ffffff";
            this.context.arc(x, y, 8, 0, 2 * Math.PI)
            this.context.fill();

            this.context.fillStyle = "#000000";
            this.context.textAlign = 'center';
            this.context.textBaseline = 'middle';
            this.context.fillText(vertice.label, x, y);

            this.context.stroke();
        });
    }

    printEdges() {
        this.graph.edges.forEach(edge => {

            const vertice1 = this.graph.getVerticeById(edge.id1)
            const vertice2 = this.graph.getVerticeById(edge.id2)

            this.context.beginPath();
            this.context.fillStyle = "#000000";
            this.context.moveTo(vertice1.position.x, vertice1.position.y);
            this.context.lineTo(vertice2.position.x, vertice2.position.y);
            this.context.stroke();
        })
    }




}