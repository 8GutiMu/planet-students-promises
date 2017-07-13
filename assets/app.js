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

/*
 * Obtener el Json es nuestra primera opción
 * Para obtener la ruta la debemos dar de alta en express (express.static)
 */
getJSON("data/earth-like-results.json")
    .then(function (mensaje) {
        var results = mensaje.results;
    console.log(results)
        return results;
    })
    .then(function (resultados) {
        resultados.forEach(function (resultado) {
            getJSON(resultado)
                .then(function (resultado) {
                    console.log(resultado)
                    renderTarjeta(resultado)
                })
        })
    })


var renderTarjeta = function (item) {
    var row = crearUnElemento("div", {
        className: "row ",
        innerText: "",
        src: ""
    })
    var col = crearUnElemento("div", {
        className: "col s12 m9",
        innerText: "",
        src: ""
    })
    var card = crearUnElemento("div", {
        className: "card blue-grey darken-1",
        innerText:"",
        src: ""
    })
    var cardContent = crearUnElemento("div", {
        className: "card-content white-text",
        innerText: "",
        src: ""
    })
    var img = crearUnElemento("img", {
        className: "",
        innerText: "",
        src: "https://dummyimage.com/200x100/fff/000"
    })
    var titulo = crearUnElemento("span", {
        className: "card-title",
        innerText: item.pl_name,
        src: ""
    })
    var especificaciones = crearUnElemento("p", {
        className: "",
        innerText: "Densidad:" + item.pl_dens +"   Telescopio:"+ item.pl_telescope,
        src: ""
    })
    
    var container = document.getElementById("container");
    container.className = "container center-align";
    
    container.append(row)
    row.appendChild(col)
    col.appendChild(card)
    card.appendChild(cardContent)
    cardContent.appendChild(img)
    cardContent.appendChild(titulo)
    cardContent.appendChild(especificaciones)
  
}

/*
 * Funcion que crea un elemento y hace un perqueño objeto con las propiedadess
 *
 */
var crearUnElemento = function (elementoACrear, propiedades) {
    var elemento = document.createElement(elementoACrear);
    elemento.className = propiedades.className;
    elemento.innerText = propiedades.innerText;
    elemento.src = propiedades.src;

    return elemento;
}
