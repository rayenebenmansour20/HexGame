class TreeNode {
  constructor(state = "état du jeu", depth = 0, alpha = -500, beta = 500, heuristic = 0) {
      this.state = state; // État du jeu
      this.depth = depth; // Profondeur dans l'arbre
      this.alpha = alpha; // Valeur d'alpha pour l'algorithme Alpha-Beta
      this.beta = beta; // Valeur de bêta pour l'algorithme Alpha-Beta
      this.heuristic = heuristic; // Valeur de l'heuristique
      this.children = []; // Nœuds enfants
  }

  // Fonction pour ajouter un enfant au nœud
  addChild(childNode) {
      this.children.push(childNode);
  }

  // Fonction pour obtenir les enfants du nœud
  getChildren() {
      return this.children;
  }

  // Fonction pour obtenir l'état du jeu du nœud
  getState() {
      return this.state;
  }

  // Fonction pour obtenir la profondeur du nœud
  getDepth() {
      return this.depth;
  }

  // Fonction pour obtenir la valeur d'alpha du nœud
  getAlpha() {
      return this.alpha;
  }

  // Fonction pour obtenir la valeur de bêta du nœud
  getBeta() {
      return this.beta;
  }

  // Fonction pour obtenir la valeur de l'heuristique du nœud
  getHeuristic() {
      return this.heuristic;
  }

  getFullRepresentation() {
    return `${this.state} (H: ${this.heuristic})`;
}
}
