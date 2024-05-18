

var r = 20;
var w = r*2*(Math.sqrt(3)/2);
var ctx;
var sel = [-1, -1];
var board = new Array(14);
var hist = [];
var player = 0;
var multiplayer = false;
var active = true;

function drawHexagon(c, x, y, r, colorClass) {
    c.beginPath();
    c.moveTo(x, y - r);
    for (var i = 0; i < 6; i++)
        c.lineTo(x + r * Math.cos(Math.PI * (1.5 + 1 / 3 * i)), y + r * Math.sin(Math.PI * (1.5 + 1 / 3 * i)));
    c.closePath();
    c.stroke();
    c.fillStyle = colorClass; // Utilisation de la classe de couleur fournie
    c.fill();
}


function drawPath(c, p)
{
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo((p[0][0]+p[0][1])*w - (p[0][1]-4)*(w/2), (p[0][1]+2)*1.5*r);
    for(var i=1; i<p.length; i++)
        c.lineTo((p[i][0]+p[i][1])*w - (p[i][1]-4)*(w/2), (p[i][1]+2)*1.5*r);
    c.stroke();
}

function getSel(e) {
    var rect = ctx.canvas.getBoundingClientRect(); // Obtenir les coordonnées du rectangle du canvas
    var mouseX = e.clientX - rect.left; // Coordonnée X de la souris par rapport au canvas
    var mouseY = e.clientY - rect.top; // Coordonnée Y de la souris par rapport au canvas
    
    // Utilisation de mouseX et mouseY pour obtenir la couleur de la case sous la souris
    var color = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    color[0] -= color[2] == 38 || color[2] == 178 ? 241 : 0;
    color[1] -= color[2] == 178 ? 220 : (color[2] == 38 ? 0 : 140);
    
    // Vérifier si la couleur est dans la plage attendue pour une case sélectionnable
    if (color[0] >= 0 && color[0] <= 13 && color[1] >= 0 && color[1] <= 13 && (color[2] == 38 || color[2] == 171 || color[2] == 178))
        sel = [color[0], color[1]];
    else
        sel = [-1, -1];
}






function mouseDown(e)
{
    getSel(e);
    if(active)
    {
        if(sel[0] != -1  &&  sel[1] != -1)
        {
            hist.push([sel[0],sel[1],player]);
            board[sel[0]][sel[1]] = player;
            if(multiplayer)
                player = player==0 ? 1 : 0;
            else
                aiMove();
            draw();
            var p0 = checkWin(0), p1 = checkWin(1);
            if(p0 != false)
                { drawPath(ctx, p0); alert((multiplayer?"The red player":"You") + " won!"); }
            else if(p1 != false)
                { drawPath(ctx, p1); alert((multiplayer?"The blue player":"The computer") + " won!"); }
        }
    }
}

function mouseMove(e)
{
    getSel(e);
    if(active)
        draw();
}

function draw()
{
    ctx.clearRect(0, 0, 850, 600);
    ctx.lineWidth = 1;

    ctx.fillStyle = "rgb(0,154,172)";
    ctx.beginPath();
    ctx.moveTo(w*15.65, r);
    ctx.lineTo(w*23.5, 24.5*r);
    ctx.lineTo(0, r);
    ctx.lineTo(w*7.85, 24.5*r);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgb(255,0,39)";
    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.lineTo(w*15.65, r);
    ctx.lineTo(w*7.85, 24.5*r);
    ctx.lineTo(w*23.5, 24.5*r);
    ctx.closePath();
    ctx.fill();

    var num = 0;
    ctx.strokeStyle = "white";
    for(var y=0; y<14; y++)
    {
        for(var x=0; x<14; x++)
        {
            if(board[x][y] == 0)
                ctx.fillStyle = "rgb(255,0,39)";
            else if(board[x][y] == 1)
                ctx.fillStyle = "rgb(0,154,172)";
            else if(x == sel[0]  &&  y == sel[1])
                ctx.fillStyle = "rgb(" + (x+(player==0?241:0)) + "," + (y+(player==0?0:140)) + "," + (player==0?38:171) + ")";
            else
                ctx.fillStyle = "rgb(" + (x+241) + "," + (y+220) + ",178)";
            drawHexagon(ctx, (x+y)*w - (y-4)*(w/2), (y+2)*1.5*r, r);
            num++;
        }
    }
}

function chgMP()
{
    multiplayer = !multiplayer;
    player = 0;
    init();
}

