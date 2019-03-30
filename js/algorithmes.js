function angle(tab1, tab2){
    if (tab1.length !== tab2.length) return null;
    else {
        let scalaire = 0;
        let norme1 = 0;
        let norme2 = 0;
        for (let i = 0; i<tab1.length; i++){
            scalaire+= tab1[i]*tab2[i];
            norme1+= tab1[i]*tab1[i];
            norme2+= tab2[i]*tab1[i];
        }
        norme1 = Math.sqrt(norme1);
        norme2 = Math.sqrt(norme2);
        return scalaire/(norme1+norme2);
    }
}

/**
 *
 * @param graph Objet JSON
 */
function PageRank(/*graph*/) {
    let graph = {
        "name": "nom_du_graphe",
        "directed": "false",
        "vertices": [
            {
                "id": "0",
                "label": "v1",
                "pos": {
                    "x": "100",
                    "y": "100"
                }
            },
            {
                "id": "1",
                "label": "v7",
                "pos": {
                    "x": "150",
                    "y": "50"
                }
            },
            {
                "id": "2",
                "label": "v19",
                "pos": {
                    "x": "83",
                    "y": "27"
                }
            }
        ],
        "edges": [
            {
                "id1": "0",
                "id2": "1"
            },
            {
                "id1": "0",
                "id2": "2"
            }
        ]
    };
    if (graph.directed === false) {
        return;
    }

    // Initialisation
    let tableauSommets = [];
    let poidsGen = 1 / graph.vertices.length;
    let tableauPoids = [];
    graph.vertices.forEach(function (point) {
        let aretesPointees = [];
        graph.edges.forEach(function (arete) {
            if (arete.id1 === point.id) {
                aretesPointees.push(arete.id2);
            }
        });
        let sommetAvecAretesPointees = {point: point, pointTo: aretesPointees};
        tableauSommets.push(sommetAvecAretesPointees);
        tableauPoids.push(poidsGen);
    });

    do {
        let tableauNouveauxPoids = [];

        for (let i = 0; i < tableauSommets.length; i++) {
            let poidsADonner = tableauPoids[i] / tableauSommets[i].pointTo.length;
            for (let j = 0; j < tableauSommets.length; j++) {
                let isSommet = tableauSommets[i].pointTo.indexOf(tableauSommets[j].point.id);
                if (isSommet !== -1){
                    tableauNouveauxPoids[j]+=poidsADonner;
                }
            }
        }

        for (let k=0; k<tableauPoids; k++){
            if (tableauNouveauxPoids[k] ===  null){
                tableauNouveauxPoids[k] = tableauPoids[k];
            }
        }

        let angle = angle(tableauPoids,tableauNouveauxPoids);

        tableauPoids = tableauNouveauxPoids;
        tableauNouveauxPoids = null;

    } while (angle < 0.99999);


}

