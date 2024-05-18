import NodeType from './NodeType';

class Algho {


    /*
    minimax: return the minimax value of the tree's root
    :param root the root of the tree
    :param tree the tree on which the algorithm is applied
    :return: the heuristic value of the tree's root
    */
   //minimax(root: Node, tree: HeuristicTree) -> float:
    minimax(root, tree) {
        const bf = root.getChildren().length;

        if (root.isLeaf()) {
            return root.getValue();
        }

        if (root.getType() === NodeType.MAX) {
            let val = -Infinity;
            for (let k = 0; k < bf; k++) {
                val = Math.max(val, this.minimax(root.getChild(k), tree));
            }
            return val;
        } else {
            let val = Infinity;
            for (let k = 0; k < bf; k++) {
                val = Math.min(val, this.minimax(root.getChild(k), tree));
            }
            return val;
        }
    }


    /*
    negamax: return the negamax value of the tree's root
    :param root the root of the tree
    :param tree the tree on which the algorithm is applied
    :return: the heuristic value of the tree's root
    */
    //negamax(root: Node, tree: HeuristicTree) -> float:
    negamax(root, tree) {
        const bf = root.getChildren().length;
    
        if (root.isLeaf()) {
            return root.getValue();
        }
    
        let val = -Infinity;
        for (let k = 0; k < bf; k++) {
            val = Math.max(val, -this.negamax(root.getChild(k), tree));
        }
        return val;
    }


    /*
    negAlphaBeta: return the negamax value of the tree's root by applying NegAlphaBeta algorithm
    :param root the root of the tree 
    :param tree the tree on which the algorithm is applied
    :return: the heuristic value of the tree's root
    */

    //negAlphaBeta(root: Node, tree: HeuristicTree, alpha: float, beta: float) -> float:
    // alpha beta sont appelle avec -Infinity, Infinity
    negAlphaBeta(root, tree, alpha, beta) {
        if (root.isLeaf()) {
            return root.getValue();
        }
    
        const bf = root.getChildren().length;
        let k = 0;
        let val = -Infinity;
    
        while (alpha < beta && k < bf) {
            val = Math.max(val, -this.negAlphaBeta(root.getChild(k), tree, -beta, -alpha));
            alpha = Math.max(alpha, val);
            k++;
        }
    
        return val;
    }
    

    //alphabeta(root: Node, tree: HeuristicTree, alpha: float, beta: float) -> float:
    // alpha beta sont appelle avec -Infinity, Infinity
    alphabeta(root, tree, alpha, beta) {
        const bf = root.getChildren().length;
    
        if (root.isLeaf()) {
            return root.getValue();
        } else {
            if (root.getType() === NodeType.MAX) {
                let k = 0;
                while (alpha < beta && k < bf) {
                    alpha = Math.max(alpha, this.alphabeta(root.getChild(k), tree, alpha, beta));
                    k++;
                }
                return alpha;
            } else {
                let k = 0;
                while (alpha < beta && k < bf) {
                    beta = Math.min(beta, this.alphabeta(root.getChild(k), tree, alpha, beta));
                    k++;
                }
                return beta;
            }
        }
    }

    //sss(root: Node, tree: HeuristicTree) -> float:
    sss(root) {
        let G = [];
        G.push([root, NodeState.V, Infinity]);
    
        while (G[0][1] !== NodeState.R && G[0][0] !== root) {
            let tup = G.shift();
    
            if (tup[1] === NodeState.V) {
                if (tup[0].isLeaf()) {
                    G.push([tup[0], NodeState.R, Math.min(tup[2], tup[0].getValue())]);
                } else {
                    if (tup[0].getType() === NodeType.MAX) {
                        for (let i = 0; i < tup[0].getChildren().length; i++) {
                            G.push([tup[0].getChild(i), NodeState.V, tup[2]]);
                        }
                    } else {
                        let leftmost = this.getLeftmostUndiscoveredSucc(tup[0]);
                        G.push([leftmost, NodeState.V, tup[2]]);
                    }
                }
            } else {
                if (tup[0].getType() === NodeType.MIN) {
                    G.push([tup[0].getParent(), NodeState.R, tup[2]]);
                    for (let t of G) {
                        if (t[0].getParent() === tup[0].getParent()) {
                            G.splice(G.indexOf(t), 1);
                        }
                    }
                } else {
                    let sibling = this.getUndiscoveredRightSibling(tup[0]);
                    if (sibling !== null) {
                        G.push([sibling, NodeState.V, tup[2]]);
                    } else {
                        G.push([tup[0].getParent(), NodeState.R, tup[2]]);
                    }
                }
            }
        }
    
        let resolvedTup = G.shift();
        return resolvedTup[2];
    } 
    
    
    /*
    Cette fonction parcourt les enfants du nœud donné et renvoie le premier enfant
    dont la valeur est Infinity. Si aucun enfant n'a cette valeur, elle renvoie null.
    Assurez-vous que votre classe Node possède la méthode getChildren 
    pour obtenir les enfants et la méthode getValue pour obtenir la valeur du nœud.
    */
    getLeftmostUndiscoveredSucc(node) {
        const children = node.getChildren();
    
        for (let i = 0; i < children.length; i++) {
            if (children[i].getValue() === Infinity) {
                return children[i];
            }
        }
    
        return null;
    }

    
    
    /*
Cette fonction recherche le parent du nœud donné, puis parcourt les enfants
 de ce parent. Lorsqu'il trouve le nœud donné, il active un drapeau indiquant qu'il
  est à droite de ce nœud. Ensuite, il continue à parcourir les enfants et renvoie
   le premier enfant dont la valeur est Infinity et qui se trouve à droite du nœud donné.
    Si aucun enfant ne correspond à ces critères, la fonction renvoie null. Assurez-vous 
    que votre classe Node possède la méthode getParent 
pour obtenir le parent et la méthode getChildren pour obtenir les enfants.
    */

    //getLeftmostUndiscoveredSucc(node: Node) -> Node | None    
    getUndiscoveredRightSibling(node) {
        const parent = node.getParent();
        let isAtRightOfNode = false;
    
        const children = parent.getChildren();
        for (let i = 0; i < children.length; i++) {
            if (children[i] === node) {
                isAtRightOfNode = true;
                continue;
            } else {
                if (children[i].getValue() === Infinity && isAtRightOfNode) {
                    return children[i];
                }
            }
        }
    
        return null;
    }
    
    
    
    
}
const NodeState = {
    V: 0,
    R: 1
};

export default Algho;