function undo()
{
    if(active)
    {
        var a;
        if(hist.length > 0)
        {
            a = hist[hist.length-1];
            board[a[0]][a[1]] = -1;
            hist.pop();
        }
        if(!multiplayer)
        {
            a = hist[hist.length-1];
            board[a[0]][a[1]] = -1;
            hist.pop();
        }
        player = a[2];
        draw();
    }
}

function init()
{
    for(var i=0; i<14; i++)
    {
        board[i] = new Array(14);
        for(var j=0; j<14; j++)
            board[i][j] = -1;
    }
    hist.length = 0;
    active = true;
    draw();
}

function load()
{
    var canvas = document.getElementById("output");
    ctx = canvas.getContext("2d");
    document.getElementById("mp").checked = false;
    canvas.onmousedown = mouseDown;
    canvas.onmousemove = mouseMove;
    init();
}


// Fonction pour trouver l'index d'un tableau dans un tableau de tableaux
function findArr(a, b) {
    for (var i = 0; i < a.length; i++)
        if (JSON.stringify(a[i]) == JSON.stringify(b)) // Compare les tableaux en format JSON
            return i;
    return -1; // Retourne -1 si le tableau n'est pas trouvé
}

// Fonction pour obtenir les connexions d'une cellule
function getConnections(x, y, c, open, closed) {
    // Liste des déplacements possibles à partir de la cellule (x, y)
    var a = [-1, 0, 1, 0, 0, -1, 0, 1, 1, -1, -1, 1];
    var ret = []; // Liste des connexions valides
    for (var i = 0; i < 6; i++)
        // Vérifie si les coordonnées de la cellule adjacente sont valides et si elle est de la même couleur
        if (x + a[i * 2] >= 0 && x + a[i * 2] < 14 && y + a[i * 2 + 1] >= 0 && y + a[i * 2 + 1] < 14)
            if (board[x + a[i * 2]][y + a[i * 2 + 1]] == c && findArr(open, [x + a[i * 2], y + a[i * 2 + 1]]) == -1 && findArr(closed, [x + a[i * 2], y + a[i * 2 + 1]]) == -1)
                ret.push([x + a[i * 2], y + a[i * 2 + 1]]); // Ajoute la cellule à la liste des connexions
    return ret; // Retourne la liste des connexions
}

// Fonction pour vérifier si un joueur a gagné
function checkWin(c) {
    var open = [], openPrev = [], closed = [], closedPrev = []; // Listes pour la recherche de chemin
    for (var a = 0; a < 14; a++) {
        if (board[c == 0 ? a : 0][c == 0 ? 0 : a] == c) {
            open.length = openPrev.length = closed.length = closedPrev.length = 0; // Initialise les listes
            var pathFound = false; // Indique si un chemin a été trouvé
            open.push([c == 0 ? a : 0, c == 0 ? 0 : a]); // Ajoute la cellule de départ à la liste ouverte
            openPrev.push(-1);
            // Boucle jusqu'à ce que toutes les cellules adjacentes aient été explorées ou qu'un chemin soit trouvé
            while (open.length > 0) {
                var u = open[0]; // Récupère la première cellule de la liste ouverte
                open.splice(0, 1); // Supprime la première cellule de la liste ouverte
                var uI = openPrev.splice(0, 1);
                closed.push(u); // Ajoute la cellule à la liste fermée
                closedPrev.push(uI);
                // Si la cellule est à l'extrémité droite du plateau, un chemin est trouvé
                if (u[c == 0 ? 1 : 0] == 13) {
                    pathFound = true;
                    break;
                }
                // Obtient les connexions de la cellule actuelle
                var connections = getConnections(u[0], u[1], c, open, closed);
                for (var i = 0; i < connections.length; i++) {
                    open.push(connections[i]); // Ajoute les connexions à la liste ouverte
                    openPrev.push(closed.length - 1); // Garde une trace de l'index précédent
                }
            }
            // Si un chemin est trouvé, construit le chemin et met à jour le statut du jeu
            if (pathFound) {
                var path = []; // Chemin gagnant
                var u = closed.length - 1;
                while (closedPrev[u] != -1) {
                    path.push(closed[u]); // Ajoute la cellule au chemin
                    u = closedPrev[u]; // Passe à la cellule précédente
                }
                path.push([c == 0 ? a : 0, c == 0 ? 0 : a]); // Ajoute la cellule de départ
                path.reverse(); // Inverse le chemin pour l'affichage
                active = false; // Désactive le jeu
                return path; // Retourne le chemin gagnant
            }
        }
    }
    return false; // Retourne faux si aucun chemin n'est trouvé
}



