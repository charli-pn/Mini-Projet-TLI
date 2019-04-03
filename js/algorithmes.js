function angleVecteurs(tab1, tab2) {
    if (tab1.length !== tab2.length) return null;
    else {
        let scalaire = 0;
        let norme1 = 0;
        let norme2 = 0;
        for (let i = 0; i < tab1.length; i++) {
            scalaire += tab1[i] * tab2[i];
            norme1 += tab1[i] * tab1[i];
            norme2 += tab2[i] * tab1[i];
        }
        norme1 = Math.sqrt(norme1);
        norme2 = Math.sqrt(norme2);
        return scalaire / (norme1 * norme2);
    }
}

/**
 *
 * @param graph Objet JSON
 */
function PageRank(graph) {
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
    let angle = 0;
    do {
        let tableauNouveauxPoids = [];

        for (let i = 0; i < tableauSommets.length; i++) {
            let poidsADonner = tableauSommets[i].pointTo.length !== 0 ? tableauPoids[i] / tableauSommets[i].pointTo.length : 0;

            for (let j = 0; j < tableauSommets.length; j++) {
                let isSommet = tableauSommets[i].pointTo.indexOf(tableauSommets[j].point.id);
                if (isSommet !== -1)
                    tableauNouveauxPoids[j] = tableauNouveauxPoids[j] === undefined ? poidsADonner : tableauNouveauxPoids[j] + poidsADonner;
                else
                    tableauNouveauxPoids[j] = tableauNouveauxPoids[j] === undefined ? 0 : tableauNouveauxPoids[j];
            }
        }

        for (let k = 0; k < tableauPoids.length; k++) {
            if (tableauNouveauxPoids[k] === 0) {
                tableauNouveauxPoids[k] = tableauPoids[k];
            }
        }

        angle = angleVecteurs(tableauPoids, tableauNouveauxPoids);

        tableauPoids = tableauNouveauxPoids;
        tableauNouveauxPoids = null;

    } while (angle < 0.99999);

    let classement = [];

    for (let i = 0; i < tableauPoids.length; i++) {
        classement[i] = 1;
        for (let j = 0; j < tableauPoids.length; j++) {
            if (i !== j) {
                if (tableauPoids[j] > tableauPoids[i]) classement[i]++;
            }
        }
    }

    let affichage = '<table><thead><td>Sommet</td><td>Poids</td><td>Classement</td></thead>';
    for (let i = 0; i < tableauSommets.length; i++) {
        console.log(tableauSommets[i].point.label)
        affichage += '<tr><td>' + tableauSommets[i].point.label + '</td>' +
            '<td>' + tableauPoids[i] + '</td>' +
            '<td>' + classement[i] + '</td></tr>';
    }
    affichage += '</table>';

    document.getElementById('pageRank').innerHTML = affichage;
}


function bipartition(graph) {
    // Récupérer tous les sommets et leurs voisins dans un tableau



    // Initialisation
    let tableauSommets = [];
    let tabA = [], tabB = [];

    graph.vertices.forEach(function (point) {
        let aretesPointees = [];
        graph.edges.forEach(function (arete) {
            if (arete.id1 === point.id) {
                aretesPointees.push(arete.id2);
            }
        });
        let sommetAvecAretesPointees = {point: point, pointTo: aretesPointees};
        tableauSommets.push(sommetAvecAretesPointees);
    });


    let biparti = true;

    for (let i = 0; i < tableauSommets.length; i++) {
        if (tabA.includes(tableauSommets[i].point.id)) {
            tableauSommets[i].pointTo.forEach(function (voisin) {
                if (tabA.includes(voisin)) biparti = false;
                else tabB.push(voisin);
            });
        } else if (tabB.includes(tableauSommets[i].point.id)) {
            tableauSommets[i].pointTo.forEach(function (voisin) {
                if (tabB.includes(voisin)) biparti = false;
                else tabA.push(voisin);
            });
        } else {
            tabA.push(tableauSommets[i].point.id);
            tableauSommets[i].pointTo.forEach(function (voisin) {
                if (tabA.includes(voisin)) biparti = false;
                else tabB.push(voisin);
            });
        }
    }

    if (biparti) {
        let jsonObj = '{"algorithm": {' +
            '"name": "biparti",' +
            '"classe_A": [';
        for (let i = 0; i<tabA.length; i++){
            jsonObj+= i === tabA.length-1 ? '{"id":"'+tabA[i]+'"}' : '{"id":"'+tabA[i]+'"},';
        }
        jsonObj+='], "classe_B": [';
        for (let i = 0; i<tabB.length; i++){
            jsonObj+= i === tabB.length-1 ? '{"id":"'+tabB[i]+'"}' : '{"id":"'+tabB[i]+'"},';
        }
        jsonObj+=']}}';
        let json = JSON.parse(jsonObj);
    } else {
        document.getElementById('biparti').innerHTML = "Le graphe n'est pas biparti";
    }
}

function dijkstraRec(tableauSommets, chemin, from, to, poidsTotal ){
    let origine = from;
    for (let i = 0; i<tableauSommets.length; i++){
        if(tableauSommets[i].point.id === from){

        }
    }

}

function dijkstra(/*graph*/ from, to) {
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
                "id2": "1",
                "poids": "3"
            },
            {
                "id1": "0",
                "id2": "2",
                "poids": "6"
            },
        ]
    };
    let tableauSommets = [];
    graph.vertices.forEach(function (point) {
        let aretesPointees = [];
        graph.edges.forEach(function (arete) {
            if (arete.id1 === point.id) {
                aretesPointees.push(arete.id2);
            }
        });
        let sommetAvecAretesPointees = {point: point, pointTo: aretesPointees};
        tableauSommets.push(sommetAvecAretesPointees);
    });

    dijkstraRec(graph,'[{"id":"'+from+'"}', "1", "0", 0)

}

window.addEventListener('onload', dijkstra());
