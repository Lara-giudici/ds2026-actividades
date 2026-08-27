import { prisma } from "../src/config/prisma";

const libros = [
  {
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg"
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    imagen: "https://m.media-amazon.com/images/I/71tmow7B+FL.jpg"
  },
  {
    titulo: "Percy Jackson",
    autor: "Rick Riordan",
    imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg"
  }
];

const autores = [
  { nombre: "J.K. Rowling" },
  { nombre: "Antoine de Saint-Exupéry" },
  { nombre: "Rick Riordan" }
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();