// ce code c'est avec la classe board
/*
var r = 20;
var w = r * 2 * (Math.sqrt(3) / 2);
var ctx;
var sel = [-1, -1];
let board =  new Board(14); // Utilisation de la classe Board
var hist = [];
var player = 0;
var multiplayer = false;
var active = true;

function drawHexagon(c, x, y, r, colorClass) {
    c.beginPath();
    c.moveTo(x, y - r);
    for (var i = 0; i < 6; i++)
        c.lineTo(x + r * Math.cos(Math.PI * (1.5 + 1 / 3 * i)), y + r * Math.sin(Math.PI * (1.5 + 1 / 3 * i)));
    c.closePath();
    c.stroke();
    c.fillStyle = colorClass; // Utilisation de la classe de couleur fournie
    c.fill();
}

function drawPath(c, p) {
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo((p[0][0] + p[0][1]) * w - (p[0][1] - 4) * (w / 2), (p[0][1] + 2) * 1.5 * r);
    for (var i = 1; i < p.length; i++)
        c.lineTo((p[i][0] + p[i][1]) * w - (p[i][1] - 4) * (w / 2), (p[i][1] + 2) * 1.5 * r);
    c.stroke();
}

function getSel(e) {
    var rect = ctx.canvas.getBoundingClientRect(); // Obtenir les coordonnées du rectangle du canvas
    var mouseX = e.clientX - rect.left; // Coordonnée X de la souris par rapport au canvas
    var mouseY = e.clientY - rect.top; // Coordonnée Y de la souris par rapport au canvas

    // Utilisation de mouseX et mouseY pour obtenir la couleur de la case sous la souris
    var color = ctx.getImageData(mouseX, mouseY, 1, 1).data;
    color[0] -= color[2] == 38 || color[2] == 178 ? 241 : 0;
    color[1] -= color[2] == 178 ? 220 : (color[2] == 38 ? 0 : 140);

    // Vérifier si la couleur est dans la plage attendue pour une case sélectionnable
    if (color[0] >= 0 && color[0] <= 13 && color[1] >= 0 && color[1] <= 13 && (color[2] == 38 || color[2] == 171 || color[2] == 178))
        sel = [color[0], color[1]];
    else
        sel = [-1, -1];
}

function mouseDown(e) {
    getSel(e);
    if (active) {
        if (sel[0] != -1 && sel[1] != -1) {
            hist.push([sel[0], sel[1], player]);
            board.makeMove(sel[0], sel[1], player);
            if (multiplayer)
                player = player == 0 ? 1 : 0;
            else
                aiMove(board);
            draw();
            var p0 = board.isWin(0), p1 = board.isWin(1);
            if (p0)
                { drawPath(ctx, p0); alert((multiplayer ? "The red player" : "You") + " won!"); }
            else if (p1)
                { drawPath(ctx, p1); alert((multiplayer ? "The blue player" : "The computer") + " won!"); }
        }
    }
}

function mouseMove(e) {
    getSel(e);
    if (active)
        draw();
}

function draw() {
    ctx.clearRect(0, 0, 850, 600);
    ctx.lineWidth = 1;

    ctx.fillStyle = "rgb(0,154,172)";
    ctx.beginPath();
    ctx.moveTo(w * 15.65, r);
    ctx.lineTo(w * 23.5, 24.5 * r);
    ctx.lineTo(0, r);
    ctx.lineTo(w * 7.85, 24.5 * r);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgb(255,0,39)";
    ctx.beginPath();
    ctx.moveTo(0, r);
    ctx.lineTo(w * 15.65, r);
    ctx.lineTo(w * 7.85, 24.5 * r);
    ctx.lineTo(w * 23.5, 24.5 * r);
    ctx.closePath();
    ctx.fill();

    var num = 0;
    ctx.strokeStyle = "white";
    for (var y = 0; y < 14; y++) {
        for (var x = 0; x < 14; x++) {
            if (board.getBoard()[x][y] == 0)
                ctx.fillStyle = "rgb(255,0,39)";
            else if (board.getBoard()[x][y] == 1)
                ctx.fillStyle = "rgb(0,154,172)";
            else if (x == sel[0] && y == sel[1])
                ctx.fillStyle = "rgb(" + (x + (player == 0 ? 241 : 0)) + "," + (y + (player == 0 ? 0 : 140)) + "," + (player == 0 ? 38 : 171) + ")";
            else
                ctx.fillStyle  = "rgb(" + (x + 241) + "," + (y + 220) + ",178)";
                drawHexagon(ctx, (x + y) * w - (y - 4) * (w / 2), (y + 2) * 1.5 * r, r);
                num++;
            }
        }
    }
    
    function chgMP() {
        multiplayer = !multiplayer;
        player = 0;
        init();
    }
    
    function undo() {
        if (active) {
            var a;
            if (hist.length > 0) {
                a = hist[hist.length - 1];
                board.makeMove(a[0], a[1], -1);
                hist.pop();
            }
            if (!multiplayer) {
                a = hist[hist.length - 1];
                board.makeMove(a[0], a[1], -1);
                hist.pop();
            }
            player = a[2];
            draw();
        }
    }
    
    function init() {
        board = new Board(14); // Création de l'instance de la classe Board
        hist.length = 0;
        active = true;
        draw();
    }
    
    function load() {
        var canvas = document.getElementById("output");
        ctx = canvas.getContext("2d");
        document.getElementById("mp").checked = false;
        canvas.onmousedown = mouseDown;
        canvas.onmousemove = mouseMove;
        init();
    }
    
    // Fonction pour trouver l'index d'un tableau dans un tableau de tableaux
    function findArr(a, b) {
        for (var i = 0; i < a.length; i++)
            if (JSON.stringify(a[i]) == JSON.stringify(b)) // Compare les tableaux en format JSON
                return i;
        return -1; // Retourne -1 si le tableau n'est pas trouvé
    }
    
    // Fonction pour obtenir les connexions d'une cellule
    function getConnections(x, y, c, open, closed) {
        // Liste des déplacements possibles à partir de la cellule (x, y)
        var a = [-1, 0, 1, 0, 0, -1, 0, 1, 1, -1, -1, 1];
        var ret = []; // Liste des connexions valides
        for (var i = 0; i < 6; i++)
            // Vérifie si les coordonnées de la cellule adjacente sont valides et si elle est de la même couleur
            if (x + a[i * 2] >= 0 && x + a[i * 2] < 14 && y + a[i * 2 + 1] >= 0 && y + a[i * 2 + 1] < 14)
                if (board.getBoard()[x + a[i * 2]][y + a[i * 2 + 1]] == c && findArr(open, [x + a[i * 2], y + a[i * 2 + 1]]) == -1 && findArr(closed, [x + a[i * 2], y + a[i * 2 + 1]]) == -1)
                    ret.push([x + a[i * 2], y + a[i * 2 + 1]]); // Ajoute la cellule à la liste des connexions
        return ret; // Retourne la liste des connexions
    }
    
    // Fonction pour vérifier si un joueur a gagné
    function checkWin(c) {
        var open = [], openPrev = [], closed = [], closedPrev = []; // Listes pour la recherche de chemin
        for (var a = 0; a < 14; a++) {
            if (board.getBoard()[c == 0 ? a : 0][c == 0 ? 0 : a] == c) {
                open.length = openPrev.length = closed.length = closedPrev.length = 0; // Initialise les listes
                var pathFound = false; // Indique si un chemin a été trouvé
                open.push([c == 0 ? a : 0, c == 0 ? 0 : a]); // Ajoute la cellule de départ à la liste ouverte
                openPrev.push(-1);
                // Boucle jusqu'à ce que toutes les cellules adjacentes aient été explorées ou qu'un chemin soit trouvé
                while (open.length > 0) {
                    var u = open[0]; // Récupère la première cellule de la liste ouverte
                    open.splice(0, 1); // Supprime la première cellule de la liste ouverte
                    var uI = openPrev.splice(0, 1);
                    closed.push(u); // Ajoute la cellule à la liste fermée
                    closedPrev.push(uI);
                    // Si la cellule est à l'extrémité droite du plateau, un chemin est trouvé
                    if (u[c == 0 ? 1 : 0] == 13) {
                        pathFound = true;
                        break;
                    }
                    // Obtient les connexions de la cellule actuelle
                    var connections = getConnections(u[0], u[1], c, open, closed);
                    for (var i = 0; i < connections.length; i++) {
                        open.push(connections[i]); // Ajoute les connexions à la liste ouverte
                        openPrev.push(closed.length - 1); // Garde une trace de l'index précédent
                    }
                }
                // Si un chemin est trouvé, construit le chemin et met à jour le statut du jeu
                if (pathFound) {
                    var path = []; // Chemin gagnant
                    var u = closed.length - 1;
                    while (closedPrev[u] != -1) {
                        path.push(closed[u]); // Ajoute la cellule au chemin
                        u = closedPrev[u]; // Passe à la cellule précédente
                    }
                    path.push([c == 0 ? a : 0, c == 0 ? 0 : a]); // Ajoute la cellule de départ
                    path.reverse(); // Inverse le chemin pour l'affichage
                    active = false; // Désactive le jeu
                    return path; // Retourne le chemin gagnant
                }
            }
        }
        return false; // Retourne faux si aucun chemin n'est trouvé
    }
    
*/