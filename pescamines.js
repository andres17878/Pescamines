// Cuando se presiona el botón de iniciar partida ocurre lo siguiente:
// Se resetea el tablero
// Se piden las filas y columnas
// Se crea el tablero
// Se ponen las minas
// Se calculan los números de minas adyacentes
// Se activa el clic derecho (para poner banderas)
function iniciarPartida(){
    resetGame();

    let files = comprova10i30(parseInt(prompt("Introdueix el nombre de files")));
    let columnes = comprova10i30(parseInt(prompt("Introdueix el nombre de columnes")));
    let taulell = document.getElementById("taulell");

    if(taulell.children.length === 0){
        crearTaulell(files, columnes);
    }

    setMines();

    calculaAdjacents();

    clicD();

}

// Al crear el tablero se crean las filas y las columnas
// Se crea una casilla por cada fila y columna
// Se le asigna un id a cada casilla
// Se le asigna un evento onclick a cada casilla
// Se le asigna un atributo data-mina a cada casilla
// Se le asigna un atributo class a cada casilla
// Se le asigna un atributo data-num-mines a cada casilla
function crearTaulell(files, columnes){
    let tauler = document.getElementById("taulell");

    for(let i = 0; i < files; i++){
        let fila = document.createElement("tr");
        for(let j = 0; j < columnes; j++){
            let columna = document.createElement("td");
            columna.innerHTML = "<img src='img/fons20px.jpg' alt='Casella'/>";
            let id = i + "-" + j;
            columna.setAttribute("id", id);
            columna.setAttribute("onclick", `obreCasella('${id}')`);
            columna.setAttribute("data-mina", "false");
            columna.setAttribute("class", "clicD");
            fila.appendChild(columna);
        }
        tauler.appendChild(fila);
    }
}

// Esta función desactiva el evento onclick de todas las casillas
function desactivaTaulell(){
    let files = document.getElementById("taulell").children.length;
    let columnes = document.getElementById("taulell").children[0].children.length;
    
    for(let i = 0; i < files; i++){
        for(let j = 0; j < columnes; j++){
            let id = i + "-" + j;
            let casella = document.getElementById(id);
            casella.setAttribute("onclick", "");
        }
    }
}

// Esta función abre las casillas que no tienen minas alrededor recursivamente pasandole el id de la casilla
function obreCasellesSenseMines(id){
    let files = document.getElementById("taulell").children.length;
    let columnes = document.getElementById("taulell").children[0].children.length;
    let fila = parseInt(id.split("-")[0]);
    let columna = parseInt(id.split("-")[1]);

    for(let i = fila - 1; i <= fila + 1; i++){
        for(let j = columna - 1; j <= columna + 1; j++){
            if(i >= 0 && i < files && j >= 0 && j < columnes){
                let idAdjacent = i + "-" + j;
                let casella = document.getElementById(idAdjacent);
                if(casella.getAttribute("data-mina") === "false" && casella.getAttribute("data-num-mines") === "0"){
                    casella.setAttribute("data-mina", "");
                    casella.setAttribute("onclick", "");
                    casella.innerHTML = "<style.backgroundImage = 'none'></style>";
                    obreCasellesSenseMines(idAdjacent);
                }
                if(casella.getAttribute("data-mina") === "false" && casella.getAttribute("data-num-mines") != "0"){
                    casella.setAttribute("data-mina", "");
                    casella.setAttribute("onclick", "");
                    casella.innerHTML = "<style.backgroundImage = 'none'></style>";
                    let numMines = casella.getAttribute("data-num-mines");
                    casella.innerHTML = numMines;
                }
            }
        }
    }
}


// Esta función muestra todas las minas cuando se pierde la partida
function mostraTotesLesMines(){
    let files = document.getElementById("taulell").children.length;
    let columnes = document.getElementById("taulell").children[0].children.length;
    
    for(let i = 0; i < files; i++){
        for(let j = 0; j < columnes; j++){
            let id = i + "-" + j;
            let casella = document.getElementById(id);
            if(casella.getAttribute("data-mina") === "true"){
                casella.innerHTML = "<img src='img/mina20px.jpg' alt='Mina'/>";
            } 
        }
    }
}


// Esta función abre la casilla clicada, si es una mina se pierde la partida
// Si no es una mina se abre la casilla y se comprueba si se ha ganado la partida
function obreCasella(coordenada){
    let casella = document.getElementById(coordenada);

    if(casella.getAttribute("data-mina") === "true"){
        casella.innerHTML = "<img src='img/mina20px.jpg' alt='Mina'/>";
        mostraTotesLesMines();
        desactivaTaulell();
        setTimeout(function(){ alert("Has perdut!"); }, 500);
    } 

    if(casella.getAttribute("data-mina") === "false"){
        if(casella.getAttribute("data-num-mines") === "0"){
            obreCasellesSenseMines(coordenada);
        }
        casella.setAttribute("data-mina", "");
        casella.setAttribute("onclick", "");
        casella.innerHTML = "<style.backgroundImage = 'none'></style>";
        let numMines = casella.getAttribute("data-num-mines");
        if(numMines != 0){
            casella.innerHTML = numMines;
        }
        comprovaVictoria();
    }
}

