// Définition des statuts possibles
const Status = {
    NONE: 0,
    PLAYER: 1,
    BOT: 2
};

// Import de la classe Algho depuis le module
import algho from './modules/Algho';

// Classe de service contenant les méthodes pour créer des arbres heuristiques et appliquer les algorithmes
class Service {
    // Méthode pour créer un arbre heuristique
    createHeuristicTree(board, height) {
        // Création du nœud racine
        const node = new Node();
        node.setType(Status.PLAYER); // Définition du type de nœud (joueur)
    
        // Création de l'arbre heuristique avec le nœud racine
        const heuristicTree = new heuristicTree(node);
        
        // Ajout des nœuds enfants récursivement
        this.addChildNodes(node, board, height, Status.BOT);
        
        // Retour de l'arbre heuristique créé
        return heuristicTree;
    }
    
    // Méthode pour appliquer l'algorithme Minimax à un arbre
    applyMinimax(tree) {
        const root = tree.getRoot();
        algho.minimax(root, tree);
    }
    
    // Méthode pour appliquer l'algorithme Negamax à un arbre
    applyNegamax(tree) {
        const root = tree.getRoot();
        algho.negamax(root, tree);
    }
    
    // Méthode pour appliquer l'algorithme Alpha-Beta à un arbre
    applyAlphaBeta(tree) {
        const root = tree.getRoot();
        algho.alphabeta(root, tree, -Infinity, Infinity);
    }
    
    // Méthode pour appliquer l'algorithme NegAlphaBeta à un arbre
    applyNegAlphaBeta(tree) {
        const root = tree.getRoot();
        algho.negAlphaBeta(root, tree, -Infinity, Infinity);
    }
    
    // Méthode pour appliquer l'algorithme SSS à un arbre
    applySSS(tree) {
        const root = tree.getRoot();
        algho.sss(root, tree);
    }
    
    // Méthode récursive pour ajouter les nœuds enfants à un nœud donné
    addChildNodes(root, board, height, activePlayer) {
        // Cas de base : hauteur maximale atteinte
        if (height === 0) {
            // Calcul de la valeur heuristique pour le tableau actuel
            root.setValue(algho.calculateHeuristicValueForBoard(board));
            return;
        }
        
        // Parcours de chaque cellule du tableau
        for (let i = 0; i < board.getSideLength(); i++) {
            for (let j = 0; j < board.getSideLength(); j++) {
                // Vérification si la cellule est vide
                if (board.getCell(i, j).getStatus() !== Status.NONE) {
                    continue; // Passer à la prochaine cellule si elle n'est pas vide
                }
                
                // Création d'un nouveau nœud pour la cellule vide
                const node = new Node();
                node.setType(activePlayer); // Définition du type de nœud (joueur ou bot)
                
                // Ajout du nouveau nœud comme enfant du nœud actuel
                root.addChild(node);
                
                // Création d'un nouveau tableau avec l'action sélectionnée
                const newBoard = algho.getNewBoardWithSelectedAction(board, i, j, activePlayer);
                
                // Appel récursif pour ajouter les enfants au nouveau nœud
                this.addChildNodes(node, newBoard, height - 1, this.getActivePlayer(activePlayer));
            }
        }
    }
    
    // Méthode pour déterminer le joueur actif suivant
    getActivePlayer(currentActivePlayer) {
        switch (currentActivePlayer) {
            case Status.NONE:
                return Status.NONE;
            case Status.PLAYER:
                return Status.BOT;
            case Status.BOT:
                return Status.PLAYER;
            default:
                return Status.NONE; // Gérer d'autres cas éventuels
        }
    }
}

// Export de la classe de service
export default Service;
