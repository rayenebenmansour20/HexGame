
function returnHome() {
    window.location.href = "/"; // Rediriger vers la racine du site
}

function showTreeDialog() {
    console.log("La fonction showTreeDialog() est appelée.");

    // Sélection de la boîte de dialogue de l'arbre
    const treeDialog = document.getElementById('tree-dialog');
    treeDialog.style.display = 'block';

    // Sélection du conteneur de graphique d'arbre
    const treeGraphContainer = document.getElementById('tree-graph');

    // Création du nœud racine avec une valeur d'heuristique spécifique
    const rootNode = new Node();
    rootNode.setValue(0); // Valeur d'heuristique spécifique pour le nœud racine

    // Création des nœuds enfants avec des valeurs d'heuristique spécifiques
    const child1 = new Node();
    child1.setValue(10); // Valeur d'heuristique spécifique pour le premier enfant
    const child2 = new Node();
    child2.setValue(20); // Valeur d'heuristique spécifique pour le deuxième enfant

    // Ajout des enfants au nœud racine
    rootNode.addChild(child1);
    rootNode.addChild(child2);

    // Création des nœuds petits-enfants avec des valeurs d'heuristique spécifiques
    const grandchild1 = new Node();
    grandchild1.setValue(5); // Valeur d'heuristique spécifique pour le premier petit-enfant
    const grandchild2 = new Node();
    grandchild2.setValue(15); // Valeur d'heuristique spécifique pour le deuxième petit-enfant

    // Ajout des petits-enfants au premier enfant
    child1.addChild(grandchild1);
    child1.addChild(grandchild2);

    // Création de l'arbre heuristique avec le nœud racine
    const heuristicTree = new HeuristicTree(rootNode);

    // Dessin de l'arbre avec les valeurs d'heuristique
    drawTree(rootNode, treeGraphContainer);
}

// Fonction pour dessiner l'arbre
function drawTree(rootNode, container) {
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    const svgWidth = "100%";
    const svgHeight = "100%";

    const svg = d3.select(container)
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const treeLayout = d3.tree().size([container.offsetHeight - margin.top - margin.bottom, container.offsetWidth - margin.left - margin.right]);
    const root = d3.hierarchy(rootNode);
    treeLayout(root);

    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y));

    const nodes = svg.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

    nodes.append("circle")
        .attr("r", 5);

    nodes.append("text")
        .attr("dy", 3)
        .attr("x", d => d.children ? -8 : 8)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.getFullRepresentation()); // Utilisez la méthode pour obtenir la représentation complète
}

// Fonction pour fermer le dialogue de l'arbre
function closeTreeDialog() {
    const treeDialog = document.getElementById('tree-dialog');
    treeDialog.style.display = 'none';
    const treeGraphContainer = document.getElementById('tree-graph');
    treeGraphContainer.innerHTML = ''; // Effacez le contenu pour fermer l'arbre
}
