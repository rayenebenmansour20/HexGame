class Board {
    constructor(size) {
        this.size = size;
        this.board = this.createEmptyBoard(size);
        this.hist = [];
        this.active = true;
    }

    createEmptyBoard(size) {
        let board = new Array(size);
        for (let i = 0; i < size; i++) {
            board[i] = new Array(size).fill(-1);
        }
        return board;
    }

    makeMove(x, y, player) {
        if (this.isValidMove(x, y)) {
            this.board[x][y] = player;
            this.hist.push([x, y, player]);
            return true;
        }
        return false;
    }

    isValidMove(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size && this.board[x][y] === -1;
    }

    undo() {
        if (this.hist.length > 0) {
            const [x, y, _] = this.hist.pop();
            this.board[x][y] = -1;
            return [x, y];
        }
        return null;
    }

    isWin(player) {
        const visited = new Set();
        const stack = [];
        const endRow = player === 0 ? this.size - 1 : 0;
    
        // Helper function for DFS
        const dfs = (x, y) => {
            if (x < 0 || x >= this.size || y < 0 || y >= this.size || this.board[x][y] !== player || visited.has(`${x},${y}`)) {
                return false;
            }
            if (player === 0 && x === endRow) {
                return true;
            }
            if (player === 1 && y === endRow) {
                return true;
            }
            visited.add(`${x},${y}`);
            return (
                dfs(x - 1, y) ||
                dfs(x + 1, y) ||
                dfs(x, y - 1) ||
                dfs(x, y + 1) ||
                dfs(x - 1, y + 1) ||
                dfs(x + 1, y - 1)
            );
        };
    
        // Start DFS from the appropriate edge
        for (let i = 0; i < this.size; i++) {
            if (player === 0) {
                if (dfs(i, 0)) {
                    return true;
                }
            } else {
                if (dfs(0, i)) {
                    return true;
                }
            }
        }
    
        return false;
    }

    getBoard() {
        return this.board;
    }
}
