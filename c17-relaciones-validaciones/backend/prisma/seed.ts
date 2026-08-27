import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "J.K. Rowling" },
  { nombre: "Antoine de Saint-Exupéry" },
  { nombre: "Rick Riordan" }
];

const categorias = [
  { nombre: "Fantasia" },
  { nombre: "Clasico" },
  { nombre: "Aventura" }
];

const libros = [
  {
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    imagen: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
    categorias: ["Fantasia"]
  },
  {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    imagen: "https://m.media-amazon.com/images/I/71tmow7B+FL.jpg",
    categorias: ["Clasico"]
  },
  {
    titulo: "Percy Jackson",
    autor: "Rick Riordan",
    imagen: "https://m.media-amazon.com/images/I/91RQ5d-eIqL.jpg",
    categorias: ["Aventura", "Fantasia"]
  }
];

async function main() {
  await prisma.autor.createMany({
    data: autores
  });

  await prisma.categoria.createMany({
    data: categorias
  });

  for (const { autor, categorias, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: {
          connect: {
            nombre: autor
          }
        },
        categorias: {
          connect: categorias.map(nombre => ({
            nombre
          }))
        }
      }
    });
  }
}

main();