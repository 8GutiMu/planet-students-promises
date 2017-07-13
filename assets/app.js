/*
 * Pedimos un json por medio de una promesa, siempre se pone
 * return new Promise
 */
var getJSON = function (url) {
    return new Promise(function (resolve, reject) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", url) /*Ajax es una instancia de XMLHttpRequest*/
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4) {
                var response = JSON.parse(ajax.responseText)
                resolve(response)
            }
        }
    })
}


var plantilla = '<div class="row">' +
    '<div class="col s12 m6">' +
    '<div class="card blue-grey darken-1">' +
    ' <div class="card-content white-text">' +
    ' <img src="https://dummyimage.com/200x100/fff/000" alt="">' +
    '<span class="card-title">__planeta__</span>' +
    ' <p>__especificaciones__</p>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';

function mostrarTarjeta(nombre) {
    
    var nuevaPlantilla="";
    nuevaPlantilla += plantilla.replace("__planeta__", nombre.pl_name);
    
    
    var container = document.getElementById("container");
    console.log(nuevaPlantilla,container)
    container.innerHTML(nuevaPlantilla);
}
/*
 * Obtener el Json es nuestra primera opción
 * Para obtener la ruta la debemos dar de alta en express (express.static)
 */
getJSON("data/earth-like-results.json")
    .then(function (mensaje) {
        var results = mensaje.results;
        return results;
    })
    .then(function (resultados) {
        resultados.forEach(function (resultado) {
            getJSON(resultado)
                .then(function(resultado){
                console.log(resultado)
                mostrarTarjeta(resultado)
            })
        })
    })

function perrito(item){
        var container = document.getElementById("container");

    var div = document.createElement("div")
    div.innerText = item.dec
    container.appendChild(div);
}


