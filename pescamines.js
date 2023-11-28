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

}

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
            fila.appendChild(columna);
        }
        tauler.appendChild(fila);
    }
}


function obreCasella(coordenada){
    let casella = document.getElementById(coordenada);

    if(casella.getAttribute("data-mina") === "true"){
        casella.innerHTML = "<img src='img/mina20px.jpg' alt='Mina'/>";
        alert("Has perdut!");
    } 

    if(casella.getAttribute("data-mina") === "false"){
        casella.setAttribute("data-mina", "");
        casella.setAttribute("onclick", "");
        comprovaVictoria();
        |
    }





}

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
    alert("Has guanyat!");
}







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

function esMina(xy){
    let casella = document.getElementById(xy);

    if(casella.getAttribute("data-mina") === 'false') {
        return false;
    }

    return true;
}

function setMinesAdjacents(xy, nMines){
    let casella = document.getElementById(xy);
    casella.setAttribute("data-num-mines", nMines);
}

function resetGame(){
    document.getElementById("taulell").innerHTML = "";
}

function comprova10i30(valor){
    if(valor < 10) {
        valor = 10;
    }

    if(valor > 30) {
        valor = 30;
    }

    return valor;
}