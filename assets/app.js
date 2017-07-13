/*
 * Pedimos un json por medio de una promesa, siempre se pone
 * return new Promise
 */
var getJSON = function(url){
    return new Promise(function(resolve,reject){
        var ajax = new XMLHttpRequest();
        ajax.open("GET",url)
        ajax.send();
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4){
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
.then(function(mensaje){return getJSON(mensaje.results[0])}) 
.then(function(resultados){console.log(resultados)})