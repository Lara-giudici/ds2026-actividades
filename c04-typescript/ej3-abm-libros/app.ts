interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
}

let catalogo: Libro[] = [
    { isbn: "300", titulo: "La vuelta al mundo en 80 dias", autor: "Julio Verne", precio: 4500, disponible: true },
    { isbn: "250", titulo: "Percy Jackson", autor: "Rick Riordan", precio: 5000, disponible: false }
];

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function eliminarLibro(isbn: string): void {
    catalogo = catalogo.filter(l => l.isbn !== isbn);
    renderizar(catalogo);
}


function validarFormulario(): Libro | null {
    const titulo = (document.getElementById("titulo") as HTMLInputElement).value;
    const autor = (document.getElementById("autor") as HTMLInputElement).value;
    const precio = parseFloat((document.getElementById("precio") as HTMLInputElement).value);
    const disponible = (document.getElementById("disponible") as HTMLInputElement).checked;

    if (!titulo || !autor || isNaN(precio) || precio <= 0) {
        return null;
    }

    return {
        isbn: "AUTO-" + Date.now(), // ISBN Random sugerido
        titulo,
        autor,
        precio,
        disponible
    };
}

function renderizar(libros: Libro[]): void {
    const listaUI = document.getElementById("lista");

    if (!listaUI) {
        console.log("No se encontró el elemento lista");
        return;
    }

    listaUI.innerHTML = "";

    libros.forEach(l => {
        const li = document.createElement("li");
        li.innerHTML = `${l.titulo} (${l.autor}) - $${l.precio} `;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = () => eliminarLibro(l.isbn);

        li.appendChild(btnEliminar);
        listaUI.appendChild(li);
    });
}

document.getElementById("btnAgregar")?.addEventListener("click", () => {
    const errorDiv = document.getElementById("errorForm") as HTMLElement;
    const nuevoLibro = validarFormulario();

    if (nuevoLibro) {
        agregarLibro(nuevoLibro);
        errorDiv.innerText = ""; 
        (document.getElementById("titulo") as HTMLInputElement).value = "";
        (document.getElementById("autor") as HTMLInputElement).value = "";
        (document.getElementById("precio") as HTMLInputElement).value = "";
    } else {
        errorDiv.innerText = "Error: Todos los campos son obligatorios y el precio debe ser mayor a 0.";
    }
});

renderizar(catalogo);