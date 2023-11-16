function iniciarPartida(){
    let files = comprova10i30(parseInt(prompt("Introdueix el nombre de files")));
    let columnes = comprova10i30(parseInt(prompt("Introdueix el nombre de columnes")));

    crearTaulell(files, columnes);

}

function crearTaulell(files, columnes){
    let tauler = document.getElementById("taulell");

    for(let i = 0; i < files; i++){
        let fila = document.createElement("tr");
        for(let j = 0; j < columnes; j++){
            let columna = document.createElement("td");
            columna.innerHTML = "<img src='img/fons20px.jpg' alt='Casella'/>";
            columna.setAttribute("id", i + "-" + j);
            columna.setAttribute("onclick", "prova()");
            fila.appendChild(columna);
        }
        tauler.appendChild(fila);
    }
}

function prova(){
    console.log("hola");
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