export class Canvas {
  constructor(id, graph) {
    this.element = document.getElementById(id);
    this.context = this.element.getContext("2d");
    this.graph = graph;
    this.selected;
  }

  refresh() {
    this.clear();
    this.printEdges();
    this.printVertice();
  }

  clear() {
    const context = this.element.getContext("2d");
    context.clearRect(0, 0, this.element.width, this.element.height);
  }

  printVertice() {
    this.graph.vertices.forEach(vertice => {
      const x = vertice.position.x;
      const y = vertice.position.y;

      this.context.beginPath();

      this.context.fillStyle = this.selected == vertice ? "#ff0000" : "#ffffff";
      this.context.arc(x, y, 15, 0, 2 * Math.PI);
      this.context.fill();

      this.context.fillStyle = "#000000";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";
      this.context.fillText(vertice.label, x, y);

      this.context.stroke();
    });
  }

  printEdges() {
    this.graph.edges.forEach(edge => {
      const verticeSize = 15;

      const vertice1 = this.graph.getVerticeById(edge.id1);
      const vertice2 = this.graph.getVerticeById(edge.id2);

      const fromx = vertice1.position.x;
      const fromy = vertice1.position.y;

      const destx = vertice2.position.x;
      const desty = vertice2.position.y;

      this.context.beginPath();
      this.context.fillStyle = "#000000";
      this.context.moveTo(fromx, fromy);
      this.context.lineTo(destx, desty);

      if (this.graph.directed) {
        const head = 20;
        const angle = Math.atan2(desty - fromy, destx - fromx);

        const arrowx = destx - verticeSize * Math.cos(angle);
        const arrowy = desty - verticeSize * Math.sin(angle);

        this.context.moveTo(arrowx, arrowy);
        this.context.lineTo(
          arrowx - head * Math.cos(angle - Math.PI / 6),
          arrowy - head * Math.sin(angle - Math.PI / 6)
        );
        this.context.moveTo(arrowx, arrowy);
        this.context.lineTo(
          arrowx - head * Math.cos(angle + Math.PI / 6),
          arrowy - head * Math.sin(angle + Math.PI / 6)
        );
      }
      this.context.stroke();
    });
  }
}
