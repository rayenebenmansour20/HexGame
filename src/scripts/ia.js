function aiMove() {
    var bestScore = -Infinity;
    var move;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            if (board[i][j] == -1) {
                board[i][j] = 1; // Assume le mouvement
                var score = evaluateMove(i, j);
                board[i][j] = -1; // Annule le mouvement
                if (score > bestScore) {
                    bestScore = score;
                    move = [i, j];
                }
            }
        }
    }
    hist.push([move[0], move[1], 1]);
    board[move[0]][move[1]] = 1;
}

function evaluateMove(x, y) {
    // Évalue la qualité d'un mouvement en fonction de sa proximité avec les pièces existantes
    var score = 0;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            if (board[i][j] == 0) {
                var distance = Math.abs(x - i) + Math.abs(y - j);
                score -= distance; // Plus la distance est courte, meilleure est la position
            } else if (board[i][j] == 1) {
                var distance = Math.abs(x - i) + Math.abs(y - j);
                score += distance; // Plus la distance est courte, meilleure est la position
            }
        }
    }
    return score;
}




// ce code avec la classe board
/*
function aiMove() {
    var bestScore = -Infinity;
    var move;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            if (board[i][j] == -1) {
                board[i][j] = 1; // Assume le mouvement
                var score = evaluateMove(i, j);
                board[i][j] = -1; // Annule le mouvement
                if (score > bestScore) {
                    bestScore = score;
                    move = [i, j];
                }
            }
        }
    }
    hist.push([move[0], move[1], 1]);
    board[move[0]][move[1]] = 1;
}

function evaluateMove(x, y) {
    // Évalue la qualité d'un mouvement en fonction de sa proximité avec les pièces existantes
    var score = 0;
    for (var i = 0; i < 14; i++) {
        for (var j = 0; j < 14; j++) {
            if (board[i][j] == 0) {
                var distance = Math.abs(x - i) + Math.abs(y - j);
                score -= distance; // Plus la distance est courte, meilleure est la position
            } else if (board[i][j] == 1) {
                var distance = Math.abs(x - i) + Math.abs(y - j);
                score += distance; // Plus la distance est courte, meilleure est la position
            }
        }
    }
    return score;
}


*/