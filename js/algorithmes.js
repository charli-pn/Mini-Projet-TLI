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
        affichage += '<tr><td>' + tableauSommets[i].point.label + '</td>' +
            '<td>' + tableauPoids[i] + '</td>' +
            '<td>' + classement[i] + '</td></tr>';
    }
    affichage += '</table>';

    document.getElementById('pageRank').innerHTML = affichage;
}


function bipartition(graph) {
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

function dijkstraRec(graph, from, to, poidsTotal = 0){
    let chemin = [];
    let newfrom = from;
    let poids = poidsTotal;
    let minPoids = [99999, null];
    chemin[0] = from;
    graph.forEach(function(point){
        if (point.poids < minPoids[0] && point.poids !== -1)
            minPoids = [point.poids, point];
    });
    graph.forEach(function (sommet) {
        if (minPoids[1] !== null) {
            minPoids[1].pointTo.forEach(function (sommetPointe) {
                if (sommetPointe.pointed === sommet.point.id) {
                    sommet.poids = sommetPointe.poids;
                }
            })
        }
    });
    graph.forEach(function (point) {
        if (point.poids < minPoids[0] && point.poids !== -1) {
            minPoids = [point.poids, point];
            newfrom = point.point.id;
            poids += point.poids;
        }
    });

    console.log(chemin);
    if (newfrom!== to) return chemin.concat(dijkstra(graph, newfrom, to, poids));
    else return [chemin, poids];

}

function dijkstra(graph, from, to) {
    let tableauSommets = [];

    graph.vertices.forEach(function (point) {
        let aretesPointees = [];
        graph.edges.forEach(function (arete) {
            if (arete.id1 === point.id) {
                aretesPointees.push({pointed: arete.id2, poids: arete.weight});
            }
        });
        let value = point.id === from ? 0 : -1;
        let sommetAvecAretesPointees = {point: point, pointTo: aretesPointees, parcouru: false, poids: value};
        tableauSommets.push(sommetAvecAretesPointees);
    });

    let result = dijkstraRec(tableauSommets, "1", "0");


}

