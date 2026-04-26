interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
}

let catalogo: Libro[] = [
    { isbn: "120", titulo: "Harry Potter", autor: "J.K. Rowling", precio: 2000, disponible: true },
    { isbn: "250", titulo: "Percy Jackson", autor: "Rick Riordan", precio: 5000, disponible: false },
    { isbn: "300", titulo: "La vuelta al mundo en 80 dias", autor: "Julio Verne", precio: 4500, disponible: true },
    { isbn: "500", titulo: "Cien años de soledad", autor: "García Márquez", precio: 8500, disponible: true }
];

function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()));
}

function librosDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}

function precioPromedio(libros: Libro[]): number {
    if (libros.length === 0) return 0;
    const total = libros.reduce((acc, libro) => acc + libro.precio, 0);
    return total / libros.length;
}

function renderizar(libros: Libro[]): void {
    const listaUI = document.getElementById("listado") as HTMLUListElement;
    const statsUI = document.getElementById("stats") as HTMLElement;

    listaUI.innerHTML = ""; 
    
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} ($${libro.precio}) ${libro.disponible ? "[Disponible]" : "[No hay stock]"}`;
        listaUI.appendChild(li);
    });

    const promedio = precioPromedio(libros);
    statsUI.innerText = `Cantidad: ${libros.length} | Precio Promedio: $${promedio.toFixed(2)}`;
}

const input = document.getElementById("filtroAutor") as HTMLInputElement;
const btnFiltrar = document.getElementById("filtrar") as HTMLButtonElement;
const btnDisponibles = document.getElementById("mostrarDisponibles") as HTMLButtonElement;
const btnTodos = document.getElementById("mostrarTodos") as HTMLButtonElement;

btnFiltrar.addEventListener("click", () => {
    renderizar(buscarPorAutor(input.value));
});

btnDisponibles.addEventListener("click", () => {
    renderizar(librosDisponibles());
});

btnTodos.addEventListener("click", () => {
    renderizar(catalogo);
});

renderizar(catalogo);