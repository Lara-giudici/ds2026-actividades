function generarAsteriscos(filas) {
    var arbol = "";
    for (var i = 1; i <= filas; i++) {
        var linea = "";
        for (var j = 0; j < i; j++) {
            linea += "*";
        }
        arbol += linea + "\n";
    }
    return arbol;
}
var inputFilas = document.getElementById("inputFilas");
var generar = document.getElementById("botonGenerar");
var resultado = document.getElementById("resultado");
generar.addEventListener("click", function () {
    var cantidad = parseInt(inputFilas.value);
    if (!isNaN(cantidad) && cantidad > 0) {
        resultado.innerText = generarAsteriscos(cantidad);
    }
    else {
        resultado.innerText = "Por favor, ingrese un número válido.";
    }
});
