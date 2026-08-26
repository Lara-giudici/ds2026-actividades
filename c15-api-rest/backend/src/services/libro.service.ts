import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg"
  },
  {
    id: 2,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    imagen: "https://m.media-amazon.com/images/I/71tmow7B+FL.jpg"
  },
  {
    id: 3,
    titulo: "Percy Jackson",
    autor: "Rick Riordan",
    imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg"
  }
];

let proximoId = 4;

export function findAll(): Libro[] {
  return libros;
}

export function findById(id: number): Libro | undefined {
  return libros.find(libro => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = {
    id: proximoId++,
    ...datos
  };

  libros.push(nuevo);

  return nuevo;
}

export function update(
  id: number,
  datos: Omit<Libro, "id">
): Libro | undefined {
  const libro = libros.find(libro => libro.id === id);

  if (!libro) {
    return undefined;
  }

  libro.titulo = datos.titulo;
  libro.autor = datos.autor;
  libro.imagen = datos.imagen;

  return libro;
}

export function remove(id: number): boolean {
  const indice = libros.findIndex(libro => libro.id === id);

  if (indice === -1) {
    return false;
  }

  libros.splice(indice, 1);

  return true;
}