// Esta función comprueba si se ha ganado la partida, funciona de la siguiente manera:
// Se recorren todas las casillas del tablero
// Si una casilla no es una mina se sale de la función
// Si se recorren todas las casillas y no se ha encontrado alguna casilla que no sea una mina se ha ganado la partida
// Además se desactiva el tablero y se muestra un mensaje de victoria en caso de ganar
function comprovaVictoria(){
    let files = document.getElementById("taulell").children.length;
    let columnes = document.getElementById("taulell").children[0].children.length;
    
    for(let i = 0; i < files; i++){
        for(let j = 0; j < columnes; j++){
            let id = i + "-" + j;
            let casella = document.getElementById(id);
            if(casella.getAttribute("data-mina") === "false"){
                return;
            } 
        }
    }
    desactivaTaulell();
    alert("Has guanyat!");
}


// Esta función pone las minas en el tablero
// Se calcula el número de minas que se van a poner en función del tamaño del tablero
// Se calcula una posición aleatoria para cada mina
// Se le asigna un atributo data-mina a cada casilla que tenga una mina
function setMines(){
    let files = document.getElementById("taulell").children.length;
    let columnes = document.getElementById("taulell").children[0].children.length;
    let mines = Math.floor((files * columnes) / 5.88);

    for(let i = 0; i < mines; i++){
        let fila = Math.floor(Math.random() * files);
        let columna = Math.floor(Math.random() * columnes);

        let casella = document.getElementById(fila + "-" + columna);
        casella.setAttribute("data-mina", "true");
    }
}


// Esta función calcula el número de minas adyacentes a cada casilla
// Se recorren todas las casillas del tablero
// Si una casilla no es una mina se calcula el número de minas adyacentes
// Se le asigna un atributo data-num-mines a cada casilla que no sea una mina
function calculaAdjacents(){
    let files = document.getElementById("taulell").children.length;
    let columnes = document.getElementById("taulell").children[0].children.length;

    for(let i = 0; i < files; i++){
        for(let j = 0; j < columnes; j++){
            let id = i + "-" + j;
            if(!esMina(id)){
                let adjacents = 0;
                for(let k = i - 1; k <= i + 1; k++){
                    for(let l = j - 1; l <= j + 1; l++){
                        if(k >= 0 && k < files && l >= 0 && l < columnes){
                            let idAdjacent = k + "-" + l;
                            if(esMina(idAdjacent)){
                                adjacents++;
                            }
                        }
                    }
                }
                setMinesAdjacents(id, adjacents);
            }
        }
    }
}


// Esta función comprueba si una casilla es una mina
function esMina(xy){
    let casella = document.getElementById(xy);

    if(casella.getAttribute("data-mina") === 'false') {
        return false;
    }

    return true;
}

// Esta función asigna el número de minas adyacentes a una casilla
function setMinesAdjacents(xy, nMines){
    let casella = document.getElementById(xy);
    casella.setAttribute("data-num-mines", nMines);
}

// Esta función resetea el tablero
function resetGame(){
    document.getElementById("taulell").innerHTML = "";
}


// Esta función comprueba que el valor introducido esté entre 10 y 30 y si no lo está lo pone a 10 o 30
function comprova10i30(valor){
    if(valor < 10) {
        valor = 10;
    }

    if(valor > 30) {
        valor = 30;
    }

    return valor;
}


// Esta función es para poner banderas
// Se activa con el botón derecho del ratón
// Además se desactiva el menú contextual
// Cuando se hace clic derecho encima de una casilla se pone una bandera, si ya hay una bandera se quita
function clicD(){
    let caselles = document.querySelectorAll(".clicD");

    caselles.forEach(casella => {
        casella.addEventListener("contextmenu", function(e){
            e.preventDefault();
            if(casella.getAttribute("class") === "clicD" && casella.getAttribute("onclick") != ""){
                casella.setAttribute("class", "clicD2");
                casella.innerHTML = "<img src='img/badera20px.jpg' alt='Bandera'/>";
            } else if(casella.getAttribute("class") === "clicD2" && casella.getAttribute("onclick") != ""){
                casella.setAttribute("class", "clicD");
                casella.innerHTML = "<img src='img/fons20px.jpg' alt='Casella'/>";
            }
        });
    });
}