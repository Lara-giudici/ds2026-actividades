var _a;
var catalogo = [
    { isbn: "300", titulo: "La vuelta al mundo en 80 dias", autor: "Julio Verne", precio: 4500, disponible: true },
    { isbn: "250", titulo: "Percy Jackson", autor: "Rick Riordan", precio: 5000, disponible: false }
];
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function eliminarLibro(isbn) {
    catalogo = catalogo.filter(function (l) { return l.isbn !== isbn; });
    renderizar(catalogo);
}
function validarFormulario() {
    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var precio = parseFloat(document.getElementById("precio").value);
    var disponible = document.getElementById("disponible").checked;
    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        return null;
    }
    return {
        isbn: "AUTO-" + Date.now(),
        titulo: titulo,
        autor: autor,
        precio: precio,
        disponible: disponible
    };
}
function renderizar(libros) {
    var listaUI = document.getElementById("lista");
    if (!listaUI) {
        console.log("No se encontró el elemento lista");
        return;
    }
    listaUI.innerHTML = "";
    libros.forEach(function (l) {
        var li = document.createElement("li");
        li.innerHTML = "".concat(l.titulo, " (").concat(l.autor, ") - $").concat(l.precio, " ");
        var btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = function () { return eliminarLibro(l.isbn); };
        li.appendChild(btnEliminar);
        listaUI.appendChild(li);
    });
}
(_a = document.getElementById("btnAgregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var errorDiv = document.getElementById("errorForm");
    var nuevoLibro = validarFormulario();
    if (nuevoLibro) {
        agregarLibro(nuevoLibro);
        errorDiv.innerText = "";
        document.getElementById("titulo").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("precio").value = "";
    }
    else {
        errorDiv.innerText = "Error: Todos los campos son obligatorios y el precio debe ser mayor a 0.";
    }
});
renderizar(catalogo);
