var catalogo = [
    { isbn: "120", titulo: "Harry Potter", autor: "J.K. Rowling", precio: 2000, disponible: true },
    { isbn: "250", titulo: "Percy Jackson", autor: "Rick Riordan", precio: 5000, disponible: false },
    { isbn: "300", titulo: "La vuelta al mundo en 80 dias", autor: "Julio Verne", precio: 4500, disponible: true },
    { isbn: "500", titulo: "Cien años de soledad", autor: "García Márquez", precio: 8500, disponible: true }
];
function buscarPorAutor(autor) {
    return catalogo.filter(function (libro) { return libro.autor.toLowerCase().includes(autor.toLowerCase()); });
}
function librosDisponibles() {
    return catalogo.filter(function (libro) { return libro.disponible; });
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    var total = libros.reduce(function (acc, libro) { return acc + libro.precio; }, 0);
    return total / libros.length;
}
function renderizar(libros) {
    var listaUI = document.getElementById("listado");
    var statsUI = document.getElementById("stats");
    listaUI.innerHTML = "";
    libros.forEach(function (libro) {
        var li = document.createElement("li");
        li.textContent = "".concat(libro.titulo, " - ").concat(libro.autor, " ($").concat(libro.precio, ") ").concat(libro.disponible ? "[Disponible]" : "[No hay stock]");
        listaUI.appendChild(li);
    });
    var promedio = precioPromedio(libros);
    statsUI.innerText = "Cantidad: ".concat(libros.length, " | Precio Promedio: $").concat(promedio.toFixed(2));
}
var input = document.getElementById("filtroAutor");
var btnFiltrar = document.getElementById("filtrar");
var btnDisponibles = document.getElementById("mostrarDisponibles");
var btnTodos = document.getElementById("mostrarTodos");
btnFiltrar.addEventListener("click", function () {
    renderizar(buscarPorAutor(input.value));
});
btnDisponibles.addEventListener("click", function () {
    renderizar(librosDisponibles());
});
btnTodos.addEventListener("click", function () {
    renderizar(catalogo);
});
renderizar(catalogo);
